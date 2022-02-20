import './App.css';
import Toolbar from './components/Toolbar'
import Message from './components/Message';
import React, { useState, useEffect } from 'react'

function App() {

  const [msgList, setMsgList] = useState([]);
  const url = 'http://localhost:8082/api/messages'

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url)
      const json = await response.json()
      setMsgList(...msgList, json.map(msg => ({ ...msg, selected: false })))
    }
    fetchData();
  }, [])

  return (
    <div>
      <Toolbar msgList={msgList} setMsgList={setMsgList} url={url}/>
      <Message msgList={msgList} setMsgList={setMsgList} url={url}/>
    </div>
  );
}

export default App;
