import { useDispatch } from 'react-redux'

import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks'

const BlogForm = ({ blogFormRef }) => {
	const dispatch = useDispatch()
	const title = useField('text')
	const author = useField('text')
	const url = useField('text')

	const onCreate = event => {
		event.preventDefault()

		dispatch(
			createBlog({
				title: title.value,
				author: author.value,
				url: url.value,
			})
		)
		dispatch(
			setNotification(
				`a new blog ${title.value} by ${author.value} added`
			)
		)

		blogFormRef.current.toggleVisibility()

		title.reset()
		author.reset()
		url.reset()
	}

	const excludeReset = ({ reset, ...props }) => props

	return (
		<form onSubmit={onCreate}>
			<div>
				title
				<input
					{...excludeReset(title)}
					data-testid="title-input"
					id="title-input"
				/>
			</div>
			<div>
				author
				<input
					{...excludeReset(author)}
					data-testid="author-input"
					id="author-input"
				/>
			</div>
			<div>
				url
				<input
					{...excludeReset(url)}
					data-testid="url-input"
					id="url-input"
				/>
			</div>
			<button type="submit">create</button>
		</form>
	)
}

export default BlogForm
