import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { FranchiseApplication } from "../types";

// Franchise applications stored locally (backend method not yet in bindings)
export function useSubmitFranchise() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      city,
      phone,
    }: {
      name: string;
      city: string;
      phone: string;
    }): Promise<FranchiseApplication> => {
      const existing = JSON.parse(
        localStorage.getItem("franchiseApplications") || "[]",
      ) as FranchiseApplication[];
      const newApp: FranchiseApplication = {
        id: Date.now(),
        name,
        city,
        phone,
        appliedAt: BigInt(Date.now()),
      };
      existing.push(newApp);
      localStorage.setItem("franchiseApplications", JSON.stringify(existing));
      // Simulate network delay
      await new Promise((r) => setTimeout(r, 600));
      return newApp;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["franchiseApplications"] });
    },
  });
}
