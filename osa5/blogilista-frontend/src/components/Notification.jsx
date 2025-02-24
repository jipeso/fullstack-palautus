import PropTypes from 'prop-types'

const Notification = ({ errorMessage, successMessage }) => {
  const message = errorMessage || successMessage
  if (!message) return null

  return <div className={errorMessage ? 'error' : 'success'}>{message}</div>
}

Notification.propTypes = {
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string
}

export default Notification