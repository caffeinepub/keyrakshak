import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { FinderMessage } from "../types";

function useBackendActor() {
  return useActor(createActor);
}

export function useMessages(keyId: string | undefined) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<FinderMessage[]>({
    queryKey: ["messages", keyId],
    queryFn: async () => {
      if (!actor || !keyId) return [];
      return actor.getMessages(keyId);
    },
    enabled: !!actor && !isFetching && !!keyId,
  });
}

export function useSendMessage() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      keyId,
      messageText,
      finderPhone,
    }: {
      keyId: string;
      messageText: string;
      finderPhone: string | null;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.sendFinderMessage(keyId, messageText, finderPhone);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["messages", variables.keyId],
      });
    },
  });
}
