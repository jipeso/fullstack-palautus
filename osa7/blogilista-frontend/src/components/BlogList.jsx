import { useSelector, useDispatch } from 'react-redux'
import {
	likeBlog,
	toggleExpand,
	deleteBlog,
} from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogList = () => {
	const blogs = useSelector(state => state.blogs)
	const user = useSelector(state => state.user.loggedUser)

	const blogsToShow = [...blogs].sort((a, b) => b.likes - a.likes)

	const dispatch = useDispatch()

	const onRemove = async blog => {
		if (
			window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
		) {
			dispatch(deleteBlog(blog.id))
			dispatch(
				setNotification(
					`removed blog ${blog.title} by ${blog.author}`
				)
			)
		}
	}

	const handleLike = async blog => {
		dispatch(likeBlog(blog))
	}

	const handleExpand = async id => {
		dispatch(toggleExpand(id))
	}

	return (
		<div>
			{blogsToShow.map(blog => (
				<div className="blog" key={blog.id}>
					<div>
						{blog.title} {blog.author}
						<button onClick={() => handleExpand(blog.id)}>
							{blog.isExpanded ? 'hide' : 'show'}
						</button>
					</div>
					{blog.isExpanded && (
						<div>
							{blog.url} <br />
							likes {blog.likes}
							<button onClick={() => handleLike(blog)}>
								like
							</button>{' '}
							<br />
							{blog.user.name} <br />
							{blog.user.username === user.username && (
								<button onClick={() => onRemove(blog)}>remove</button>
							)}
						</div>
					)}
				</div>
			))}
		</div>
	)
}

export default BlogList
