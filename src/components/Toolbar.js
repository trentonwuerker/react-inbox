import React from 'react'

const Toolbar = ({
  messages,
  selectDeselect,
  markRead,
  markUnread,
  deleteMessage
}) => {

    const unread = messages.filter((item) => item.read === false).length
    const selectedMessages = messages.filter((item) => item.selected === true).length
    var allRead


    if ( selectedMessages === messages.length) {
      allRead = 'fa-check-square-o'
    } else if ( selectedMessages === 0) {
      allRead = 'fa-square-o'
    } else {
      allRead = 'fa-minus-square-o'
    }

    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{unread}</span>
            unread messages
          </p>

          <a className="btn btn-danger">
            <i className="fa fa-plus"></i>
          </a>

          <button className="btn btn-default" onClick={ () => selectDeselect(selectedMessages) }>
            <i className={`fa ${allRead}`}></i>
          </button>

          <button className="btn btn-default" onClick={() => markRead()} >Mark As Read</button>

          <button className="btn btn-default" onClick={() => markUnread()}>Mark As Unread</button>

          <select className="form-control label-select">
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select">
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>
          <button className="btn btn-default" onClick={ () => deleteMessage() }>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
}

export default Toolbar
