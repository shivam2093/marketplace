const jwt = require('jsonwebtoken')
const User = require('../models/user');

module.exports = (req, res, next) => {

    const {authorization} = req.headers
    if (!authorization) {
       return res.status(401).json({
            error: "you must be logged in"
        })
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,'MYSECRET', (err, payload) => {
        if (err) {
            console.log(err)
            return res.status(401).json({
                error:"must be logged in"
            }) 
        }

        const { _id } = payload
        User.findById(_id).then(userdata => {
            req.user = userdata
            next()
        })
               
    })
}