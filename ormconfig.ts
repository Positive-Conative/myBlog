const ORMCONFIG = {
   "type": "mysql",
   "host": process.env.DB_HOST,
   "port": process.env.DB_PORT,
   "username": process.env.DB_USER_NAME,
   "password": process.env.DB_PASSWORD,
   "database": process.env.DB_NAME,
   "synchronize": true,
   "logging": false,

   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   },
   //  "entities": ["src/models/entitys/**/*.js"]
   "entities": ["src/models/entitys/**/*"]
}

if(process.env.SERVICE_TYPE === 'DEVELOP') {
   ORMCONFIG.entities[0] += ".ts";
} else if(process.env.SERVICE_TYPE === 'MASTER') {
   ORMCONFIG.entities[0] += ".js";
}

module.exports = ORMCONFIG