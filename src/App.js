import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Chart, ArcElement} from 'chart.js'

import './general/components/FontawesomeIcons'
import Login from './general/pages/login';
import Logout from './general/pages/logout';
import Account from './general/pages/account';
import ForgetPassword from './general/pages/forgetPassword';
import ResetPassword from './general/pages/resetPassword';
import Setting from './general/pages/settings';
import ChangeUsername from './general/pages/changeUsername';
import ChangePassword from './general/pages/changePassword';
import ReportPage from './general/pages/reportIssu';
import ChangeAvatar from './general/pages/changeAvatar';

import Homepage from './student/pages/home';
import SideNavigation from './student/components/SideNavigationMenu';
import CoursesPage from './student/pages/courses';
import StudentHomeworkPage from './student/pages/studentWork';
import CourseDataPage from './student/pages/CourseData';
import HomeworkPage from './student/pages/homework';
import StudentExamPage from './student/pages/studentExamPage';
import StudentMessagesPage from './student/pages/Messages';
import ExamPage from './student/pages/exam';
import TimeTablePage from './student/pages/timetable';

import TeacherSideNavigation from './teacher/components/teacherSideNav';
import TeacherHomepage from './teacher/pages/teacherHomePage';
import ClassroomsPage from './teacher/pages/classrooms';
import ClassroomInfo from './teacher/pages/ClassroomStudentList';
import Classwork from './teacher/pages/classwork';



Chart.register(ArcElement);
// require('dotenv').config()
function App() {
  const lang = localStorage.getItem('lang')
  
  return (
    <div className={"App " +lang+"Lang"}>
      <Router>
        <Routes>
          <Route path='/Login' element={<Login />} />
          <Route path='/forgetPassword' element={<ForgetPassword />} />
          <Route path='/resetpassword' element={<ResetPassword />} />
          <Route path='/' element={<Login />} />
          <Route path="/logout" element={<Logout/>}/>
          <Route path='/student/*' element={
          
            <div  id='StudentSidePages' className='row fullWidth pageLang'>
                <SideNavigation />
                <div className='column mainContent fullWidth'>
                    <Routes>
                        <Route exact path='/' element={<Homepage />} />
                        <Route path='/courses' element={<CoursesPage />} />
                        <Route path='/courses/:courseName' element={<CourseDataPage />} />
                        <Route path='/courses/:courseName/assignments/:homeworkID' element={<HomeworkPage />} />
                        <Route path='/courses/:courseName/exams/:examID' element={<ExamPage />} />

                        <Route path='/assignments' element={<StudentHomeworkPage/>} />
                        <Route path='/exams' element={<StudentExamPage/>} />
                        <Route path='/messages' element={<StudentMessagesPage/>} />
                        <Route path='/messages/:ID' element={<StudentMessagesPage/>} />
                        <Route path='/timetable' element={<TimeTablePage />} />
                        <Route path='/account' element={<Account />} />
                        <Route path='/settings' element={<Setting />} />
                        <Route path='/changeUsername' element={<ChangeUsername />} />
                        <Route path='/changePassword' element={<ChangePassword />} />
                        <Route path='/reportIssu' element={<ReportPage />} />
                        <Route path='/changeAvatar' element={<ChangeAvatar />} />
                        

                        {/* <Route path= "courses/" element={}/> */}
                        {/* <Route path='/*' element={<div><h1>Hello</h1><h3>We Are Still Developing This Page</h3></div>} /> */}
                    </Routes>
                </div>
            
            </div>
          }/>
          <Route path='/teacher/*' element={
          
            <div id='TeacherSidePages' className='row fullWidth pageLang'>
                <TeacherSideNavigation />
                <div className='column mainContent fullWidth'>
                    <Routes>
                        <Route exact path='/' element={<TeacherHomepage />} />
                        <Route exact path='/classrooms' element={<ClassroomsPage />} />
                        <Route exact path='/classrooms/:classroomID' element={<ClassroomInfo />} />
                        <Route path='/classwork' element={<Classwork />} />

                        <Route path='/account' element={<Account />} />
                    </Routes>
                </div>
            </div>
        }/>
          <Route path="/teacher/grading" element={<p>Test Done <a href='./'>Go Back</a></p>}/>

          {/* <Route path='/*' element={<h2 style={{backgroundColor:"white"}}>Please Login First<br/><a href="/login">Login</a></h2>}/> */}
        </Routes>
        
      </Router>

    </div>
  );
}

export default App;
