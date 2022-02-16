import { isLabelWithInternallyDisabledControl } from '@testing-library/user-event/dist/utils';
import React from 'react';

const Toolbar = ({ msgList, setMsgList }) => {

    const checkBoxState = () => {
        if (msgList.length !== 0 && msgList.every(msg => msg.selected === true)) {
            return "fa fa-check-square-o"
        } else if (msgList.length !== 0 && msgList.some(msg => msg.selected === true)) {
            return "fa fa-minus-square-o"
        } else {
            return "fa fa-square-o"
        }
    }

    const handleCheckBox = () => {
        if (msgList.every(msg => msg.selected === true)) {
            setMsgList(
                msgList.map(msg => ({ ...msg, selected: false })))
        } else if (msgList.some(msg => msg.selected === true)) {
            setMsgList(
                msgList.map(msg => ({ ...msg, selected: true })))
        } else {
            setMsgList(
                msgList.map(msg => ({ ...msg, selected: true })))
        }
    }

    const handleMarkAsRead = () => {
        setMsgList(
            msgList.map(msg => msg.selected === true ? ({ ...msg, read: true }) : msg)
        )
    }

    const handleMarkAsUnread = () => {
        setMsgList(
            msgList.map(msg => msg.selected === true ? ({ ...msg, read: false }) : msg)
        )
    }

    const handleDelete = () => {
        setMsgList(
            msgList.filter(msg => msg.selected === false && msg)
        )
    }

    const numberOfUnread = () => {
        return msgList.filter(msg => msg.read === false).length
    }

    const handleAddLabel = (e) => {
        setMsgList(
            msgList.map(msg => {
                if (msg.selected === true && !msg.labels.find(label => label === e.target.value) && e.target.value !== "Apply label") {
                    msg.labels.push(e.target.value)
                }
                return msg
            }
            ))
    }

    const handleRemoveLabel = (e) => {
        setMsgList(
            msgList.map(msg => {
                if (msg.selected === true && msg.labels.find(label => label === e.target.value)) {
                    const index = msg.labels.indexOf(e.target.value);
                    if (index > -1) {
                        msg.labels.splice(index, 1);
                    }
                }
                return msg
            }
            ))
    }

    return (<div className="row toolbar">
        <div className="col-md-12">
            <p className="pull-right">
                <span className="badge badge">{numberOfUnread()}</span>
                {`unread message${numberOfUnread() !== 1 ? "s" : "" }`}
            </p>

            <button className="btn btn-default" onClick={handleCheckBox}>
                <i className={checkBoxState()}></i>
            </button>

            <button className="btn btn-default" onClick={handleMarkAsRead}>
                Mark As Read
            </button>

            <button className="btn btn-default" onClick={handleMarkAsUnread}>
                Mark As Unread
            </button>

            <select className="form-control label-select" onChange={handleAddLabel}>
                <option>Apply label</option>
                <option value="dev">dev</option>
                <option value="personal">personal</option>
                <option value="gschool">gschool</option>
            </select>

            <select className="form-control label-select" onChange={handleRemoveLabel}>
                <option>Remove label</option>
                <option value="dev">dev</option>
                <option value="personal">personal</option>
                <option value="gschool">gschool</option>
            </select>

            <button className="btn btn-default" onClick={handleDelete}>
                <i className="fa fa-trash-o"></i>
            </button>
        </div>
    </div>)
}

export default Toolbar;

