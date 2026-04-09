import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link } from "@tanstack/react-router";
import { Calendar, Inbox, Key, MessageSquare } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "../components/Badge";
import { Layout } from "../components/Layout";
import { useMyKeys } from "../hooks/use-keys";
import { useMessages } from "../hooks/use-messages";
import type { FinderMessage, OwnerKeyInfo } from "../types";
import { KEY_TYPE_ICONS } from "../types";

function formatDate(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
}

function formatTime(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function MessageItem({ msg, index }: { msg: FinderMessage; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="card-elevated p-4 ml-4"
      data-ocid="message-item"
    >
      <p className="text-sm text-foreground leading-relaxed">
        {msg.messageText}
      </p>
      <div className="flex items-center gap-3 mt-2.5">
        {msg.finderPhone && (
          <a
            href={`tel:${msg.finderPhone}`}
            className="text-xs text-primary font-medium hover:underline"
          >
            📱 {msg.finderPhone}
          </a>
        )}
        <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
          <Calendar className="size-3" />
          <span>{formatDate(msg.sentAt)}</span>
          <span>·</span>
          <span>{formatTime(msg.sentAt)}</span>
        </div>
      </div>
    </motion.div>
  );
}

function KeyMessagesSection({
  keyInfo,
  sectionIndex,
  onCountUpdate,
}: {
  keyInfo: OwnerKeyInfo;
  sectionIndex: number;
  onCountUpdate?: (count: number, loaded: boolean) => void;
}) {
  const { data: messages, isLoading } = useMessages(keyInfo.id);
  const icon = KEY_TYPE_ICONS[keyInfo.keyType] ?? "🔑";

  // Notify parent of count changes (used for empty fallback logic)
  if (onCountUpdate) {
    onCountUpdate(messages?.length ?? 0, !isLoading);
  }

  if (isLoading) {
    return <Skeleton className="h-24 w-full rounded-lg" />;
  }

  if (!messages || messages.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: sectionIndex * 0.08 }}
      className="flex flex-col gap-2"
      data-ocid="key-message-group"
    >
      {/* Key header */}
      <div className="flex items-center gap-2">
        <span className="text-base">{icon}</span>
        <Link to="/keys/$id" params={{ id: keyInfo.id }}>
          <span className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
            {keyInfo.name}
          </span>
        </Link>
        <span className="font-mono text-xs text-muted-foreground">
          {keyInfo.id}
        </span>
        <Badge variant="found">{messages.length}</Badge>
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-2">
        {messages.map((msg, i) => (
          <MessageItem key={msg.id.toString()} msg={msg} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

/**
 * Renders all key message sections. Tracks total message count across all
 * sections and shows an empty-inbox fallback only when all sections have
 * loaded and none have messages.
 */
function AllKeysMessagesView({ keys }: { keys: OwnerKeyInfo[] }) {
  // One query per key — hooks called unconditionally at top level.
  const q0 = useMessages(keys[0]?.id);
  const q1 = useMessages(keys[1]?.id);
  const q2 = useMessages(keys[2]?.id);
  const q3 = useMessages(keys[3]?.id);
  const q4 = useMessages(keys[4]?.id);
  const q5 = useMessages(keys[5]?.id);
  const q6 = useMessages(keys[6]?.id);
  const q7 = useMessages(keys[7]?.id);
  const q8 = useMessages(keys[8]?.id);
  const q9 = useMessages(keys[9]?.id);

  const allQueries = [q0, q1, q2, q3, q4, q5, q6, q7, q8, q9].slice(
    0,
    keys.length,
  );
  const allLoaded = allQueries.every((q) => !q.isLoading);
  const totalMessages = allQueries.reduce(
    (sum, q) => sum + (q.data?.length ?? 0),
    0,
  );

  const showEmptyFallback = allLoaded && totalMessages === 0;

  return (
    <div className="flex flex-col gap-6" data-ocid="messages-by-key">
      {keys.map((key, i) => (
        <KeyMessagesSection key={key.id} keyInfo={key} sectionIndex={i} />
      ))}

      {showEmptyFallback && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          data-ocid="messages-summary"
          className="rounded-lg bg-muted/30 border border-border p-5 text-center"
        >
          <Inbox className="size-8 mx-auto mb-2 text-muted-foreground/60" />
          <p className="text-sm font-medium text-foreground">
            Inbox up to date
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {keys.length} {keys.length === 1 ? "key" : "keys"} monitored ·
            Messages appear here when someone scans your QR code
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default function MessagesPage() {
  const { identity, login } = useInternetIdentity();
  const { data: keys, isLoading } = useMyKeys();

  if (!identity) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
          <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center">
            <MessageSquare className="size-8 text-primary" />
          </div>
          <p className="text-muted-foreground">Sign in to view your messages</p>
          <Button onClick={login} data-ocid="login-to-messages">
            Sign In
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        {/* Page header */}
        <div className="flex items-center gap-2 pt-2">
          <MessageSquare className="size-5 text-primary" />
          <h1 className="font-display text-xl font-bold text-foreground">
            Finder Messages
          </h1>
        </div>

        {isLoading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-24 w-full rounded-lg" />
            ))}
          </div>
        ) : keys && keys.length > 0 ? (
          <AllKeysMessagesView keys={keys} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            data-ocid="empty-messages-state"
            className="flex flex-col items-center justify-center gap-4 py-16 text-center"
          >
            <div className="size-16 rounded-full bg-muted flex items-center justify-center">
              <Key className="size-8 text-muted-foreground" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground mb-1">
                No keys registered yet
              </h2>
              <p className="text-sm text-muted-foreground max-w-xs">
                Register a key first to receive messages when someone finds it.
              </p>
            </div>
            <Link to="/keys/new">
              <Button variant="outline" data-ocid="register-key-from-messages">
                Register a Key
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
