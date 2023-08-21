import { useEffect, useState } from 'react';
import './styles/statusBoxes.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Global from '../../publicFunctions/globalVar';
function StatusBoxes() {
    
    // get Assignments Numbers
    const [totalAssignmentsCount,setTotalAssignmentsCount] = useState('-')
    const [assignmentsCount,setAssignmentsCount] = useState('-')
    useEffect(()=>{
        axios.get(Global.BackendURL+"/student/totalhomeworkcount?studentID="+localStorage.getItem('currentStudentID')).then((res)=>{
            setTotalAssignmentsCount(res.data.count)
        }).catch((err)=>{
            console.log(err)
        })
    })
    useEffect(()=>{
        axios.get(Global.BackendURL+"/student/homeworkcount?studentID="+localStorage.getItem('currentStudentID')).then((res)=>{
            setAssignmentsCount(res.data.count)
        }).catch((err)=>{
            console.log(err)
        })
    })

    // get Exams Numbers
    const [totalExamsCount,setTotalExamsCount] = useState('-')
    const [examGrades,setExamsGrades] = useState('-')
    useEffect(()=>{
        axios.get(Global.BackendURL+"/student/examGrades?studentID="+localStorage.getItem('currentStudentID')).then((res)=>{
            const data = res.data
            if (data['totalGrade'] === 0 ){
                setExamsGrades('-')
            }else{
                const percentage = Math.round(data['grade']*100 / data['totalGrade'])
                setExamsGrades(percentage)
            }
        }).catch((err)=>{
            console.log(err)
        })
    })

    // get Attendance Numbers
    const [totalAttendanceCount,setTotalAttendanceCount] = useState('-')
    const [attendedCount,setAttendedCount] = useState('-')
    useEffect(()=>{
        axios.get(Global.BackendURL+"/student/totalAttendance?studentID="+localStorage.getItem('currentStudentID')).then((res)=>{
            setTotalAttendanceCount(res.data.count)
        }).catch((err)=>{
            console.log(err)
        })
    })
    useEffect(()=>{
        axios.get(Global.BackendURL+"/student/AttendanceCount?studentID="+localStorage.getItem('currentStudentID')).then((res)=>{
            setAttendedCount(res.data.count)
        }).catch((err)=>{
            console.log(err)
        })
    })

    // get Events Numbers
    const [messagesCount,setMessagesCount] = useState('-')
    useEffect(()=>{
        axios.get(Global.BackendURL+"/student/messagesCount?studentID="+localStorage.getItem('currentStudentID')).then((res)=>{
            setMessagesCount(res.data.count)
        }).catch((err)=>{
            console.log(err)
        })
    })
        
    const lang = localStorage.getItem('lang')
    const compLang = {
        assignments:         lang === "en" ? "Assignments" : "الواجبات",
        exams:               lang === "en" ? "Exams" : "الاختبارات",
        attendance:          lang === "en" ? "Attendance" : "الحضور",
        messages:            lang === "en" ? "Messages" : "الرسائل",
        events:              lang === "en" ? "Events" : "المناسبات",
        assignmentsMessage1: lang === "en" ? "Great, Just a Little More" : "رائع, تبقي القليل",
        assignmentsMessage2: lang === 'en' ? "lot of work, But You Got it":"عمل كثير, ولكنك قادر علي انجازه",
        examsMessage1:       lang === "en" ? "Take a Rest" : "خذ القليل من الراحة",
        examsMessage2:       lang === "en" ? "Great, Just a Little More" : "رائع, تبقي القليل",
        examsMessage3:       lang === "en" ? "Study Well" : "ادرس بجهد",
        attendanceMessage1:  lang === "en" ? "Great, Keep Going" : "عمل رائع, واصل",
        attendanceMessage2:  lang === "en" ? "You Should Take Care More of Your Classes" : "عليك ان تهتم بحصصك اكثر",
        eventsMessage:       lang === "en" ? "un-seen Events" : "مناسبات لم تشاهدها"
    }
    return (
        <div className="row statusBoxes">
            <div className='row'>
                
                <div className={'contentBoxSize1'}>
                    <div className='boxIcon' style={{backgroundColor:'#d798eb'}}>
                        <FontAwesomeIcon icon="fas fa-book" />
                    </div>
                    <div className='boxTitle'>
                        <p>{compLang["assignments"]}</p>
                    </div>
                    <div className='boxValue'>
                        <h2>{(totalAssignmentsCount === '-' || assignmentsCount === "-") ? '-' :(totalAssignmentsCount - assignmentsCount)}/{totalAssignmentsCount}</h2>
                    </div>
                    <div className='boxComment'>
                        <p>{assignmentsCount === '-' ? '-' : (assignmentsCount  < 5?compLang['assignmentsMessage1']:compLang['assignmentsMessage1'])}</p>
                    </div>
                </div>

                <div className={'contentBoxSize1'}>
                    <div className='boxIcon' style={{backgroundColor:'#ee9981'}}>
                        <FontAwesomeIcon icon="fas fa-edit" />
                    </div>
                    <div className='boxTitle'>
                        <p>{compLang["exams"]}</p>
                    </div>
                    <div className='boxValue'>
                        <h2>{examGrades} %</h2>
                    </div>
                    <div className='boxComment'>
                        <p>{examGrades < 75? (examGrades<50? compLang["examsMessage3"]:compLang["examsMessage2"]):compLang["examsMessage1"]}</p>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className={'contentBoxSize1'}>
                    <div className='boxIcon' style={{backgroundColor:'#67a5e7'}}>
                        <FontAwesomeIcon icon="fas fa-calendar-check" />
                    </div>
                    <div className='boxTitle'>
                        <p>{compLang["attendance"]}</p>
                    </div>
                    <div className='boxValue'>
                        {/* <h2>1/3</h2> */}
                        <h2>{(totalAttendanceCount === '-' || attendedCount === "-") ? '-' :(totalAttendanceCount ==0 ? 100 :   attendedCount * 100/totalAttendanceCount )} %</h2>

                    </div>
                    <div className='boxComment'>
                        <p>{attendedCount === '-' ? '-' : ((totalAttendanceCount ==0 ? 100 :   Math.round(attendedCount * 100/totalAttendanceCount) )  > 90? compLang["attendanceMessage1"]:compLang["attendanceMessage2"])}</p>

                    </div>
                </div>
                <div className={'contentBoxSize1'}>
                    <div className='boxIcon' style={{backgroundColor:'#f4c075'}}>
                        <FontAwesomeIcon icon="fas fa-envelope" />
                    </div>
                    <div className='boxTitle'>
                        <p>{compLang["messages"]}</p>
                    </div>
                    <div className='boxValue'>
                        <h2>{messagesCount}</h2>
                    </div>
                    <div className='boxComment'>
                        <p>{messagesCount > 0?<span style={{color:"red"}}>{messagesCount}</span>:<span>{messagesCount}</span>} unseen Messages</p>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default StatusBoxes;
