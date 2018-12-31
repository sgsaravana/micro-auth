module.exports = {

    // @ DB Module ================================================================================
    // # Values can be the following:
    // # allowed values: 'mysql', 'mongodb', 'firebase' - more db modules support to add in future
    dbModule: 'mysql', // mysql, mongodb, firebase
    // # END DB Module setup ======================================================================


    // @ ACTIVATION ===============================================================================
    // # Configure account activation.
    // # By default the account will not be activated.
    // # Registering new user will return an activation code.
    // # POST request to the route: /activate with activation code will mark the user as active
    // # set the following value to false to activate user at registration
    activationRequired: true,
    // # END ACTIVATION ===========================================================================

    // @ BCRYPT ===================================================================================
    // # Set salt rouds value for creating bcrypt password. 10 - 12 is the recommended number
    // # Increasing this number will slow down the bcrypt process to hash the password string
    saltRounds: 12
    // # END BCRYPT ===============================================================================

    //
    //
    //

};
