import React from 'react'

const Toolbar = ({
  messages,
  selectDeselect,
  markRead,
  markUnread,
  deleteMessage,
  addLabel,
  removeLabel,
  sendMessage,
  toggleCompose
}) => {

    const unread = messages.filter((item) => item.read === false).length
    const selectedMessages = messages.filter((item) => item.selected === true).length
    var disableToolbar = !selectedMessages ? true : false
    var allRead

    switch (selectedMessages) {
      case messages.length:
        allRead = 'fa-check-square-o'
        break;
      case 0:
        allRead = 'fa-square-o'
        break;
      default:
        allRead = 'fa-minus-square-o'
    }

    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{unread}</span>
            unread messages
          </p>

          <a className="btn btn-danger" onClick={ () => toggleCompose() }>
            <i className="fa fa-plus"></i>
          </a>

          <button className="btn btn-default" onClick={ () => selectDeselect(selectedMessages) }>
            <i className={`fa ${allRead}`}></i>
          </button>

          <button className="btn btn-default" onClick={() => markRead()} disabled={ disableToolbar }>Mark As Read</button>

          <button className="btn btn-default" onClick={() => markUnread()} disabled={ disableToolbar }>Mark As Unread</button>

          <select className="form-control label-select" onChange={(e) => addLabel(e.target.value)} disabled={ disableToolbar } defaultValue="none">
            <option disabled="true" value="none">Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" onChange={(e) => removeLabel(e.target.value)} disabled={ disableToolbar } defaultValue="none">
            <option disabled="true" value="none">Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" onClick={ () => deleteMessage() } disabled={ disableToolbar }>
            <i className="fa fa-trash-o"></i>
          </button>

        </div>
      </div>
    )
}

export default Toolbar
