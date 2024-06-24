import './App.css'
import { useState } from 'react'
import Dropdown from './components/Dropdown';
import CongressList from './components/CongressList';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from "./components/Footer";

function App() {
  const [selectedIssue, setSelectedIssue] = useState("");

  return (
      <>
        <Navbar />
        <Home />
        <div>
          <h1 id="center">Filter</h1>
          <Dropdown selectedIssue={selectedIssue} setSelectedIssue={setSelectedIssue}/>
          <CongressList selectedIssue={selectedIssue}/>
        </div>
        <Footer />
      </>
  )
}

export default App
