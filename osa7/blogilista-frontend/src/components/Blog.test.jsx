import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'

test('renders title and author but not likes and url', () => {
	const blog = {
		title: 'Testing blog rendering',
		author: 'Author One',
		likes: '4',
		url: 'test.com',
	}
	const user = {
		username: 'root',
	}

	const mockLiker = vi.fn()
	const mockRemover = vi.fn()

	render(
		<Blog
			blog={blog}
			handleLikeClick={mockLiker}
			handleRemoveClick={mockRemover}
			user={user}
		/>,
	)

	const element = screen.getByText('Testing blog rendering Author One')
	expect(element).toBeDefined()

	const hiddenElement = screen.queryByText('test.com likes 4')
	expect(hiddenElement).toBeNull()
})

test('clicking show button renders likes, url and user'),
	async () => {
		const blog = {
			title: 'Testing blog rendering',
			author: 'Author One',
			likes: '4',
			url: 'test.com',
		}
		const user = {
			username: 'root',
		}

		const mockLiker = vi.fn()
		const mockRemover = vi.fn()

		render(
			<Blog
				blog={blog}
				handleLikeClick={mockLiker}
				handleRemoveClick={mockRemover}
				user={user}
			/>,
		)

		const hiddenElement = screen.queryByText('test.com likes 4')
		expect(hiddenElement).toBeNull()

		const mockUser = userEvent.setup()
		const showButton = screen.getByText('show')
		await mockUser.click(showButton)

		const element = screen.getByText('test.com likes 4')
		expect(element).toBeDefined()
	}

test('clicking like button twice calls correct event handler twice'),
	async () => {
		const blog = {
			title: 'Testing blog rendering',
			author: 'Author One',
			likes: '4',
			url: 'test.com',
		}
		const user = {
			username: 'root',
		}

		const mockLiker = vi.fn()
		const mockRemover = vi.fn()

		render(
			<Blog
				blog={blog}
				handleLikeClick={mockLiker}
				handleRemoveClick={mockRemover}
				user={user}
			/>,
		)

		const mockUser = userEvent.setup()

		const showButton = screen.getByText('show')
		await mockUser.click(showButton)

		const likeButton = screen.getByText('like')

		await mockUser.click(likeButton)
		expect(mockLiker.mock.calls).toHaveLength(1)
		await mockUser.click(likeButton)
		expect(mockLiker.mock.calls).toHaveLength(2)
	}
