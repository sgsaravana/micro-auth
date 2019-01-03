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
    saltRounds: 12,
    // # END BCRYPT ===============================================================================

    // @ JWT TOKEN ================================================================================
    // # Set the token sign method below
    jwtSignMethod : 'privatekey', // secret, privatekey
    // # Provide the algorithm for signature. default: HS256
    jwtAlgorithmSecret: 'HS256', // HS256, HS384, HS512
    jwtAlgorithmKeys: 'RS256', // RS256, RS384, RS512
    // # Secret string for generating jwt token - if sign method is secret
    jwtSecretString: 'KREHGTW3YHT3WUGO8W37-5VOT87W3Y4O8-734YT-873Y4TB7834B987BQ349-87T9Q43T7Q93847TYGQ38B47R',
    // # Private key location if using privatekey method for signing. (sample keys added)
    // # Make sure the keys are accessible from the path and replace them with your own keys
    // # Generate your own private/public key pair here: http://travistidwell.com/jsencrypt/demo/
    privateKeyPath: './.ssh/private.key',
    publicKeyPath: './.ssh/public.key',
    //
    //
    //

};
