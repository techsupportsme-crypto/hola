import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  registerStorageProxy(app);
  registerOAuthRoutes(app);

  // ── SEO: enforce canonical domain ──
  // Only holapaje.com and www.holapaje.com should be indexed.
  // All *.manus.space and other non-canonical hostnames are 301-redirected to holapaje.com
  // so crawlers update their index on the very next visit rather than waiting for a noindex cycle.
  const CANONICAL_HOSTS = new Set(["holapaje.com", "www.holapaje.com"]);
  const CANONICAL_BASE = "https://holapaje.com";

  // 301 redirect non-canonical hosts to the canonical equivalent
  app.use((req, res, next) => {
    const host =
      (req.headers["x-forwarded-host"] as string) || req.hostname || "";
    const bareHost = host.toLowerCase().replace(/:\d+$/, "");
    // Local development must stay reachable without the canonical redirect
    if (bareHost === "localhost" || bareHost === "127.0.0.1") {
      return next();
    }
    if (!CANONICAL_HOSTS.has(host.toLowerCase())) {
      // Always redirect to the homepage — do not expose internal paths on non-canonical domains
      const target = CANONICAL_BASE;
      return res.redirect(301, target);
    }
    next();
  });

  // Serve a host-aware robots.txt
  app.get("/robots.txt", (req, res) => {
    const host =
      (req.headers["x-forwarded-host"] as string) || req.hostname || "";
    const isCanonical = CANONICAL_HOSTS.has(host.toLowerCase());
    res.type("text/plain");
    if (isCanonical) {
      res.send(
        "User-agent: *\nAllow: /\n\nSitemap: https://holapaje.com/sitemap.xml\n"
      );
    } else {
      res.send("User-agent: *\nDisallow: /\n");
    }
  });

  // Add X-Robots-Tag: noindex on every response for non-canonical hosts
  app.use((req, res, next) => {
    const host =
      (req.headers["x-forwarded-host"] as string) || req.hostname || "";
    if (!CANONICAL_HOSTS.has(host.toLowerCase())) {
      res.setHeader("X-Robots-Tag", "noindex, nofollow");
    }
    next();
  });
  // ── Sitemap ──
  app.get("/sitemap.xml", (_req, res) => {
    const base = "https://holapaje.com";
    const now = new Date().toISOString().split("T")[0];
    const pages = [
      { loc: "/", priority: "1.0", changefreq: "weekly" },
      { loc: "/privacy-policy", priority: "0.3", changefreq: "yearly" },
    ];
    const urls = pages
      .map(
        p =>
          `  <url>\n    <loc>${base}${p.loc}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`
      )
      .join("\n");
    res
      .type("application/xml")
      .send(
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
      );
  });

  // ── llms.txt — plain-text brand summary for LLM crawlers ──
  app.get("/llms.txt", (_req, res) => {
    res.type("text/plain").send(
      `# Hola Paje Luxury Residences

> A boutique collection of fifty private pool villas in Paje, on the south-east coast of Zanzibar, Tanzania. Developed by Floton Africa.

## What is Hola Paje?

Hola Paje is an off-plan luxury residential development comprising fifty 2 and 3-bedroom villas set within a landscaped precinct in Paje, Zanzibar. Each villa features a private pool, open-plan living spaces, and open-air bathrooms. The development is scheduled for completion in 2028 and is developed by Floton Africa.

## Location

Paje, south-east coast of Zanzibar (Unguja Island), Tanzania. Paje is internationally recognised as one of the Indian Ocean's premier kitesurf destinations and is approximately 45 minutes from Zanzibar International Airport.

## Villa types and pricing

- Terrace Villa: 2 bedrooms, 2 bathrooms, 138 sqm, private plunge pool. From USD 270,000.
- Island Villa: 2 bedrooms, 2 bathrooms, 148 sqm, private pool, dramatic pitched roof. From USD 320,000.
- Contemporary Villa: 3 bedrooms, 3 bathrooms, 210 sqm, private pool, rooftop terrace. From USD 370,000.

## Investment structure

- Insurance-backed deposit protection throughout the construction period.
- Independent escrow controls: funds released only as construction milestones are verified by a third party.
- Guaranteed minimum 8% net rental yield for 5 years from handover on designated managed residences.
- Professionally managed hospitality programme from handover.

## Developer

Floton Africa Co Ltd. Active portfolio across Zanzibar. Website: https://flotonzanzibar.com/

## Contact

- Email: invest@flotonafrica.com
- Website: https://holapaje.com/
- Enquiry: https://holapaje.com/#contact

## Key facts

- 50 residences total — no expansion planned.
- Completion: 2028.
- Starting price: USD 270,000.
- Zanzibar residency permit eligibility for qualifying purchasers.
- Precinct amenities: resort-style pool, wellness and fitness, tropical gardens, concierge, co-working lounge, 24-hour security.

## Frequently asked questions

See https://holapaje.com/#faq for the full FAQ.
`
    );
  });

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
