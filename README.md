#### Install PostgreSQL and node
```
brew install postgresql
brew install node
```

#### Start the PostgreSQL server
```
pg_ctl -D /usr/local/var/postgres start
```

#### Create the development database
```
psql -c 'create database atlas_development'
```

#### Install dependencies
```
npm install
```

#### Setup the database
```
npm run db:setup
```

#### Start the app
```
npm start
```
