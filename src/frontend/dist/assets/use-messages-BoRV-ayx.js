import { u as useQuery, a as useActor, c as createActor } from "./backend-YcrI8Id8.js";
import { j as jsxRuntimeExports, c as cn, e as useQueryClient } from "./index-C_OiGXDq.js";
import { c as createLucideIcon, b as useMutation } from "./createLucideIcon-B-k-gt5M.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { x: "3", y: "8", width: "18", height: "4", rx: "1", key: "bkv52" }],
  ["path", { d: "M12 8v13", key: "1c76mn" }],
  ["path", { d: "M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7", key: "6wjy6b" }],
  [
    "path",
    {
      d: "M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5",
      key: "1ihvrl"
    }
  ]
];
const Gift = createLucideIcon("gift", __iconNode);
const KEY_TYPE_LABELS = {
  Car: "Car Keys",
  Bike: "Bike Keys",
  Home: "Home Keys",
  Office: "Office Keys"
};
const KEY_TYPE_ICONS = {
  Car: "🚗",
  Bike: "🏍️",
  Home: "🏠",
  Office: "🏢"
};
const variantStyles = {
  reward: "bg-accent text-accent-foreground",
  lost: "bg-accent/15 text-accent border border-accent/30",
  active: "bg-primary/10 text-primary border border-primary/20",
  found: "bg-primary text-primary-foreground"
};
function Badge({ variant = "active", className, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        variantStyles[variant],
        className
      ),
      children: [
        variant === "reward" && /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "size-3" }),
        children
      ]
    }
  );
}
function RewardBadge({ className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      variant: "reward",
      className: cn("w-full justify-center py-2 text-sm rounded-lg", className),
      children: "🎁 Reward Offered"
    }
  );
}
function useBackendActor() {
  return useActor(createActor);
}
function useMessages(keyId) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["messages", keyId],
    queryFn: async () => {
      if (!actor || !keyId) return [];
      return actor.getMessages(keyId);
    },
    enabled: !!actor && !isFetching && !!keyId
  });
}
function useSendMessage() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      keyId,
      messageText,
      finderPhone
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.sendFinderMessage(keyId, messageText, finderPhone);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["messages", variables.keyId]
      });
    }
  });
}
export {
  Badge as B,
  KEY_TYPE_ICONS as K,
  RewardBadge as R,
  KEY_TYPE_LABELS as a,
  useSendMessage as b,
  useMessages as u
};
