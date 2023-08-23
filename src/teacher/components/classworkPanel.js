import "./styles/classworkPanel.css"
import axios from "axios";
import Global from "../../general/globalVar";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import compareDates from "../../general/compareDates";
import { useNavigate } from "react-router-dom";
import routeTo from "../../general/reroute";
function ClassworkPanel({type,limit}) {
    const [assinmentList,setAssignmentList] = useState('')
    const [emptyMessage,setEmptyMessage] = useState(<div className="emptyMessage" >
    <div className="loading"></div>
</div>)
    const id = localStorage.getItem("id")
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
        var workEndpoint;
        if(type == "Assignments"){
            workEndpoint = "homeworklist"
        }else{
            workEndpoint = "examslist"

        }
        axios.get(Global.BackendURL+"/teacher/homeworklist?teacherID="+id).then((res)=>{
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

                for(var i=0;i<data.length;i++){
                    var homeworkType;
                    if(data[i]['homework']['due_date'] == null){
                        homeworkType = 'still'
                    }else{
                        homeworkType = compareDates(data[i]['homework']['due_date'])
                    }
                    var subjectName = data[i]['homework']['course']["name"].split(' ').join('')
                    
                    tableElements.push(<tr className="tableRow" onClick={routeTo}>
                                            <td>{data[i]['homework']['name']}</td>
                                            <td>{data[i]['homework']['grade']}</td>
                                            <td>{data[i]['homework']['due_date']==null ? '-': data[i]['homework']['due_date'].split('T')[0]}</td>
                                            <td><span className={homeworkType}>{compLang[homeworkType]}</span></td>
                                            <td>{lang === 'en' ? data[i]['homework']['course']["name"] :data[i]['homework']['course']["arName"]}</td>
                                            <a href={"./courses/"+subjectName.toLowerCase()+"/"+type.toLowerCase()+"/"+data[i]['homework']['id']} className="hiddenRoute">a</a>

                                        </tr>)
                }

                setAssignmentList(tableElements)
            }
            
        }).catch((err)=>{
            console.log("there is Error Happend")
            console.log(err)
        })
    },[])

    const lang = localStorage.getItem('lang')
    const compLang ={
        type:   lang === 'en' ? (type === "Assignments"? "Assignments":"Exams"):(type === "Assignments"? "الواجبات":"الاختبارات"),
        seeAll: lang === 'en' ? "See All":"مشاهدة الكل",
        name:   lang === 'en' ? "Name":"الاسم",
        grade:  lang === 'en' ? "Grade":"الدرجة الكلية",
        due:    lang === 'en' ? "Due Date":"اخر موعد تسليم",
        status: lang === 'en' ? "Status":"الحالة",
        course: lang === "en" ? "Course":"المادة",
        nothing:lang === "en" ? "Nothing To Do Here":"لاشئ عليك هنا",
        still  :lang === 'en' ? "Still":"هناك وقت",
        today  :lang === 'en' ? "Today":"اليوم",
        late  :lang === 'en' ? "Late":"متأخر"

    }
    return (
        <div className="workExamPanel">
            <div className={"row titleSeemore "+(limit ?"":"hide")}>
                <p className="panelTitle">{compLang['type']}</p>
                {/* <a href={'/student/'+type}>{compLang['seeAll']} {localStorage.getItem('lang')==='en' ?<FontAwesomeIcon icon="fa-solid fa-angles-right" />:<FontAwesomeIcon icon="fa-solid fa-angles-left" />}</a> */}
                <a onClick={()=>{document.getElementById(type.toLowerCase()+"NavButton").click()}}>See All {localStorage.getItem('lang')==='en' ?<FontAwesomeIcon icon="fa-solid fa-angles-right" />:<FontAwesomeIcon icon="fa-solid fa-angles-left" />}</a>
            </div>
            <table>
                <tr className="tableHeaders">
                    <th>{compLang['name']}</th>
                    <th>{compLang['grade']}</th>
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

export default ClassworkPanel;
