const express = require("express")
const router = express.Router()
const Post = require("../models/postModel")

router.get('/getAllPosts', async (req, res) => {
    try {
        const posts = await Post.getAllPosts()
        res.send(posts)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router