import CommonTypes "common";

module {
  public type Timestamp = CommonTypes.Timestamp;
  public type KeyId = CommonTypes.KeyId;

  public type KeyType = {
    #Car;
    #Bike;
    #Home;
    #Office;
  };

  // Internal key record — includes private owner mobile; never expose directly
  public type Key = {
    id : KeyId;
    owner : Principal;
    name : Text;
    keyType : KeyType;
    var lostMode : Bool;
    createdAt : Timestamp;
  };

  // Public key info safe to return to finders — NO owner phone
  public type PublicKeyInfo = {
    id : KeyId;
    keyType : KeyType;
    lostMode : Bool;
    name : Text;
  };

  // Owner's full view of a key
  public type OwnerKeyInfo = {
    id : KeyId;
    name : Text;
    keyType : KeyType;
    lostMode : Bool;
    createdAt : Timestamp;
  };
};
