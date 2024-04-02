import './App.css';
import Homepage from "./Pages/Homepage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chatpage from "./Pages/Chatpage";

function App() {
  return (
    <div className="App">
      {/* <Router> */}
      <Routes>
        <Route path="/" element = {<Homepage />}/>
        <Route path="/chats" element = {<Chatpage />}/>
      </Routes>
    {/* </Router> */}
    </div>
  );
}

export default App;
