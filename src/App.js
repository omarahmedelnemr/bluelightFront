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
import TimeTablePage from './general/pages/timetable';
import EventsPage from './general/pages/events';

import Homepage from './student/pages/home';
import StudentSideNavigation from './student/components/StudentSideNavigation';
import CoursesPage from './student/pages/courses';
import StudentHomeworkPage from './student/pages/studentWork';
import CourseDataPage from './student/pages/CourseData';
import HomeworkPage from './student/pages/homework';
import StudentExamPage from './student/pages/studentExamPage';
import ExamPage from './student/pages/exam';

import TeacherSideNavigation from './teacher/components/teacherSideNav';
import TeacherHomepage from './teacher/pages/teacherHomePage';
import ClassroomsPage from './teacher/pages/classrooms';
import ClassroomInfo from './teacher/pages/ClassroomStudentList';
import Classwork from './teacher/pages/classwork';
import TeacherMessagesPage from './teacher/pages/TeacherMessagesPage';

import ParentSideNavigation from './parent/components/ParentSideNavigation';
import ParentHomepage from './parent/pages/parentHomepage';
import ParentHomeworkPage from './parent/pages/parentHomework';
import ParentHomeworkListPage from './parent/pages/ParentHomeworkListPage';
import ParentMessagesPage from './parent/pages/ParentMessagesPage';
import ParentExamListPage from './parent/pages/parentExamListPage';
import ParentExamPage from './parent/pages/ParentExamPage'
import WelcomePage from './general/pages/Welcome';

Chart.register(ArcElement);

function App() {
  const lang = localStorage.getItem('lang')
  
  return (
    <div className={"App " +lang+"Lang"}>
      <Router>
        <Routes>
          <Route path='/Login' element={<Login />} />
          <Route path='/welcome' element={<WelcomePage />} />
          <Route path='/forgetPassword' element={<ForgetPassword />} />
          <Route path='/resetpassword' element={<ResetPassword />} />
          <Route path='/' element={<Login />} />
          <Route path="/logout" element={<Logout/>}/>
          <Route path='/student/*' element={
          
            <div  id='StudentSidePages' className='row fullWidth pageLang'>
                <StudentSideNavigation />
                <div className='column mainContent fullWidth'>
                    <Routes>
                        <Route exact path='/' element={<Homepage />} />
                        <Route path='/courses' element={<CoursesPage />} />
                        <Route path='/courses/:courseName' element={<CourseDataPage />} />
                        <Route path='/courses/:courseName/assignments/:homeworkID' element={<HomeworkPage />} />
                        <Route path='/courses/:courseName/exams/:examID' element={<ExamPage />} />

                        <Route path='/assignments' element={<StudentHomeworkPage/>} />
                        <Route path='/exams' element={<StudentExamPage/>} />
                        <Route path='/messages' element={<ParentMessagesPage/>} />
                        <Route path='/events' element={<EventsPage/>} />
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
                        <Route path='/messages' element={<TeacherMessagesPage/>} />

                        <Route path='/account' element={<Account />} />
                    </Routes>
                </div>
            </div>
        }/>
        <Route path='/parent/*' element={
          
          <div id='ParentSidePages' className='row fullWidth pageLang'>
              <ParentSideNavigation />
              <div className='column mainContent fullWidth'>
                  <Routes>
                      <Route exact path='/' element={<ParentHomepage />} />

                        <Route path='/courses' element={<CoursesPage />} />
                        <Route path='/courses/:courseName' element={<CourseDataPage />} />
                        <Route path='/courses/:courseName/assignments/:homeworkID' element={<ParentHomeworkPage />} />
                        <Route path='/courses/:courseName/exams/:examID' element={<ParentExamPage />} />

                        <Route path='/assignments' element={<ParentHomeworkListPage/>} />
                        <Route path='/exams' element={<ParentExamListPage/>} />
                        <Route path='/messages' element={<ParentMessagesPage/>} />
                        <Route path='/events' element={<EventsPage/>} />
                        <Route path='/messages/:ID' element={<ParentMessagesPage/>} />
                        <Route path='/account' element={<Account />} />
                        <Route path='/settings' element={<Setting />} />
                        <Route path='/changeUsername' element={<ChangeUsername />} />
                        <Route path='/changePassword' element={<ChangePassword />} />
                        <Route path='/reportIssu' element={<ReportPage />} />
                        <Route path='/changeAvatar' element={<ChangeAvatar />} />
                        
                        <Route path='/timetable' element={<TimeTablePage />} />

                  </Routes>
              </div>
          </div>
      }/>
      
          <Route path="/teacher/grading" element={<p>Test Done <a href='/'>Go Back</a></p>}/>

        </Routes>
        
      </Router>

    </div>
  );
}

export default App;
