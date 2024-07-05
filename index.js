const bodyParser = require('body-parser');
const express = require('express')
const app = express();
const path = require('path')
const session = require('express-session')
const flash=require('connect-flash')

var jsonParser=bodyParser.json()

const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(session)


const ShopUser = require('./models/shopUser')

const MONGODB_URI = 'mongodb+srv://Sparsh:spa123rsh@cluster0.lw6t6qn.mongodb.net/newdatabase?retryWrites=true&w=majority';
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});


app.set('view engine', 'ejs');
app.set('views', 'views');





app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store
    })
);

app.use(flash())

app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    ShopUser.findById(req.session.user._id)
        .then(user => {
            if (!user) {
                return next();
            }
            req.user = user;
            next();
        })
        .catch(err => {
            console.log(err);
        })

})

app.use('/admin', require('./routes/admin'))
app.use('/',require('./routes/home'))



mongoose.connect(MONGODB_URI)
    .then(result => {
        app.listen(3000);
        console.log('searver is started at 3000')
    })
    .catch(err => {
        console.log('server not start');
        console.log(err);
    })



    // const divgrid=document.querySelector('.prod__img')
    //             for (var key in data) {
    //                 var obj = data[key];
    //                 for (let i in obj) {
    //                     console.log(i[0].imageurl)
    //                     divgrid.src=`${i[0].imageurl}`
    //                     console.log(divgrid)
    //                 }
    //             }

    // const img = document.querySelector('.prod__img');
    //             img.innerHTML = '<div>sparh</div>'
    //             for (let i = 0; i < data.payload.length; i++) {
    //                 const img = document.createElement("img");
    //                 img.src = `${data.payload[i].imageurl}`
    //                 document.body.appendChild(img);
    //             }