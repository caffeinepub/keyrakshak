module {
  // Owner profile — mobile is stored privately, never returned to finders
  public type Owner = {
    principal : Principal;
    name : Text;
    var mobile : Text; // PRIVATE — never expose to finders
  };

  // Public-safe owner profile (no mobile)
  public type OwnerProfile = {
    name : Text;
  };
};
