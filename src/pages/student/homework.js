import Cookies from 'universal-cookie';
import '../styles/general.css'
import './styles/courseData.css'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import TopBar from '../../components/topBar';

function HomeworkPage() {
    const {courseName,homeworkID} = useParams() 
    const [homeworkHeader,setHomeworkHeader] = useState()
    // const homeworkID = useParams()
    const lang = localStorage.getItem("lang")
    const pageLang ={
      assingments: lang === 'en' ? 'Assignments':"الواجبات",
      exams:       lang === "en" ? "Exams":"الاختبارات",
      announce:    lang === 'en' ? "Announcements":"الاعلانات"

    }
    const [title,setTitle] = useState('Homework')
    // useEffect(()=>{
    //     axios.get(Global.BackendURL+"/student/homeworkheader?homeworkID="+homeworkID).then((res)=>{
    //         const data = res.data

    //         console.log(data)
    //     }).catch((err)=>{
    //         console.log("error !!")
    //         console.log(err)
    //     })
    // })
  return (
    <div className="homework" id='homeworkPage'>
        <TopBar title={title} />
        <p>THis homework is about biulding an new Report For Climet Change and biulding an new Report For Climet Change 
            and biulding an new Report For Climet Change and biulding an new Report For Climet Change 
            and biulding an new Report For Climet Change and biulding an new Report For Climet Change 
            and biulding an new Report For Climet Change and biulding an new Report For Climet Change 
            and biulding an new Report For Climet Change and biulding an new Report For Climet Change</p>
        {/* <h1>{courseName} : {homeworkID}</h1>
        <p>{homeworkHeader}</p> */}
    </div>
  );
}

export default HomeworkPage;
