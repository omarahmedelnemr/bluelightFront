import Cookies from 'universal-cookie';
import '../styles/general.css'
import './styles/courseData.css'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Global from '../../general/globalVar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import compareDates from '../../general/compareDates';
import routeTo from '../../general/reroute';
import TopBar from '../../components/student/topBar';
function CourseDataPage() {
    const lang = localStorage.getItem("lang")
    const compLang ={
      seeAll:      lang === 'en' ? "See All":"مشاهدة الكل",
      name:        lang === 'en' ? "Name":"الاسم",
      grade:       lang === 'en' ? "Total Grade":"الدرجة الكلية",
      due:         lang === 'en' ? "Due Date":"اخر موعد تسليم",
      publishDate: lang === 'en' ? "Publish Date":"تاريخ النشر",
      yourGrade:   lang === "en" ? "Your Grade":"درجتك",
      status:      lang === 'en' ? "Status":"الحالة",
      course:      lang === "en" ? "Course":"المادة",
      nothing:     lang === "en" ? "Nothing To Do Here":"لاشئ عليك هنا",
      still  :     lang === 'en' ? "Still":"هناك وقت",
      today  :     lang === 'en' ? "Today":"اليوم",
      late  :      lang === 'en' ? "Late":"متأخر",
      completed:   lang === "en" ? "Completed":"تم",
      notYet:      lang === 'en' ? "Not Graded":"لم تصحح",
      assingments: lang === 'en' ? 'Assignments':"الواجبات",
      exams:       lang === "en" ? "Exams":"الاختبارات",
      announce:    lang === 'en' ? "Announcements":"الاعلانات"

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
  
    const cookieReader = new Cookies()
    const {courseName} = useParams()
    const studentID = cookieReader.get('id')
    const classroomID = localStorage.getItem('classroom')
    const [assinmentList,setAssignmentList] = useState('')
    const [exmaStatus,setExamStatus] = useState(false)
    const [announcementsStatus,setAnnouncementsStatus] = useState(false)
    const [title,setTitle] = useState(compLang['assingments'])

    const [emptyAssingmentsMessage,setEmptyMessage] = useState(<div className="emptyAssingmentsMessage" >
                                                      <div className="loading"></div>
                                                  </div>)

    const [examsList,setExamsList] = useState('')

    const [emptyExamsMessage,setEmptyExamsMessage] = useState(<div className="emptyExamsMessage" >
                                                  <div className="loading"></div>
                                              </div>)            


    // setTitle(compLang['assingments'])
    useEffect(()=>{
        axios.get(Global.BackendURL+"/student/courseAssingments?studentID="+studentID+"&classroomID="+classroomID+"&courseName="+courseName).then((res)=>{
            const data = res.data
            if (data == undefined){
                    setEmptyMessage(<div className="emptyAssingmentsMessage" >
                                      {iconList[Math.round(Math.random()*(iconList.length-1))]}
                                      <p className=""> {compLang['nothing']}</p>
                                  </div>)
              }else if (data.length == 0){
                  setEmptyMessage(<div className="emptyAssingmentsMessage" >
                                          {iconList[Math.round(Math.random()*(iconList.length-1))]}
                                          <p className=""> {compLang['nothing']}</p>
                                      </div>)
              }else{
                setEmptyMessage(null)
                var tableElements = []
                for(var i=0;i<data.length;i++){
                    var homeworkType;
                    if(data[i]['homework']['due_date'] == null){
                        homeworkType = 'still'
                    }else{
                        homeworkType = data[i]['submitted'] ? "completed": compareDates(data[i]['homework']['due_date'])
                    }
                    const yourGrade = data[i]['graded'] ? data[i]['grade'] : compLang['notYet']
                    const GradeClass = data[i]['graded'] ? '':"notGraded"
                    var subjectName = data[i]['homework']['course']["name"].split(' ').join('')
                    tableElements.push(<tr className="tableRow" onClick={routeTo}>
                                            <td>{data[i]['homework']['name']}</td>
                                            <td>{data[i]['homework']['grade']}</td>
                                            <td><span className={GradeClass}>{yourGrade}</span></td>
                                            <td>{data[i]['homework']['due_date']==null ? '-': data[i]['homework']['due_date'].split('T')[0]}</td>
                                            <td>{data[i]['homework']['publish_date']==null ? '-': data[i]['homework']['publish_date'].split('T')[0]}</td>
                                            <td><span className={homeworkType}>{compLang[homeworkType]}</span></td>
                                            <td>{lang === 'en' ? data[i]['homework']['course']["name"] :data[i]['homework']['course']["arName"]}</td>
                                            <a href={"./"+subjectName+"/assignments/"+data[i]['homework']['id']} className="hiddenRoute">a</a>

                                        </tr>)
                }

                setAssignmentList(tableElements)

              }
        }).catch((err)=>{
            console.log(err)
        })
    },[])

  function switchWork(event){
    
    //Toggle The Active Features
    const parentClass = event.currentTarget.parentElement
    parentClass.querySelector('.activeSide').classList.remove('activeSide')
    event.currentTarget.classList.add('activeSide')

    //Show the Selected Section
    if (event.currentTarget.textContent == compLang['assingments']){
        document.getElementsByClassName('courseAssignment')[0].style.display = 'block'
        document.getElementsByClassName('courseExams')[0].style.display = 'none'
        document.getElementsByClassName('courseAnnounce')[0].style.display = 'none'
        setTitle(compLang['assingments'])

    }else if(event.currentTarget.textContent == compLang['exams']){
        document.getElementsByClassName('courseAssignment')[0].style.display = 'none'
        document.getElementsByClassName('courseExams')[0].style.display = 'block'
        document.getElementsByClassName('courseAnnounce')[0].style.display = 'none'
        setTitle(compLang['exams'])

        //Send The Request To Get The Data From The DB if it didn't Load Already
        if (exmaStatus == false){
            axios.get(Global.BackendURL+"/student/courseExams?studentID="+studentID+"&classroomID="+classroomID+"&courseName="+courseName).then((res)=>{
                const data = res.data
                if (data == undefined){
                setEmptyExamsMessage(<div className="emptyExamsMessage" >
                                        {iconList[Math.round(Math.random()*(iconList.length-1))]}
                                        <p className=""> {compLang['nothing']}</p>
                                    </div>)
                }else if (data.length == 0){
                    setEmptyExamsMessage(<div className="emptyExamsMessage" >
                                            {iconList[Math.round(Math.random()*(iconList.length-1))]}
                                            <p className=""> {compLang['nothing']}</p>
                                        </div>)
                }else{
                    setEmptyExamsMessage(null)
                    var tableElements = []
                    for(var i=0;i<data.length;i++){
                        var examType;
                        if(data[i]['exam']['due_date'] == null){
                        examType = 'still'
                        }else{
                        examType = data[i]['submitted'] ? "completed": compareDates(data[i]['exam']['due_date'])
                        }
                        const yourGrade = data[i]['graded'] ? data[i]['grade'] : compLang['notYet']
                        const GradeClass = data[i]['graded'] ? '':"notGraded"
                        var subjectName = data[i]['exam']['course']["name"].split(' ').join('')
                        tableElements.push(<tr className="tableRow" onClick={routeTo}>
                                                <td>{data[i]['exam']['name']}</td>
                                                <td>{data[i]['exam']['grade']}</td>
                                                <td><span className={GradeClass}>{yourGrade}</span></td>
                                                <td>{data[i]['exam']['due_date']==null ? '-': data[i]['exam']['due_date'].split('T')[0]}</td>
                                                <td>{data[i]['exam']['publish_date']==null ? '-': data[i]['exam']['publish_date'].split('T')[0]}</td>
                                                <td><span className={examType}>{compLang[examType]}</span></td>
                                                <td>{lang === 'en' ? data[i]['exam']['course']["name"] :data[i]['exam']['course']["arName"]}</td>
                                                <a href={"./"+subjectName+"/"+data[i]['exam']['id']} className="hiddenRoute">a</a>

                                            </tr>)
                    }

                    setExamsList(tableElements)
                }
                setExamStatus(true)

            }).catch((err)=>{
                console.log(err)
            })
        }
    }else{
        document.getElementsByClassName('courseAssignment')[0].style.display = 'none'
        document.getElementsByClassName('courseExams')[0].style.display = 'none'
        document.getElementsByClassName('courseAnnounce')[0].style.display = 'block'
        setTitle(compLang['announce'])
        if(announcementsStatus ==false){

            axios.get(Global.BackendURL+'/student/CourseAnnouncement?classroomID='+classroomID+"&courseName="+courseName).then((res)=>{
                console.log(res.data)
            }).catch((err)=>{
                console.log("Error!!!")
                console.log(err)
            })
        }
    }
  }
  return (
    <div className="column" id='courseDataPage'>
        <TopBar title={title}/>
      <div className='subNavButtons'>
        <button onClick={switchWork} className='activeSide'>{compLang['assingments']}</button>
        <button onClick={switchWork}>{compLang['exams']}</button>
        <button onClick={switchWork}>{compLang['announce']}</button>
      </div>      
      <div className="courseAssignment courseData">
            <table>
            <tr className="tableHeaders">
                <th>{compLang['name']}</th>
                <th>{compLang['grade']}</th>
                <th>{compLang['yourGrade']}</th>
                <th>{compLang['due']}</th>
                <th>{compLang['publishDate']}</th>
                <th>{compLang['status']}</th>
                <th>{compLang['course']}</th>
            </tr>
            <hr/>
            {assinmentList}
            </table>
            {emptyAssingmentsMessage}

    </div>
    <div className="courseExams courseData">
        <table>
        <tr className="tableHeaders">
            <th>{compLang['name']}</th>
            <th>{compLang['grade']}</th>
            <th>{compLang['yourGrade']}</th>
            <th>{compLang['due']}</th>
            <th>{compLang['publishDate']}</th>
            <th>{compLang['status']}</th>
            <th>{compLang['course']}</th>
        </tr>
        <hr/>
        {examsList}
        </table>
        {emptyExamsMessage}

    </div>
      <div className='courseAnnounce'>
        
      </div>
    </div>
  );
}

export default CourseDataPage;
