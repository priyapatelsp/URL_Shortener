const express=require('express');
const router=express.Router();
const Url = require('../models/URLSchema');

const validUrl=require('valid-url');
const shortId=require('shortid');
const config=require('config');


router.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;
    const baseUrl = config.get('baseURL');
  
    if (!validUrl.isUri(baseUrl)) {
      return res.status(401).json('invalid base url');
    }
  

    const urlCode = shortId.generate();
  
    if (validUrl.isUri(longUrl)) {
      try {
        let url = await Url.findOne({ longUrl });
        if (url) {
          res.json(url);
        } else {
          const shortUrl = baseUrl + '/' + urlCode;
  
          url = new Url({
            longUrl,
            shortUrl,
            urlCode,
            date: new Date(),
          });
          await url.save();
          res.json(url);
        }
      } catch (error) {
        console.log(error);
        res.status(500).json('server error');
      }
    } else {
      res.status(401).json('Invalid long url');
    }
  });
  
  module.exports = router;