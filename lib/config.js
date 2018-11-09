const CONFIG = {
    // @ Configurable attribute validation to be implemented
    // mandatory_attr: ['firstname', 'lastname', etc...]

    // @ DB Module
    // Values can be the following:
    // 'mysql', 'mongodb', 'firebase'
    // more db modules support to add in future
    dbModule: 'mysql', // mysql, mongodb, firebase

    // mysql configuration - uncomment the following lines and update host, username and password
    //
    host: '0.0.0.0',
    user: 'root',
    port: '3306',
    password: '',
    database: 'micro_auth_dev',
    pool: '10',
    //


    // mongodb configuration
    //
    url: '',
    dbName: ''
    //
    //
    //


    // firebase configuration
    //
    //
    //
    //
    //
    //
}

module.exports = CONFIG;
