import React from 'react'


const Message = ({
  message,
  toggleStar,
  toggleSelect
  }) => {

    const isRead = message.read ? 'read' : 'unread'
    const isStarred = message.starred ? 'fa-star' : 'fa-star-o'
    const isSelected = message.selected ? 'selected' : ''

    const labels = message.labels.map((label, i) => (
      <span key={i} className="label label-warning">{label}</span>
    ))

    const changeStar = () => {
      toggleStar(message)
    }

    return (
      <div className={ `row message ${ isRead } ${ isSelected }` }>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" checked={ !!message.selected } onChange={ () => toggleSelect(message) } />
            </div>
            <div className="col-xs-2" onClick={ changeStar }>
              <i className={`star fa ${ isStarred }`}></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          { labels }
          <a href="">
            { message.subject }
          </a>
        </div>
      </div>
    )
}


export default Message
