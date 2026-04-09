import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface OwnerKeyInfo {
    id: KeyId;
    lostMode: boolean;
    name: string;
    createdAt: Timestamp;
    keyType: KeyType;
}
export type Timestamp = bigint;
export type KeyId = string;
export interface FinderMessage {
    id: bigint;
    sentAt: Timestamp;
    messageText: string;
    finderPhone?: string;
    keyId: KeyId;
}
export interface PublicKeyInfo {
    id: KeyId;
    lostMode: boolean;
    name: string;
    keyType: KeyType;
}
export enum KeyType {
    Car = "Car",
    Bike = "Bike",
    Home = "Home",
    Office = "Office"
}
export interface backendInterface {
    addKey(name: string, keyType: KeyType): Promise<string>;
    getKeyInfo(keyId: string): Promise<PublicKeyInfo | null>;
    getMessages(keyId: string): Promise<Array<FinderMessage>>;
    getMyKeys(): Promise<Array<OwnerKeyInfo>>;
    registerOwner(name: string, mobile: string): Promise<void>;
    sendFinderMessage(keyId: string, messageText: string, finderPhone: string | null): Promise<void>;
    setLostMode(keyId: string, lostMode: boolean): Promise<void>;
}
