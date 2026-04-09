import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BadgeCheck,
  IndianRupee,
  MapPin,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { Layout } from "../components/Layout";
import { useSubmitFranchise } from "../hooks/use-franchise";

const BENEFITS = [
  {
    icon: <BadgeCheck className="size-6 text-primary" />,
    title: "Sell QR Tags",
    desc: "Become the official KeyRakshak dealer in your city. Sell QR sticker packs and earn ₹30–₹50 per tag.",
    bg: "bg-primary/5 border-primary/15",
  },
  {
    icon: <IndianRupee className="size-6 text-[oklch(0.52_0.16_160)]" />,
    title: "Zero Investment",
    desc: "Free starter kit, training, and marketing support. No upfront cost to become a City Partner.",
    bg: "bg-[oklch(0.68_0.16_160/0.06)] border-[oklch(0.68_0.16_160/0.2)]",
  },
  {
    icon: <IndianRupee className="size-6 text-accent" />,
    title: "Monthly Commission",
    desc: "Earn recurring commissions every month as your city grows. Top partners earn ₹10,000+/month.",
    bg: "bg-accent/5 border-accent/15",
  },
] as const;

const CITIES_EXAMPLE = [
  "Delhi",
  "Mumbai",
  "Karnal",
  "Hisar",
  "Rohtak",
  "Chandigarh",
  "Jaipur",
  "Lucknow",
];

export default function FranchisePage() {
  const submitFranchise = useSubmitFranchise();

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Enter your full name";
    if (!city.trim()) e.city = "Enter your city";
    if (!phone.trim()) e.phone = "Enter your phone number";
    else if (!/^[+0-9\s-]{8,15}$/.test(phone.trim()))
      e.phone = "Enter a valid phone number";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    try {
      await submitFranchise.mutateAsync({
        name: name.trim(),
        city: city.trim(),
        phone: phone.trim(),
      });
      setSubmitted(true);
      toast.success(
        "Application submitted! We will contact you within 24 hours.",
      );
    } catch {
      toast.error("Failed to submit. Please try again.");
    }
  };

  return (
    <Layout showNav={false}>
      <div className="flex flex-col gap-6 py-4">
        {/* Back nav */}
        <div className="flex items-center gap-2">
          <Link to="/">
            <Button variant="ghost" size="icon" aria-label="Go back">
              <ArrowLeft className="size-4" />
            </Button>
          </Link>
          <div>
            <h1 className="font-display text-xl font-bold text-foreground">
              City Partner Program
            </h1>
            <p className="text-xs text-muted-foreground">
              Franchise · Earn with KeyRakshak
            </p>
          </div>
        </div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl bg-primary/8 border border-primary/20 p-5 text-center"
        >
          <div className="size-14 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto mb-3">
            <Users className="size-7 text-primary" />
          </div>
          <h2 className="font-display text-lg font-bold text-foreground mb-1">
            Become a KeyRakshak City Partner
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
            Join India's fastest-growing key recovery network. Represent
            KeyRakshak in your city and earn monthly commissions.
          </p>
        </motion.div>

        {/* Benefit cards */}
        <div className="flex flex-col gap-3">
          {BENEFITS.map(({ icon, title, desc, bg }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.1 + i * 0.08 }}
              className={`rounded-xl border p-4 flex items-start gap-4 ${bg}`}
              data-ocid={`benefit-card-${i}`}
            >
              <div className="shrink-0 mt-0.5">{icon}</div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground mb-0.5">
                  {title}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cities active */}
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="size-4 text-primary" />
            <p className="text-sm font-semibold text-foreground">
              Available Cities
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {CITIES_EXAMPLE.map((c) => (
              <span
                key={c}
                className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border"
              >
                {c}
              </span>
            ))}
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/8 text-primary border border-primary/20 font-medium">
              + Your City
            </span>
          </div>
        </div>

        {/* Apply form */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-foreground">Apply Now</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl border border-primary/20 bg-primary/5 p-5 text-center"
              data-ocid="franchise-success"
            >
              <p className="text-3xl mb-2">🎉</p>
              <p className="font-semibold text-foreground text-base mb-1">
                Application Submitted!
              </p>
              <p className="text-sm text-muted-foreground">
                We will contact you within 24 hours to discuss the City Partner
                opportunity.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              data-ocid="franchise-form"
              className="flex flex-col gap-4"
              noValidate
            >
              <div className="flex flex-col gap-2">
                <Label htmlFor="franchise-name">Full Name</Label>
                <Input
                  id="franchise-name"
                  data-ocid="franchise-name-input"
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (e.target.value.trim())
                      setErrors((p) => ({ ...p, name: "" }));
                  }}
                  onBlur={() => {
                    if (!name.trim())
                      setErrors((p) => ({
                        ...p,
                        name: "Enter your full name",
                      }));
                  }}
                  aria-invalid={!!errors.name}
                  className="h-12"
                />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="franchise-city">City</Label>
                <Input
                  id="franchise-city"
                  data-ocid="franchise-city-input"
                  placeholder="e.g. Karnal, Delhi, Mumbai"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    if (e.target.value.trim())
                      setErrors((p) => ({ ...p, city: "" }));
                  }}
                  onBlur={() => {
                    if (!city.trim())
                      setErrors((p) => ({ ...p, city: "Enter your city" }));
                  }}
                  aria-invalid={!!errors.city}
                  className="h-12"
                />
                {errors.city && (
                  <p className="text-xs text-destructive">{errors.city}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="franchise-phone">Phone Number</Label>
                <Input
                  id="franchise-phone"
                  data-ocid="franchise-phone-input"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (e.target.value.trim())
                      setErrors((p) => ({ ...p, phone: "" }));
                  }}
                  onBlur={() => {
                    if (!phone.trim())
                      setErrors((p) => ({
                        ...p,
                        phone: "Enter your phone number",
                      }));
                  }}
                  aria-invalid={!!errors.phone}
                  className="h-12"
                />
                {errors.phone && (
                  <p className="text-xs text-destructive">{errors.phone}</p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={submitFranchise.isPending}
                data-ocid="franchise-submit-btn"
                className="w-full h-12 text-base font-semibold"
              >
                {submitFranchise.isPending
                  ? "Submitting..."
                  : "Apply as City Partner 🤝"}
              </Button>
            </form>
          )}
        </div>

        {/* Commission info */}
        <div className="rounded-lg bg-muted/40 border border-border p-4 text-center">
          <p className="text-xs text-muted-foreground leading-relaxed">
            💼 <strong className="text-foreground">Business Details:</strong> QR
            Tag Sale ₹99 · Partner Commission 30% · Premium Subscription
            ₹199/year
          </p>
        </div>
      </div>
    </Layout>
  );
}
