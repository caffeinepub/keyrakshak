import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useSetLostMode } from "../hooks/use-keys";
import { KEY_TYPE_ICONS, KEY_TYPE_LABELS } from "../types";
import type { OwnerKeyInfo } from "../types";
import { RewardBadge } from "./Badge";
import { QRDisplay } from "./QRDisplay";

interface KeyCardProps {
  keyInfo: OwnerKeyInfo;
  className?: string;
}

export function KeyCard({ keyInfo, className }: KeyCardProps) {
  const navigate = useNavigate();
  const setLostMode = useSetLostMode();
  const icon = KEY_TYPE_ICONS[keyInfo.keyType] ?? "🔑";
  const label = KEY_TYPE_LABELS[keyInfo.keyType] ?? keyInfo.keyType;

  const handleLostModeToggle = async (checked: boolean) => {
    try {
      await setLostMode.mutateAsync({ keyId: keyInfo.id, lostMode: checked });
      toast.success(
        checked
          ? "Lost Mode activated — reward badge visible to finders"
          : "Lost Mode deactivated",
      );
    } catch {
      toast.error("Failed to update Lost Mode");
    }
  };

  const handleCardClick = () => {
    navigate({ to: "/keys/$id", params: { id: keyInfo.id } });
  };

  const handleCardKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      navigate({ to: "/keys/$id", params: { id: keyInfo.id } });
    }
  };

  return (
    <button
      type="button"
      data-ocid="key-card"
      aria-label={`View details for ${keyInfo.name}`}
      className={cn(
        "card-elevated cursor-pointer group w-full text-left",
        keyInfo.lostMode && "border-accent/40 shadow-md",
        className,
      )}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
    >
      <div className="p-4 flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xl shrink-0">{icon}</span>
            <div className="min-w-0">
              <h3 className="font-semibold text-foreground truncate">
                {keyInfo.name}
              </h3>
              <p className="text-xs text-muted-foreground">
                {label} · {keyInfo.id}
              </p>
            </div>
          </div>
        </div>

        {/* Reward badge */}
        {keyInfo.lostMode && <RewardBadge />}

        {/* QR Code */}
        <div
          className="flex justify-center py-1"
          role="presentation"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <QRDisplay keyId={keyInfo.id} size={120} showLabel={false} />
        </div>

        {/* Lost Mode Toggle */}
        <div
          className="flex items-center justify-between py-2 px-3 rounded-md bg-muted/50"
          role="presentation"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <span className="text-sm font-medium text-foreground">Lost Mode</span>
          <Switch
            data-ocid="lost-mode-toggle"
            checked={keyInfo.lostMode}
            onCheckedChange={handleLostModeToggle}
            disabled={setLostMode.isPending}
            aria-label={`Toggle lost mode for ${keyInfo.name}`}
          />
        </div>
      </div>
    </button>
  );
}

export function KeyCardSkeleton() {
  return (
    <div className="card-elevated p-4 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Skeleton className="size-8 rounded-full" />
        <div className="flex-1 space-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
      <Skeleton className="h-32 w-full rounded-lg" />
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );
}
