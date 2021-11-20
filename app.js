const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs')
const cors = require('cors') 
const pageRoute = require('./router/pageRoute');
const courseRoute = require('./router/courseRoute')
const categoryRoute = require('./router/categoryRoute')
const userRoute = require('./router/userRoute')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const app = express();
app.set("view engine", "ejs")

global.userIN = null;



// Connect db
mongoose.connect('mongodb://localhost/smartedu-db', {
    
}).then(()=>{
    console.log("Bağlantı yapıldı");
}).catch(() => {
    console.log("Bağlantı hatası")
})
 
// Middlewears

app.use(express.static("public"));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors()) // Use this after the variable declaration
 

app.use(session({
    secret: 'smart_edu',
    resave : false,
    saveUninitialized : true,
    store: MongoStore.create({mongoUrl : 'mongodb://localhost/smartedu-db' })
}))

app.use(flash());
app.use((req, res, next)=> {
  res.locals.flashMessages = req.flash();
  next();
})


app.use(
    methodOverride('_method', {
        methods : ['POST', 'GET'],
    })
)


app.use('*', (req, res, next) => {
    userIN = req.session.userID;
    next()
})

app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute)
app.use('/users', userRoute)

 

const port = 3000;
app.listen(port, () => {
    console.log("Sunucu çalışıyor. Port : " + port);
})

