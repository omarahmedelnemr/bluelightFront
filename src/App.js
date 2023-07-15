import './App.css';
import Homepage from './pages/home';
import Login from './pages/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './components/FontawesomeIcons'
import SideNavigation from './components/SideNavigationMenu';
import TopBar from './components/topBar';
import CoursesPage from './pages/courses';
// require('dotenv').config()
function App() {
  return (
    <div className="App row">
      <Router>
        <Routes>
          <Route path='/Login' element={<Login />} />
          <Route path='/*' element={

            <div className='row fullWidth'>
                <SideNavigation />
                <div className='column fullWidth'>
                    <TopBar />
                    <Routes>
                        <Route exact path='/' element={<Homepage />} />
                        <Route path='/courses' element={<CoursesPage />} />
                        <Route path='/*' element={<div><h1>Hello</h1><h3>We Are Still Developing This Page</h3></div>} />
                    </Routes>
                </div>
            
            </div>
          }/>
        </Routes>
        
      </Router>

    </div>
  );
}

export default App;
