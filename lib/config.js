const CONFIG = {
    // @ Configurable attribute validation to be implemented
    // mandatory_attr: ['firstname', 'lastname', etc...]

    // @ DB Module ================================================================================
    // # Values can be the following:
    // # allowed values: 'mysql', 'mongodb', 'firebase' - more db modules support to add in future
    dbModule: 'mysql', // mysql, mongodb, firebase
    // # END DB Module setup ======================================================================


    // ============================================================================================
    // @ MySQL Configuration ======================================================================
    // uncomment the following lines and update host, username, password, port, database name and pool count
    host:     '0.0.0.0',
    user:     'root',
    port:     '3306',
    password: '',
    database: 'micro_auth_dev',
    pool:     '10',
    //
    //
    // @ MySQL Schema =============================================================================
    // # Users table schema
    // # Default fields: {
    // #    uuid: string PRIMARY KEY,
    // #    firstname: VARCHAR(255),
    // #    lastname: VARCHAR(255),
    // #    email: VARCHAR(255),
    // #    password: CHAR(128),
    // #    description: TEXT,
    // #    activated: TINYINT,
    // #    activated_at: TIMESTAMP,
    // #    activation_code: VARCHAR(255),
    // #    activation_code_generated_at: TIMESTAMP,
    // #    reset_code: VARCHAR(255),
    // #    reset_code_generated_at: TIMESTAMP,
    // #    created_at: TIMESTAMP,
    // #    updated_at: TIMESTAMP
    // # }
    //
    // # Allowed Data types:
    // # ['TINYINT', 'SMALLINT', 'MEDIUMINT', 'INT', 'BIGINT', 'DECIMAL', 'FLOAT', 'DOUBLE', 'BIT', 'CHAR', 'VARCHAR', 'BINARY', 'VARBINARY', 'TINYBLOB', 'BLOB', 'MEDIUMBLOB', 'LONGBLOB', 'TINYTEXT', 'TEXT', 'MEDIUMTEXT', 'LONGTEXT', 'ENUM', 'SET', 'DATE', 'TIME', 'DATETIME', 'TIMESTAMP', 'YEAR' ]
    //
    // Optional: Add custom / additional fields for the users table if required
    tbl_mysql_users : [
        //     { field_name: '', type: '' },
        //     { field_name: '', type: '' },
        //     { field_name: '', type: '' }
    ],
    // # END MySQL Schema =========================================================================



    // ============================================================================================
    // @ MongoDB Configuration ====================================================================
    // uncomment the following lines and update url, and dbName
    //
    url:    'mongodb://0.0.0.0:27017',
    dbName: 'micro_auth_dev',
    //
    //
    // # MongoDB Schema ===========================================================================
    //
    //
    //
    //
    // # END MongoDB ==============================================================================


    // firebase configuration
    //
    //
    //
    //
    //
    //


}

module.exports = CONFIG;
