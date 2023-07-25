import './App.css';
import Homepage from './pages/student/home';
import Login from './pages/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './components/FontawesomeIcons'
import SideNavigation from './components/student/SideNavigationMenu';
import CoursesPage from './pages/student/courses';
import Logout from './pages/logout';
import StudentHomeworkPage from './pages/student/studentWork';
import CourseDataPage from './pages/student/CourseData';
import HomeworkPage from './pages/student/homework';
import Account from './pages/account';
import StudentExamPage from './pages/student/studentExamPage';
import TeacherSideNavigation from './components/teacher/teacherSideNav';
import TeacherHomepage from './pages/teacher/teacherHomePage';
// require('dotenv').config()
function App() {
  const lang = localStorage.getItem('lang')
  
  return (
    <div className={"App " +lang+"Lang"}>
      <Router>
        <Routes>
          <Route path='/Login' element={<Login />} />
          <Route path='/' element={<Login />} />
          <Route path="/logout" element={<Logout/>}/>
          <Route path='/student/*' element={
          
            <div className='row fullWidth pageLang'>
                <SideNavigation />
                <div className='column mainContent fullWidth'>
                    <Routes>
                        <Route exact path='/' element={<Homepage />} />
                        <Route path='/courses' element={<CoursesPage />} />
                        <Route path='/courses/:courseName' element={<CourseDataPage />} />
                        <Route path='/courses/:courseName/assignments/:homeworkID' element={<HomeworkPage />} />

                        <Route path='/assignments' element={<StudentHomeworkPage/>} />
                        <Route path='/exams' element={<StudentExamPage/>} />
                        <Route path='/account' element={<Account />} />

                        {/* <Route path= "courses/" element={}/> */}
                        {/* <Route path='/*' element={<div><h1>Hello</h1><h3>We Are Still Developing This Page</h3></div>} /> */}
                    </Routes>
                </div>
            
            </div>
          }/>
          <Route path='/teacher/*' element={
          
            <div className='row fullWidth pageLang'>
                <TeacherSideNavigation />
                <div className='column mainContent fullWidth'>
                    <Routes>
                        <Route exact path='/' element={<TeacherHomepage />} />
                    </Routes>
                </div>
            </div>
        }/>
          {/* <Route path='/*' element={<h2 style={{backgroundColor:"white"}}>Please Login First<br/><a href="/login">Login</a></h2>}/> */}
        </Routes>
        
      </Router>

    </div>
  );
}

export default App;
