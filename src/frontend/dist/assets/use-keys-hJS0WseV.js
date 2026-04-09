import { e as useQueryClient } from "./index-C_OiGXDq.js";
import { u as useQuery, a as useActor, c as createActor } from "./backend-YcrI8Id8.js";
import { b as useMutation } from "./createLucideIcon-B-k-gt5M.js";
function useBackendActor() {
  return useActor(createActor);
}
function useMyKeys() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["myKeys"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyKeys();
    },
    enabled: !!actor && !isFetching
  });
}
function useAddKey() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      keyType
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addKey(name, keyType);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myKeys"] });
    }
  });
}
function useRegisterOwner() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ name, mobile }) => {
      if (!actor) throw new Error("Not connected");
      return actor.registerOwner(name, mobile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myKeys"] });
    }
  });
}
function useSetLostMode() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      keyId,
      lostMode
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.setLostMode(keyId, lostMode);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myKeys"] });
    }
  });
}
function usePublicKeyInfo(keyId) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["publicKeyInfo", keyId],
    queryFn: async () => {
      if (!actor || !keyId) return null;
      return actor.getKeyInfo(keyId);
    },
    enabled: !!keyId && !isFetching
  });
}
function useSetKeyReward() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      keyId,
      rewardAmount,
      upiId
    }) => {
      const existing = JSON.parse(
        localStorage.getItem("keyRewards") || "{}"
      );
      existing[keyId] = { rewardAmount, upiId };
      localStorage.setItem("keyRewards", JSON.stringify(existing));
      return { keyId, rewardAmount, upiId };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["keyRewards"] });
    }
  });
}
function useKeyReward(keyId) {
  return useQuery({
    queryKey: ["keyRewards", keyId],
    queryFn: () => {
      if (!keyId) return null;
      const existing = JSON.parse(
        localStorage.getItem("keyRewards") || "{}"
      );
      return existing[keyId] ?? null;
    },
    enabled: !!keyId
  });
}
export {
  useMyKeys as a,
  useAddKey as b,
  useRegisterOwner as c,
  useSetKeyReward as d,
  usePublicKeyInfo as e,
  useKeyReward as f,
  useSetLostMode as u
};
