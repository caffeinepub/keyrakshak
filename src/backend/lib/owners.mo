import OwnerTypes "../types/owners";
import List "mo:core/List";

module {
  public type Owner = OwnerTypes.Owner;
  public type OwnerProfile = OwnerTypes.OwnerProfile;

  /// Create a new Owner record
  public func newOwner(principal : Principal, name : Text, mobile : Text) : Owner {
    { principal; name; var mobile }
  };

  /// Find owner by principal
  public func findByPrincipal(owners : List.List<Owner>, principal : Principal) : ?Owner {
    owners.find(func(o) { o.principal == principal })
  };

  /// Check if a principal already has an owner profile registered
  public func isRegistered(owners : List.List<Owner>, principal : Principal) : Bool {
    switch (findByPrincipal(owners, principal)) {
      case (?_) true;
      case null false;
    }
  };
};
