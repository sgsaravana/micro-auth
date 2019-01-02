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

  220: "Current password is mandatory",
  221: "New password is mandatory",
  222: "Wrong current password",

  // 300 - 319 => Activation Errors
  300: "Invalid Activation code",

  // 320 - 349 => Error
  320: "User not found",
  321: "Change password error, please try again",
  322: "User validation error, please try again"
};

module.exports = CONSTANTS;
