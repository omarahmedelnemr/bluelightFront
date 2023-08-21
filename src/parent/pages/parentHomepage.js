import './styles/Homepage.css'
import '../../general/pages/styles/general.css'
import TopBar from '../../general/components/topBar';
import WorkExamsPanel from '../components/workExamPanel';
import checkAutherization from '../../publicFunctions/checkAuth';
import StatusBoxes from '../components/statusBoxes';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Global from '../../publicFunctions/globalVar';
function ParentHomepage() {
    if (checkAutherization() !== 'Auth'){
        window.location.href ='/login'
    }
    const lang = localStorage.getItem('lang') 
    const pageText = {
        SchoolName: lang === 'en' ? "Bluelight Schools":"مدارس بلو لايت الدولية",
        overview:   lang === 'en' ? "overview For":"نظرة عامة ل",
        change:     lang === 'en' ? "Change":"تغيير"

    }


    const [currentStudentName,setCurrentStudent] = useState(null)
    const [studentsChooseList,setChooseList] = useState([])

    // Get The Avilable Student For This Parent
    useEffect(()=>{
        axios.get(Global.BackendURL+"/parent/mystudents?parentID="+localStorage.getItem("id"))
        .then((res)=>{
            const data =  res.data

            // Reset the LocalStorage Main Info
            localStorage.setItem("img_dir",data["img_dir"])

            //Display Students
            const students = data['student']
            if (localStorage.getItem("currentStudentID") === null){
                localStorage.setItem("currentStudentID",students[0]['id'])
                localStorage.setItem("currentStudentName",students[0]['name'])
                localStorage.setItem("currentStudentArName",students[0]['arName'])
                localStorage.setItem("currentStudentClassroom",students[0]['classroom']['id'])
                localStorage.setItem("studentsNum",students.length)
                localStorage.setItem("StudentsList",JSON.stringify(students))

            }else{
                if (lang === 'en'){
                    setCurrentStudent(localStorage.getItem("currentStudentName").split(" ")[0])
                }else{
                    setCurrentStudent(localStorage.getItem("currentStudentArName").split(" ")[0])
                }
            }
            if (students.length>2){
                const preList = []
                for (var i =0;i<students.length;i++){
                    preList.push(
                        <div onClick={ChooseCurrentStudent}>
                            <h3>{students[i][lang ==='en' ? 'name':"arName"].split(" ")[0]}</h3>
                            <p className='hide'>{students[i]['id']}</p>
                        </div>
                    )
                }
                console.log("pre: ",preList)
                setChooseList(preList)
            }

        }).catch((err)=>{
            console.log("Error!\n",err)
        })
    },[])

    // Change The Current Student info in Local Storage
    function changeCurrentStudent(event){
        if(localStorage.getItem("studentsNum") == 2){
            const allStudentsList = JSON.parse(localStorage.getItem("StudentsList"))
            if (Number(allStudentsList[0]['id']) === Number(localStorage.getItem('currentStudentID'))){
                localStorage.setItem("currentStudentID",allStudentsList[1]['id'])
                localStorage.setItem("currentStudentName",allStudentsList[1]['name'])
                localStorage.setItem("currentStudentArName",allStudentsList[1]['arName'])
                localStorage.setItem("currentStudentClassroom",allStudentsList[1]['classroom']['id'])

            } else{
                localStorage.setItem("currentStudentID",allStudentsList[0]['id'])
                localStorage.setItem("currentStudentName",allStudentsList[0]['name'])
                localStorage.setItem("currentStudentArName",allStudentsList[0]['arName'])
                localStorage.setItem("currentStudentClassroom",allStudentsList[0]['classroom']['id'])
            }
            window.location.reload(false);
        }else{
            document.querySelector(".StudentsList").classList.remove("disabled")
        }
    }
    function removeList(event){
        event.currentTarget.classList.add("disabled")
    }
    function ChooseCurrentStudent(event){

        const studentsList = JSON.parse(localStorage.getItem("StudentsList"))
        const currentID = event.currentTarget.querySelector("p").innerHTML
        for (var i=0;i< studentsList.length;i++){
            if (Number(studentsList[i]['id'])  === Number(currentID)){
                if (Number(localStorage.getItem("currentStudentID")) !== Number(currentID)){
                    localStorage.setItem("currentStudentID",studentsList[i]['id'])
                    localStorage.setItem("currentStudentName",studentsList[i]['name'])
                    localStorage.setItem("currentStudentArName",studentsList[i]['arName'])
                    localStorage.setItem("currentStudentClassroom",studentsList[i]['classroom']['id'])

                }

                break
            }
        }
        window.location.reload(false);

    }
    return (
        <div className="Homepage column fullWidth">
            <TopBar title={pageText["SchoolName"]}/>
            <div className='StudentsList disabled' onClick={removeList}>
                {studentsChooseList}
            </div>
            <div className='row overviewTitle'>
                <h2>{pageText['overview']} {currentStudentName} </h2>
                {localStorage.getItem("studentsNum") > 1 ?
                 <span className='ChangeCurrentStudent' onClick={changeCurrentStudent}>{pageText['change']}</span>
                 :null
                 }
            </div>  
            <StatusBoxes />
            <div className='row dataColumns'>
                <div className='column workToSubmit'>
                    <WorkExamsPanel type={"Assignments"} limit={true}/>
                    <div className='test'>

                    </div>  
                </div>
                <div className='column analytics'>
                    
                    <WorkExamsPanel type={"Exams"} limit={true}/>

                    <div className='test'>

                    </div>
                </div>
            </div> 
        </div>
    );
}

export default ParentHomepage;