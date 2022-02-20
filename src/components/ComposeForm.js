import React, { useState } from 'react'
import { url } from '../App'

const ComposeForm = ({ msgList, setMsgList, url, setShowForm }) => {

    const addNewMessage = async (e) => {
        e.preventDefault();
        let msg = {
            subject: e.target.subject.value,
            body: e.target.body.value,
            labels: [],
            read: false,
            selected: false,
            starred: false,
        }

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(msg),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        const json = await response.json()
        setMsgList(prev => [...prev, json])
        setShowForm(false)

    }

    return (
        < form className="form-horizontal well" onSubmit={addNewMessage} >
            <div className="form-group">
                <div className="col-sm-8 col-sm-offset-2">
                    <h4>Compose Message</h4>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
                <div className="col-sm-8">
                    <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject" />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="body" className="col-sm-2 control-label">Body</label>
                <div className="col-sm-8">
                    <textarea name="body" id="body" className="form-control"></textarea>
                </div>
            </div>
            <div className="form-group">
                <div className="col-sm-8 col-sm-offset-2">
                    <input type="submit" value="Send" className="btn btn-primary" />
                </div>
            </div>
        </form >
    )
}

export default ComposeForm