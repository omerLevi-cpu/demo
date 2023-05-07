const express = require('express')
const sqllite3 = require('sqlite3').verbose()
const PORT = 3000

const app = express()

//open the connection to DB
const db = new sqllite3.Database(
    './DataBase.db', sqllite3.OPEN_READWRITE, (err) => {
    if(err){
        console.error(err.message)
    }
    console.log('Connected to the DB')
})

app.get('/', (req, res) =>{
    db.all(loadUser, (err, rows) => {
        if (err) {
          console.error(err.message);
        }
        if( rows[0] === undefined) console.log('no user found')
        else console.log(rows[0].name);
      });
    console.log('logon sucsesfully')
    res.sendStatus(200).send('OK')
})

db.run(`CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT NOT NULL)`, [],(err) => {
    if(err) console.error(err.message)
    console.log('Created Sucssesfully')
})

db.run(`INSERT INTO users (id, name)
VALUES (1, 'John')`, (res, err) => {
    if(err){
        console.error(err.message)
    }
    console.log(res)
})

db.close()

app.listen(3000, () => {
    console.log(`app is listening at port: ${PORT}`)
})