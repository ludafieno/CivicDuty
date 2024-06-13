import { useState } from 'react'
import './App.css'
import Dropdown from './components/Dropdown';
import CongressList from './components/CongressList';

function App() {
  const [selectedIssue, setSelectedIssue] = useState("");

  return (
      <div>
        <h1>FILTER</h1>
        <Dropdown selectedIssue={selectedIssue} setSelectedIssue={setSelectedIssue}/>
        <CongressList selectedIssue={selectedIssue}/>
      </div>
  )
}

export default App
