
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./providers/ThemeProvider";
import { WagmiProvider } from "./providers/WagmiProvider";
import { AppStateProvider } from "./providers/AppStateProvider";

// Pages
import Index from "./pages/Index";
import Models from "./pages/Models";
import ModelDetail from "./pages/ModelDetail";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const App = () => (
  <ThemeProvider>
    <WagmiProvider>
      <AppStateProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner position="bottom-right" />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/models" element={<Models />} />
              <Route path="/model/:slug" element={<ModelDetail />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AppStateProvider>
    </WagmiProvider>
  </ThemeProvider>
);

export default App;
