const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')
const { request } = require('http')
const { create } = require('domain')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: "Test User",
        username: "testuser",
        password: "password"
      }
    })

    await page.goto('')

  })
  
  test('login form is shown', async ({ page }) => {
    const locator = await page.getByText('blogs')
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'testuser', 'password')

      await expect(page.getByText('Test User logged in')).toBeVisible()      
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'testuser', 'wrongpass')

      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('wrong username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
      await expect(page.getByText('Test User logged in')).not.toBeVisible()      
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'testuser', 'password')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(
        page,
        'Example Blog',
        'Test Author',
        'example.com'
      )

      await expect(page.getByText('Example Blog Test Author')).toBeVisible()
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
          await createBlog(
            page,
            'First Blog',
            'Test Author',
            'example.com'
          )        
      })

      test('a blog can be liked', async ({ page }) => {
        const blogText = await page.getByText('First Blog Test Author')
        const blogElement = await blogText.locator('..')

        await blogElement.getByRole('button', { name: 'show'}).click()
        await expect(blogElement.getByText('likes 0')).toBeVisible()
        await blogElement.getByRole('button', {name: 'like'}).click()
        await expect(blogElement.getByText('likes 1')).toBeVisible()
      })

      test('a blog can be deleted', async ({ page }) => {
        const blogText = await page.getByText('First Blog Test Author')
        const blogElement = await blogText.locator('..')

        await blogElement.getByRole('button', { name: 'show'}).click()

        page.on('dialog', async dialog => {
          expect(dialog.message()).toEqual('Remove blog First Blog by Test Author')
          await dialog.accept()
        })

        await blogElement.getByRole('button', { name: 'remove'}).click()
        await expect(blogText).not.toBeVisible()

      })

      test('remove button is visible only to the user who added the blog',
        async ({ page, request }) => {
          const blogText = await page.getByText('First Blog Test Author')
          const blogElement = await blogText.locator('..')

          await blogElement.getByRole('button', { name: 'show'}).click()
          await expect(blogElement.getByRole('button', { name: 'remove' })).toBeVisible()

          await page.getByRole('button', { name: 'logout'}).click()
          await page.getByRole('button', { name: 'cancel'}).click()

          await request.post('/api/users', {
            data: {
              name: "Test User 2",
              username: "testuser2",
              password: "password"
            }
          })

          await loginWith(page, 'testuser2', 'password')
          await blogElement.getByRole('button', { name: 'show'}).click()
          await expect(blogElement.getByRole('button', { name: 'remove' })).not.toBeVisible()
      })
    })
  })
})