import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import { Key, Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Layout } from "../components/Layout";
import { usePublicKeyInfo } from "../hooks/use-keys";

export default function KeyLookupPage() {
  const navigate = useNavigate();
  const [inputId, setInputId] = useState("");
  const [searchId, setSearchId] = useState<string | undefined>(undefined);
  const [submitted, setSubmitted] = useState(false);

  const { data: keyInfo, isLoading, isFetched } = usePublicKeyInfo(searchId);

  const handleFind = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputId.trim().toUpperCase();
    if (!trimmed) return;
    setSubmitted(false);
    setSearchId(trimmed);
    setSubmitted(true);
  };

  // Navigate on success
  if (submitted && isFetched && keyInfo && searchId) {
    navigate({ to: "/found/$keyId", params: { keyId: searchId } });
  }

  const notFound = submitted && isFetched && !keyInfo && !isLoading;

  return (
    <Layout showNav={false}>
      <div className="flex flex-col items-center justify-center min-h-[80vh] gap-6 px-2">
        {/* Branding */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center gap-3 text-center"
        >
          <div className="size-20 rounded-2xl bg-primary/10 flex items-center justify-center shadow-sm">
            <Key className="size-10 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              KeyRakshak
            </h1>
            <p className="text-sm text-muted-foreground mt-1 max-w-[260px] mx-auto">
              Enter your Key ID to contact the owner
            </p>
          </div>
        </motion.div>

        {/* Lookup form */}
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          onSubmit={handleFind}
          className="w-full max-w-sm flex flex-col gap-4"
          data-ocid="key-lookup-form"
        >
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="key-id-input"
              className="text-sm font-medium text-foreground text-center"
            >
              Key ID
            </Label>
            <Input
              id="key-id-input"
              data-ocid="key-id-input"
              placeholder="KR1001"
              value={inputId}
              onChange={(e) => {
                setInputId(e.target.value);
                if (notFound) setSubmitted(false);
              }}
              className="h-14 text-center text-base font-mono tracking-widest uppercase"
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
            />
          </div>

          {/* Not found error */}
          {notFound && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-destructive text-center"
              data-ocid="key-not-found-msg"
            >
              Key ID not found. Please check and try again.
            </motion.p>
          )}

          <Button
            type="submit"
            size="lg"
            disabled={isLoading || !inputId.trim()}
            data-ocid="find-key-btn"
            className="w-full h-12 gap-2 text-base font-semibold"
          >
            <Search className="size-5" />
            {isLoading ? "Searching..." : "Find Key"}
          </Button>
        </motion.form>

        {/* How it works hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-sm rounded-xl border border-primary/15 bg-primary/5 p-4 text-center"
        >
          <p className="text-xs text-muted-foreground leading-relaxed">
            Found a lost key? Enter the{" "}
            <strong className="text-foreground">Key ID</strong> printed on the
            tag (e.g. KR1001) to securely contact the owner.
          </p>
        </motion.div>

        <p className="text-xs text-muted-foreground text-center">
          Powered by{" "}
          <span className="font-semibold text-foreground">KeyRakshak</span> —
          India's Secure Key Recovery Network
        </p>
      </div>
    </Layout>
  );
}
