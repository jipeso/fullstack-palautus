const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes    
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true})
  response.status(200).json(updatedBlog)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'unauthorized' })
  }

  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: request.user._id
  })

  const savedBlog = await blog.save()
  request.user.blogs = request.user.blogs.concat(savedBlog._id)
  await request.user.save()

  response.status(201).json(savedBlog)

})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'unauthorized' })
  }

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() !== request.user._id.toString()) {
    return response.status(403).json({ error: 'only the owner can delete this blog' })
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter