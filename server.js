const express = require('express')
const bodyParser = require('body-parser')

const { User, Post } = require('./models')

const app = express();

app.use(bodyParser.json())

// USERS

app.post('/users', async (req, res) => {
    try {
        let payload = req.query
        const createUser = await User.create({ firstName: payload.firstName, lastName: payload.lastName, email: payload.email, userName: payload.userName, githubLink: payload.githubLink})
        res.json(createUser)
    } catch(e) {
        console.log(e)
        res.status(400).send('Something went wrong :' + e)
    }
})

app.patch('/users/:id', async (req, res) => {
    try {
        let payload = req.query
        const updateUser = await User.update({ firstName: payload.firstName, lastName: payload.lastName, email: payload.email, userName: payload.userName, githubLink: payload.githubLink}, {
            where: {
                id: req.params.id
            }
        });
        res.json(updateUser)
    } catch(e) {
        console.log(e.message)
        res.status(400).send('Something went wrong :' + e)
    }
})

app.get('/users', async (red, res) => {
    try {
        const getUsers = await User.findAll();
        res.json(getUsers)
    } catch(e) {
        console.log(e)
        res.status(400).send('Something went wrong :' + e)
    }
})

app.get('/users/:id', async (req, res) => {
    try {
        const getUser = await User.findOne({
            where: {
                id: req.params.id
            }
        })
        res.json(getUser)
    } catch(e) {
        console.log(e)
        res.status(400).send('Something went wrong :' + e)
    }   
})

app.delete('/users/:id', async (req, res) => {
    try {
        const deleteUser = await User.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json(deleteUser)
    } catch(e) {
        console.log(e)
        res.status(400).send('Something went wrong :' + e)
    }
})

// POSTS

app.post('/posts', async (req, res) => {
    try {
        let payload = req.query
        const createPost = await Post.create({ title: payload.title, content: payload.content, author: payload.author})
        res.json(createPost)
    } catch(e) {
        console.log(e)
        res.status(400).send('Something went wrong :' + e)
    }
})

app.listen(3010)