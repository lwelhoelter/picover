const router = require('express').Router()
const { User, Photo } = require('../db')
const multer = require('multer');

// Set storage engine 

const storage = multer.diskStorage({
  destination: './'
})


router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.send(users)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
    try {
        const photos = await Photo.findAll();
        res.send(photos)
    } catch (error) {
        next(error)
    }
})


module.exports = router