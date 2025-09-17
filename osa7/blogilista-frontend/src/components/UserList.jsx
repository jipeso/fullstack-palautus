import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = () => {
	const blogs = useSelector(state => state.blogs)
	
	const blogCounts = blogs.reduce((acc, blog) => {
		const { username, id } = blog.user

		if (!acc[username]) {
			acc[username] = {
				count: 0,
				id: id
			}
		}

		acc[username].count += 1
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
							<td>
								<Link to={`/users/${blogCounts[username].id}`}>
									{username}							
								</Link>
							</td>
							<td>{blogCounts[username].count}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default UserList
