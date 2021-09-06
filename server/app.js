const express = require('express');
//execute express
const app = express();
const io = require("socket.io")()
const route = require("./api/models/mongoose")
//const cors = require('cors');
// funnel all request through this middleware
const morgan = require('morgan');
//body parser to get in good format
const bodyParser = require('body-parser');
// install mongoose working with data
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Message = require('./api/models/Message')
const User = require('./api/models/user');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json());


const myproduct = require('./api/detail');
const userDetail = require('./api/users');

io.use( async (socket, next) => {

    try{
const token = socket.handshake.query.token;
const payload = await jwt.verify(token, 'MYSECRET');
    socket.userId = payload._id
next()
    } catch(err){}

});

io.on('connect', socket => {
    console.log('connected', socket.userId);

    socket.on('disconnect' ,() =>{
        console.log('disconnect', socket.userId)
    })

    socket.on("chat",   async ({id, message}) =>{
        console.log("check message",message)
   
        if(message.trim().length > 0){

        const user = await User.findOne({_id: socket.userId})
        console.log(user.name)
        const newMessage = new Message({
            user: socket.userId,
            message
        })
        io.to(id).emit("newMessage",{
            message,
            name: user.name,
            userId: socket.userId
        })

         await newMessage.save();
    }
})
})





io.listen(3001);








mongoose.connect('mongodb+srv://admin:admin@buysell-nodejs.m7ley.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
        useMongoClient: true,
         useUnifiedTopology: true,
         useNewUrlParser:true 
    }
)

app.use(morgan('dev'));



// extract URLencoded data, true: parse extended false: simple 

// extract json data and easy redable data


// CORS
app.use((req, res, next) => {
    
    //headers send response and access to any origin
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');

    // browser also send option request when POST request
    if (req.method === 'OPTIONS') {
        
        //additional header what should browser send to me, support API
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

// middleware incoming request pass through, next => move request
app.use('/detail', myproduct);
app.use('/users', userDetail);


// when request handle come to this line for errors in postman(custom error)
app.use((req, res, next) => {
    //console
    const error = new Error('Not found');
    //error status code
    error.status = 404;
    // now pass error along with it forward error
    next(error);
})


// when throw an error mostly once create the database

app.use((req, res, next) => {

    res.status(error.status || 500);
    res.json({

        error: {
            message : error.message
        }
    })

})





module.exports = app;