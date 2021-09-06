const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
 
//create schema

const schema =  new mongoose.Schema({

    //_id: mongoose.Schema.Types.ObjectId,
    img: {
        type: String,
        required: true
    } ,
    title: String,
    category: String,
    condition: String,
    description: String,
    price: Number,
    postedby: {

        type: ObjectId,
        ref:"User"

    } 
    
    
});


// schema.set('toJSON', {
//     TransformStream : (doc, returnObject) => {
        
//         returnObject.id = returnObject._id.toString();
//         delete returnObject._id;
//         delete returnObject.__v;
//     },
// })


// export schema to wrap with objects gives constructor build on schema

module.exports = mongoose.model('myData', schema);