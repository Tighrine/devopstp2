const express = require('express')
const app = express()
//const bodyParser = require('body-parser')
const router = express.Router()
const cors = require('cors')
const corsOption = {
    origin: "*"
}

app.use(cors())
app.set('view engine', 'pug')
app.use(express.urlencoded())
app.use(router)
app.set('views', __dirname + '/views')

const mysql = require('mysql')
const connection = mysql.createConnection({
    host            : process.env.DATABASE_HOST,
    port            : process.env.MYSQL_PORT,
    user            : process.env.MYSQL_USER,
    password        : process.env.MYSQL_PASSWORD,
    database        : process.env.MYSQL_DATABASE
})

connection.connect((err, con) => {
    if(err){
		console.error("error connecting: " + err.stack);
		return process.exit(22); 
	}
	console.log("connected as id " + connection.threadId);
})

router.get('/', cors(corsOption) ,(req, res) => {
    connection.query("SELECT first_name, last_name,email FROM user;", (err, result, fields) => {
        res.render('index', { title: 'Hey', message: 'Hello there!', users: result })
    })
})

router.post('/', (req, res) => {
    
    console.log(req.body)

    const first_name = req.body.surname
    const last_name = req.body.name
    const password = req.body.password
    const email = req.body.email

    connection.query(`INSERT INTO user (first_name, last_name, password, email) 
                VALUES('${first_name}', '${last_name}', '${password}', '${email}')`, 
        (err, result, fields) => {
            if(err)
                throw err
            res.redirect('/')  
        })
})

app.listen(80, () => {
    console.log("Listening on localhost:80")
})
