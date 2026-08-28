/*
 * HOLA PAJE LUXURY RESIDENCES — App Root
 * Design: Monograph Silence — single-scroll page, dark default theme
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import ThankYou from "@/pages/ThankYou";
import LandingMeta from "@/pages/LandingMeta";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/privacy-policy"} component={PrivacyPolicy} />
      <Route path={"/thank-you"} component={ThankYou} />
      <Route path={"/landing-meta"} component={LandingMeta} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
