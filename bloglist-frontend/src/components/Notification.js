import React from 'react'

const Notification = ({ message, type }) => {


  if (message === null) {
    return (<div>no message</div>)
  }
  return (
    <div className={type}>
      {message}
    </div>
  )
}

export default Notification