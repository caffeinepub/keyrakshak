import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { KeyType, OwnerKeyInfo } from "../types";

function useBackendActor() {
  return useActor(createActor);
}

export function useMyKeys() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<OwnerKeyInfo[]>({
    queryKey: ["myKeys"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyKeys();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddKey() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      keyType,
    }: { name: string; keyType: KeyType }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addKey(name, keyType);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myKeys"] });
    },
  });
}

export function useRegisterOwner() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ name, mobile }: { name: string; mobile: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.registerOwner(name, mobile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myKeys"] });
    },
  });
}

export function useSetLostMode() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      keyId,
      lostMode,
    }: { keyId: string; lostMode: boolean }) => {
      if (!actor) throw new Error("Not connected");
      return actor.setLostMode(keyId, lostMode);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myKeys"] });
    },
  });
}

export function useKeyInfo(keyId: string | undefined) {
  const { actor } = useBackendActor();
  return useQuery({
    queryKey: ["keyInfo", keyId],
    queryFn: async () => {
      if (!actor || !keyId) return null;
      return actor.getKeyInfo(keyId);
    },
    enabled: !!keyId,
  });
}

export function usePublicKeyInfo(keyId: string | undefined) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["publicKeyInfo", keyId],
    queryFn: async () => {
      if (!actor || !keyId) return null;
      return actor.getKeyInfo(keyId);
    },
    enabled: !!keyId && !isFetching,
  });
}

// Stub for setKeyReward — backend method not yet in bindings, stored locally
export function useSetKeyReward() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      keyId,
      rewardAmount,
      upiId,
    }: { keyId: string; rewardAmount: number; upiId: string }) => {
      // Store reward data in localStorage until backend supports it
      const existing = JSON.parse(
        localStorage.getItem("keyRewards") || "{}",
      ) as Record<string, { rewardAmount: number; upiId: string }>;
      existing[keyId] = { rewardAmount, upiId };
      localStorage.setItem("keyRewards", JSON.stringify(existing));
      return { keyId, rewardAmount, upiId };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["keyRewards"] });
    },
  });
}

export function useKeyReward(keyId: string | undefined) {
  return useQuery({
    queryKey: ["keyRewards", keyId],
    queryFn: () => {
      if (!keyId) return null;
      const existing = JSON.parse(
        localStorage.getItem("keyRewards") || "{}",
      ) as Record<string, { rewardAmount: number; upiId: string }>;
      return existing[keyId] ?? null;
    },
    enabled: !!keyId,
  });
}
