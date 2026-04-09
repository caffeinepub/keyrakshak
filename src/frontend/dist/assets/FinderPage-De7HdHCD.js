import { j as jsxRuntimeExports, c as cn, d as useParams, r as reactExports, a as ue, S as Skeleton } from "./index-C_OiGXDq.js";
import { c as createLucideIcon, B as Button } from "./createLucideIcon-B-k-gt5M.js";
import { L as Label, I as Input } from "./label-DQwxhrz7.js";
import { b as useSendMessage, K as KEY_TYPE_ICONS, a as KEY_TYPE_LABELS, R as RewardBadge } from "./use-messages-BoRV-ayx.js";
import { L as Layout, K as Key } from "./Layout-DdUqRl9C.js";
import { e as usePublicKeyInfo, f as useKeyReward } from "./use-keys-hJS0WseV.js";
import { C as CircleCheck } from "./circle-check-DrziEcCd.js";
import { M as MapPin } from "./map-pin-D-wifC22.js";
import "./index-tfy2CLD7.js";
import "./backend-YcrI8Id8.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]
];
const MessageCircle = createLucideIcon("message-circle", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode);
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
function FingerLoader() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { showNav: false, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 pt-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-16 rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-48" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-36" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full rounded-xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-lg" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-lg" })
  ] }) });
}
function KeyNotFound() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { showNav: false, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[65vh] gap-5 text-center px-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-20 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: "🔍" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground mb-2", children: "Key Not Found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs leading-relaxed", children: "This QR code doesn't match any registered key. It may have been deactivated or the link might be incorrect." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full rounded-xl border border-border bg-card p-4 text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "size-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "KeyRakshak" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Secure key recovery platform — protecting keys across India." })
    ] })
  ] }) });
}
function formatDate(ts) {
  return "—";
}
function FinderPage() {
  const { keyId } = useParams({ from: "/found/$keyId" });
  const { data: keyInfo, isLoading } = usePublicKeyInfo(keyId);
  const { data: rewardData } = useKeyReward(keyId);
  const sendMessage = useSendMessage();
  const [step, setStep] = reactExports.useState("view");
  const [finderName, setFinderName] = reactExports.useState("");
  const [messageText, setMessageText] = reactExports.useState("");
  const [finderPhone, setFinderPhone] = reactExports.useState("");
  const [messageError, setMessageError] = reactExports.useState("");
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(FingerLoader, {});
  if (!keyInfo) return /* @__PURE__ */ jsxRuntimeExports.jsx(KeyNotFound, {});
  const icon = KEY_TYPE_ICONS[keyInfo.keyType] ?? "🔑";
  const label = KEY_TYPE_LABELS[keyInfo.keyType] ?? String(keyInfo.keyType);
  const isLostMode = keyInfo.lostMode;
  const hasReward = rewardData && rewardData.rewardAmount > 0;
  function handleShareLocation() {
    if (!navigator.geolocation) {
      ue.error("Location not available on this device");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(6);
        const lng = pos.coords.longitude.toFixed(6);
        const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
        setMessageText(
          (prev) => prev ? `${prev}
📍 My location: ${mapsUrl}` : `📍 I found your key! My location: ${mapsUrl}`
        );
        setStep("form");
        ue.success("Location added to your message");
      },
      () => {
        ue.error("Could not get your location. Please type it manually.");
        setStep("form");
      }
    );
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!messageText.trim()) {
      setMessageError("Please write a message for the owner");
      return;
    }
    const fullMessage = finderName.trim() ? `From ${finderName.trim()}: ${messageText.trim()}` : messageText.trim();
    try {
      await sendMessage.mutateAsync({
        keyId,
        messageText: fullMessage,
        finderPhone: finderPhone.trim() || null
      });
      setStep("sent");
    } catch {
      ue.error("Failed to send message. Please try again.");
    }
  }
  if (step === "sent") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { showNav: false, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[70vh] gap-5 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "size-20 rounded-full bg-primary/10 flex items-center justify-center",
          "data-ocid": "sent-icon",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-10 text-primary" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground mb-2", children: "Message Sent! 🙏" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs leading-relaxed", children: "Your message has been sent to the owner. They'll reach out to you soon. Thank you for your kindness!" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "w-full rounded-xl border border-primary/20 bg-primary/5 p-5 text-left",
          "data-ocid": "sent-confirmation",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-primary mb-2", children: "What happens next?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1.5 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "✅" }),
                " Owner has been notified"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "✅" }),
                " Your message is securely stored"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "✅" }),
                " Owner will arrange key return"
              ] })
            ] })
          ]
        }
      ),
      hasReward && rewardData && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full rounded-xl border border-accent/30 bg-accent/8 p-4 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-accent mb-1", children: "🎁 Reward Awaits You!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "Owner is offering ₹",
          rewardData.rewardAmount,
          " for returning this key. They will share payment details when you connect."
        ] })
      ] }),
      isLostMode && !hasReward && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full rounded-xl border border-accent/20 bg-accent/5 p-4 text-sm text-accent font-medium", children: "🎁 A reward may be offered for returning this key." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        "Powered by",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "KeyRakshak" }),
        " — Secure Key Recovery"
      ] })
    ] }) });
  }
  if (step === "form") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { showNav: false, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setStep("view"),
            className: "mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-smooth",
            children: "← Back"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Send a Message 💬" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Sent securely — the owner's contact details stay private." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          "data-ocid": "finder-message-form",
          onSubmit: handleSubmit,
          className: "flex flex-col gap-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "finderName", children: "Your Name (Optional)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "finderName",
                  "data-ocid": "finder-name-input",
                  placeholder: "e.g. Rahul Sharma",
                  value: finderName,
                  onChange: (e) => setFinderName(e.target.value),
                  maxLength: 60,
                  className: "h-12"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "messageText", children: [
                "Message ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "messageText",
                  "data-ocid": "finder-message-input",
                  placeholder: "Hi, I found your key near... I'm available at...",
                  value: messageText,
                  onChange: (e) => {
                    setMessageText(e.target.value);
                    if (e.target.value.trim()) setMessageError("");
                  },
                  onBlur: () => {
                    if (!messageText.trim())
                      setMessageError("Please write a message");
                  },
                  "aria-invalid": !!messageError,
                  "aria-describedby": messageError ? "msg-error" : void 0,
                  rows: 4,
                  className: "resize-none",
                  maxLength: 500
                }
              ),
              messageError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { id: "msg-error", className: "text-xs text-destructive", children: messageError })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Label,
                {
                  htmlFor: "finderPhone",
                  className: "flex items-center gap-1.5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-3" }),
                    "Your Phone (Optional)"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "finderPhone",
                  "data-ocid": "finder-phone-input",
                  type: "tel",
                  placeholder: "+91 98765 43210",
                  value: finderPhone,
                  onChange: (e) => setFinderPhone(e.target.value),
                  maxLength: 15,
                  className: "h-12"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Shared with the owner only to help them contact you." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "submit",
                size: "lg",
                "data-ocid": "finder-send-btn",
                className: "w-full gap-2",
                disabled: sendMessage.isPending,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "size-4" }),
                  sendMessage.isPending ? "Sending..." : "Send Message to Owner"
                ]
              }
            )
          ]
        }
      )
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { showNav: false, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5 py-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 pt-2 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-20 rounded-full bg-primary/10 flex items-center justify-center text-4xl", children: icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "You Found a Key 🔑" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: label })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl border border-[oklch(0.68_0.16_160/0.4)] bg-[oklch(0.68_0.16_160/0.07)] p-4",
        "data-ocid": "verified-badge-section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-full bg-[oklch(0.68_0.16_160/0.15)] flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-5 text-[oklch(0.52_0.16_160)]" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground", children: "✅ Verified KeyRakshak" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Genuine Tag — Protected by KeyRakshak" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-card border border-border px-3 py-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Key ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono font-semibold text-foreground", children: keyId })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-card border border-border px-3 py-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Registered" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: formatDate() })
            ] })
          ] })
        ]
      }
    ),
    hasReward && rewardData && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl border border-[oklch(0.65_0.19_55/0.4)] bg-[oklch(0.65_0.19_55/0.08)] p-4",
        "data-ocid": "reward-section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "🎁" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-foreground", children: [
                "Reward Available: ₹",
                rewardData.rewardAmount
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Owner is offering a reward for returning this key" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              "data-ocid": "claim-reward-btn",
              variant: "outline",
              size: "sm",
              className: "w-full border-accent/40 text-accent hover:bg-accent/10 mt-1",
              onClick: () => {
                const link = `upi://pay?pa=${encodeURIComponent(rewardData.upiId)}&am=${rewardData.rewardAmount}&cu=INR&tn=KeyRakshak+Reward`;
                window.location.href = link;
              },
              children: "💰 Pay Reward / Claim Reward"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "overflow-hidden rounded-2xl border border-border bg-card shadow-sm",
        "data-ocid": "found-key-card",
        children: [
          isLostMode && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-accent/20 bg-accent/10 px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RewardBadge, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-muted text-2xl", children: icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-display text-base font-bold text-foreground", children: keyInfo.name || label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm text-muted-foreground", children: keyId })
            ] }),
            isLostMode && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent", children: "Lost" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 rounded-xl border border-primary/15 bg-primary/5 p-3.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "size-4 text-primary shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-foreground leading-relaxed", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Privacy protected." }),
        " The owner's phone number is never visible here. Your message is delivered securely through KeyRakshak."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "send-message-btn",
          size: "lg",
          className: "w-full gap-2",
          onClick: () => setStep("form"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "size-5" }),
            "Send Message to Owner"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "share-location-btn",
          variant: "outline",
          size: "lg",
          className: "w-full gap-2",
          onClick: handleShareLocation,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-5" }),
            "Share My Location"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground pt-2", children: [
      "Powered by",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "KeyRakshak" }),
      " — Secure Key Recovery · India"
    ] })
  ] }) });
}
export {
  FinderPage as default
};
