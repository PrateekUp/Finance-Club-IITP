const express = require('express')
const path = require('path')
const Article = require('./../models/article')
const router = express.Router()

router.get('/:id', async (req, res) => {
    // res.send('I m working')
    const article = await Article.findById(req.params.id)
    if (article == null) res.redirect('/')
    res.render('show', { article: article })
})

router.post('/blogs', async (req, res) => {
    const article = Article
    article = await article.save()
    res.redirect(`articles/${article.id}`)

})

module.exports = router
