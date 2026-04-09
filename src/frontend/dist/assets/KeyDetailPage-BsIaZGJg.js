import { b as useInternetIdentity, d as useParams, j as jsxRuntimeExports, S as Skeleton, L as Link, a as ue } from "./index-C_OiGXDq.js";
import { c as createLucideIcon, B as Button } from "./createLucideIcon-B-k-gt5M.js";
import { S as Separator } from "./separator-CWI6jSIb.js";
import { Q as QRDisplay, S as Switch } from "./QRDisplay-WXVOoJnk.js";
import { u as useMessages, K as KEY_TYPE_ICONS, a as KEY_TYPE_LABELS, B as Badge, R as RewardBadge } from "./use-messages-BoRV-ayx.js";
import { L as Layout, M as MessageSquare } from "./Layout-DdUqRl9C.js";
import { a as useMyKeys, u as useSetLostMode } from "./use-keys-hJS0WseV.js";
import { u as useGetLocationByKeyId, a as useClearLocation } from "./use-tracking-lzlYWzhs.js";
import { A as ArrowLeft } from "./arrow-left-D0y7qeRS.js";
import { m as motion } from "./proxy-GhEsmpcI.js";
import { C as Calendar } from "./calendar-D1Q7_aSh.js";
import { M as MapPin } from "./map-pin-D-wifC22.js";
import "./index-tfy2CLD7.js";
import "./backend-YcrI8Id8.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["polygon", { points: "3 11 22 2 13 21 11 13 3 11", key: "1ltx0t" }]
];
const Navigation = createLucideIcon("navigation", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
const Share2 = createLucideIcon("share-2", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
function formatDate(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function formatTime(ts) {
  return new Date(Number(ts) / 1e6).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit"
  });
}
function relativeSeconds(ts) {
  const secs = Math.round((Date.now() - Number(ts) / 1e6) / 1e3);
  if (secs < 5) return "just now";
  if (secs < 60) return `${secs}s ago`;
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  return `${Math.floor(mins / 60)}h ago`;
}
function buildMapUrl(lat, lon) {
  const delta = 0.01;
  const bbox = `${lon - delta},${lat - delta},${lon + delta},${lat + delta}`;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;
}
function LiveLocationSection({ keyId, lostMode }) {
  const { data: location, isLoading: locLoading } = useGetLocationByKeyId(
    lostMode ? keyId : void 0
  );
  const clearLocation = useClearLocation();
  const trackLink = `https://keyrakshak.in/track/${keyId}`;
  const handleCopyTrackLink = async () => {
    try {
      await navigator.clipboard.writeText(trackLink);
      ue.success("Track link copied!");
    } catch {
      ue.error("Could not copy link");
    }
  };
  const handleClearLocation = async () => {
    try {
      await clearLocation.mutateAsync(keyId);
      ue.success("Location cleared");
    } catch {
      ue.error("Failed to clear location");
    }
  };
  const hasValidLocation = location != null && typeof location.lat === "number" && typeof location.lon === "number" && location.lat !== 0 && location.lon !== 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3, delay: 0.2 },
      className: "card-elevated p-4 flex flex-col gap-3",
      "data-ocid": "live-location-section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "size-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Live Location" }),
          lostMode && hasValidLocation && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto flex items-center gap-1 text-xs text-green-600 font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-2 rounded-full bg-green-500 animate-pulse inline-block" }),
            "Live"
          ] })
        ] }),
        !lostMode ? (
          /* Not in lost mode */
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/40 border border-border px-4 py-5 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-6 mx-auto mb-2 text-muted-foreground/50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Enable Lost Mode to see live tracking" })
          ] })
        ) : locLoading ? (
          /* Loading skeleton */
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 w-full rounded-lg" })
        ) : hasValidLocation ? (
          /* Location found — show map + details */
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", "data-ocid": "location-map-area", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg overflow-hidden border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "iframe",
              {
                title: "Live Location Map",
                src: buildMapUrl(location.lat, location.lon),
                width: "100%",
                height: "400",
                loading: "lazy",
                className: "block",
                style: { border: 0 }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2 px-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs text-muted-foreground", children: [
                location.lat.toFixed(6),
                ", ",
                location.lon.toFixed(6)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: "text-xs text-muted-foreground",
                  "data-ocid": "location-last-updated",
                  children: [
                    "Last updated ",
                    relativeSeconds(location.updatedAt)
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/5 w-full",
                onClick: handleClearLocation,
                disabled: clearLocation.isPending,
                "data-ocid": "clear-location-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-3.5" }),
                  "Clear Location"
                ]
              }
            )
          ] })
        ) : (
          /* Lost mode on but no location yet */
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-lg bg-muted/40 border border-border px-4 py-7 text-center",
              "data-ocid": "waiting-location",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    animate: { scale: [1, 1.15, 1] },
                    transition: {
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 1.6,
                      ease: "easeInOut"
                    },
                    className: "inline-block mb-3",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-7 text-primary/60" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Waiting for finder location..." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Location will appear here once the finder opens the track page." })
              ]
            }
          )
        ),
        lostMode && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-foreground flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "size-3.5 text-muted-foreground" }),
            "Track Link"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: trackLink,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "font-mono text-xs text-primary truncate hover:underline underline-offset-2 min-w-0 flex-1",
                "data-ocid": "track-link-url",
                children: trackLink
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "icon",
                className: "shrink-0 size-7",
                onClick: handleCopyTrackLink,
                "aria-label": "Copy track link",
                "data-ocid": "copy-track-link",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "size-3" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "icon",
                className: "shrink-0 size-7",
                "data-ocid": "open-track-link",
                onClick: () => window.open(trackLink, "_blank", "noopener,noreferrer"),
                "aria-label": "Open track link",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "size-3" })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function KeyDetailPage() {
  const { identity, login } = useInternetIdentity();
  const { id } = useParams({ from: "/keys/$id" });
  const { data: keys, isLoading: keysLoading } = useMyKeys();
  const { data: messages, isLoading: msgLoading } = useMessages(id);
  const setLostMode = useSetLostMode();
  const keyInfo = keys == null ? void 0 : keys.find((k) => k.id === id);
  const finderUrl = typeof window !== "undefined" ? `${window.location.origin}/found/${id}` : `/found/${id}`;
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(finderUrl);
      ue.success("Finder link copied to clipboard!");
    } catch {
      ue.error("Could not copy link");
    }
  };
  const handleShareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "KeyRakshak — Found a key?",
          text: `Scan or open this link if you found this key: ${(keyInfo == null ? void 0 : keyInfo.name) ?? id}`,
          url: finderUrl
        });
      } catch {
      }
    } else {
      await handleCopyLink();
    }
  };
  if (!identity) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Sign in to view key details" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: login, "data-ocid": "login-to-view", children: "Sign In" })
    ] }) });
  }
  if (keysLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-48" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full rounded-lg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full rounded-lg" })
    ] }) });
  }
  if (!keyInfo) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Key not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", children: "Back to Dashboard" }) })
    ] }) });
  }
  const icon = KEY_TYPE_ICONS[keyInfo.keyType] ?? "🔑";
  const label = KEY_TYPE_LABELS[keyInfo.keyType] ?? keyInfo.keyType;
  const handleLostModeToggle = async (checked) => {
    try {
      await setLostMode.mutateAsync({ keyId: keyInfo.id, lostMode: checked });
      ue.success(
        checked ? "Lost Mode activated — Reward Offered badge is now visible" : "Lost Mode deactivated"
      );
    } catch {
      ue.error("Failed to update Lost Mode");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", "aria-label": "Go back", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground truncate", children: keyInfo.name })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
        className: "card-elevated p-5 flex flex-col gap-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-base font-bold text-primary tracking-wide", children: keyInfo.id })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: keyInfo.lostMode ? "lost" : "active", children: keyInfo.lostMode ? "🚨 Lost Mode" : "✓ Active" })
          ] }),
          keyInfo.lostMode && /* @__PURE__ */ jsxRuntimeExports.jsx(RewardBadge, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center gap-3 py-2",
              "data-ocid": "qr-display-area",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(QRDisplay, { keyId: keyInfo.id, size: 200, showLabel: true }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center text-muted-foreground max-w-[220px]", children: "Stick this QR code on your keychain. Finders scan it to contact you anonymously." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: handleCopyLink,
                "data-ocid": "copy-qr-link",
                className: "gap-1.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "size-3.5" }),
                  "Copy Link"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: handleShareLink,
                "data-ocid": "share-qr-link",
                className: "gap-1.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "size-3.5" }),
                  "Share Link"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: finderUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "flex items-center justify-center gap-1.5 text-xs text-primary hover:underline underline-offset-2 transition-colors",
              "data-ocid": "preview-finder-page",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "size-3" }),
                "Preview finder page"
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3, delay: 0.1 },
        className: "card-elevated p-4",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Lost Mode" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 leading-relaxed", children: 'Shows "Reward Offered" badge to finders when active' })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Switch,
            {
              "data-ocid": "key-detail-lost-mode",
              checked: keyInfo.lostMode,
              onCheckedChange: handleLostModeToggle,
              disabled: setLostMode.isPending,
              "aria-label": "Toggle lost mode"
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LiveLocationSection, { keyId: keyInfo.id, lostMode: keyInfo.lostMode }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3, delay: 0.25 },
        className: "flex flex-col gap-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "size-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Finder Messages" }),
            messages && messages.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "found", children: messages.length })
          ] }),
          msgLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full rounded-lg" }, i)) }) : messages && messages.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", "data-ocid": "messages-list", children: messages.map((msg, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -8 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: i * 0.05 },
              className: "card-elevated p-4",
              "data-ocid": "message-item",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: msg.messageText }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-2.5", children: [
                  msg.finderPhone && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "a",
                    {
                      href: `tel:${msg.finderPhone}`,
                      className: "text-xs text-primary font-medium hover:underline",
                      children: [
                        "📱 ",
                        msg.finderPhone
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground ml-auto", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "size-3" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDate(msg.sentAt) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatTime(msg.sentAt) })
                  ] })
                ] })
              ]
            },
            msg.id.toString()
          )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "empty-messages",
              className: "py-8 text-center text-sm text-muted-foreground bg-muted/30 rounded-lg border border-border",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "size-8 mx-auto mb-2 text-muted-foreground/50" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "No messages yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: "When someone scans your QR code, their message appears here." })
              ]
            }
          )
        ]
      }
    )
  ] }) });
}
export {
  KeyDetailPage as default
};
