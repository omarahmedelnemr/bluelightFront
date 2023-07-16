import './App.css';
import Homepage from './pages/home';
import Login from './pages/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './components/FontawesomeIcons'
import SideNavigation from './components/SideNavigationMenu';
import CoursesPage from './pages/courses';
// require('dotenv').config()
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/Login' element={<Login />} />
          <Route path='/' element={<Login />} />
          <Route path='/student/*' element={

            <div className='row fullWidth pageLang'>
                <SideNavigation />
                <div className='column mainContent fullWidth'>
                    <Routes>
                        <Route exact path='/' element={<Homepage />} />
                        <Route path='/courses' element={<CoursesPage />} />
                        <Route path='/*' element={<div><h1>Hello</h1><h3>We Are Still Developing This Page</h3></div>} />
                    </Routes>
                </div>
            
            </div>
          }/>
          <Route path='/*' element={<h2 style={{backgroundColor:"white"}}>Please Login First<br/><a href="/login">Login</a></h2>}/>
        </Routes>
        
      </Router>

    </div>
  );
}

export default App;
