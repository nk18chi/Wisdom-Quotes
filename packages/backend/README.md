## Command

```
npx prisma generate
npx prisma db push

nest g resource user
```

```
if you want to see query log
export DEBUG="prisma*"
```

## Note

### Use local MongoDB

```
vim /opt/homebrew/etc/mongod.conf
// add the following in the mongod.conf
replication:
  replSetName: "rs0"

brew services stop mongodb-community
mongod --port 27017 --dbpath /opt/homebrew/var/mongodb/ --replSet rs0 --bind_ip localhost,HomeHost

// open a new tab
rs.initiate({_id: 'rs0', members: [{_id: 0, host: 'localhost:27017'}]});
```

https://github.com/prisma/prisma/issues/8266#issuecomment-1133644139
