import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
	const user = userEvent.setup()
	const createBlog = vi.fn()

	const { container } = render(<BlogForm createBlog={createBlog} />)

	const titleInput = container.querySelector('#title-input')
	const authorInput = container.querySelector('#author-input')
	const urlInput = container.querySelector('#url-input')
	const createButton = screen.getByText('create')

	await user.type(titleInput, 'testing BlogForm')
	await user.type(authorInput, 'Test Author')
	await user.type(urlInput, 'test.com')
	await user.click(createButton)

	expect(createBlog.mock.calls).toHaveLength(1)
	expect(createBlog.mock.calls[0][0].title).toBe('testing BlogForm')
})
