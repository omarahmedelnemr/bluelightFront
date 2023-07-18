import Cookies from 'universal-cookie';
import './styles/general.css'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import Global from '../general/globalVar';

function CourseDataPage() {
    const cookieReader = new Cookies()
    const {courseName} = useParams()
    const studentID = cookieReader.get('id')
    const classroomID = localStorage.getItem('classroom')

    useEffect(()=>{
        axios.get(Global.BackendURL+"/student/courseAssingments?studentID="+studentID+"&classroomID="+classroomID+"&courseName="+courseName).then((res)=>{
            const data = res.data
            console.log(data)
        }).catch((err)=>{
            console.log(err)
        })
    })
  return (
    <div className="column">
            <h1>hello from {courseName}</h1>
    </div>
  );
}

export default CourseDataPage;
