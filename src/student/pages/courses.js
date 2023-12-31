import './styles/Homepage.css'
import '../../general/pages/styles/general.css'
import TopBar from '../../general/components/topBar';
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
import axios from '../../publicFunctions/axiosAuth';
import Global from '../../publicFunctions/globalVar'
function CoursesPage() {
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
  const [loading,setLoading] = useState(<div className='loading'></div>)
  const studentID = localStorage.getItem('role') === 'student' ? localStorage.getItem('id'): localStorage.getItem('currentStudentID')
  const classroomID = localStorage.getItem('role') === 'student' ? localStorage.getItem('classroom'):localStorage.getItem('currentStudentClassroom')
  useEffect(()=>{
    axios.get(Global.BackendURL+"/student/CoursesList?classroomID="+classroomID+"&studentID="+studentID).then((res)=>{
      const data = res.data
      const coursesPreList = []
      var teacherName,currentImage,subjectNamex,link;
      for(var i =0;i < data.length;i++){

        //Take the First Two Names
        teacherName = (lang === 'en' ? data[i]["teacher"]["name"] :data[i]["teacher"]["arName"]).split(" ")
        // currentImage = data[i]["name"].toLowerCase() in ImagesList ? ImagesList[data[i]["name"].toLowerCase()] :ImagesList["arabic"]
        currentImage = ImagesList[data[i]['name'].toLowerCase()] === undefined ? ImagesList["baseImage"]:ImagesList[data[i]['name'].toLowerCase()]

        subjectNamex = data[i]['name'].toLowerCase()
        link  = '/student/courses/'+subjectNamex
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
      setLoading(null)
    }).catch((err)=>{
      console.log(err)
    })    
  },[])

  return (
    <div className="column CoursesPage">
      <TopBar title={pageLang["courses"]}/>
      {loading}
      <div className='row coursesBoxList'>
          {coursesBoxs}

      </div>        
    </div>
  );
}

export default CoursesPage;
