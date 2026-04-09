import { r as reactExports, e as useQueryClient } from "./index-C_OiGXDq.js";
import { u as useQuery, a as useActor, c as createActor } from "./backend-YcrI8Id8.js";
import { b as useMutation } from "./createLucideIcon-B-k-gt5M.js";
function useBackendActor() {
  return useActor(createActor);
}
let _sessionId = null;
function getSessionId() {
  if (!_sessionId) {
    _sessionId = typeof crypto !== "undefined" && typeof crypto.randomUUID === "function" ? crypto.randomUUID() : Date.now().toString();
  }
  return _sessionId;
}
function useTrackingSession() {
  const [sessionId] = reactExports.useState(() => getSessionId());
  return sessionId;
}
function useUpdateLocation() {
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: async ({
      sessionId,
      keyId,
      lat,
      lon
    }) => {
      if (!actor) throw new Error("Not connected");
      const trackingActor = actor;
      await trackingActor.updateLocation(sessionId, keyId, lat, lon);
    }
  });
}
function useGetLocationByKeyId(keyId) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["location", keyId],
    queryFn: async () => {
      if (!actor || !keyId) return null;
      const trackingActor = actor;
      const result = await trackingActor.getLocationByKeyId(keyId);
      if (!result || result.length === 0) return null;
      const loc = result[0];
      return {
        lat: Number(loc.lat),
        lon: Number(loc.lon),
        updatedAt: loc.updatedAt
      };
    },
    enabled: !!actor && !isFetching && !!keyId,
    refetchInterval: keyId ? 5e3 : false
  });
}
function useClearLocation() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (keyId) => {
      if (!actor) throw new Error("Not connected");
      const trackingActor = actor;
      await trackingActor.clearLocation(keyId);
    },
    onSuccess: (_data, keyId) => {
      queryClient.invalidateQueries({ queryKey: ["location", keyId] });
    }
  });
}
export {
  useClearLocation as a,
  useTrackingSession as b,
  useUpdateLocation as c,
  useGetLocationByKeyId as u
};
