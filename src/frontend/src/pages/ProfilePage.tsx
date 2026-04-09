import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { CheckCircle2, Key, LogOut, Pencil, Shield, User } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Layout } from "../components/Layout";
import { useMyKeys, useRegisterOwner } from "../hooks/use-keys";

const PROFILE_STORAGE_KEY = "keyrakshak_owner_profile";

function loadStoredProfile(): { name: string; mobile: string } {
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (raw) return JSON.parse(raw) as { name: string; mobile: string };
  } catch {
    // ignore
  }
  return { name: "", mobile: "" };
}

function saveStoredProfile(name: string, mobile: string) {
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify({ name, mobile }));
  } catch {
    // ignore
  }
}

function maskMobile(mobile: string): string {
  const cleaned = mobile.replace(/\s+/g, "");
  if (cleaned.length < 6) return mobile;
  return `${cleaned.slice(0, 3)}••••${cleaned.slice(-3)}`;
}

export default function ProfilePage() {
  const { identity, login, clear } = useInternetIdentity();
  const { data: keys, isLoading } = useMyKeys();
  const registerOwner = useRegisterOwner();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [savedName, setSavedName] = useState("");
  const [savedMobile, setSavedMobile] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load persisted profile from localStorage on mount
  useEffect(() => {
    const stored = loadStoredProfile();
    if (stored.name) {
      setSavedName(stored.name);
      setSavedMobile(stored.mobile);
    }
  }, []);

  // If no stored profile but keys loaded, pre-fill name from first key's owner name
  useEffect(() => {
    if (!savedName && keys && keys.length > 0) {
      const stored = loadStoredProfile();
      if (!stored.name) {
        // Keys don't carry the owner's contact info, but we can nudge the user
        // to fill in their name if they already have keys registered.
      }
    }
  }, [keys, savedName]);

  const isRegistered = !!savedName && !!savedMobile;
  const lostCount = keys?.filter((k) => k.lostMode).length ?? 0;

  if (!identity) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
          <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="size-8 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-foreground">
              Your Profile
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Sign in to manage your account
            </p>
          </div>
          <Button onClick={login} data-ocid="login-profile">
            Sign In
          </Button>
        </div>
      </Layout>
    );
  }

  const principalStr = identity.getPrincipal().toText();
  const shortPrincipal = `${principalStr.slice(0, 5)}...${principalStr.slice(-4)}`;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Enter your name";
    if (!mobile.trim()) newErrors.mobile = "Enter your mobile number";
    else if (!/^[+0-9\s-]{8,15}$/.test(mobile.trim()))
      newErrors.mobile = "Enter a valid mobile number";
    return newErrors;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await registerOwner.mutateAsync({
        name: name.trim(),
        mobile: mobile.trim(),
      });
      const trimmedName = name.trim();
      const trimmedMobile = mobile.trim();
      setSavedName(trimmedName);
      setSavedMobile(trimmedMobile);
      saveStoredProfile(trimmedName, trimmedMobile);
      setIsEditing(false);
      setErrors({});
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handleStartEdit = () => {
    setName(savedName);
    setMobile(savedMobile);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setErrors({});
  };

  return (
    <Layout>
      <div className="flex flex-col gap-5">
        {/* Page header */}
        <div className="flex items-center gap-2 pt-2">
          <User className="size-5 text-primary" />
          <h1 className="font-display text-xl font-bold text-foreground">
            Profile
          </h1>
        </div>

        {/* Internet Identity card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="card-elevated p-4 flex items-center gap-3"
        >
          <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Shield className="size-6 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground">Internet Identity</p>
            <p
              className="font-mono text-sm font-semibold text-foreground truncate"
              title={principalStr}
            >
              {shortPrincipal}
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs text-primary bg-primary/8 px-2 py-1 rounded-full border border-primary/20">
            <CheckCircle2 className="size-3" />
            <span>Verified</span>
          </div>
        </motion.div>

        {/* Stats */}
        {isLoading ? (
          <Skeleton className="h-20 w-full rounded-lg" />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="grid grid-cols-2 gap-3"
          >
            <div
              className="card-elevated p-4 text-center"
              data-ocid="stat-total-keys"
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                <Key className="size-4 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">
                {keys?.length ?? 0}
              </p>
              <p className="text-xs text-muted-foreground">Registered Keys</p>
            </div>
            <div
              className="card-elevated p-4 text-center"
              data-ocid="stat-lost-mode"
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-accent text-lg">🚨</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{lostCount}</p>
              <p className="text-xs text-muted-foreground">Lost Mode Active</p>
            </div>
          </motion.div>
        )}

        {/* Owner details card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="card-elevated p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-foreground">Your Details</h2>
            {isRegistered && !isEditing && (
              <button
                type="button"
                onClick={handleStartEdit}
                data-ocid="edit-profile-btn"
                className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors"
              >
                <Pencil className="size-3" />
                Edit
              </button>
            )}
          </div>

          {/* Privacy note */}
          <p className="text-xs text-muted-foreground mb-4 leading-relaxed bg-muted/40 rounded-md px-3 py-2 border border-border">
            🔒{" "}
            <strong className="text-foreground">
              Your phone number is never shown to finders.
            </strong>{" "}
            It's only used for owner verification and secure key recovery.
          </p>

          {/* Registered profile view */}
          {isRegistered && !isEditing ? (
            <div className="flex flex-col gap-3" data-ocid="profile-display">
              <div className="flex flex-col gap-0.5">
                <p className="text-xs text-muted-foreground">Name</p>
                <p className="text-sm font-medium text-foreground">
                  {savedName}
                </p>
              </div>
              <Separator />
              <div className="flex flex-col gap-0.5">
                <p className="text-xs text-muted-foreground">Mobile</p>
                <p className="text-sm font-medium text-foreground font-mono">
                  {maskMobile(savedMobile)}
                </p>
              </div>
            </div>
          ) : (
            /* Form — first time or editing */
            <form
              onSubmit={handleSave}
              className="flex flex-col gap-3"
              noValidate
              data-ocid="profile-form"
            >
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="profile-name" className="text-sm">
                  Full Name
                </Label>
                <Input
                  id="profile-name"
                  data-ocid="owner-name-input"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (e.target.value.trim())
                      setErrors((prev) => ({ ...prev, name: "" }));
                  }}
                  onBlur={() => {
                    if (!name.trim())
                      setErrors((prev) => ({
                        ...prev,
                        name: "Enter your name",
                      }));
                  }}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className="h-11"
                />
                {errors.name && (
                  <p id="name-error" className="text-xs text-destructive">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="profile-mobile" className="text-sm">
                  Mobile Number
                </Label>
                <Input
                  id="profile-mobile"
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
                  className="h-11"
                />
                {errors.mobile && (
                  <p id="mobile-error" className="text-xs text-destructive">
                    {errors.mobile}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                {isEditing && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancelEdit}
                    className="flex-1"
                    data-ocid="cancel-edit-btn"
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  type="submit"
                  disabled={registerOwner.isPending}
                  data-ocid="register-owner-btn"
                  className={isEditing ? "flex-1" : "w-full"}
                >
                  {registerOwner.isPending
                    ? "Saving..."
                    : isEditing
                      ? "Update Details"
                      : "Save Details"}
                </Button>
              </div>
            </form>
          )}
        </motion.div>

        {/* Sign Out */}
        <Button
          variant="outline"
          onClick={clear}
          data-ocid="sign-out-btn"
          className="w-full text-destructive border-destructive/30 hover:bg-destructive/5"
        >
          <LogOut className="size-4 mr-2" />
          Sign Out
        </Button>

        {/* Branding footer */}
        <p className="text-xs text-center text-muted-foreground py-2">
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
      </div>
    </Layout>
  );
}
