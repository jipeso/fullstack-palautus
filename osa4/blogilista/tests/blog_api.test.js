const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const helper = require('./test_helper')

const Blog = require('../models/blog')
const User = require('../models/user')

let token = ''


describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secretpass', 10)
    const user = new User(
      {
        username: 'root',
        passwordHash
      })
    
    await user.save()

    const blogsWithUser = helper.initialBlogs.map(blog => ({
      ...blog,
      user: user._id,
    }))
  
    await Blog.insertMany(blogsWithUser)

    const response = await api
    .post('/api/login')
    .send({ username: 'root', password: 'secretpass' })
    
    token = response.body.token

  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('returned blogs contain id field', async () => {
    const response = await api.get('/api/blogs')
    
    for (let blog of response.body) {
      assert(blog.id !== undefined)    
    }
  })  
})

describe('addition of a new blog', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secretpass', 10)
    const user = new User(
      {
        username: 'root',
        passwordHash
      })
    
    await user.save()

    const blogsWithUser = helper.initialBlogs.map(blog => ({
      ...blog,
      user: user._id,
    }))
  
    await Blog.insertMany(blogsWithUser)

    const response = await api
    .post('/api/login')
    .send({ username: 'root', password: 'secretpass' })
    
    token = response.body.token

  })

  test('succeeds with valid data', async () => {
    const newBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

    assert(titles.includes('Canonical string reduction'))
  })

  test('succeeds without likes and initializes them to 0', async () => {
    const newBlog = {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: null,
    }

    const resultBlog = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(resultBlog.body.likes, 0)
  })

  test('fails with status code 400 if missing title', async () => {
    const newBlog = {
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
    
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('fails with status code 400 if missing url', async () => {
    const newBlog = {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })  
})

describe('deletion of a blog', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secretpass', 10)
    const user = new User(
      {
        username: 'root',
        passwordHash
      })
    
    await user.save()

    const blogsWithUser = helper.initialBlogs.map(blog => ({
      ...blog,
      user: user._id,
    }))
  
    await Blog.insertMany(blogsWithUser)

    const response = await api
    .post('/api/login')
    .send({ username: 'root', password: 'secretpass' })
    
    token = response.body.token

  })
  
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    const titles = blogsAtEnd.map(r => r.title)
    assert(!titles.includes(blogToDelete.title))

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
  })
  
  test('fails with status code 401 without token', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })    

  
})

describe('updating an existing blog', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secretpass', 10)
    const user = new User(
      {
        username: 'root',
        passwordHash
      })
    
    await user.save()

    const blogsWithUser = helper.initialBlogs.map(blog => ({
      ...blog,
      user: user._id,
    }))
  
    await Blog.insertMany(blogsWithUser)

    const response = await api
    .post('/api/login')
    .send({ username: 'root', password: 'secretpass' })
    
    token = response.body.token

  })

  test('succeeds with valid data', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1}

    const resultBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(resultBlog.body.likes, blogToUpdate.likes + 1)
    assert.strictEqual(blogsAtStart.length, blogsAtEnd.length)
  })  
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secretpass', 10)
    const user = new User(
      {
        username: 'root',
        passwordHash
      })
    
    await user.save()
  })

  test('creation succeeds with a unique username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'testeri',
      name: 'Tester',
      password: 'secret'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'secret',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test.only('creation fails with too short username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'r',
      name: 'user',
      password: 'secret',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('Username must be at least 3 characters long'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test.only('creation fails with too short password', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'user',
      name: 'user',
      password: 's',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('Password must be at least 3 characters long'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })  
})

after(async () => {
  await User.deleteMany({})
  await mongoose.connection.close()
})
