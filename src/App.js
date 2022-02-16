import './App.css';
import Toolbar from './components/Toolbar'
import Message from './components/Message';
import MessageList from './components/MessageList';
import React, { useState } from 'react'

function App() {

  const [msgList, setMsgList] = useState(MessageList);

  return (
    <div>
      <Toolbar msgList={msgList} setMsgList={setMsgList}/>
      <Message msgList={msgList} setMsgList={setMsgList}/>
    </div>
  );
}

export default App;
