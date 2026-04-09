import KeyTypes "../types/keys";
import MsgTypes "../types/messages";
import KeyLib "../lib/keys";
import MsgLib "../lib/messages";
import OwnerLib "../lib/owners";
import OwnerTypes "../types/owners";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";

mixin (
  owners : List.List<OwnerTypes.Owner>,
  keys : List.List<KeyTypes.Key>,
  messages : List.List<MsgTypes.FinderMessage>,
  nextKeyCounter : { var value : Nat },
  nextMsgId : { var value : Nat },
) {

  // ── Owner: register profile ──────────────────────────────────────────

  /// Register or update owner profile (authenticated)
  public shared ({ caller }) func registerOwner(name : Text, mobile : Text) : async () {
    switch (OwnerLib.findByPrincipal(owners, caller)) {
      case (?existing) {
        existing.mobile := mobile;
      };
      case null {
        owners.add(OwnerLib.newOwner(caller, name, mobile));
      };
    };
  };

  // ── Owner: key management ────────────────────────────────────────────

  /// Add a new key for the authenticated owner; returns the generated KR#### ID
  public shared ({ caller }) func addKey(name : Text, keyType : KeyTypes.KeyType) : async Text {
    if (not OwnerLib.isRegistered(owners, caller)) {
      Runtime.trap("Owner not registered");
    };
    let keyId = KeyLib.nextKeyId(nextKeyCounter.value);
    nextKeyCounter.value += 1;
    let key = KeyLib.newKey(keyId, caller, name, keyType, Time.now());
    keys.add(key);
    keyId
  };

  /// Get all keys belonging to the authenticated owner
  public shared query ({ caller }) func getMyKeys() : async [KeyTypes.OwnerKeyInfo] {
    KeyLib.getByOwner(keys, caller)
  };

  /// Toggle Lost Mode ON/OFF for a key owned by the caller
  public shared ({ caller }) func setLostMode(keyId : Text, lostMode : Bool) : async () {
    switch (KeyLib.findById(keys, keyId)) {
      case (?key) {
        if (key.owner != caller) {
          Runtime.trap("Not authorized");
        };
        key.lostMode := lostMode;
      };
      case null {
        Runtime.trap("Key not found");
      };
    };
  };

  // ── Owner: messages ──────────────────────────────────────────────────

  /// Get all finder messages for a specific key owned by the caller
  public shared query ({ caller }) func getMessages(keyId : Text) : async [MsgTypes.FinderMessage] {
    switch (KeyLib.findById(keys, keyId)) {
      case (?key) {
        if (key.owner != caller) {
          Runtime.trap("Not authorized");
        };
        MsgLib.getByKeyId(messages, keyId)
      };
      case null {
        Runtime.trap("Key not found");
      };
    };
  };

  // ── Finder: public queries (no auth required) ────────────────────────

  /// Get public key info by unique ID — safe for finders, NO owner phone
  public query func getKeyInfo(keyId : Text) : async ?KeyTypes.PublicKeyInfo {
    switch (KeyLib.findById(keys, keyId)) {
      case (?key) ?KeyLib.toPublicInfo(key);
      case null null;
    }
  };

  /// Submit a finder message for a key (unauthenticated)
  public shared func sendFinderMessage(keyId : Text, messageText : Text, finderPhone : ?Text) : async () {
    switch (KeyLib.findById(keys, keyId)) {
      case (?_) {
        let msgId = nextMsgId.value;
        nextMsgId.value += 1;
        messages.add(MsgLib.newMessage(msgId, keyId, messageText, finderPhone, Time.now()));
      };
      case null {
        Runtime.trap("Key not found");
      };
    };
  };
};
