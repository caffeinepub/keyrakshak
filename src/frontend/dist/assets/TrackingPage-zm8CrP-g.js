import { j as jsxRuntimeExports, c as cn, d as useParams, r as reactExports } from "./index-C_OiGXDq.js";
import { c as createLucideIcon, S as Slot, e as cva, B as Button } from "./createLucideIcon-B-k-gt5M.js";
import { b as useTrackingSession, c as useUpdateLocation, u as useGetLocationByKeyId } from "./use-tracking-lzlYWzhs.js";
import { M as MapPin } from "./map-pin-D-wifC22.js";
import "./backend-YcrI8Id8.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]];
const Play = createLucideIcon("play", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
];
const Square = createLucideIcon("square", __iconNode);
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
function TrackingPage() {
  const { keyId } = useParams({ from: "/track/$keyId" });
  const sessionId = useTrackingSession();
  const updateLocation = useUpdateLocation();
  const [tracking, setTracking] = reactExports.useState(false);
  const [coords, setCoords] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const watcherRef = reactExports.useRef(null);
  const intervalRef = reactExports.useRef(null);
  const latestCoordsRef = reactExports.useRef(null);
  const mutateFnRef = reactExports.useRef(updateLocation.mutate);
  mutateFnRef.current = updateLocation.mutate;
  const { data: liveLocation } = useGetLocationByKeyId(keyId);
  reactExports.useEffect(() => {
    if (tracking) {
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser.");
        setTracking(false);
        return;
      }
      watcherRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          const newCoords = {
            lat: pos.coords.latitude,
            lon: pos.coords.longitude
          };
          setCoords(newCoords);
          latestCoordsRef.current = newCoords;
          setError(null);
        },
        (err) => {
          setError(`Location error: ${err.message}`);
        },
        { enableHighAccuracy: true }
      );
      intervalRef.current = setInterval(() => {
        const c = latestCoordsRef.current;
        if (c) {
          mutateFnRef.current({ sessionId, keyId, lat: c.lat, lon: c.lon });
        }
      }, 5e3);
    } else {
      if (watcherRef.current !== null) {
        navigator.geolocation.clearWatch(watcherRef.current);
        watcherRef.current = null;
      }
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (watcherRef.current !== null) {
        navigator.geolocation.clearWatch(watcherRef.current);
      }
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [tracking, sessionId, keyId]);
  const displayCoords = liveLocation ?? coords;
  const mapUrl = displayCoords ? `https://www.openstreetmap.org/export/embed.html?bbox=${displayCoords.lon - 0.01},${displayCoords.lat - 0.01},${displayCoords.lon + 0.01},${displayCoords.lat + 0.01}&layer=mapnik&marker=${displayCoords.lat},${displayCoords.lon}` : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex flex-col items-center px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "text-primary", size: 28 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Live Tracking" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        "Key ID:",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-foreground", children: keyId })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mt-2", children: tracking ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        Badge,
        {
          "data-ocid": "tracking-status-active",
          className: "bg-green-500/15 text-green-700 border-green-500/30 border",
          children: "🟢 Tracking Active"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        Badge,
        {
          "data-ocid": "tracking-status-stopped",
          variant: "secondary",
          className: "text-muted-foreground",
          children: "⚫ Tracking Stopped"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-2xl shadow-sm border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex gap-3 justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "btn-start-tracking",
          onClick: () => setTracking(true),
          disabled: tracking,
          className: "flex gap-2 flex-1",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 16 }),
            "Start Tracking"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "btn-stop-tracking",
          variant: "destructive",
          onClick: () => setTracking(false),
          disabled: !tracking,
          className: "flex gap-2 flex-1",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Square, { size: 16 }),
            "Stop"
          ]
        }
      )
    ] }) }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-2xl border border-destructive/30 bg-destructive/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-3 text-sm text-destructive", children: error }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "coords-card", className: "rounded-2xl shadow-sm border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Current Coordinates" }),
      displayCoords ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-sm space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Latitude" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: displayCoords.lat.toFixed(6) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Longitude" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: displayCoords.lon.toFixed(6) })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground italic", children: tracking ? "Waiting for GPS signal..." : "Start tracking to see coordinates" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        "data-ocid": "map-card",
        className: "rounded-2xl shadow-sm border overflow-hidden",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: mapUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "iframe",
          {
            title: "Live Location Map",
            src: mapUrl,
            width: "100%",
            height: "300",
            className: "block border-0",
            loading: "lazy",
            referrerPolicy: "no-referrer"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-48 flex flex-col items-center justify-center gap-2 bg-muted/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "text-muted-foreground", size: 32 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center px-4", children: "Map will appear once location is detected" })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center pb-4", children: "Location updates are sent every 5 seconds while tracking is active. The owner can see your position in real time." })
  ] }) });
}
export {
  TrackingPage as default
};
