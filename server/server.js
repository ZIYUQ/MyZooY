const express = require('express')
const path = require('path')
const db = require('./config/db')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const app = express()
app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true, parameterLimit: 50000 }))
app.use(express.json({ limit: '20mb' }))
app.use(express.urlencoded({ limit: '20mb', extended: true })); // replaces body-parser
app.use(cookieParser())

let allowedOrigins = 'http://localhost:3000'

app.use(cors({
    credentials: true, // add Access-Control-Allow-Credentials to header
    origin: function (origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            let msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.use(session({
    secret: "a secret",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())

app.use(passport.session())

const userRouter = require('./routers/userRouter')
const profileRouter = require('./routers/profileRouter')
const postRouter = require('./routers/postRouter')
const modRouter = require('./routers/modRouter')
app.use('/', userRouter)
app.use('/profile', profileRouter)
app.use('/post', postRouter)
app.use('/mod', modRouter)
app.get('*', function (req, res) {
    res.status(404).send('what???');
});


// process.on('uncaughtException', (e) => {
//     console.error('process error is:', e.message)
// })

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log('Listening on port ' + port + '...')
})