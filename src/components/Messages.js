import React, { Component } from 'react'
import Message from './Message'

class Messages extends Component {
  render() {
    return (
      <Message data={this.props.data}/>
    )
  }
}

export default Messages
