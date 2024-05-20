
const styles = {
  color: 'red',
  background: 'lightgrey',
  border: '4px solid red',
  borderRadius: 10,
  padding: 10,
  marginBottom: 10
}

const BadNotification = ({message}) => {
  if (!message) {
      return null
  }

  return (
      <div style={styles}>
          {message}
      </div>
  )
}

export default BadNotification