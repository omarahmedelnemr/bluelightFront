import './styles/Homepage.css'
import './styles/general.css'
import TopBar from '../components/topBar';
import checkAutherization from '../checkAuth';


function CoursesPage() {
  if (checkAutherization() !== 'Auth'){
    window.location.href ='/login'
  }
  return (
    <div className="Homepage column">
      <TopBar title={"Courses"}/>

      <div className='row'>

      </div>        
    </div>
  );
}

export default CoursesPage;
