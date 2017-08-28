import React, { Component } from 'react'

class Message extends Component {
  render() {
    return <div>{mapMessages(this.props.data)}</div>
  }
}

function mapMessages(data) {
  let isRead
  let isStar

  return data.map((data) => {

    data.read ? isRead = "read" : isRead = "unread"
    data.starred ? isStar = "" : isStar = "-o"

    return (
    <div className={ "row message " + isRead } key={data.id}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" />
          </div>
          <div className="col-xs-2">
            <i className={ "star fa fa-star" + isStar}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
      <span className="label label-warning"></span>
        <a href="">
          {data.subject}
        </a>
      </div>
    </div>
    )
  })
}

export default Message
