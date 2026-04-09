import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  IndianRupee,
  Info,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Layout } from "../components/Layout";
import {
  useAddKey,
  useRegisterOwner,
  useSetKeyReward,
} from "../hooks/use-keys";
import { KeyType } from "../types";

const KEY_TYPES = [
  { value: KeyType.Car, label: "Car Keys", emoji: "🚗" },
  { value: KeyType.Bike, label: "Bike Keys", emoji: "🏍️" },
  { value: KeyType.Home, label: "Home Keys", emoji: "🏠" },
  { value: KeyType.Office, label: "Office Keys", emoji: "🏢" },
];

export default function AddKeyPage() {
  const { identity, login } = useInternetIdentity();
  const navigate = useNavigate();
  const addKey = useAddKey();
  const registerOwner = useRegisterOwner();
  const setKeyReward = useSetKeyReward();

  const [ownerName, setOwnerName] = useState("");
  const [mobile, setMobile] = useState("");
  const [keyName, setKeyName] = useState("");
  const [keyType, setKeyType] = useState<KeyType>(KeyType.Home);
  const [rewardAmount, setRewardAmount] = useState("");
  const [upiId, setUpiId] = useState("");
  const [showReward, setShowReward] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!identity) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
          <p className="text-muted-foreground">Sign in to add a key</p>
          <Button onClick={login} data-ocid="login-to-add">
            Sign In
          </Button>
        </div>
      </Layout>
    );
  }

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!ownerName.trim()) newErrors.ownerName = "Enter your name";
    if (!mobile.trim()) newErrors.mobile = "Enter your mobile number";
    else if (!/^[+0-9\s-]{8,15}$/.test(mobile.trim()))
      newErrors.mobile = "Enter a valid mobile number";
    if (!keyName.trim()) newErrors.keyName = "Enter a name for this key";
    if (showReward && rewardAmount) {
      const amt = Number(rewardAmount);
      if (Number.isNaN(amt) || amt < 0)
        newErrors.rewardAmount = "Enter a valid reward amount";
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await registerOwner.mutateAsync({
        name: ownerName.trim(),
        mobile: mobile.trim(),
      });
      const keyId = await addKey.mutateAsync({
        name: keyName.trim(),
        keyType,
      });

      const amt = Number(rewardAmount);
      if (showReward && amt > 0 && upiId.trim()) {
        await setKeyReward.mutateAsync({
          keyId,
          rewardAmount: amt,
          upiId: upiId.trim(),
        });
      }

      toast.success(`Key "${keyName}" activated as ${keyId} 🎉`);
      navigate({ to: "/keys/$id", params: { id: keyId } });
    } catch {
      toast.error("Failed to add key. Please try again.");
    }
  };

  const isSubmitting =
    addKey.isPending || registerOwner.isPending || setKeyReward.isPending;

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        {/* Back navigation */}
        <div className="flex items-center gap-2 pt-2">
          <Link to="/">
            <Button variant="ghost" size="icon" aria-label="Go back">
              <ArrowLeft className="size-4" />
            </Button>
          </Link>
          <h1 className="font-display text-xl font-bold text-foreground">
            Add New Key
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
          noValidate
        >
          {/* Owner Details Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">
                Your Details
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="owner-name" className="text-sm font-medium">
                Full Name
              </Label>
              <Input
                id="owner-name"
                data-ocid="owner-name-input"
                placeholder="e.g. Rahul Sharma"
                value={ownerName}
                onChange={(e) => {
                  setOwnerName(e.target.value);
                  if (e.target.value.trim())
                    setErrors((prev) => ({ ...prev, ownerName: "" }));
                }}
                onBlur={() => {
                  if (!ownerName.trim())
                    setErrors((prev) => ({
                      ...prev,
                      ownerName: "Enter your name",
                    }));
                }}
                aria-invalid={!!errors.ownerName}
                aria-describedby={
                  errors.ownerName ? "owner-name-error" : undefined
                }
                className="h-12"
              />
              {errors.ownerName && (
                <p id="owner-name-error" className="text-xs text-destructive">
                  {errors.ownerName}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="owner-mobile" className="text-sm font-medium">
                Mobile Number
              </Label>
              <Input
                id="owner-mobile"
                data-ocid="owner-mobile-input"
                type="tel"
                placeholder="+91 98765 43210"
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value);
                  if (e.target.value.trim())
                    setErrors((prev) => ({ ...prev, mobile: "" }));
                }}
                onBlur={() => {
                  if (!mobile.trim())
                    setErrors((prev) => ({
                      ...prev,
                      mobile: "Enter your mobile number",
                    }));
                }}
                aria-invalid={!!errors.mobile}
                aria-describedby={errors.mobile ? "mobile-error" : undefined}
                className="h-12"
              />
              {errors.mobile && (
                <p id="mobile-error" className="text-xs text-destructive">
                  {errors.mobile}
                </p>
              )}
              <div className="flex items-start gap-1.5">
                <Info className="size-3 text-muted-foreground shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground">
                  Your number is never shown to finders. Used only for owner
                  verification.
                </p>
              </div>
            </div>
          </div>

          {/* Key Details Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">
                Key Details
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="key-name" className="text-sm font-medium">
                Key Name
              </Label>
              <Input
                id="key-name"
                data-ocid="key-name-input"
                placeholder="e.g. My Home Keys, Office Spare..."
                value={keyName}
                onChange={(e) => {
                  setKeyName(e.target.value);
                  if (e.target.value.trim())
                    setErrors((prev) => ({ ...prev, keyName: "" }));
                }}
                onBlur={() => {
                  if (!keyName.trim())
                    setErrors((prev) => ({
                      ...prev,
                      keyName: "Enter a name for this key",
                    }));
                }}
                aria-invalid={!!errors.keyName}
                aria-describedby={errors.keyName ? "key-name-error" : undefined}
                className="h-12"
              />
              {errors.keyName && (
                <p id="key-name-error" className="text-xs text-destructive">
                  {errors.keyName}
                </p>
              )}
            </div>

            {/* Key Type chips */}
            <div className="flex flex-col gap-3">
              <Label className="text-sm font-medium">Key Type</Label>
              <div className="grid grid-cols-2 gap-2">
                {KEY_TYPES.map(({ value, label, emoji }) => (
                  <button
                    key={value}
                    type="button"
                    data-ocid={`key-type-${value.toLowerCase()}`}
                    onClick={() => setKeyType(value)}
                    aria-pressed={keyType === value}
                    className={cn(
                      "flex items-center gap-2 p-3 rounded-lg border-2 text-left transition-smooth",
                      keyType === value
                        ? "border-primary bg-primary/5 text-foreground"
                        : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
                    )}
                  >
                    <span className="text-xl">{emoji}</span>
                    <span className="text-sm font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Reward Section — collapsible */}
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => setShowReward((v) => !v)}
              data-ocid="toggle-reward-section"
              className="flex items-center justify-between w-full rounded-lg border border-dashed border-border bg-muted/30 px-4 py-3 text-left transition-smooth hover:bg-muted/50"
            >
              <div className="flex items-center gap-2">
                <IndianRupee className="size-4 text-accent" />
                <span className="text-sm font-semibold text-foreground">
                  Reward Setup{" "}
                  <span className="text-xs font-normal text-muted-foreground ml-1">
                    (Optional)
                  </span>
                </span>
              </div>
              {showReward ? (
                <ChevronUp className="size-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="size-4 text-muted-foreground" />
              )}
            </button>

            {showReward && (
              <div className="flex flex-col gap-3 rounded-lg border border-accent/20 bg-accent/5 p-4">
                <p className="text-xs text-muted-foreground">
                  🎁 Set a reward to encourage finders to return your key
                  faster.
                </p>

                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="reward-amount"
                    className="text-sm font-medium"
                  >
                    Reward Amount (₹)
                  </Label>
                  <Input
                    id="reward-amount"
                    data-ocid="reward-amount-input"
                    type="number"
                    min={0}
                    placeholder="e.g. 200"
                    value={rewardAmount}
                    onChange={(e) => {
                      setRewardAmount(e.target.value);
                      setErrors((prev) => ({ ...prev, rewardAmount: "" }));
                    }}
                    aria-invalid={!!errors.rewardAmount}
                    className="h-12"
                  />
                  {errors.rewardAmount && (
                    <p className="text-xs text-destructive">
                      {errors.rewardAmount}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="upi-id" className="text-sm font-medium">
                    UPI ID
                  </Label>
                  <Input
                    id="upi-id"
                    data-ocid="upi-id-input"
                    placeholder="yourname@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="h-12"
                  />
                  <p className="text-xs text-muted-foreground">
                    Finder will pay reward directly to your UPI — Google Pay /
                    PhonePe.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* How it works info */}
          <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
            <p className="text-sm text-foreground font-medium mb-1">
              🔑 How it works
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              After adding your key, you'll get a unique QR code (e.g. KR1001).
              Stick it on your keychain. If someone finds your key and scans the
              code, they can message you — your phone number stays 100% private.
            </p>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            data-ocid="submit-add-key"
            className="w-full h-12 text-base font-semibold"
          >
            {isSubmitting ? "Activating QR Key..." : "✓ Activate QR Key"}
          </Button>
        </form>
      </div>
    </Layout>
  );
}
