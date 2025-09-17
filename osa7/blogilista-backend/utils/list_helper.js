const _ = require('lodash')

const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
	if (blogs.length === 0) return null

	const fav = _.maxBy(blogs, 'likes')

	return {
		title: fav.title,
		author: fav.author,
		likes: fav.likes,
	}
}

const mostBlogs = (blogs) => {
	if (blogs.length === 0) return null

	return _.maxBy(
		_.map(_.countBy(blogs, 'author'), (blogs, author) => ({
			author,
			blogs,
		})),
		'blogs',
	)
}

const mostLikes = (blogs) => {
	if (blogs.length === 0) return null

	return _.maxBy(
		_.map(_.groupBy(blogs, 'author'), (blogs, author) => ({
			author,
			likes: _.sumBy(blogs, 'likes'),
		})),
		'likes',
	)
}

module.exports = {
	dummy,
	totalLikes,
	favouriteBlog,
	mostBlogs,
	mostLikes,
}
