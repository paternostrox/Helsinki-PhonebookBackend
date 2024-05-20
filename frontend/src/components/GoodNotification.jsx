const styles = {
  color: 'green',
  background: 'lightgrey',
  border: '4px solid green',
  borderRadius: 10,
  padding: 10,
  marginBottom: 10
}

const GoodNotification = ({message}) => {
  if (!message) {
      return null
  }

  return (
      <div style={styles}>
          {message}
      </div>
  )
}

export default GoodNotification