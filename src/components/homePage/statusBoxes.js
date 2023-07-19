import { useEffect, useState } from 'react';
import './styles/statusBoxes.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Global from '../../general/globalVar';
import Cookies from 'universal-cookie';
function StatusBoxes() {
    const cookieReader =new Cookies()
    
    // get Assignments Numbers
    const [totalAssignmentsCount,setTotalAssignmentsCount] = useState('-')
    const [assignmentsCount,setAssignmentsCount] = useState('-')
    useEffect(()=>{
        axios.get(Global.BackendURL+"/student/totalhomeworkcount?studentID="+cookieReader.get('id')).then((res)=>{
            setTotalAssignmentsCount(res.data.count)
        }).catch((err)=>{
            console.log(err)
        })
    })
    useEffect(()=>{
        axios.get(Global.BackendURL+"/student/homeworkcount?studentID="+cookieReader.get('id')).then((res)=>{
            setAssignmentsCount(res.data.count)
        }).catch((err)=>{
            console.log(err)
        })
    })

    // get Exams Numbers
    const [totalExamsCount,setTotalExamsCount] = useState('-')
    const [examsCount,setExamsCount] = useState('-')
    useEffect(()=>{
        axios.get(Global.BackendURL+"/student/totalexamscount?studentID="+cookieReader.get('id')).then((res)=>{
            setTotalExamsCount(res.data.count)
        }).catch((err)=>{
            console.log(err)
        })
    })
    useEffect(()=>{
        axios.get(Global.BackendURL+"/student/examscount?studentID="+cookieReader.get('id')).then((res)=>{
            setExamsCount(res.data.count)
        }).catch((err)=>{
            console.log(err)
        })
    })

    // get Exams Numbers
    const [totalAttendanceCount,setTotalAttendanceCount] = useState('-')
    const [attendedCount,setAttendedCount] = useState('-')
    useEffect(()=>{
        axios.get(Global.BackendURL+"/student/totalAttendance?studentID="+cookieReader.get('id')).then((res)=>{
            setTotalAttendanceCount(res.data.count)
        }).catch((err)=>{
            console.log(err)
        })
    })
    useEffect(()=>{
        axios.get(Global.BackendURL+"/student/AttendanceCount?studentID="+cookieReader.get('id')).then((res)=>{
            setAttendedCount(res.data.count)
        }).catch((err)=>{
            console.log(err)
        })
    })

    // get Events Numbers
    const [eventsCount,setEventCount] = useState('-')
    useEffect(()=>{
        axios.get(Global.BackendURL+"/student/eventsCount?classroomID="+localStorage.getItem("classroom")).then((res)=>{
            setEventCount(res.data.count)
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
        <div class="row statusBoxes">
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
                        <h2>{(totalExamsCount === '-' || examsCount === "-") ? '-' :(totalExamsCount - examsCount)}/{totalExamsCount}</h2>
                    </div>
                    <div className='boxComment'>
                        <p>{examsCount === '-' ? '-' : (examsCount  < 2? (examsCount ==0 ? compLang["examsMessage1"]:compLang["examsMessage2"]):compLang["examsMessage3"])}</p>
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
                        <h2>{(totalAttendanceCount === '-' || attendedCount === "-") ? '-' :(totalAttendanceCount - attendedCount)}/{totalAttendanceCount}</h2>

                    </div>
                    <div className='boxComment'>
                        <p>{attendedCount === '-' ? '-' : (attendedCount  < 10? compLang["attendanceMessage1"]:compLang["attendanceMessage2"])}</p>

                    </div>
                </div>
                <div className={'contentBoxSize1'}>
                    <div className='boxIcon' style={{backgroundColor:'#a675f4'}}>
                        {/* <FontAwesomeIcon icon="fas fa-envelope" /> */}
                        <FontAwesomeIcon icon="fa-solid fa-users" />
                    </div>
                    <div className='boxTitle'>
                        <p>{compLang["events"]}</p>
                    </div>
                    <div className='boxValue'>
                        <h2>{eventsCount}</h2>
                    </div>
                    <div className='boxComment'>
                        <p><span style={{color:"red"}}>{eventsCount}</span> {compLang['eventsMessage']}</p>

                    </div>
                </div>
                <div className={'contentBoxSize1 hideInSmall'}>
                    {/* <div className='boxIcon' style={{backgroundColor:'#f4c075'}}>
                        <FontAwesomeIcon icon="fas fa-envelope" />
                    </div>
                    <div className='boxTitle'>
                        <p>{compLang["messages"]}</p>
                    </div>
                    <div className='boxValue'>
                        <h2>1/3</h2>
                    </div>
                    <div className='boxComment'>
                        <p><span style={{color:"red"}}>2</span> late Submission</p>

                    </div> */}
                </div>
                
            </div>

        </div>
    );
}

export default StatusBoxes;
