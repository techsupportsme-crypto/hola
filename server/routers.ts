import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  enquiry: router({
    submit: publicProcedure
      .input(
        z.object({
          firstName: z.string().min(1),
          lastName: z.string().min(1),
          email: z.string().email(),
          mobile: z.string().optional(),
          message: z.string().optional(),
          /** Present when the enquiry was triggered by a brochure download gate */
          source: z.enum(["brochure", "villa", "contact"]).default("contact"),
          villaName: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const sourceLabel =
          input.source === "brochure"
            ? "Brochure Download"
            : input.source === "villa"
            ? `Villa Enquiry — ${input.villaName ?? "Unknown"}`
            : "Contact Form";

        const lines = [
          `Name: ${input.firstName} ${input.lastName}`,
          `Email: ${input.email}`,
          input.mobile ? `Mobile: ${input.mobile}` : null,
          input.message ? `Message: ${input.message}` : null,
        ].filter(Boolean);

        await notifyOwner({
          title: `New Hola Paje Lead — ${sourceLabel}`,
          content: lines.join("\n"),
        });

        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
