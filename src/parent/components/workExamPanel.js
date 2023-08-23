import "./styles/workExamPanel.css"
import axios from "axios";
import Global from "../../publicFunctions/globalVar";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import compareDates from "../../publicFunctions/compareDates";
import routeTo from "../../publicFunctions/reroute";
import formatTime from '../../publicFunctions/formatTime'
function WorkExamsPanel({type,limit,submitted = false}) {
    const [assinmentList,setAssignmentList] = useState('')
    const [emptyMessage,setEmptyMessage] = useState(<div className="emptyMessage" >
                                                        <div className="loading"></div>
                                                    </div>)
    const id = localStorage.getItem("currentStudentID")
    const studentName = limit ? '':localStorage.getItem("currentStudentName").split(" ")[0]
    const studentArName = limit ? '':localStorage.getItem("currentStudentArName").split(" ")[0]
    const lang = localStorage.getItem('lang')
    const compLang ={
        type:           lang === 'en' ? (type === "Assignments"? "Assignments":"Exams"):(type === "Assignments"? "الواجبات":"الاختبارات"),
        seeAll:         lang === 'en' ? "See All":"مشاهدة الكل",
        name:           lang === 'en' ? "Name":"الاسم",
        grade:          lang === 'en' ? "Total Grade":"الدرجة الكلية",
        studentGrade:   lang === 'en' ? studentName+"'s Grade":"درجة "+studentArName,
        due:            lang === 'en' ? "Due Date":"اخر موعد تسليم",
        publish:        lang === 'en' ? "Publish Date":"نشر في", 
        status:         lang === 'en' ? "Status":"الحالة",
        course:         lang === "en" ? "Course":"المادة",
        nothing:        lang === "en" ? "Nothing To Do Here":"لاشئ عليك هنا",
        still:          lang === 'en' ? "Still":"هناك وقت",
        today:          lang === 'en' ? "Today":"اليوم",
        late:           lang === 'en' ? "Late":"متأخر",
        done:           lang === 'en' ? "Done":"تم",
        doneLate:       lang === 'en' ? "Done Late":"تم متاخر"

    }
    const iconList = [
        <FontAwesomeIcon icon="fa-solid fa-otter" />,
        <FontAwesomeIcon icon="fa-solid fa-hippo" />,
        <FontAwesomeIcon icon="fa-solid fa-kiwi-bird" />,
        <FontAwesomeIcon icon="fa-solid fa-worm" />,
        <FontAwesomeIcon icon="fa-solid fa-horse-head" />,
        <FontAwesomeIcon icon="fa-solid fa-frog" />,
        <FontAwesomeIcon icon="fa-solid fa-fish-fins" />,
        <FontAwesomeIcon icon="fa-solid fa-crow" />,
        <FontAwesomeIcon icon="fa-solid fa-cat" />
    ]
    useEffect(()=>{
        var workEndpoint,workType;
        if (submitted){
            if(type == "Assignments"){
                workEndpoint = "submittedhomeworklist"
                workType = 'homework'
            }else{
                workEndpoint = "submittedexamslist"
                workType = 'exam'
            }
        }else{
            if(type == "Assignments"){
                workEndpoint = "homeworklist"
                workType = 'homework'
            }else{
                workEndpoint = "examslist"
                workType = 'exam'
            }
        }
        axios.get(Global.BackendURL+"/student/"+workEndpoint+"?studentID="+id).then((res)=>{
            const data = res.data
            if (data == undefined){
                setEmptyMessage(<div className="emptyMessage" >
                                        {iconList[Math.round(Math.random()*(iconList.length-1))]}
                                        <p className=""> {compLang['nothing']}</p>
                                    </div>)
            }else if (data.length == 0){
                setEmptyMessage(<div className="emptyMessage" >
                                        {iconList[Math.round(Math.random()*(iconList.length-1))]}
                                        <p className=""> {compLang['nothing']}</p>
                                    </div>)
            }
            else{
                setEmptyMessage(null)
                var tableElements = []

                var bound = limit?(data.length>5?5:data.length):(data.length)
                for(var i=0;i<bound;i++){
                    var homeworkType;
                    if (submitted){
                        if(data[i][workType]['due_date'] == null){
                            homeworkType = 'done'
                        }else{
                            homeworkType = compareDates(data[i][workType]['due_date'])
                            if (homeworkType === 'late'){
                                homeworkType = 'doneLate'
                            }else{
                                homeworkType = 'done'
                            }
                        }
                    }else{
                        if(data[i][workType]['due_date'] == null){
                            homeworkType = 'still'
                        }else{
                            homeworkType = compareDates(data[i][workType]['due_date'])
                        }
                    }

                    var subjectName = data[i][workType]['course']["name"].split(' ').join('')
                    tableElements.push(<tr className="tableRow" onClick={routeTo}>
                                            <td>{data[i][workType]['name']}</td>
                                            <td>{data[i][workType]['grade']}</td>
                                            {submitted ? (data[i]['graded']? <td>{data[i]['grade']}</td>: '-'):null}
                                            <td>{data[i][workType]['publish_date'] === null ? "-":formatTime(data[i][workType]['publish_date'])}</td>
                                            <td>{data[i][workType]['due_date']==null ? '-': formatTime(data[i][workType]['due_date'])}</td>
                                            <td><span className={homeworkType}>{compLang[homeworkType]}</span></td>
                                            <td>{lang === 'en' ? data[i][workType]['course']["name"] :data[i][workType]['course']["arName"]}</td>
                                            <a href={"./courses/"+subjectName.toLowerCase()+"/"+type.toLowerCase()+"/"+data[i][workType]['id']} className="hiddenRoute">a</a>
                                            {/* {type ==="Exams" && submitted ? <a href={"./courses/"+subjectName.toLowerCase()+"/"+type.toLowerCase()+"/"+data[i][workType]['id']} className="hiddenRoute">a</a>:null} */}

                                        </tr>)
                }

                setAssignmentList(tableElements)
            }
            
        }).catch((err)=>{
            console.log("there is Error Happend")
            console.log(err)
        })
    },[])


    return (
        <div className="workExamPanel">
            <div className={"row titleSeemore "+(limit ?"":"hide")}>
                <p className="panelTitle">{compLang['type']}</p>
                {/* <a href={'/student/'+type}>{compLang['seeAll']} {localStorage.getItem('lang')==='en' ?<FontAwesomeIcon icon="fa-solid fa-angles-right" />:<FontAwesomeIcon icon="fa-solid fa-angles-left" />}</a> */}
                <a onClick={()=>{document.getElementById(type.toLowerCase()+"NavButton").click()}}>{compLang['seeAll']} {localStorage.getItem('lang')==='en' ?<FontAwesomeIcon icon="fa-solid fa-angles-right" />:<FontAwesomeIcon icon="fa-solid fa-angles-left" />}</a>
            </div>
            <table>
                <tr className="tableHeaders">
                    <th>{compLang['name']}</th>
                    <th>{compLang['grade']}</th>
                    {submitted ? <th>{compLang['studentGrade']}</th>:null}
                    <th>{compLang['publish']}</th>
                    <th>{compLang['due']}</th>
                    <th>{compLang['status']}</th>
                    <th>{compLang['course']}</th>
                </tr>
                <hr/>

                {assinmentList}
            </table>
            {emptyMessage}
        </div>
    );
}

export default WorkExamsPanel;
