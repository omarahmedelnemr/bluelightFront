import '../styles/general.css'
import "../../components/teacher/styles/classworkPanel.css"
import './styles/classwork.css'
import checkAutherization from '../../general/checkAuth';
import TopBar from '../../components/topBar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Global from '../../general/globalVar';
import ClassworkPanel from '../../components/teacher/classworkPanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import routeTo from '../../general/reroute';
import compareDates from '../../general/compareDates';
function Classwork() {
    if (checkAutherization() !== 'Auth'){
        window.location.href ='/login'
    }
    const lang = localStorage.getItem('lang') 
    const pageText = {
        SchoolName: lang === 'en' ? "Nile Egyption International Schools":"مدارس النيل الدولية",
        classrooms: lang === 'en' ? "Classrooms":"الفصول",
        classwork:  lang === 'en' ? "Classwork":"الواجبات",
        kg:         lang === 'en' ? "KG":"حضانة",
        E:          lang === 'en' ? "Elementary":"ابتدائي",
        P:          lang === 'en' ? "Preparatory":"اعدادي",
        S:          lang === 'en' ? "Secondary":"ثانوي",
        // type:   lang === 'en' ? (type === "Assignments"? "Assignments":"Exams"):(type === "Assignments"? "الواجبات":"الاختبارات"),
        seeAll: lang === 'en' ? "See All":"مشاهدة الكل",
        name:   lang === 'en' ? "Name":"الاسم",
        grade:  lang === 'en' ? "Total Grade":"الدرجة الكلية",
        due:    lang === 'en' ? "Due Date":"اخر موعد تسليم",
        status: lang === 'en' ? "Status":"الحالة",
        course: lang === "en" ? "Course":"المادة",
        nothing:lang === "en" ? "Nothing To Do Here":"لاشئ عليك هنا",
        still  :lang === 'en' ? "Still":"هناك وقت",
        today  :lang === 'en' ? "Today":"اليوم",
        late  :lang === 'en' ? "Late":"متأخر"

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
    const [examReqStatus,setExamReq] = useState(false)
    const [navButtons,setNavButtons] = useState(null)
    const [homeworklist,setHomeworkList] = useState('')
    const [examsList,setExamsList] = useState('')

    const [emptyMessage,setEmptyMessage] = useState(<div className="emptyMessage" >
    <div className="loading"></div>
</div>)
    const [examsEmptyMessage,setExamsEmptyMessage] = useState(<div className="emptyMessage" >
    <div className="loading"></div>
</div>)
    const [loading,setLoading] = useState(<div className="loading"></div>)
    useEffect(()=>{
        axios.get(Global.BackendURL+"/teacher/homeworklist?teacherID="+localStorage.getItem('id')).then((res)=>{
            const data = res.data
            setLoading(null)
                     
            if (data == undefined){
                setEmptyMessage(<div className="emptyMessage" >
                                        {iconList[Math.round(Math.random()*(iconList.length-1))]}
                                        <p className=""> {pageText['nothing']}</p>
                                    </div>)
            }else if (data.length == 0){
                setEmptyMessage(<div className="emptyMessage" >
                                        {iconList[Math.round(Math.random()*(iconList.length-1))]}
                                        <p className=""> {pageText['nothing']}</p>
                                    </div>)
            }
            else{
                setEmptyMessage(null)
                var tableElements = []

                for(var i=0;i<data.length;i++){
                    console.log("Data Entry: ", data[i])
                    var homeworkType;
                    if(data[i]['due_date'] == null){
                        homeworkType = 'still'
                    }else{
                        homeworkType = compareDates(data[i]['due_date']) === 'late'?"today": compareDates(data[i]['due_date']) 
                    }
                    // var subjectName = data[i]['course']["name"].split(' ').join('')
                    
                    tableElements.push(<tr className="tableRow" onClick={routeTo}>
                                            <td>{data[i]['name']}</td>
                                            <td>{data[i]['grade']}</td>
                                            <td>{data[i]['due_date']==null ? '-': data[i]['due_date'].split('T')[0]}</td>
                                            <td><span className={homeworkType}>{pageText[homeworkType]==="today"?"Done":pageText[homeworkType]}</span></td>
                                            <td>{data[i]['course']['name']}</td>
                                            <td>{data[i]['NotGraded']}</td>
                                            <td>{data[i]['totalSubmission']}</td>
                                            <td style={{color: data[i]['NotSubmitted'] >0 ?"red":"black" }}>{data[i]['NotSubmitted']}</td>
                                            <a href={"./submissions?submission="+data[i]['id']} className="hiddenRoute">a</a>

                                        </tr>)
                }
                console.log(data)
                setHomeworkList(tableElements)

            }

        }).catch((err)=>{
            console.log("Internal Error!")
            console.log(err)
        })
    },1000)
  function switchSubNavButtons(event){
    const parent = event.currentTarget.parentElement
    parent.querySelector('.activeSide').classList.remove('activeSide')
    event.currentTarget.classList.add('activeSide')
    console.log(event.currentTarget.innerHTML)
    if (event.currentTarget.innerHTML === "Homework"){
        event.currentTarget.parentElement.parentElement.querySelector('.homeworkSection').style.display = 'flex'
        event.currentTarget.parentElement.parentElement.querySelector('.examsSection').style.display = 'none'
    }else if(event.currentTarget.innerHTML === 'Exams'){
        event.currentTarget.parentElement.parentElement.querySelector('.homeworkSection').style.display = 'none'
        event.currentTarget.parentElement.parentElement.querySelector('.examsSection').style.display = 'flex'
    
        if(!examReqStatus){
            axios.get(Global.BackendURL+"/teacher/examlist?teacherID="+localStorage.getItem('id')).then((res)=>{
                const data = res.data
                setLoading(null)
                setExamReq(true)
                         
                if (data == undefined){
                    setExamsEmptyMessage(<div className="emptyMessage" >
                                            {iconList[Math.round(Math.random()*(iconList.length-1))]}
                                            <p className=""> {pageText['nothing']}</p>
                                        </div>)
                }else if (data.length == 0){
                    setExamsEmptyMessage(<div className="emptyMessage" >
                                            {iconList[Math.round(Math.random()*(iconList.length-1))]}
                                            <p className=""> {pageText['nothing']}</p>
                                        </div>)
                }
                else{
                    setExamsEmptyMessage(null)
                    var tableElements = []

                    for(var i=0;i<data.length;i++){
                        var homeworkType;
                        if(data[i]['due_date'] == null){
                            homeworkType = 'still'
                        }else{

                            homeworkType = compareDates(data[i]['due_date'])
                        }
                        var subjectName = data[i]['course']["name"].split(' ').join('')
                        
                        tableElements.push(<tr className="tableRow" onClick={routeTo}>
                                                <td>{data[i]['name']}</td>
                                                <td>{data[i]['grade']}</td>
                                                <td>{data[i]['due_date']==null ? '-': data[i]['due_date'].split('T')[0]}</td>
                                                <td><span className={homeworkType}>{pageText[homeworkType]}</span></td>
                                                <td>{lang === 'en' ? data[i]['course']["name"] :data[i]['course']["arName"]}</td>
                                                {/* <a href={"./courses/"+subjectName.toLowerCase()+"/"+type.toLowerCase()+"/"+data[i]['id']} className="hiddenRoute">a</a> */}

                                            </tr>)
                    }
                    console.log(data)
                    setExamsList(tableElements)

                }
            }).catch((err)=>{
                console.log("Internal Error!")
                console.log(err)
            })
        }
    
    }

  }
    return (
        <div className="classworkPage column fullWidth">

            <TopBar title={pageText["classwork"]}/>
            {loading}
            <div className='subNavButtons'>
                <button className='activeSide' onClick={switchSubNavButtons}>Homework</button>
                <button onClick={switchSubNavButtons}>Exams</button>
            </div>
            <div className='classworkContent column'>
                    <div className="workExamPanel subContentSection homeworkSection">
                        <table>
                            <tr className="tableHeaders">
                                <th>{pageText['name']}</th>
                                <th>{pageText['grade']}</th>
                                <th>{pageText['due']}</th>
                                <th>{pageText['status']}</th>
                                <th>{pageText['course']}</th>
                                <th>not Graded<br/>Submisions</th>
                                <th>Total<br/>Submissions</th>
                                <th>not Submitted</th>
                            </tr>
                            <hr/>

                            {homeworklist}
                        </table>
                        {emptyMessage}
                    </div>      
                    <div className="workExamPanel subContentSection examsSection">
                        <table>
                            <tr className="tableHeaders">
                                <th>{pageText['name']}</th>
                                <th>{pageText['grade']}</th>
                                <th>{pageText['due']}</th>
                                <th>{pageText['status']}</th>
                                <th>{pageText['course']}</th>
                                <th>not Graded<br/>Submisions</th>
                            </tr>
                            <hr/>

                            {examsList}
                        </table>
                        {examsEmptyMessage}
                    </div> 
            </div>
        </div>
    );
}

export default Classwork;
