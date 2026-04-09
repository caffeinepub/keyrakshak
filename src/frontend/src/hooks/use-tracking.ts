import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createActor } from "../backend";

export interface LocationInfo {
  lat: number;
  lon: number;
  updatedAt: bigint;
}

// Extended actor type that includes tracking mixin methods
interface TrackingActor {
  updateLocation(
    sessionId: string,
    keyId: string,
    lat: number,
    lon: number,
  ): Promise<void>;
  getLocationByKeyId(keyId: string): Promise<LocationInfo[] | null>;
  clearLocation(keyId: string): Promise<void>;
}

function useBackendActor() {
  return useActor(createActor);
}

// Stable sessionId per browser session — generated once globally
let _sessionId: string | null = null;
function getSessionId(): string {
  if (!_sessionId) {
    _sessionId =
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : Date.now().toString();
  }
  return _sessionId;
}

export function useTrackingSession(): string {
  const [sessionId] = useState<string>(() => getSessionId());
  return sessionId;
}

export function useUpdateLocation() {
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: async ({
      sessionId,
      keyId,
      lat,
      lon,
    }: {
      sessionId: string;
      keyId: string;
      lat: number;
      lon: number;
    }) => {
      if (!actor) throw new Error("Not connected");
      const trackingActor = actor as unknown as TrackingActor;
      await trackingActor.updateLocation(sessionId, keyId, lat, lon);
    },
  });
}

export function useGetLocationByKeyId(keyId: string | undefined) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<LocationInfo | null>({
    queryKey: ["location", keyId],
    queryFn: async () => {
      if (!actor || !keyId) return null;
      const trackingActor = actor as unknown as TrackingActor;
      const result = await trackingActor.getLocationByKeyId(keyId);
      if (!result || result.length === 0) return null;
      const loc = result[0];
      return {
        lat: Number(loc.lat),
        lon: Number(loc.lon),
        updatedAt: loc.updatedAt,
      };
    },
    enabled: !!actor && !isFetching && !!keyId,
    refetchInterval: keyId ? 5000 : false,
  });
}

export function useClearLocation() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (keyId: string) => {
      if (!actor) throw new Error("Not connected");
      const trackingActor = actor as unknown as TrackingActor;
      await trackingActor.clearLocation(keyId);
    },
    onSuccess: (_data, keyId) => {
      queryClient.invalidateQueries({ queryKey: ["location", keyId] });
    },
  });
}
