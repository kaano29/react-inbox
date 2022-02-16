import React from 'react';

const Message = ({ msgList, setMsgList }) => {

    const fillMessages = (msg, index) => {

        const handleStar = () => {
            setMsgList(
                msgList.map((m) =>
                    m.id === msg.id ? { ...m, starred: !m.starred } : m
                ))
        }

        const handleSelected = () => {
            setMsgList(
                msgList.map((m) =>
                    m.id === msg.id ? { ...m, selected: !m.selected } : m
                ))
        }

        return (
            <div className={`row message ${msg.read ? "read" : "unread"} ${msg.selected && "selected"}`} key={index}>
                <div className="col-xs-1">
                    <div className="row">
                        <div className="col-xs-2">
                            <input type="checkbox" checked={msg.selected ? "checked" : ""} onChange={handleSelected}/>
                        </div>
                        <div className="col-xs-2" >
                            <i className={msg.starred ? "star fa fa-star" : "star fa fa-star-o"} onClick={handleStar}></i>
                        </div>
                    </div>
                </div>
                <div className="col-xs-11">
                    {Array.isArray(msg.labels) && msg.labels.map((label, i) => <span className="label label-warning" key={i}>{label}</span>)}
                    <a href="#">
                        {msg.subject}
                    </a>
                </div>
            </div>)
    }


    return (
        msgList.map((msg, index) => fillMessages(msg, index))
    )
}

export default Message;