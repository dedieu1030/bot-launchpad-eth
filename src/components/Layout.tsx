
import { Link, useLocation } from "react-router-dom";
import { WalletConnectButton } from "./WalletConnectButton";
import { ThemeToggle } from "./ThemeToggle";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Bots', href: '/models' },
    { name: 'Tableau de bord', href: '/dashboard' },
    { name: 'Transactions', href: '/transactions' },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname !== "/") {
      return false;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-medium text-xl">BotLauncher</span>
            </Link>
            {!isMobile && (
              <nav className="hidden md:flex items-center gap-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`text-sm font-medium transition-colors hover:text-foreground/80 ${
                      isActive(item.href)
                        ? "text-foreground"
                        : "text-foreground/60"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            )}
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <WalletConnectButton />
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden"
              >
                {menuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            )}
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobile && menuOpen && (
          <div className="md:hidden border-t">
            <div className="container py-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive(item.href)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/70 hover:bg-muted"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-16">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} BotLauncher. Tous droits réservés.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link to="/" className="hover:underline">Conditions d'utilisation</Link>
            <Link to="/" className="hover:underline">Confidentialité</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
