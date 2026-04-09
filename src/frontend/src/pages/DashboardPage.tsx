import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link } from "@tanstack/react-router";
import { Key, MessageSquare, Plus, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { KeyCard, KeyCardSkeleton } from "../components/KeyCard";
import { Layout } from "../components/Layout";
import { useMyKeys } from "../hooks/use-keys";
import { useMessages } from "../hooks/use-messages";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning! ☀️";
  if (hour < 17) return "Good afternoon! 🌤️";
  return "Good evening! 🌙";
}

interface StatCardProps {
  icon: React.ReactNode;
  value: number | string;
  label: string;
  highlight?: boolean;
}

function StatCard({ icon, value, label, highlight }: StatCardProps) {
  return (
    <div
      className={`flex flex-col items-center gap-1 rounded-xl border p-3 text-center ${
        highlight ? "border-accent/30 bg-accent/8" : "border-border bg-card"
      }`}
    >
      <div className="text-xl">{icon}</div>
      <span
        className={`font-display text-xl font-bold ${highlight ? "text-accent" : "text-foreground"}`}
      >
        {value}
      </span>
      <span className="text-[10px] font-medium text-muted-foreground leading-tight">
        {label}
      </span>
    </div>
  );
}

// Hook to aggregate messages across all keys
function useTotalMessages(keyIds: string[]) {
  // We fetch messages for the first 5 keys to get a count — lightweight
  const q0 = useMessages(keyIds[0]);
  const q1 = useMessages(keyIds[1]);
  const q2 = useMessages(keyIds[2]);
  const q3 = useMessages(keyIds[3]);
  const q4 = useMessages(keyIds[4]);

  const total =
    (q0.data?.length ?? 0) +
    (q1.data?.length ?? 0) +
    (q2.data?.length ?? 0) +
    (q3.data?.length ?? 0) +
    (q4.data?.length ?? 0);

  const isLoading = q0.isLoading || q1.isLoading || q2.isLoading;

  return { total, isLoading };
}

export default function DashboardPage() {
  const { identity, login } = useInternetIdentity();
  const { data: keys, isLoading } = useMyKeys();

  const keyIds = keys?.map((k) => k.id) ?? [];
  const { total: totalMessages } = useTotalMessages(keyIds);

  if (!identity) {
    return (
      <Layout>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center min-h-[70vh] gap-6 text-center px-2"
        >
          <div className="size-24 rounded-2xl bg-primary/10 flex items-center justify-center shadow-sm">
            <Key className="size-12 text-primary" />
          </div>
          <div className="space-y-2">
            <h1 className="font-display text-3xl font-bold text-foreground">
              KeyRakshak
            </h1>
            <p className="text-muted-foreground max-w-xs mx-auto text-sm leading-relaxed">
              Register your keys with smart QR tags. If someone finds your key,
              they can contact you — your number stays 100% private.
            </p>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              "QR Code Recovery",
              "Number Hidden",
              "Instant Alert",
              "Reward System",
            ].map((f) => (
              <span
                key={f}
                className="text-xs px-3 py-1 rounded-full bg-primary/8 text-primary font-medium border border-primary/20"
              >
                {f}
              </span>
            ))}
          </div>

          <Button
            size="lg"
            onClick={login}
            data-ocid="get-started-btn"
            className="w-full max-w-xs h-12 text-base font-semibold"
          >
            Get Started — Sign In
          </Button>
          <p className="text-xs text-muted-foreground">
            Secured with Internet Identity · Zero data sharing
          </p>
        </motion.div>
      </Layout>
    );
  }

  const lostCount = keys?.filter((k) => k.lostMode).length ?? 0;
  const totalKeys = keys?.length ?? 0;

  return (
    <Layout>
      <div className="flex flex-col gap-5">
        {/* Greeting header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-start justify-between pt-2"
        >
          <div>
            <p className="text-sm text-muted-foreground">{getGreeting()}</p>
            <h1 className="font-display text-xl font-bold text-foreground">
              My Keys
            </h1>
          </div>
          <Link to="/keys/new">
            <Button
              size="icon"
              data-ocid="add-key-fab"
              aria-label="Add new key"
              className="size-10 shadow-sm"
            >
              <Plus className="size-5" />
            </Button>
          </Link>
        </motion.div>

        {/* Stats row */}
        {!isLoading && identity && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="grid grid-cols-3 gap-2"
            data-ocid="stats-row"
          >
            <StatCard
              icon={<Key className="size-5 text-primary" />}
              value={totalKeys}
              label="Total Keys"
            />
            <StatCard
              icon={<span className="text-xl">🚨</span>}
              value={lostCount}
              label="Lost Mode ON"
              highlight={lostCount > 0}
            />
            <StatCard
              icon={<MessageSquare className="size-5 text-primary" />}
              value={totalMessages}
              label="Messages"
            />
          </motion.div>
        )}

        {isLoading && (
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 w-full rounded-xl" />
            ))}
          </div>
        )}

        {/* Lost mode alert banner */}
        {!isLoading && lostCount > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-lg bg-accent/10 border border-accent/30 px-4 py-3 flex items-center gap-3"
            data-ocid="lost-mode-banner"
          >
            <span className="text-accent text-lg shrink-0">🚨</span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-accent">
                {lostCount} {lostCount === 1 ? "key" : "keys"} in Lost Mode
              </p>
              <p className="text-xs text-muted-foreground">
                Reward Offered badge is visible to finders
              </p>
            </div>
          </motion.div>
        )}

        {/* Keys Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <KeyCardSkeleton key={i} />
            ))}
          </div>
        ) : keys && keys.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {keys.map((key, i) => (
              <motion.div
                key={key.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.3 }}
              >
                <KeyCard keyInfo={key} className="h-full" />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            data-ocid="empty-state-keys"
            className="flex flex-col items-center justify-center gap-4 py-16 text-center"
          >
            <div className="size-20 rounded-full bg-muted flex items-center justify-center">
              <Sparkles className="size-10 text-muted-foreground" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground mb-1">
                No keys registered yet
              </h2>
              <p className="text-sm text-muted-foreground max-w-[220px] mx-auto">
                Add your first key to get a QR tag and enable recovery anywhere.
              </p>
            </div>
            <Link to="/keys/new">
              <Button data-ocid="add-first-key-btn" size="lg">
                <Plus className="size-4 mr-1" />
                Add Your First Key
              </Button>
            </Link>
          </motion.div>
        )}

        {/* Quick tip */}
        {!isLoading && keys && keys.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xs text-center text-muted-foreground pb-2"
          >
            Tap a key card to view QR code and manage settings
          </motion.p>
        )}
      </div>
    </Layout>
  );
}
