import React, { useState } from 'react';
import ComposeForm from './ComposeForm'

const Toolbar = ({ msgList, setMsgList, url }) => {

    var [showForm, setShowForm] = useState(false)

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

    const handleReadAndUnread = async (readStat) => {
        let id = msgList.filter(msg => msg.selected === true).map(msg => msg.id)
        let item = {
            messageIds: id,
            command: "read",
            ["read"]: readStat
        };
        executePatch(item)
    };

    const handleDelete = async () => {
        let id = msgList.filter(msg => msg.selected === true).map(msg => msg.id)
        let item = {
            messageIds: id,
            command: "delete",
        };
        executePatch(item)
    }

    const handleLabel = async (labelOption, e) => {
        e.persist()
        let id = await msgList.filter(msg => (msg.selected === true && e.target.value !== "Apply label")).map(msg => msg.id)
        let item = {
            messageIds: id,
            command: labelOption,
            label: e.target.value
        };
        executePatch(item)
    }

    const executePatch = async (item) => {
        const response = await fetch(url, {
            method: "PATCH",
            body: JSON.stringify(item),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        const json = await response.json();
        setMsgList(json);
    }

    const numberOfUnread = () => {
        return msgList.filter(msg => msg.read === false).length
    }

    const toggleForm = () => {
        setShowForm(showForm = !showForm);
    }

    return (<div className="row toolbar">
        <div className="col-md-12">
            <p className="pull-right">
                <span className="badge badge">{numberOfUnread()}</span>
                {`unread message${numberOfUnread() !== 1 ? "s" : ""}`}
            </p>
            <a className="btn btn-danger" onClick={toggleForm}>
                <i className="fa fa-plus"></i>
            </a>
            <button className="btn btn-default" onClick={handleCheckBox}>
                <i className={checkBoxState()}></i>
            </button>

            <button className="btn btn-default" onClick={() => handleReadAndUnread(true)}>
                Mark As Read
            </button>

            <button className="btn btn-default" onClick={() => handleReadAndUnread(false)}>
                Mark As Unread
            </button>

            <select className="form-control label-select" onChange={(e) => handleLabel("addLabel", e)}>
                <option>Apply label</option>
                <option value="dev">dev</option>
                <option value="personal">personal</option>
                <option value="gschool">gschool</option>
            </select>

            <select className="form-control label-select" onChange={(e) => handleLabel("removeLabel", e)}>
                <option>Remove label</option>
                <option value="dev">dev</option>
                <option value="personal">personal</option>
                <option value="gschool">gschool</option>
            </select>

            <button className="btn btn-default" onClick={handleDelete}>
                <i className="fa fa-trash-o"></i>
            </button>
            {showForm && <ComposeForm disabled={true} msgList={msgList} setMsgList={setMsgList} url={url} setShowForm={setShowForm}/>}
        </div>

    </div>)
}

export default Toolbar;

