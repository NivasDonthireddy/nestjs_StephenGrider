require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}` });
var dbConfig = {
    synchronize: false,
    migrations: ['migrations/*.js'],
    cli: {
        migrationsDir: 'migrations',
    }
};

switch(process.env.NODE_ENV){
    case 'development':
        Object.assign(dbConfig,{
            type: 'mssql',
            host: 'localhost',
            port: 1433,
            database: process.env.DB_HOST,
            username: process.env.DB_USER,
            password: process.env.DB_PASSKEY,
            entities: ['**/*.entity.js'],
            options: {
                trustServerCertificate: true
            }
        });
        break;
    case 'test':
        Object.assign(dbConfig,{
            type: 'sqlite',
            database: 'test.sqlite',
            entities: ['**/*.entity.ts'],
            migrationsRun: true
        });
        break;
    case 'production' :
        Object.assign(dbConfig,{
            type: 'mssql',
            host: process.env.DB_HOST,
            port: 1433,
            database: process.env.DB_NAME,
            username: process.env.DB_USER,
            password: process.env.DB_PASSKEY,
            entities: ['**/*.entity.js'],
            options: {
                trustServerCertificate: true
            },
            migrationsRun: true,
            entities: ['**/*.entity.js'],
            ssl: {
                rejectUnauthorized: false
            },
        })
        break;
    default :
        throw new Error('unknown environment');
}

module.exports = dbConfig;