import React, { Component } from 'react';
import './index.css';
import Toolbar from './components/Toolbar'
import Messages from './components/Messages'
import ComposeForm from './components/Compose'
const baseURL = 'http://localhost:8082/api'
const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}

class App extends Component {

  state = {
    messages: [],
    showCompose: false
  }

  async componentWillMount() {
    try {
      const response = await fetch(`${baseURL}/messages`)
      const json = await response.json()
      this.setState({messages: json._embedded.messages})
    } catch(err) {
      console.log(err);
    }
  }

  toggleStar = (message) => {

    let newStar = !message.starred
    let body = {
      "messageIds": [ message.id ],
      "command": "star",
      "star": newStar
    }

    fetch(`${baseURL}/messages`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers
    })

    this.setState((prevState) => {
      var current = prevState.messages.indexOf(message)
      prevState.messages[current].starred ?
        prevState.messages[current].starred = false :
        prevState.messages[current].starred = true
    })
  }

  toggleSelect = (message) => {
    this.setState((prevState) => {
      var current = prevState.messages.indexOf(message)
      prevState.messages[current].selected ?
        prevState.messages[current].selected = false :
        prevState.messages[current].selected = true
    })
  }

  selectDeselect = (numSelected) => {
    if (numSelected === this.state.messages.length) {
      this.toggleAttr('selected', false)
    } else {
      this.toggleAttr('selected', true)
    }
  }

  toggleAttr(attribute, bool) {
    this.state.messages.forEach((message, i) => {
      this.setState((prevState) => {
        prevState.messages[i][attribute] = bool
      })
    })
  }

  markRead = () => {
    this.state.messages.forEach((message, i) => {
      if (message.selected && !message.read) {
        let body = {
          "messageIds": [ message.id ],
          "command": "read",
          "read": true
        }

        fetch(`${baseURL}/messages`, {
          method: 'PATCH',
          body: JSON.stringify(body),
          headers
        })

        this.setState((prevState) => {
          prevState.messages[i].read = true
        })
      }
    })
  }

  markUnread = () => {
    this.state.messages.forEach((message, i) => {
      if (message.selected && message.read) {
        let body = {
          "messageIds": [ message.id ],
          "command": "read",
          "read": false
        }

        fetch(`${baseURL}/messages`, {
          method: 'PATCH',
          body: JSON.stringify(body),
          headers
        })

        this.setState((prevState) => {
          prevState.messages[i].read = false
        })
      }
    })
  }

  deleteMessage = () => {

    let toBeDeleted = []

    this.state.messages.forEach(message => {
      return message.selected ? toBeDeleted.push(message.id) : null
    })

    let body = {
      "messageIds": toBeDeleted,
      "command": "delete"
    }

    fetch(`${baseURL}/messages`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers
    })

    for (let i = this.state.messages.length; i > 0; i--) {
      if (this.state.messages[i - 1].selected) {
        this.setState((prevState) => {
          prevState.messages.splice(i - 1, 1)
        })
      }
    }
  }

  addLabel = (label) => {
    this.state.messages.forEach((message, i) => {
      if(message.selected && !message.labels.includes(label)) {
        let body = {
          "messageIds": [ message.id ],
          "command": "addLabel",
          "label": label
        }

        fetch(`${baseURL}/messages`, {
          method: 'PATCH',
          body: JSON.stringify(body),
          headers
        })

        this.setState((prevState) => {
          prevState.messages[i].labels.push(label)
        })
      }
    })
  }

  removeLabel = (label) => {
    this.state.messages.forEach((message, i) => {
      if(message.selected && message.labels.includes(label)) {

        let body = {
          "messageIds": [ message.id ],
          "command": "removeLabel",
          "label": label
        }

        fetch(`${baseURL}/messages`, {
          method: 'PATCH',
          body: JSON.stringify(body),
          headers
        })

        this.setState((prevState) => {
          var index = prevState.messages[i].labels.indexOf(label)
          prevState.messages[i].labels.splice(index, 1)
        })
      }
    })
  }

  toggleCompose = () => {
    this.setState( {showCompose: !this.state.showCompose} )
  }

  sendMessage = async (data) => {
    const response = await fetch(`${baseURL}/messages`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers
    })
    let newMessage = await response.json()
    let messages = [...this.state.messages, newMessage]
    this.setState({
      messages,
      showCompose: false
    })
  }

  render() {
    return (
      <div>
        <Toolbar messages={this.state.messages}
                 selectDeselect={this.selectDeselect.bind(this)}
                 markRead={ this.markRead.bind(this)}
                 markUnread={this.markUnread.bind(this)}
                 deleteMessage={this.deleteMessage.bind(this)}
                 addLabel={this.addLabel.bind(this)}
                 removeLabel={this.removeLabel.bind(this)}
                 toggleCompose={this.toggleCompose.bind(this)}
                 sendMessage={this.sendMessage.bind(this)}/>
        {
          this.state.showCompose ?
            <ComposeForm sendMessage={this.sendMessage.bind(this)}
                         toggleCompose={ this.toggleCompose.bind(this) }/> :
            null
        }

        <Messages messages={this.state.messages}
                  toggleStar={this.toggleStar.bind(this)}
                  toggleSelect={this.toggleSelect.bind(this)}/>
      </div>
    );
  }
}

export default App;
