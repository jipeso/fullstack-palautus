const Notification = ({ errorMessage, successMessage }) => {
  const message = errorMessage || successMessage
  if (!message) return null

  return <div className={errorMessage ? "error" : "success"}>{message}</div>
}

export default Notification