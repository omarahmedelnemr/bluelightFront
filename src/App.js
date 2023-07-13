import './App.css';
import Login from './pages/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// require('dotenv').config()
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<p>Hello To Main</p> } />
          <Route path='/Login' element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
