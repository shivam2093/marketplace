
const express = require('express');
// different routes for endpoints
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const multer = require('multer');
const requireLogin = require('./middleware/requireLogin')


// const storage = multer.diskStorage({

//     destination: function (req, file, cb) {
//         cb(null, 'uploads');
//     },
//     filename: function (req, file, cb) {

//         cb(null, file.originalname);
//     }
// });



// const upload = multer({ storage: storage });
const myData = require('./models/mongoose');

// const { urlencoded } = require('express');

/*
 Installed nodemon for monitor all files and no need to call everytime
 node server.js because it restart automatically when we change something
 */
// post only see who login as a user

router.get('/mypost', requireLogin, (req, res) => {
    
    myData.find({ postedby: req.user._id })
        .populate("postedby", "_id img name")
        .then(mypost => {
        res.json({mypost})
        }).catch(err => {
        console.log(err)
    })
})


// all item details 
router.get('/', async (req, res, next) => {

    myData.find().populate("postedby","_id name email img")
        .select('_id img title category condition description price ').exec().then(docs => {
 
        res.json({docs});
      
    }).catch(err => {

        console.log(err);
        res.status(500).json({
            error: err
        });
    })

    /*
    res.status(200).json({
        message: 'request '
        })
*/

});

// post method for details stored
router.post('/',requireLogin, (req, res, next) => {
   
    // store data with instance
   //var imgFile = req.file.filename;
    const { pic, title, category, condition, description, price} = req.body
    if (!title && !pic && !price) {
        return res.status(422).json({error:"Please add all fields"})
    }
  //  req.user.password = undefined

    const detail = new myData({
    
        //_id: new mongoose.Types.ObjectId(),
        //img: imgFile,
         img:pic,
         title,
         category,
         condition,
         description,
         price,
         postedby:req.user
    
    });
  
    //save is method provide by mongoose
    detail.save().then(result => {

        //console.log(result);
        res.status(201).json({

            message: "POST",
            detail: result
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    });
    // // res.status(200).json({

    //     message: 'POST ',
    //     detail: detail
    // })

});


router.post('/search', (req, res) => {
    
    let usePattern = new RegExp("^" + req.body.query)
    console.log("data",req.body.query)
    myData.find({title:{$regex:usePattern}})
        .select("_id title category")
        .then(user => {
            res.json({ user })
              
            }).catch(err => {
                console.log(err)
  })  
})

router.delete('/deletepost/:postId',requireLogin, (req, res) => {

    myData.findOne({ _id: req.params.postId })
        .populate("postedby","_id")
        .exec((err, post) => {
            if (err || !post) {
                return res.status(422).json({error: err})
            }
            if (post.postedby._id.toString() === req.user._id.toString()) {
                post.remove()
                    .then(result => {
                    res.json({message:'successfully deleted'})
                    }).
                    catch(err => {
                    console.log(err)
                })
            }
        })


})


router.get('/:itemId', (req, res, next) => {

    const id = req.params.itemId;

    myData.findById(id).exec().then(doc => {
        console.log(doc);

        if (doc) {
            res.status(200).json({ doc });

        } else {
            res.status(404).json({ message: "Not valid id" });
        }

    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    });


    router.patch("/:itemId", (req, res, next) => {

        const id = req.params.itemId;
        const updateValue = {};

        for (const up of req.body) {
            updateValue[up.propName] = up.value;

        }

        myData.updateMany({ _id: id }, {
            $set: updateValue
        }).exec().then(result => {
            console.log(result);
            res.status(200).json(result);
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })

        res.status(200).json({

        })
    })

    router.delete("/:itemId", (req, res, next) => {
        //get that id
        const id = req.params.itemId;
        myData.remove({
            _id: id
        }).exec().then(result => {
            res.status(200).json(result);
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })

    })


})

       // console.log(docs);
        //     const response = {
        //         count: docs.length,
        //         detail: docs.map(doc => {
        //             return {
        //                 _id: doc._id,
        //               //   img: doc.img,
        //                 title: doc.title,
        //                  category: doc.category,
        //                  condition: doc.condition,
        //                  description: doc.description,
        //                  price: doc.price,
        //                 request: {
        //                     type: "GET",
        //                     url: "http://localhost:3000/detail/" + doc._id
        //                 }
                    
        //             }
                    
        //         })
        //     }
            
        //if (docs.length >= 0) {


module.exports = router, myData;
