export { KeyType } from "./backend";
export type {
  OwnerKeyInfo,
  PublicKeyInfo,
  FinderMessage,
  KeyId,
  Timestamp,
} from "./backend";

export const KEY_TYPE_LABELS: Record<string, string> = {
  Car: "Car Keys",
  Bike: "Bike Keys",
  Home: "Home Keys",
  Office: "Office Keys",
};

export const KEY_TYPE_ICONS: Record<string, string> = {
  Car: "🚗",
  Bike: "🏍️",
  Home: "🏠",
  Office: "🏢",
};

// Franchise application type (local, not yet in backend bindings)
export interface FranchiseApplication {
  id: number;
  name: string;
  city: string;
  phone: string;
  appliedAt: bigint;
}
