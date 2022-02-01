import Alert from 'react-bootstrap/Alert'

// Pass in our balance prop
const Message = ({ balance }) => {
    return (
      <div>
      {/* Use variant prop for our Alert component */}
      <Alert variant="info"> balance : {balance}</Alert>
      </div>
  )
}

export default Message