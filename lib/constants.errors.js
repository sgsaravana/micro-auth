const CONSTANTS = {
  // 100 - 199 => DB Errors
  100: "Database connection error",

  // 200 - 299 => Validation Errors
  200: "Firstname is mandatory",
  201: "Lastname is mandatory",
  202: "Email is mandatory",
  203: "Password is mandatory",

  210: "Invalid Email address",
  211: "Email address already exist",

  // 300 - 399 => Activation Errors
  300: "Invalid Activation code",
};

module.exports = CONSTANTS;
