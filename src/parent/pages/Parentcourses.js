import './styles/Homepage.css'
import '../../general/pages/styles/general.css'
import TopBar from '../../general/components/topBar';
import checkAutherization from '../../publicFunctions/checkAuth';
import CourseBox from '../../student/components/courseBox';
import ArabicImage from '../../content/arabic.jpg'
import mathImage from '../../content/math.jpg'
import ScienceImage from '../../content/science.jpg'
import EnglishImage from '../../content/english.jpg'
import PhysicsImage from '../../content/physics.jpg'
import ChemistryImage from '../../content/chemistry.jpg'
import DrawingImage from '../../content/drawing.jpg'
import baseImage from '../../content/courseBase.jpeg'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Global from '../../publicFunctions/globalVar'
function ParentCoursesPage() {
  if (checkAutherization() !== 'Auth'){
    window.location.href ='/login'
  }
  const lang = localStorage.getItem('lang')
  const pageLang = {
    courses: lang === 'en' ? "Courses" : "المقررات",
    all:     lang === 'en' ? "All":"الكل",
    fav:     lang === 'en' ? "Favorite":"المفضل"
  }
  const ImagesList ={
    "arabic":ArabicImage,
    "english":EnglishImage,
    "math":mathImage,
    "science":ScienceImage,
    "Darwing":DrawingImage,
    "physics":PhysicsImage,
    "chemistry":ChemistryImage,
    "baseImage":baseImage
  }
  const [coursesBoxs,setCoursesBoxs] = useState(null)
  useEffect(()=>{
    axios.get(Global.BackendURL+"/student/CoursesList?classroomID="+localStorage.getItem('currentStudentClassroom')+"&studentID="+localStorage.getItem("currentStudentID")).then((res)=>{
      const data = res.data
      const coursesPreList = []
      var teacherName,currentImage,subjectNamex,link,favIcon;
      for(var i =0;i < data.length;i++){

        //Take the First Two Names
        teacherName = (lang === 'en' ? data[i]["teacher"]["name"] :data[i]["teacher"]["arName"]).split(" ")
        // currentImage = data[i]["name"].toLowerCase() in ImagesList ? ImagesList[data[i]["name"].toLowerCase()] :ImagesList["arabic"]
        currentImage = ImagesList[data[i]['name'].toLowerCase()] === undefined ? ImagesList["baseImage"]:ImagesList[data[i]['name'].toLowerCase()]

        subjectNamex = data[i]['name'].toLowerCase()
        link  = '/parent/courses/'+subjectNamex
        teacherName = teacherName[0]+" "+teacherName[1]
        coursesPreList.push(
          <CourseBox 
            img={currentImage} 
            name={lang ==='en' ? data[i]["name"]:data[i]["arName"]} 
            teacher={teacherName} 
            route={link}
            fav={data[i]['favorite']}
            id={data[i]['id']}
            />)
      }
      setCoursesBoxs(coursesPreList)
    }).catch((err)=>{
      console.log(err)
    })    
  },[])


  function switchAllFav(event){
    const parent = event.currentTarget.parentElement
    parent.querySelector('.activeSide').classList.remove('activeSide')
    event.currentTarget.classList.add('activeSide')
  }
  return (
    <div className="column CoursesPage">
      <TopBar title={pageLang["courses"]}/>

      <div className='row coursesBoxList'>
          {coursesBoxs}

      </div>        
    </div>
  );
}

export default ParentCoursesPage;
