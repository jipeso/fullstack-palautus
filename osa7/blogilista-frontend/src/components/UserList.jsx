import { useSelector } from 'react-redux'

const UserList = () => {
	const blogs = useSelector(state => state.blogs)
	
	const blogCounts = blogs.reduce((acc, blog) => {
		const username = blog.user.username
		acc[username] = (acc[username] || 0) + 1
		return acc
	}, {})

	const usersBlogs = Object.keys(blogCounts)

	return (
		<div>
			<h2>users</h2>
			<table>
				<thead>
					<tr>
						<th></th>
						<th>blogs created</th>
					</tr>
				</thead>
				<tbody>
					{usersBlogs.map(username => (
						<tr key={username}>
							<td>{username}</td>
							<td>{blogCounts[username]}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default UserList
