import { j as jsxRuntimeExports, S as Skeleton, u as useNavigate, c as cn, a as ue, b as useInternetIdentity, L as Link } from "./index-C_OiGXDq.js";
import { c as createLucideIcon, B as Button } from "./createLucideIcon-B-k-gt5M.js";
import { Q as QRDisplay, S as Switch } from "./QRDisplay-WXVOoJnk.js";
import { u as useSetLostMode, a as useMyKeys } from "./use-keys-hJS0WseV.js";
import { K as KEY_TYPE_ICONS, a as KEY_TYPE_LABELS, R as RewardBadge, u as useMessages } from "./use-messages-BoRV-ayx.js";
import { L as Layout, K as Key, P as Plus, M as MessageSquare } from "./Layout-DdUqRl9C.js";
import { m as motion } from "./proxy-GhEsmpcI.js";
import "./backend-YcrI8Id8.js";
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
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
function KeyCard({ keyInfo, className }) {
  const navigate = useNavigate();
  const setLostMode = useSetLostMode();
  const icon = KEY_TYPE_ICONS[keyInfo.keyType] ?? "🔑";
  const label = KEY_TYPE_LABELS[keyInfo.keyType] ?? keyInfo.keyType;
  const handleLostModeToggle = async (checked) => {
    try {
      await setLostMode.mutateAsync({ keyId: keyInfo.id, lostMode: checked });
      ue.success(
        checked ? "Lost Mode activated — reward badge visible to finders" : "Lost Mode deactivated"
      );
    } catch {
      ue.error("Failed to update Lost Mode");
    }
  };
  const handleCardClick = () => {
    navigate({ to: "/keys/$id", params: { id: keyInfo.id } });
  };
  const handleCardKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      navigate({ to: "/keys/$id", params: { id: keyInfo.id } });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      "data-ocid": "key-card",
      "aria-label": `View details for ${keyInfo.name}`,
      className: cn(
        "card-elevated cursor-pointer group w-full text-left",
        keyInfo.lostMode && "border-accent/40 shadow-md",
        className
      ),
      onClick: handleCardClick,
      onKeyDown: handleCardKeyDown,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl shrink-0", children: icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground truncate", children: keyInfo.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              label,
              " · ",
              keyInfo.id
            ] })
          ] })
        ] }) }),
        keyInfo.lostMode && /* @__PURE__ */ jsxRuntimeExports.jsx(RewardBadge, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex justify-center py-1",
            role: "presentation",
            onClick: (e) => e.stopPropagation(),
            onKeyDown: (e) => e.stopPropagation(),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(QRDisplay, { keyId: keyInfo.id, size: 120, showLabel: false })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between py-2 px-3 rounded-md bg-muted/50",
            role: "presentation",
            onClick: (e) => e.stopPropagation(),
            onKeyDown: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "Lost Mode" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Switch,
                {
                  "data-ocid": "lost-mode-toggle",
                  checked: keyInfo.lostMode,
                  onCheckedChange: handleLostModeToggle,
                  disabled: setLostMode.isPending,
                  "aria-label": `Toggle lost mode for ${keyInfo.name}`
                }
              )
            ]
          }
        )
      ] })
    }
  );
}
function KeyCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated p-4 flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "size-8 rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full rounded-lg" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full rounded-md" })
  ] });
}
function getGreeting() {
  const hour = (/* @__PURE__ */ new Date()).getHours();
  if (hour < 12) return "Good morning! ☀️";
  if (hour < 17) return "Good afternoon! 🌤️";
  return "Good evening! 🌙";
}
function StatCard({ icon, value, label, highlight }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `flex flex-col items-center gap-1 rounded-xl border p-3 text-center ${highlight ? "border-accent/30 bg-accent/8" : "border-border bg-card"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `font-display text-xl font-bold ${highlight ? "text-accent" : "text-foreground"}`,
            children: value
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium text-muted-foreground leading-tight", children: label })
      ]
    }
  );
}
function useTotalMessages(keyIds) {
  var _a, _b, _c, _d, _e;
  const q0 = useMessages(keyIds[0]);
  const q1 = useMessages(keyIds[1]);
  const q2 = useMessages(keyIds[2]);
  const q3 = useMessages(keyIds[3]);
  const q4 = useMessages(keyIds[4]);
  const total = (((_a = q0.data) == null ? void 0 : _a.length) ?? 0) + (((_b = q1.data) == null ? void 0 : _b.length) ?? 0) + (((_c = q2.data) == null ? void 0 : _c.length) ?? 0) + (((_d = q3.data) == null ? void 0 : _d.length) ?? 0) + (((_e = q4.data) == null ? void 0 : _e.length) ?? 0);
  const isLoading = q0.isLoading || q1.isLoading || q2.isLoading;
  return { total, isLoading };
}
function DashboardPage() {
  const { identity, login } = useInternetIdentity();
  const { data: keys, isLoading } = useMyKeys();
  const keyIds = (keys == null ? void 0 : keys.map((k) => k.id)) ?? [];
  const { total: totalMessages } = useTotalMessages(keyIds);
  if (!identity) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        className: "flex flex-col items-center justify-center min-h-[70vh] gap-6 text-center px-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-24 rounded-2xl bg-primary/10 flex items-center justify-center shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "size-12 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "KeyRakshak" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xs mx-auto text-sm leading-relaxed", children: "Register your keys with smart QR tags. If someone finds your key, they can contact you — your number stays 100% private." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 justify-center", children: [
            "QR Code Recovery",
            "Number Hidden",
            "Instant Alert",
            "Reward System"
          ].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-xs px-3 py-1 rounded-full bg-primary/8 text-primary font-medium border border-primary/20",
              children: f
            },
            f
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "lg",
              onClick: login,
              "data-ocid": "get-started-btn",
              className: "w-full max-w-xs h-12 text-base font-semibold",
              children: "Get Started — Sign In"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Secured with Internet Identity · Zero data sharing" })
        ]
      }
    ) });
  }
  const lostCount = (keys == null ? void 0 : keys.filter((k) => k.lostMode).length) ?? 0;
  const totalKeys = (keys == null ? void 0 : keys.length) ?? 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
        className: "flex items-start justify-between pt-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: getGreeting() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground", children: "My Keys" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/keys/new", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "icon",
              "data-ocid": "add-key-fab",
              "aria-label": "Add new key",
              className: "size-10 shadow-sm",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-5" })
            }
          ) })
        ]
      }
    ),
    !isLoading && identity && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.35, delay: 0.05 },
        className: "grid grid-cols-3 gap-2",
        "data-ocid": "stats-row",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "size-5 text-primary" }),
              value: totalKeys,
              label: "Total Keys"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "🚨" }),
              value: lostCount,
              label: "Lost Mode ON",
              highlight: lostCount > 0
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "size-5 text-primary" }),
              value: totalMessages,
              label: "Messages"
            }
          )
        ]
      }
    ),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full rounded-xl" }, i)) }),
    !isLoading && lostCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.97 },
        animate: { opacity: 1, scale: 1 },
        className: "rounded-lg bg-accent/10 border border-accent/30 px-4 py-3 flex items-center gap-3",
        "data-ocid": "lost-mode-banner",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent text-lg shrink-0", children: "🚨" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-accent", children: [
              lostCount,
              " ",
              lostCount === 1 ? "key" : "keys",
              " in Lost Mode"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Reward Offered badge is visible to finders" })
          ] })
        ]
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(KeyCardSkeleton, {}, i)) }) : keys && keys.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: keys.map((key, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.07, duration: 0.3 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(KeyCard, { keyInfo: key, className: "h-full" })
      },
      key.id
    )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 0.2 },
        "data-ocid": "empty-state-keys",
        className: "flex flex-col items-center justify-center gap-4 py-16 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-20 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-10 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground mb-1", children: "No keys registered yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-[220px] mx-auto", children: "Add your first key to get a QR tag and enable recovery anywhere." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/keys/new", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { "data-ocid": "add-first-key-btn", size: "lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4 mr-1" }),
            "Add Your First Key"
          ] }) })
        ]
      }
    ),
    !isLoading && keys && keys.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.p,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 0.5 },
        className: "text-xs text-center text-muted-foreground pb-2",
        children: "Tap a key card to view QR code and manage settings"
      }
    )
  ] }) });
}
export {
  DashboardPage as default
};
