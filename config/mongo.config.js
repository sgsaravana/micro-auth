module.exports = {

  // ============================================================================================
  // @ MongoDB Configuration ====================================================================
  // uncomment the following lines and update url, and dbName
  //
  url:    'mongodb://0.0.0.0:27017',
  dbName: 'micro_auth_dev',
  //
  //
  // # MongoDB Schema ===========================================================================
  // # Users collection schema
  // # Default fields: {
  // #    uuid: String,
  // #    firstname: String,
  // #    lastname: String,
  // #    email: String,
  // #    password: String,
  // #    description: String,
  // #    activated: Boolean,
  // #    activated_at: Date,
  // #    activation_code: String,
  // #    activation_code_generated_at: Date,
  // #    reset_code: String,
  // #    reset_code_generated_at: Date,
  // #    password_reset_at: Date,
  // #    password_changed_at: Date,
  // #    created_at: Date,
  // #    updated_at: Date
  // # }
  //
  // # Allowed Data types:
  // # [String, Number, Date, Buffer, Boolean, Mixed, Array]
  //
  // Optional: Add custom / additional fields for the users table if required
  tbl_mongodb_users: {
    username: String
    // fieldname: type
    // fieldname: type
  },
  //
  //
  // # END MongoDB ==============================================================================

}
