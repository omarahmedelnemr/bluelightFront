import './styles/Homepage.css'
import './styles/general.css'
import TopBar from '../components/topBar';
import checkAutherization from '../checkAuth';
import CourseBox from '../components/Courses/courseBox';
import ArabicImage from '../content/arabic.jpg'
import mathImage from '../content/math.jpg'
import ScienceImage from '../content/science.jpg'
import EnglishImage from '../content/english.jpg'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Global from '../general/globalVar'
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
function CoursesPage() {
  if (checkAutherization() !== 'Auth'){
    window.location.href ='/login'
  }
  const navigate = useNavigate()
  const lang = localStorage.getItem('lang')
  const pageLang = {
    courses: lang === 'en' ? "Courses" : "المقررات"
  }
  const ImagesList ={
    "arabic":ArabicImage,
    "english":EnglishImage,
    "math":mathImage,
    "science":ScienceImage,
  }
  const [coursesBoxs,setCoursesBoxs] = useState(null)
  useEffect(()=>{
    axios.get(Global.BackendURL+"/student/CoursesList?classroomID="+localStorage.getItem('classroom')).then((res)=>{
      console.log("courses: ",res.data)
      const data = res.data
      const coursesPreList = []
      var teacherName,currentImage,subjectNamex,link;
      for(var i =0;i < data.length;i++){

        //Take the First Two Names
        teacherName = (lang === 'en' ? data[i]["teacher"]["name"] :data[i]["teacher"]["arName"]).split(" ")
        currentImage = data[i]["name"].toLowerCase() in ImagesList ? ImagesList[data[i]["name"].toLowerCase()] :ImagesList["arabic"]
        subjectNamex = data[i]['name'].toLowerCase()
        link  = '/student/courses/'+subjectNamex
        console.log(link)
        teacherName = teacherName[0]+" "+teacherName[1]
        coursesPreList.push(
          <CourseBox 
            img={currentImage} 
            name={lang ==='en' ? data[i]["name"]:data[i]["arName"]} 
            teacher={teacherName} 
            route={link}
            />)
      }
      setCoursesBoxs(coursesPreList)
    }).catch((err)=>{
      console.log(err)
    })    
  },[])

  return (
    <div className="column">
      <TopBar title={pageLang["courses"]}/>

      <div className='row coursesBoxList'>
          {coursesBoxs}

      </div>        
    </div>
  );
}

export default CoursesPage;
