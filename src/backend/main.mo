import KeyTypes "types/keys";
import OwnerTypes "types/owners";
import MsgTypes "types/messages";
import KeysApi "mixins/keys-api";
import List "mo:core/List";

actor {
  // ── Stable state ────────────────────────────────────────────────────────
  let owners = List.empty<OwnerTypes.Owner>();
  let keys   = List.empty<KeyTypes.Key>();
  let messages = List.empty<MsgTypes.FinderMessage>();

  // Sequential counters — start keys at 1001 (KR1001), messages at 1
  let nextKeyCounter = { var value : Nat = 1001 };
  let nextMsgId = { var value : Nat = 1 };

  // ── Mixin composition ───────────────────────────────────────────────────
  include KeysApi(owners, keys, messages, nextKeyCounter, nextMsgId);
};
