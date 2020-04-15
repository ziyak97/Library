const express = require('express')
const router = express.Router()
const Author = require('../models/author')

router.get('/', async (req, res) => {
    const searchOptions = {}
    if(req.query.name) {
        searchOptions.name = new RegExp(req.query.name, 'i') 
        console.log(searchOptions)
    }
    try {
        const authors = await Author.find(searchOptions)
        res.render('./authors/index', { authors, searchOptions: req.query })
    } catch {
        res.redirect('/')
    }
})

router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() })
})

router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    try {
        await author.save()
        res.redirect('authors')
    } catch {
        res.render('authors/new', { author, errorMessage: 'Error creating Author.' })
    }
})

module.exports = router