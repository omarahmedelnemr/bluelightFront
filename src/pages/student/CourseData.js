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
import TopBar from '../../components/topBar';
import subjectSideImage from '../../content/subjectSideImage.jpeg'
import profileTest from '../../content/person.jpg'
import formatTime from '../../general/formatTime'
function CourseDataPage() {
    const lang = localStorage.getItem("lang")
    const pageLang ={
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
      completed:   lang === "en" ? "Done":"تم",
      doneLate:    lang === 'en' ? "Done Late":"تم متاخرا",
      notYet:      lang === 'en' ? "Not Graded":"لم تصحح",
      assingments: lang === 'en' ? 'Assignments':"الواجبات",
      exams:       lang === "en" ? "Exams":"الاختبارات",
      announce:    lang === 'en' ? "Announcements":"الاعلانات",
      publish:     lang === 'en' ? "Publish":"نشر في",
      due:         lang === 'en' ? "Due":"حتي"

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
    const [title,setTitle] = useState(pageLang['assingments'])

    const [emptyAssingmentsMessage,setEmptyMessage] = useState(<div className="emptyAssingmentsMessage" >
                                                      <div className="loading"></div>
                                                  </div>)

    const [examsList,setExamsList] = useState('')

    const [emptyExamsMessage,setEmptyExamsMessage] = useState(<div className="emptyExamsMessage" >
                                                  <div className="loading"></div>
                                              </div>)            


    // setTitle(pageLang['assingments'])
    useEffect(()=>{
        axios.get(Global.BackendURL+"/student/courseAssingments?studentID="+studentID+"&classroomID="+classroomID+"&courseName="+courseName).then((res)=>{
            const data = res.data
            if (data == undefined){
                    setEmptyMessage(<div className="emptyAssingmentsMessage" >
                                      {iconList[Math.round(Math.random()*(iconList.length-1))]}
                                      <p className=""> {pageLang['nothing']}</p>
                                  </div>)
              }else if (data.length == 0){
                  setEmptyMessage(<div className="emptyAssingmentsMessage" >
                                          {iconList[Math.round(Math.random()*(iconList.length-1))]}
                                          <p className=""> {pageLang['nothing']}</p>
                                      </div>)
              }else{
                setEmptyMessage(null)
                var tableElements = []
                for(var i=0;i<data.length;i++){
                    var homeworkType;
                    // if(data[i]['homework']['due_date'] == null){
                    //     homeworkType = 'still'
                    // }else{
                    //     homeworkType = data[i]['submitted'] ? "completed": compareDates(data[i]['homework']['due_date'])
                    // }

                    if (data[i]['submitted']){
                        if (data[i]['homework']['due_date'] ===null){
                            homeworkType = 'completed'
                        }else{
                            homeworkType = compareDates(data[i]['homework']['due_date'],data[i]['submissionDate']) ==='late' ? 'doneLate':"completed"

                        }
                    }else{
                        if (data[i]['homework']['due_date'] ===null){
                            homeworkType = 'still'

                        }else{
                            homeworkType = data[i]['submitted'] ? "completed": compareDates(data[i]['homework']['due_date'])

                        }

                    }
                    

                    const yourGrade = data[i]['graded'] ? data[i]['grade'] : '-'
                    // const GradeClass = data[i]['graded'] ? yourGrade:"-"
                    var subjectName = data[i]['homework']['course']["name"].split(' ').join('')
                    tableElements.push(<div className='workBox row'>
                                            <div className='workInfo column'>
                                                <div className='column'>
                                                    <h2>{data[i]['homework']['name']}</h2>
                                                    <h4>{pageLang['publish']}:{data[i]['homework']['publish_date']==null ? '-':  formatTime(data[i]['homework']['publish_date'])} - {pageLang['due']}:{data[i]['homework']['due_date']==null ? '-': formatTime(data[i]['homework']['due_date'])}</h4>
                                                </div>
                                                <div className='row'>
                                                    <img src={Global.BackendURL+"/profilepic/"+data[i]['homework']['teacher']['img_dir']}/>
                                                    <h4>{lang === 'en' ? data[i]['homework']['teacher']['name']:data[i]['homework']['teacher']['arName']}</h4>

                                                </div>
                                            </div>
                                            <div className='workStatus column'>
                                                <h3>{yourGrade} / {data[i]['homework']['grade']}</h3>
                                                {/* <h3>{data[i]['submitted']?  yourGrade +" / "+data[i]['homework']['grade'] : '-'}</h3> */}

                                                <span className={homeworkType}>{pageLang[homeworkType]}</span>
                                            </div>
                                            <a href={"./"+subjectName+"/assignments/"+data[i]['homework']['id']} className="hiddenRoute"></a>

                                        </div>)
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
    if (event.currentTarget.textContent == pageLang['assingments']){
        document.getElementsByClassName('courseAssignment')[0].style.display = 'block'
        document.getElementsByClassName('courseExams')[0].style.display = 'none'
        document.getElementsByClassName('courseAnnounce')[0].style.display = 'none'
        setTitle(pageLang['assingments'])

    }else if(event.currentTarget.textContent == pageLang['exams']){
        document.getElementsByClassName('courseAssignment')[0].style.display = 'none'
        document.getElementsByClassName('courseExams')[0].style.display = 'block'
        document.getElementsByClassName('courseAnnounce')[0].style.display = 'none'
        setTitle(pageLang['exams'])

        //Send The Request To Get The Data From The DB if it didn't Load Already
        if (exmaStatus == false){
            axios.get(Global.BackendURL+"/student/courseExams?studentID="+studentID+"&classroomID="+classroomID+"&courseName="+courseName).then((res)=>{
                const data = res.data
                if (data == undefined){
                setEmptyExamsMessage(<div className="emptyExamsMessage" >
                                        {iconList[Math.round(Math.random()*(iconList.length-1))]}
                                        <p className=""> {pageLang['nothing']}</p>
                                    </div>)
                }else if (data.length == 0){
                    setEmptyExamsMessage(<div className="emptyExamsMessage" >
                                            {iconList[Math.round(Math.random()*(iconList.length-1))]}
                                            <p className=""> {pageLang['nothing']}</p>
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
                        const yourGrade = data[i]['graded'] ? data[i]['grade'] : '-'
                        var subjectName = data[i]['exam']['course']["name"].split(' ').join('')
                        tableElements.push(<div className='workBox row'>
                                            <div className='workInfo column'>
                                                <div className='column'>
                                                    <h2>{data[i]['exam']['name']}</h2>
                                                    <h4>Publish:{data[i]['exam']['publish_date']==null ? '-': data[i]['exam']['publish_date'].split('T')[0]} - due:{data[i]['exam']['due_date']==null ? '-': data[i]['exam']['due_date'].split('T')[0]}</h4>
                                                </div>
                                                <div className='row'>
                                                    <img src={Global.BackendURL+"/profilepic/"+data[i]['exam']['teacher']['img_dir']}/>
                                                    <h4>{data[i]['exam']['teacher']['name']}</h4>

                                                </div>
                                            </div>
                                            <div className='workStatus column'>
                                                <h3>{yourGrade} / {data[i]['exam']['grade']}</h3>
                                                <span className={examType}>{pageLang[examType]}</span>
                                            </div>
                                            <a href={"./"+subjectName+"/exam/"+data[i]['exam']['id']} className="hiddenRoute"></a>

                                        </div>)
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
        setTitle(pageLang['announce'])
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
        <TopBar title={pageLang['course']}/>
        <div className='PageContent column'>
            <div className='courseBar row'>
                <h1>{courseName.padStart()}</h1>
                <img src={subjectSideImage}/>
            </div>
            <div className='subNavButtons'>
                <button onClick={switchWork} className='activeSide'>{pageLang['assingments']}</button>
                <button onClick={switchWork}>{pageLang['exams']}</button>
                <button onClick={switchWork}>{pageLang['announce']}</button>
            </div> 
            <div className='courseAssignment courseData column'>

                {assinmentList}
                {emptyAssingmentsMessage}

            </div>     
            <div className="courseExams courseData column">
                {examsList}
                {emptyExamsMessage}

            </div>
            <div className='courseAnnounce column'>
                
            </div>
        </div>
    </div>
  );
}

export default CourseDataPage;
