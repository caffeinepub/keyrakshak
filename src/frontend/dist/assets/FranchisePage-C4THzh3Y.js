import { e as useQueryClient, r as reactExports, j as jsxRuntimeExports, L as Link, a as ue } from "./index-C_OiGXDq.js";
import { c as createLucideIcon, b as useMutation, B as Button } from "./createLucideIcon-B-k-gt5M.js";
import { L as Label, I as Input } from "./label-DQwxhrz7.js";
import { L as Layout } from "./Layout-DdUqRl9C.js";
import { A as ArrowLeft } from "./arrow-left-D0y7qeRS.js";
import { m as motion } from "./proxy-GhEsmpcI.js";
import { M as MapPin } from "./map-pin-D-wifC22.js";
import { I as IndianRupee } from "./indian-rupee-e58mJqGH.js";
import "./index-tfy2CLD7.js";
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
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const BadgeCheck = createLucideIcon("badge-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode);
function useSubmitFranchise() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      city,
      phone
    }) => {
      const existing = JSON.parse(
        localStorage.getItem("franchiseApplications") || "[]"
      );
      const newApp = {
        id: Date.now(),
        name,
        city,
        phone,
        appliedAt: BigInt(Date.now())
      };
      existing.push(newApp);
      localStorage.setItem("franchiseApplications", JSON.stringify(existing));
      await new Promise((r) => setTimeout(r, 600));
      return newApp;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["franchiseApplications"] });
    }
  });
}
const BENEFITS = [
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "size-6 text-primary" }),
    title: "Sell QR Tags",
    desc: "Become the official KeyRakshak dealer in your city. Sell QR sticker packs and earn ₹30–₹50 per tag.",
    bg: "bg-primary/5 border-primary/15"
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "size-6 text-[oklch(0.52_0.16_160)]" }),
    title: "Zero Investment",
    desc: "Free starter kit, training, and marketing support. No upfront cost to become a City Partner.",
    bg: "bg-[oklch(0.68_0.16_160/0.06)] border-[oklch(0.68_0.16_160/0.2)]"
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "size-6 text-accent" }),
    title: "Monthly Commission",
    desc: "Earn recurring commissions every month as your city grows. Top partners earn ₹10,000+/month.",
    bg: "bg-accent/5 border-accent/15"
  }
];
const CITIES_EXAMPLE = [
  "Delhi",
  "Mumbai",
  "Karnal",
  "Hisar",
  "Rohtak",
  "Chandigarh",
  "Jaipur",
  "Lucknow"
];
function FranchisePage() {
  const submitFranchise = useSubmitFranchise();
  const [name, setName] = reactExports.useState("");
  const [city, setCity] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [errors, setErrors] = reactExports.useState({});
  const [submitted, setSubmitted] = reactExports.useState(false);
  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Enter your full name";
    if (!city.trim()) e.city = "Enter your city";
    if (!phone.trim()) e.phone = "Enter your phone number";
    else if (!/^[+0-9\s-]{8,15}$/.test(phone.trim()))
      e.phone = "Enter a valid phone number";
    return e;
  };
  const handleSubmit = async (e) => {
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
        phone: phone.trim()
      });
      setSubmitted(true);
      ue.success(
        "Application submitted! We will contact you within 24 hours."
      );
    } catch {
      ue.error("Failed to submit. Please try again.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { showNav: false, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6 py-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", "aria-label": "Go back", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground", children: "City Partner Program" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Franchise · Earn with KeyRakshak" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        className: "rounded-2xl bg-primary/8 border border-primary/20 p-5 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-14 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "size-7 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold text-foreground mb-1", children: "Become a KeyRakshak City Partner" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto", children: "Join India's fastest-growing key recovery network. Represent KeyRakshak in your city and earn monthly commissions." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: BENEFITS.map(({ icon, title, desc, bg }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: -12 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.35, delay: 0.1 + i * 0.08 },
        className: `rounded-xl border p-4 flex items-start gap-4 ${bg}`,
        "data-ocid": `benefit-card-${i}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 mt-0.5", children: icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-0.5", children: title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: desc })
          ] })
        ]
      },
      title
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Available Cities" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5", children: [
        CITIES_EXAMPLE.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border",
            children: c
          },
          c
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-0.5 rounded-full bg-primary/8 text-primary border border-primary/20 font-medium", children: "+ Your City" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-foreground", children: "Apply Now" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" })
      ] }),
      submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.97 },
          animate: { opacity: 1, scale: 1 },
          className: "rounded-xl border border-primary/20 bg-primary/5 p-5 text-center",
          "data-ocid": "franchise-success",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl mb-2", children: "🎉" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-base mb-1", children: "Application Submitted!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "We will contact you within 24 hours to discuss the City Partner opportunity." })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handleSubmit,
          "data-ocid": "franchise-form",
          className: "flex flex-col gap-4",
          noValidate: true,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "franchise-name", children: "Full Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "franchise-name",
                  "data-ocid": "franchise-name-input",
                  placeholder: "e.g. Rahul Sharma",
                  value: name,
                  onChange: (e) => {
                    setName(e.target.value);
                    if (e.target.value.trim())
                      setErrors((p) => ({ ...p, name: "" }));
                  },
                  onBlur: () => {
                    if (!name.trim())
                      setErrors((p) => ({
                        ...p,
                        name: "Enter your full name"
                      }));
                  },
                  "aria-invalid": !!errors.name,
                  className: "h-12"
                }
              ),
              errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.name })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "franchise-city", children: "City" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "franchise-city",
                  "data-ocid": "franchise-city-input",
                  placeholder: "e.g. Karnal, Delhi, Mumbai",
                  value: city,
                  onChange: (e) => {
                    setCity(e.target.value);
                    if (e.target.value.trim())
                      setErrors((p) => ({ ...p, city: "" }));
                  },
                  onBlur: () => {
                    if (!city.trim())
                      setErrors((p) => ({ ...p, city: "Enter your city" }));
                  },
                  "aria-invalid": !!errors.city,
                  className: "h-12"
                }
              ),
              errors.city && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.city })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "franchise-phone", children: "Phone Number" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "franchise-phone",
                  "data-ocid": "franchise-phone-input",
                  type: "tel",
                  placeholder: "+91 98765 43210",
                  value: phone,
                  onChange: (e) => {
                    setPhone(e.target.value);
                    if (e.target.value.trim())
                      setErrors((p) => ({ ...p, phone: "" }));
                  },
                  onBlur: () => {
                    if (!phone.trim())
                      setErrors((p) => ({
                        ...p,
                        phone: "Enter your phone number"
                      }));
                  },
                  "aria-invalid": !!errors.phone,
                  className: "h-12"
                }
              ),
              errors.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.phone })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                size: "lg",
                disabled: submitFranchise.isPending,
                "data-ocid": "franchise-submit-btn",
                className: "w-full h-12 text-base font-semibold",
                children: submitFranchise.isPending ? "Submitting..." : "Apply as City Partner 🤝"
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-muted/40 border border-border p-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground leading-relaxed", children: [
      "💼 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Business Details:" }),
      " QR Tag Sale ₹99 · Partner Commission 30% · Premium Subscription ₹199/year"
    ] }) })
  ] }) });
}
export {
  FranchisePage as default
};
