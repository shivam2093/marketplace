const express = require('express');
const router = express.Router();
const User = require('./models/user');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('./config/keys')
const requireLogin = require('./middleware/requireLogin')
const myData = require('./models/mongoose');
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const crypto = require('crypto')

//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

const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:"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"
    }
}))

router.get('/protect',requireLogin, (req, res) => {

    res.send("hello");
})

router.get('/logout', (req, res) => {
    res.cookie('jwt', '', {maxAge: 1})
})

router.get('/:id', requireLogin ,(req, res) => {

User.findOne({_id: req.params.id})

.then(user => {
myData.find({postedBy: req.params.id})
.populate("postedby", "_id name")
.exec((err, posts) => {
    if(err) {
        return res.status(422).json({error: err})
    }
    res.json({user, posts})
})
}).catch(err =>{
    return res.status(404).json({error: 'User not found'})
})    

})
router.post('/signup', (req, res) => {

    const { name, email, password, pic } = req.body;
    
   
   if((!/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password))){
        return res.status(403).json({error: "password atleast 8 character long with one uppercase, speacial character and digit required "})
    } else if(!name){
        return res.status(403).json({error: "add profile picture"})
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({
                    error: "User already exist"
                }
                 
                )
            }
            bcrypt.hash(password, 7)
                .then(hashedPassword => {
                    const user = new User({
                        email,
                        password : hashedPassword,
                        name,
                        img:pic
                    })        
                    user.save()
                    .then(user => {
                        transporter.sendMail({
                            to:user.email,
                            from:'shivam.patel2093@yahoo.in',
                            subject:'signup success',
                            html:'welcome to Buy/sell'
                        })
                      //  console.log(user.email)
                        res.json({message: "Saved"})
                    }).catch(error => {
                            console.log(error)
                    })
                })
              
        })
        .catch(error => {
            console.log(error)
        })
 
})

router.post('/signin', (req, res) => {
    const {email, password} = req.body
    if (!email || !password) {
        res.status(422).json({error: "Please add email and password "})
    }
    User.findOne({ email: email })
        .then(savedUser => {
        if (!savedUser) {
            return res.status(422).json({
               error: "Invalid Email or password"
           })
        }

        bcrypt.compare(password, savedUser.password)
            .then(doMatch => {
                if (doMatch) {
                    // res.json({message: "success signin"})
                    const token = jwt.sign({_id: savedUser._id}, 'MYSECRET');
                    const {_id,name, email, img} = savedUser
                    return res.json({ token, user: {_id,name, email, img} });
                
                }
                else {
                    return res.status(422).json({error: "Invalid Email or password"})
                }
            }).catch(err => {
            console.log(err)
        })
    })
})

 router.post('/reset-pass', (req, res) => {
    crypto.randomBytes(32, (err, buffer) => {
        if(err){
            console.log(err)

        }
        // hexa to string
        const token = buffer.toString("hex")
        User.findOne({email : req.body.email})
        .then(user => {
            if(!user){
                return res.status(422).json({
                    error: "User doesn't exist"
                })
            }
            user.resetToken = token;
            user.expireToken = Date.now() + 3600000
            user.save().then((result) => {
                transporter.sendMail({
                    to: user.email,
                    from: 'shivam.patel2093@yahoo.in',
                    subject:'password reset',
                    html:`you requested for password reset
                  <h5> click in this  <a href = "http://localhost:3000/reset/${token}">link</a>to reset password</h5>`
                })
                res.json({message: 'check email', token})
            })
        })
    
    })
})

router.post('/new-pass', (req,res) => {

const newPassword = req.body.password;
const sentToken = req.body.token; 

User.findOne({resetToken: sentToken,
     expireToken:{
    $gt: Date.now()
}})
.then(user => {
    if(!user){
        return res.status(422).json({error: "Try again session expired"})
    }
    bcrypt.hash(newPassword, 12).then(hashedPassword => {
        user.password = hashedPassword 
        user.resetToken = undefined
        user.expireToken = undefined
        user.save().then((savedUser)=>{
            res.json({message: "password updated success"})
        })
    })
}).catch(err=>{
    console.log("this is my error",err)
})


})



module.exports = router