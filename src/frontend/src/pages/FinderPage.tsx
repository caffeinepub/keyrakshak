import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "@tanstack/react-router";
import {
  CheckCircle2,
  Key,
  Lock,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { RewardBadge } from "../components/Badge";
import { Layout } from "../components/Layout";
import { useKeyReward, usePublicKeyInfo } from "../hooks/use-keys";
import { useSendMessage } from "../hooks/use-messages";
import { KEY_TYPE_ICONS, KEY_TYPE_LABELS } from "../types";

type Step = "view" | "form" | "sent";

function FingerLoader() {
  return (
    <Layout showNav={false}>
      <div className="flex flex-col gap-4 pt-6">
        <div className="flex flex-col items-center gap-3">
          <Skeleton className="h-16 w-16 rounded-full" />
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-36" />
        </div>
        <Skeleton className="h-16 w-full rounded-xl" />
        <Skeleton className="h-12 w-full rounded-lg" />
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>
    </Layout>
  );
}

function KeyNotFound() {
  return (
    <Layout showNav={false}>
      <div className="flex flex-col items-center justify-center min-h-[65vh] gap-5 text-center px-2">
        <div className="size-20 rounded-full bg-muted flex items-center justify-center">
          <span className="text-4xl">🔍</span>
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            Key Not Found
          </h1>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
            This QR code doesn't match any registered key. It may have been
            deactivated or the link might be incorrect.
          </p>
        </div>
        <div className="w-full rounded-xl border border-border bg-card p-4 text-left">
          <div className="flex items-center gap-2 mb-1">
            <Key className="size-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">
              KeyRakshak
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Secure key recovery platform — protecting keys across India.
          </p>
        </div>
      </div>
    </Layout>
  );
}

function formatDate(ts: bigint | number | undefined): string {
  if (!ts) return "—";
  const ms = typeof ts === "bigint" ? Number(ts) / 1_000_000 : ts;
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(ms));
}

export default function FinderPage() {
  const { keyId } = useParams({ from: "/found/$keyId" });
  const { data: keyInfo, isLoading } = usePublicKeyInfo(keyId);
  const { data: rewardData } = useKeyReward(keyId);
  const sendMessage = useSendMessage();

  const [step, setStep] = useState<Step>("view");
  const [finderName, setFinderName] = useState("");
  const [messageText, setMessageText] = useState("");
  const [finderPhone, setFinderPhone] = useState("");
  const [messageError, setMessageError] = useState("");

  if (isLoading) return <FingerLoader />;
  if (!keyInfo) return <KeyNotFound />;

  const icon = KEY_TYPE_ICONS[keyInfo.keyType] ?? "🔑";
  const label = KEY_TYPE_LABELS[keyInfo.keyType] ?? String(keyInfo.keyType);
  const isLostMode = keyInfo.lostMode;
  const hasReward = rewardData && rewardData.rewardAmount > 0;

  function handleShareLocation() {
    if (!navigator.geolocation) {
      toast.error("Location not available on this device");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(6);
        const lng = pos.coords.longitude.toFixed(6);
        const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
        setMessageText((prev) =>
          prev
            ? `${prev}\n📍 My location: ${mapsUrl}`
            : `📍 I found your key! My location: ${mapsUrl}`,
        );
        setStep("form");
        toast.success("Location added to your message");
      },
      () => {
        toast.error("Could not get your location. Please type it manually.");
        setStep("form");
      },
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!messageText.trim()) {
      setMessageError("Please write a message for the owner");
      return;
    }
    const fullMessage = finderName.trim()
      ? `From ${finderName.trim()}: ${messageText.trim()}`
      : messageText.trim();
    try {
      await sendMessage.mutateAsync({
        keyId,
        messageText: fullMessage,
        finderPhone: finderPhone.trim() || null,
      });
      setStep("sent");
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  }

  // ── Sent confirmation ────────────────────────────────────────────────────────
  if (step === "sent") {
    return (
      <Layout showNav={false}>
        <div className="flex flex-col items-center justify-center min-h-[70vh] gap-5 text-center">
          <div
            className="size-20 rounded-full bg-primary/10 flex items-center justify-center"
            data-ocid="sent-icon"
          >
            <CheckCircle2 className="size-10 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              Message Sent! 🙏
            </h1>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              Your message has been sent to the owner. They'll reach out to you
              soon. Thank you for your kindness!
            </p>
          </div>
          <div
            className="w-full rounded-xl border border-primary/20 bg-primary/5 p-5 text-left"
            data-ocid="sent-confirmation"
          >
            <p className="text-sm font-semibold text-primary mb-2">
              What happens next?
            </p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="text-primary">✅</span> Owner has been notified
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✅</span> Your message is
                securely stored
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✅</span> Owner will arrange key
                return
              </li>
            </ul>
          </div>

          {hasReward && rewardData && (
            <div className="w-full rounded-xl border border-accent/30 bg-accent/8 p-4 text-left">
              <p className="text-sm font-semibold text-accent mb-1">
                🎁 Reward Awaits You!
              </p>
              <p className="text-xs text-muted-foreground">
                Owner is offering ₹{rewardData.rewardAmount} for returning this
                key. They will share payment details when you connect.
              </p>
            </div>
          )}

          {isLostMode && !hasReward && (
            <div className="w-full rounded-xl border border-accent/20 bg-accent/5 p-4 text-sm text-accent font-medium">
              🎁 A reward may be offered for returning this key.
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            Powered by{" "}
            <span className="font-semibold text-foreground">KeyRakshak</span> —
            Secure Key Recovery
          </p>
        </div>
      </Layout>
    );
  }

  // ── Message form ─────────────────────────────────────────────────────────────
  if (step === "form") {
    return (
      <Layout showNav={false}>
        <div className="flex flex-col gap-5 py-4">
          <div>
            <button
              type="button"
              onClick={() => setStep("view")}
              className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-smooth"
            >
              ← Back
            </button>
            <h2 className="font-display text-xl font-bold text-foreground">
              Send a Message 💬
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Sent securely — the owner's contact details stay private.
            </p>
          </div>

          <form
            data-ocid="finder-message-form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <div className="space-y-1.5">
              <Label htmlFor="finderName">Your Name (Optional)</Label>
              <Input
                id="finderName"
                data-ocid="finder-name-input"
                placeholder="e.g. Rahul Sharma"
                value={finderName}
                onChange={(e) => setFinderName(e.target.value)}
                maxLength={60}
                className="h-12"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="messageText">
                Message <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="messageText"
                data-ocid="finder-message-input"
                placeholder="Hi, I found your key near... I'm available at..."
                value={messageText}
                onChange={(e) => {
                  setMessageText(e.target.value);
                  if (e.target.value.trim()) setMessageError("");
                }}
                onBlur={() => {
                  if (!messageText.trim())
                    setMessageError("Please write a message");
                }}
                aria-invalid={!!messageError}
                aria-describedby={messageError ? "msg-error" : undefined}
                rows={4}
                className="resize-none"
                maxLength={500}
              />
              {messageError && (
                <p id="msg-error" className="text-xs text-destructive">
                  {messageError}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="finderPhone"
                className="flex items-center gap-1.5"
              >
                <Phone className="size-3" />
                Your Phone (Optional)
              </Label>
              <Input
                id="finderPhone"
                data-ocid="finder-phone-input"
                type="tel"
                placeholder="+91 98765 43210"
                value={finderPhone}
                onChange={(e) => setFinderPhone(e.target.value)}
                maxLength={15}
                className="h-12"
              />
              <p className="text-xs text-muted-foreground">
                Shared with the owner only to help them contact you.
              </p>
            </div>

            <Button
              type="submit"
              size="lg"
              data-ocid="finder-send-btn"
              className="w-full gap-2"
              disabled={sendMessage.isPending}
            >
              <MessageCircle className="size-4" />
              {sendMessage.isPending ? "Sending..." : "Send Message to Owner"}
            </Button>
          </form>
        </div>
      </Layout>
    );
  }

  // ── Default: key overview ─────────────────────────────────────────────────────
  return (
    <Layout showNav={false}>
      <div className="flex flex-col gap-5 py-4">
        {/* Hero header */}
        <div className="flex flex-col items-center gap-2 pt-2 text-center">
          <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center text-4xl">
            {icon}
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            You Found a Key 🔑
          </h1>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>

        {/* ── Verified Badge ───────────────────────────────────────────── */}
        <div
          className="rounded-xl border border-[oklch(0.68_0.16_160/0.4)] bg-[oklch(0.68_0.16_160/0.07)] p-4"
          data-ocid="verified-badge-section"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="size-10 rounded-full bg-[oklch(0.68_0.16_160/0.15)] flex items-center justify-center shrink-0">
              <ShieldCheck className="size-5 text-[oklch(0.52_0.16_160)]" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-foreground">
                ✅ Verified KeyRakshak
              </p>
              <p className="text-xs text-muted-foreground">
                Genuine Tag — Protected by KeyRakshak
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-lg bg-card border border-border px-3 py-2">
              <p className="text-muted-foreground">Key ID</p>
              <p className="font-mono font-semibold text-foreground">{keyId}</p>
            </div>
            <div className="rounded-lg bg-card border border-border px-3 py-2">
              <p className="text-muted-foreground">Registered</p>
              <p className="font-semibold text-foreground">
                {formatDate(undefined)}
              </p>
            </div>
          </div>
        </div>

        {/* ── Reward Section ───────────────────────────────────────────── */}
        {hasReward && rewardData && (
          <div
            className="rounded-xl border border-[oklch(0.65_0.19_55/0.4)] bg-[oklch(0.65_0.19_55/0.08)] p-4"
            data-ocid="reward-section"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎁</span>
                <div>
                  <p className="text-sm font-bold text-foreground">
                    Reward Available: ₹{rewardData.rewardAmount}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Owner is offering a reward for returning this key
                  </p>
                </div>
              </div>
            </div>
            <Button
              data-ocid="claim-reward-btn"
              variant="outline"
              size="sm"
              className="w-full border-accent/40 text-accent hover:bg-accent/10 mt-1"
              onClick={() => {
                const link = `upi://pay?pa=${encodeURIComponent(rewardData.upiId)}&am=${rewardData.rewardAmount}&cu=INR&tn=KeyRakshak+Reward`;
                window.location.href = link;
              }}
            >
              💰 Pay Reward / Claim Reward
            </Button>
          </div>
        )}

        {/* Key info card */}
        <div
          className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
          data-ocid="found-key-card"
        >
          {isLostMode && (
            <div className="border-b border-accent/20 bg-accent/10 px-4 py-2.5">
              <RewardBadge />
            </div>
          )}
          <div className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-muted text-2xl">
              {icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-base font-bold text-foreground">
                {keyInfo.name || label}
              </p>
              <p className="font-mono text-sm text-muted-foreground">{keyId}</p>
            </div>
            {isLostMode && (
              <span className="shrink-0 rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
                Lost
              </span>
            )}
          </div>
        </div>

        {/* Privacy notice */}
        <div className="flex items-start gap-3 rounded-xl border border-primary/15 bg-primary/5 p-3.5">
          <Lock className="size-4 text-primary shrink-0 mt-0.5" />
          <p className="text-xs text-foreground leading-relaxed">
            <strong>Privacy protected.</strong> The owner's phone number is
            never visible here. Your message is delivered securely through
            KeyRakshak.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3">
          <Button
            data-ocid="send-message-btn"
            size="lg"
            className="w-full gap-2"
            onClick={() => setStep("form")}
          >
            <MessageCircle className="size-5" />
            Send Message to Owner
          </Button>

          <Button
            data-ocid="share-location-btn"
            variant="outline"
            size="lg"
            className="w-full gap-2"
            onClick={handleShareLocation}
          >
            <MapPin className="size-5" />
            Share My Location
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground pt-2">
          Powered by{" "}
          <span className="font-semibold text-foreground">KeyRakshak</span> —
          Secure Key Recovery · India
        </p>
      </div>
    </Layout>
  );
}
