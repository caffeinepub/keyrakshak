import KeyTypes "../types/keys";
import List "mo:core/List";

module {
  public type Key = KeyTypes.Key;
  public type KeyType = KeyTypes.KeyType;
  public type PublicKeyInfo = KeyTypes.PublicKeyInfo;
  public type OwnerKeyInfo = KeyTypes.OwnerKeyInfo;

  /// Generate next sequential key ID from counter (e.g. 1001 -> "KR1001")
  public func nextKeyId(counter : Nat) : Text {
    "KR" # counter.toText()
  };

  /// Create a new Key record
  public func newKey(id : Text, owner : Principal, name : Text, keyType : KeyType, createdAt : Int) : Key {
    { id; owner; name; keyType; var lostMode = false; createdAt }
  };

  /// Convert internal Key to public finder-safe view (no owner phone)
  public func toPublicInfo(key : Key) : PublicKeyInfo {
    { id = key.id; keyType = key.keyType; lostMode = key.lostMode; name = key.name }
  };

  /// Convert internal Key to owner view
  public func toOwnerInfo(key : Key) : OwnerKeyInfo {
    { id = key.id; name = key.name; keyType = key.keyType; lostMode = key.lostMode; createdAt = key.createdAt }
  };

  /// Find a key by its unique ID in the list
  public func findById(keys : List.List<Key>, id : Text) : ?Key {
    keys.find(func(k) { k.id == id })
  };

  /// Get all keys owned by a specific principal
  public func getByOwner(keys : List.List<Key>, owner : Principal) : [OwnerKeyInfo] {
    keys.filter(func(k) { k.owner == owner })
        .map<Key, OwnerKeyInfo>(func(k) { toOwnerInfo(k) })
        .toArray()
  };
};
