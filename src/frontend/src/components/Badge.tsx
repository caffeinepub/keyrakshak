import { cn } from "@/lib/utils";
import { Gift } from "lucide-react";

interface BadgeProps {
  variant?: "reward" | "lost" | "active" | "found";
  className?: string;
  children?: React.ReactNode;
}

const variantStyles = {
  reward: "bg-accent text-accent-foreground",
  lost: "bg-accent/15 text-accent border border-accent/30",
  active: "bg-primary/10 text-primary border border-primary/20",
  found: "bg-primary text-primary-foreground",
};

export function Badge({ variant = "active", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        variantStyles[variant],
        className,
      )}
    >
      {variant === "reward" && <Gift className="size-3" />}
      {children}
    </span>
  );
}

export function RewardBadge({ className }: { className?: string }) {
  return (
    <Badge
      variant="reward"
      className={cn("w-full justify-center py-2 text-sm rounded-lg", className)}
    >
      🎁 Reward Offered
    </Badge>
  );
}
