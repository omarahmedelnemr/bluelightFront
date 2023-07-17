import './styles/Homepage.css'
import './styles/general.css'
import TopBar from '../components/topBar';
import checkAutherization from '../checkAuth';
import CourseBox from '../components/Courses/courseBox';
import image from '../content/arabic.jpeg'

function CoursesPage() {
  if (checkAutherization() !== 'Auth'){
    window.location.href ='/login'
  }
  const lang = localStorage.getItem('lang')
  const pageLang = {
    courses: lang === 'en' ? "Courses" : "المقررات"
  }
  return (
    <div className="Homepage column">
      <TopBar title={pageLang["courses"]}/>

      <div className='row coursesBoxList'>
          <CourseBox img={image} name={"Arabic"} teacher={"Ahmed Elsyed"}/>
          <CourseBox img={image} name={"Arabic"} teacher={"Ahmed Elsyed"}/>
          <CourseBox img={image} name={"Arabic"} teacher={"Ahmed Elsyed"}/>
          <CourseBox img={image} name={"Arabic"} teacher={"Ahmed Elsyed"}/>
          <CourseBox img={image} name={"Arabic"} teacher={"Ahmed Elsyed"}/>
          <CourseBox img={image} name={"Arabic"} teacher={"Ahmed Elsyed"}/>
          <CourseBox img={image} name={"Arabic"} teacher={"Ahmed Elsyed"}/>
          <CourseBox img={image} name={"Arabic"} teacher={"Ahmed Elsyed"}/>
          <CourseBox img={image} name={"Arabic"} teacher={"Ahmed Elsyed"}/>


      </div>        
    </div>
  );
}

export default CoursesPage;
