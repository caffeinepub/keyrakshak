import CommonTypes "common";

module {
  public type Timestamp = CommonTypes.Timestamp;
  public type KeyId = CommonTypes.KeyId;

  public type FinderMessage = {
    id : Nat;
    keyId : KeyId;
    messageText : Text;
    finderPhone : ?Text; // optional — finder may choose to share
    sentAt : Timestamp;
  };
};
