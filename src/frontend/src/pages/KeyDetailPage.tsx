import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  Copy,
  ExternalLink,
  MapPin,
  MessageSquare,
  Navigation,
  Share2,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Badge, RewardBadge } from "../components/Badge";
import { Layout } from "../components/Layout";
import { QRDisplay } from "../components/QRDisplay";
import { useMyKeys, useSetLostMode } from "../hooks/use-keys";
import { useMessages } from "../hooks/use-messages";
import { useClearLocation, useGetLocationByKeyId } from "../hooks/use-tracking";
import { KEY_TYPE_ICONS, KEY_TYPE_LABELS } from "../types";

function formatDate(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function relativeSeconds(ts: bigint): string {
  const secs = Math.round((Date.now() - Number(ts) / 1_000_000) / 1000);
  if (secs < 5) return "just now";
  if (secs < 60) return `${secs}s ago`;
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  return `${Math.floor(mins / 60)}h ago`;
}

function buildMapUrl(lat: number, lon: number): string {
  const delta = 0.01;
  const bbox = `${lon - delta},${lat - delta},${lon + delta},${lat + delta}`;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;
}

// ── Live Location Section ─────────────────────────────────────────────────────
interface LiveLocationSectionProps {
  keyId: string;
  lostMode: boolean;
}

function LiveLocationSection({ keyId, lostMode }: LiveLocationSectionProps) {
  const { data: location, isLoading: locLoading } = useGetLocationByKeyId(
    lostMode ? keyId : undefined,
  );
  const clearLocation = useClearLocation();

  const trackLink = `https://keyrakshak.in/track/${keyId}`;

  const handleCopyTrackLink = async () => {
    try {
      await navigator.clipboard.writeText(trackLink);
      toast.success("Track link copied!");
    } catch {
      toast.error("Could not copy link");
    }
  };

  const handleClearLocation = async () => {
    try {
      await clearLocation.mutateAsync(keyId);
      toast.success("Location cleared");
    } catch {
      toast.error("Failed to clear location");
    }
  };

  const hasValidLocation =
    location != null &&
    typeof location.lat === "number" &&
    typeof location.lon === "number" &&
    location.lat !== 0 &&
    location.lon !== 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="card-elevated p-4 flex flex-col gap-3"
      data-ocid="live-location-section"
    >
      {/* Section header */}
      <div className="flex items-center gap-2">
        <Navigation className="size-4 text-primary" />
        <h2 className="font-semibold text-foreground">Live Location</h2>
        {lostMode && hasValidLocation && (
          <span className="ml-auto flex items-center gap-1 text-xs text-green-600 font-medium">
            <span className="size-2 rounded-full bg-green-500 animate-pulse inline-block" />
            Live
          </span>
        )}
      </div>

      {!lostMode ? (
        /* Not in lost mode */
        <div className="rounded-lg bg-muted/40 border border-border px-4 py-5 text-center">
          <MapPin className="size-6 mx-auto mb-2 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">
            Enable Lost Mode to see live tracking
          </p>
        </div>
      ) : locLoading ? (
        /* Loading skeleton */
        <Skeleton className="h-40 w-full rounded-lg" />
      ) : hasValidLocation ? (
        /* Location found — show map + details */
        <div className="flex flex-col gap-3" data-ocid="location-map-area">
          {/* OpenStreetMap iframe */}
          <div className="rounded-lg overflow-hidden border border-border">
            <iframe
              title="Live Location Map"
              src={buildMapUrl(location.lat, location.lon)}
              width="100%"
              height="400"
              loading="lazy"
              className="block"
              style={{ border: 0 }}
            />
          </div>

          {/* Coordinates + last updated */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-1">
            <p className="font-mono text-xs text-muted-foreground">
              {location.lat.toFixed(6)}, {location.lon.toFixed(6)}
            </p>
            <p
              className="text-xs text-muted-foreground"
              data-ocid="location-last-updated"
            >
              Last updated {relativeSeconds(location.updatedAt)}
            </p>
          </div>

          {/* Clear location button */}
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/5 w-full"
            onClick={handleClearLocation}
            disabled={clearLocation.isPending}
            data-ocid="clear-location-btn"
          >
            <Trash2 className="size-3.5" />
            Clear Location
          </Button>
        </div>
      ) : (
        /* Lost mode on but no location yet */
        <div
          className="rounded-lg bg-muted/40 border border-border px-4 py-7 text-center"
          data-ocid="waiting-location"
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.6,
              ease: "easeInOut",
            }}
            className="inline-block mb-3"
          >
            <MapPin className="size-7 text-primary/60" />
          </motion.div>
          <p className="text-sm font-medium text-foreground">
            Waiting for finder location...
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Location will appear here once the finder opens the track page.
          </p>
        </div>
      )}

      {/* Track Link — always shown when in lost mode */}
      {lostMode && (
        <div className="flex flex-col gap-2 pt-1">
          <Separator />
          <p className="text-xs font-medium text-foreground flex items-center gap-1.5">
            <Share2 className="size-3.5 text-muted-foreground" />
            Track Link
          </p>
          <div className="flex items-center gap-2">
            <a
              href={trackLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-primary truncate hover:underline underline-offset-2 min-w-0 flex-1"
              data-ocid="track-link-url"
            >
              {trackLink}
            </a>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 size-7"
              onClick={handleCopyTrackLink}
              aria-label="Copy track link"
              data-ocid="copy-track-link"
            >
              <Copy className="size-3" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 size-7"
              data-ocid="open-track-link"
              onClick={() =>
                window.open(trackLink, "_blank", "noopener,noreferrer")
              }
              aria-label="Open track link"
            >
              <ExternalLink className="size-3" />
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function KeyDetailPage() {
  const { identity, login } = useInternetIdentity();
  const { id } = useParams({ from: "/keys/$id" });
  const { data: keys, isLoading: keysLoading } = useMyKeys();
  const { data: messages, isLoading: msgLoading } = useMessages(id);
  const setLostMode = useSetLostMode();

  const keyInfo = keys?.find((k) => k.id === id);

  const finderUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/found/${id}`
      : `/found/${id}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(finderUrl);
      toast.success("Finder link copied to clipboard!");
    } catch {
      toast.error("Could not copy link");
    }
  };

  const handleShareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "KeyRakshak — Found a key?",
          text: `Scan or open this link if you found this key: ${keyInfo?.name ?? id}`,
          url: finderUrl,
        });
      } catch {
        // user cancelled
      }
    } else {
      await handleCopyLink();
    }
  };

  if (!identity) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
          <p className="text-muted-foreground">Sign in to view key details</p>
          <Button onClick={login} data-ocid="login-to-view">
            Sign In
          </Button>
        </div>
      </Layout>
    );
  }

  if (keysLoading) {
    return (
      <Layout>
        <div className="flex flex-col gap-4 pt-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-14 w-full rounded-lg" />
          <Skeleton className="h-14 w-full rounded-lg" />
        </div>
      </Layout>
    );
  }

  if (!keyInfo) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
          <p className="text-muted-foreground">Key not found</p>
          <Link to="/">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const icon = KEY_TYPE_ICONS[keyInfo.keyType] ?? "🔑";
  const label = KEY_TYPE_LABELS[keyInfo.keyType] ?? keyInfo.keyType;

  const handleLostModeToggle = async (checked: boolean) => {
    try {
      await setLostMode.mutateAsync({ keyId: keyInfo.id, lostMode: checked });
      toast.success(
        checked
          ? "Lost Mode activated — Reward Offered badge is now visible"
          : "Lost Mode deactivated",
      );
    } catch {
      toast.error("Failed to update Lost Mode");
    }
  };

  return (
    <Layout>
      <div className="flex flex-col gap-5">
        {/* Back + title */}
        <div className="flex items-center gap-2 pt-2">
          <Link to="/">
            <Button variant="ghost" size="icon" aria-label="Go back">
              <ArrowLeft className="size-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xl">{icon}</span>
            <h1 className="font-display text-xl font-bold text-foreground truncate">
              {keyInfo.name}
            </h1>
          </div>
        </div>

        {/* Key Info + QR Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="card-elevated p-5 flex flex-col gap-4"
        >
          {/* Key meta */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="font-mono text-base font-bold text-primary tracking-wide">
                {keyInfo.id}
              </p>
            </div>
            <Badge variant={keyInfo.lostMode ? "lost" : "active"}>
              {keyInfo.lostMode ? "🚨 Lost Mode" : "✓ Active"}
            </Badge>
          </div>

          {keyInfo.lostMode && <RewardBadge />}

          <Separator />

          {/* QR Code — large display */}
          <div
            className="flex flex-col items-center gap-3 py-2"
            data-ocid="qr-display-area"
          >
            <QRDisplay keyId={keyInfo.id} size={200} showLabel />
            <p className="text-xs text-center text-muted-foreground max-w-[220px]">
              Stick this QR code on your keychain. Finders scan it to contact
              you anonymously.
            </p>
          </div>

          {/* Share / Copy actions */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
              data-ocid="copy-qr-link"
              className="gap-1.5"
            >
              <Copy className="size-3.5" />
              Copy Link
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShareLink}
              data-ocid="share-qr-link"
              className="gap-1.5"
            >
              <Share2 className="size-3.5" />
              Share Link
            </Button>
          </div>

          {/* Open finder page link */}
          <a
            href={finderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 text-xs text-primary hover:underline underline-offset-2 transition-colors"
            data-ocid="preview-finder-page"
          >
            <ExternalLink className="size-3" />
            Preview finder page
          </a>
        </motion.div>

        {/* Lost Mode Toggle Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="card-elevated p-4"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="font-semibold text-foreground">Lost Mode</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                Shows "Reward Offered" badge to finders when active
              </p>
            </div>
            <Switch
              data-ocid="key-detail-lost-mode"
              checked={keyInfo.lostMode}
              onCheckedChange={handleLostModeToggle}
              disabled={setLostMode.isPending}
              aria-label="Toggle lost mode"
            />
          </div>
        </motion.div>

        {/* Live Location Section */}
        <LiveLocationSection keyId={keyInfo.id} lostMode={keyInfo.lostMode} />

        {/* Finder Messages */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="flex flex-col gap-3"
        >
          <div className="flex items-center gap-2">
            <MessageSquare className="size-4 text-muted-foreground" />
            <h2 className="font-semibold text-foreground">Finder Messages</h2>
            {messages && messages.length > 0 && (
              <Badge variant="found">{messages.length}</Badge>
            )}
          </div>

          {msgLoading ? (
            <div className="flex flex-col gap-2">
              {[1, 2].map((i) => (
                <Skeleton key={i} className="h-20 w-full rounded-lg" />
              ))}
            </div>
          ) : messages && messages.length > 0 ? (
            <div className="flex flex-col gap-2" data-ocid="messages-list">
              {messages.map((msg, i) => (
                <motion.div
                  key={msg.id.toString()}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="card-elevated p-4"
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
              ))}
            </div>
          ) : (
            <div
              data-ocid="empty-messages"
              className="py-8 text-center text-sm text-muted-foreground bg-muted/30 rounded-lg border border-border"
            >
              <MessageSquare className="size-8 mx-auto mb-2 text-muted-foreground/50" />
              <p className="font-medium text-foreground">No messages yet</p>
              <p className="text-xs mt-1">
                When someone scans your QR code, their message appears here.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
}
