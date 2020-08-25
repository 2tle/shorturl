var express = require('express');
var router = express.Router();
var ShortURL = require('../models/shorturl.js')

/* GET home page. */
router.get('/', (req, res) => {
    res.render('index');
});
router.get('/:short', (req,res) => {
    ShortURL.findOne({shorturl: req.params.short}, (err,shorturl) => {
        if(err) res.send('오류발생.');
        res.redirect(shorturl.rawurl);
    });
});
router.post('/createURL/l',(req,res) => {
    ShortURL.findOne({rawurl:req.body.raw}, (err,shorturl) => {
        //if(typeof(shorturl) == "Object")
        if(shorturl.rawurl) {
            res.status(200).json({shortURL: shorturl.shorturl});
        } else {
            var sht = (Math.random()+Math.random()).toString(36).substring(2);
            ShortURL.findOne({shorturl: sht}, (err1,shorturl1) => {
                if(shorturl1.shorturl) res.status(500).json({err:'Error'});
                else {
                    var stul = new ShortURL();
                    stul.shorturl = sht;
                    stul.rawurl = req.body.raw;
                    stul.save((err) => {
                        if(err) res.status(500).json({err:'Error'});
                        else res.status(200).json({shortURL: stul});
                    });
                }
            });
        }
    });
});
module.exports = router;
