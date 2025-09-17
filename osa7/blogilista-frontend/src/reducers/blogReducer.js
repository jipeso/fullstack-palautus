import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const slice = createSlice({
	name: 'blogs',
	initialState: [],
	reducers: {
		like(state, action) {
			const id = action.payload
			const toLike = state.find(s => s.id === id)
			const liked = { ...toLike, likes: toLike.likes + 1 }
			return state.map(s => (s.id === id ? liked : s))
		},
		replaceBlog(state, action) {
			const replaced = action.payload
			return state.map(s =>
				s.id === replaced.id
					? { ...replaced, isExpanded: s.isExpanded }
					: s
			)
		},
		addBlog(state, action) {
			return state.concat(action.payload)
		},
		setBlogs(state, action) {
			return action.payload
		},
		toggleExpand(state, action) {
			const id = action.payload
			return state.map(blog =>
				blog.id === id
					? { ...blog, isExpanded: !blog.isExpanded }
					: blog
			)
		},
		removeBlog(state, action) {
			const id = action.payload
			return state.filter(blog => blog.id !== id)
		},
	},
})

export const initializeBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		const blogsModified = blogs.map(blog => ({
			...blog,
			isExpanded: false,
		}))

		dispatch(setBlogs(blogsModified))
	}
}

export const createBlog = object => {
	return async dispatch => {
		const blog = await blogService.create(object)
		dispatch(addBlog(blog))
	}
}

export const likeBlog = object => {
	const toLike = { ...object, likes: object.likes + 1 }
	return async dispatch => {
		const blog = await blogService.update(toLike)
		dispatch(replaceBlog(blog))
	}
}

export const deleteBlog = id => {
	return async dispatch => {
		await blogService.remove(id)
		dispatch(removeBlog(id))
	}
}

export const {
	addBlog,
	replaceBlog,
	setBlogs,
	toggleExpand,
	removeBlog,
} = slice.actions

export default slice.reducer
