import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Key, MessageSquare, Plus, User } from "lucide-react";

const NAV_ITEMS = [
  { to: "/", icon: Home, label: "Home", ocid: "nav-home" },
  { to: "/keys/new", icon: Plus, label: "Add Key", ocid: "nav-add-key" },
  {
    to: "/messages",
    icon: MessageSquare,
    label: "Messages",
    ocid: "nav-messages",
  },
  { to: "/keys", icon: Key, label: "My Keys", ocid: "nav-my-keys" },
  { to: "/profile", icon: User, label: "Profile", ocid: "nav-profile" },
] as const;

interface LayoutProps {
  children: React.ReactNode;
  /** Set false for public pages (finder page) that don't need owner nav */
  showNav?: boolean;
  title?: string;
}

export function Layout({ children, showNav = true, title }: LayoutProps) {
  const { identity, login } = useInternetIdentity();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header
        className="sticky top-0 z-40 bg-card border-b border-border shadow-sm"
        data-ocid="app-header"
      >
        <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center group">
            <img
              src="/assets/images/logo.png"
              alt="KeyRakshak"
              className="h-10 w-auto object-contain"
            />
          </Link>

          <div className="flex items-center gap-2">
            {showNav && !identity && (
              <Button
                size="sm"
                onClick={login}
                data-ocid="login-button"
                className="text-xs"
              >
                Sign In
              </Button>
            )}

            {title && (
              <span className="text-sm font-medium text-muted-foreground">
                {title}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-md mx-auto w-full px-4 py-4 pb-24">
        {children}
      </main>

      {/* Bottom navigation — owner routes only */}
      {showNav && (
        <nav
          className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border"
          data-ocid="bottom-nav"
          aria-label="Main navigation"
        >
          <div className="max-w-md mx-auto flex">
            {NAV_ITEMS.map(({ to, icon: Icon, label, ocid }) => {
              const isActive =
                currentPath === to ||
                (to !== "/" && currentPath.startsWith(to));
              return (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    "flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  data-ocid={ocid}
                  aria-label={label}
                >
                  <Icon className={cn("size-5", isActive && "stroke-[2.5]")} />
                  <span>{label}</span>
                </Link>
              );
            })}
          </div>
          {/* Bottom safe area */}
          <div className="h-safe-area-inset-bottom" />
        </nav>
      )}

      {/* Branding footer — only on public pages */}
      {!showNav && (
        <footer className="py-4 text-center bg-muted/40 border-t border-border">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()}.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              Built with love using caffeine.ai
            </a>
          </p>
        </footer>
      )}
    </div>
  );
}
