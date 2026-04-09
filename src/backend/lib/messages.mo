import MsgTypes "../types/messages";
import List "mo:core/List";

module {
  public type FinderMessage = MsgTypes.FinderMessage;

  /// Create a new FinderMessage record
  public func newMessage(id : Nat, keyId : Text, messageText : Text, finderPhone : ?Text, sentAt : Int) : FinderMessage {
    { id; keyId; messageText; finderPhone; sentAt }
  };

  /// Get all messages for a given key ID
  public func getByKeyId(messages : List.List<FinderMessage>, keyId : Text) : [FinderMessage] {
    messages.filter(func(m) { m.keyId == keyId })
            .toArray()
  };
};
