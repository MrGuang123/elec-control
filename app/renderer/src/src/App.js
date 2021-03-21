import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'
import { ipcRenderer } from 'electron'

function App() {
  const [remoteCode, setRemoteCode] = useState('')
  const [localCode, setlocalCode] = useState('')
  const [controlText, setcontrolText] = useState('')

  const login = async () =>{
    let code = await ipcRenderer.invoke('login')
    console.log(code)
    setlocalCode(code)
  }
  useEffect(() =>{
    login()
    ipcRenderer.on('control-state-change', handleControlState)
    return () => {
      ipcRenderer.removeListener('control-state-change', handleControlState)
    }
  }, [])

  const startControl = (remoteCode) => {
    ipcRenderer.send('control', remoteCode)
  }

  const handleControlState = (e, name, type) => {
    let text = ''
    if(type === 1) {
      text = `正在远程控制${name}`
    }else if(type === 2) {
      text = `被${name}控制中`
    }

    setcontrolText(text)
  }

  const hasControlTextDom = (
    <section>{controlText}</section>
  )
  const noControlTextDom = (
    <section>
      <div>你的控制码:{localCode}</div>
      <input type="text" value={remoteCode} onChange={e => setRemoteCode(e.target.value)} />
      <button onClick={() => startControl(remoteCode)}>确认</button>
    </section>
  )
  return (
    <div className="App">
      {controlText === '' ? noControlTextDom : hasControlTextDom}
    </div>
  );
}

export default App;
