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
            console.log("res: ",res.data.count)
            setTotalAssignmentsCount(res.data.count)
        }).catch((err)=>{
            console.log(err)
        })
    })
    useEffect(()=>{
        axios.get(Global.BackendURL+"/student/homeworkcount?studentID="+cookieReader.get('id')).then((res)=>{
            console.log("res: ",res.data.count)
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
            console.log("res: ",res.data.count)
            setTotalExamsCount(res.data.count)
        }).catch((err)=>{
            console.log(err)
        })
    })
    useEffect(()=>{
        axios.get(Global.BackendURL+"/student/examscount?studentID="+cookieReader.get('id')).then((res)=>{
            console.log("res: ",res.data.count)
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
            console.log("res: ",res.data.count)
            setTotalAttendanceCount(res.data.count)
        }).catch((err)=>{
            console.log(err)
        })
    })
    useEffect(()=>{
        axios.get(Global.BackendURL+"/student/AttendanceCount?studentID="+cookieReader.get('id')).then((res)=>{
            console.log("res: ",res.data.count)
            setAttendedCount(res.data.count)
        }).catch((err)=>{
            console.log(err)
        })
    })

        // get Events Numbers
        const [eventsCount,setEventCount] = useState('-')
        useEffect(()=>{
            axios.get(Global.BackendURL+"/student/eventsCount?classroomID="+localStorage.getItem("classroom")).then((res)=>{
                console.log("res: ",res.data.count)
                setEventCount(res.data.count)
            }).catch((err)=>{
                console.log(err)
            })
        })
        
    const lang = localStorage.getItem('lang')
    const compLang = {
        assignments: lang === "en" ? "Assignments" : "الواجبات",
        exams: lang === "en" ? "Exams" : "الاختبارات",
        attendance: lang === "en" ? "Attendance" : "الحضور",
        messages: lang === "en" ? "Messages" : "الرسائل",
        events: lang === "en" ? "Events" : "المناسبات"
        
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
                        <p>{assignmentsCount === '-' ? '-' : (assignmentsCount  < 5?"Great, Just a Little More":"lot of work, But You Got it")}</p>
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
                        <p>{examsCount === '-' ? '-' : (examsCount  < 2? (examsCount ==0 ? "Take a Rest":"Great, Just a Little More"):"Study Well")}</p>
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
                        <p>{attendedCount === '-' ? '-' : (attendedCount  < 10? "Great, Keep Going":"Your Classes are Important")}</p>

                    </div>
                </div>
                <div className={'contentBoxSize1'}>
                    <div className='boxIcon' style={{backgroundColor:'#a675f4'}}>
                        <FontAwesomeIcon icon="fas fa-envelope" />
                    </div>
                    <div className='boxTitle'>
                        <p>{compLang["events"]}</p>
                    </div>
                    <div className='boxValue'>
                        <h2>{eventsCount}</h2>
                    </div>
                    <div className='boxComment'>
                        <p><span style={{color:"red"}}>{eventsCount}</span> un-seen Events</p>

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
