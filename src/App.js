import React, { Component } from 'react';
import './index.css';
import Toolbar from './components/Toolbar'
import Messages from './components/Messages'
import messages from './db/seeds'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: messages
    }
  }

  toggleStar = (message) => {
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

  toggleAttr(attribute, bool) {
    this.state.messages.forEach((message, i) => {
      this.setState((prevState) => {
        prevState.messages[i][attribute] = bool
      })
    })
  }

  selectDeselect = (numSelected) => {
    if (numSelected === this.state.messages.length) {
      this.toggleAttr('selected', false)
    } else {
      this.toggleAttr('selected', true)
    }
  }

  markRead = () => {
    this.state.messages.forEach((message, i) => {
      if (message.selected && !message.read) {
        this.setState((prevState) => {
          prevState.messages[i].read = true
        })
      }
    })
  }

  markUnread = () => {
    this.state.messages.forEach((message, i) => {
      if (message.selected && message.read) {
        this.setState((prevState) => {
          prevState.messages[i].read = false
        })
      }
    })
  }

  deleteMessage = () => {
    for (let i = this.state.messages.length; i > 0; i--) {
      if (this.state.messages[i - 1].selected) {
        this.setState((prevState) => {
          prevState.messages.splice(i - 1,1)
        })
      }
    }
  }

  addLabel = (label) => {
    this.state.messages.forEach((message, i) => {
      if(message.selected && !message.labels.filter((tag, j) => message.labels[j] === label).length) {
        this.setState((prevState) => {
          prevState.messages[i].labels.push(label)
        })
      }
    })
  }

  removeLabel = (label) => {
    this.state.messages.forEach((message, i) => {
      if(message.selected && message.labels.filter((tag, j) => message.labels[j] === label).length) {
        this.setState((prevState) => {
          var index = prevState.messages[i].labels.indexOf(label)
          prevState.messages[i].labels.splice(index, 1)
        })
      }
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
                 removeLabel={this.removeLabel.bind(this)}/>

        <Messages messages={this.state.messages}
                  toggleStar={this.toggleStar.bind(this)}
                  toggleSelect={this.toggleSelect.bind(this)}/>
      </div>
    );
  }
}

export default App;
