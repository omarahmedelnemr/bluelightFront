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
import PieChart from '../../components/pieChart';
import checkAutherization from '../../general/checkAuth';
import DropDownList from '../../components/student/dropDownList';

function CourseDataPage() {
    if (checkAutherization() !== 'Auth'){
        window.location.href ='/login'
    }
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
      due:         lang === 'en' ? "Due":"حتي",
      grades:      lang === 'en' ? 'Grades':"الدرجات",
      sortBy:      lang === 'en' ? 'Sort By':'رتب حسب'

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
    const [homeworkGrades,setHomeworksGrades] = useState(0)
    const [chartValues,setChartValue] = useState([0, 0, 0,0])
    const chartData = {
        labels: [ 'still', "Late" , 'Done', 'Done Late' ],
        // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
            {
              label: 'Popularity of colours',
              data: chartValues,
              // you can set indiviual colors for each bar
              backgroundColor: [ "#EFEE8F",'red','lightgreen' , "#ff00007a"],
              borderWidth: 0,
            }
        ]
    }
    console.log("Charts: ",chartData.datasets )
    useEffect(()=>{

        var grades= 0
        var totalGrades =0
        var Localgrade;
        const activeSide = document.querySelector(".activeSide").innerHTML.toLowerCase()
        var workElement;
        if (activeSide === 'assignments'){
             workElement = document.querySelector(".courseAssignment").getElementsByClassName('workBox')
        }else{
            workElement = document.querySelector(".courseExams").getElementsByClassName('workBox')

        }
        const values = {}//"still":0,'late':0,"done":0,"done late":0}
        for (var i=0;i<workElement.length;i++){
            if (values[workElement[i].querySelector('.workStatus span').innerHTML.toLowerCase()] === undefined){
                values[workElement[i].querySelector('.workStatus span').innerHTML.toLowerCase()] = 0
            }
            values[workElement[i].querySelector('.workStatus span').innerHTML.toLowerCase()] +=1
            Localgrade = workElement[i].querySelector('.workStatus h3').innerHTML
            if (Localgrade.includes("-") == false){
                grades += Number(Localgrade.split('/')[0])
                totalGrades += Number(Localgrade.split('/')[1])
            }
        }
        var sortedValues = []
            sortedValues = [
                values[pageLang['still'].toLowerCase()],
                values[pageLang['late'].toLowerCase()],
                values[pageLang['completed'].toLowerCase()],
                values[pageLang['doneLate'].toLowerCase()],
            ]
        setChartValue(sortedValues)
        if (activeSide === 'assignments'){
            setHomeworksGrades(Math.round((grades/totalGrades)*100))
        }

    },[assinmentList])
    
    const [emptyAssingmentsMessage,setEmptyMessage] = useState(<div className="emptyAssingmentsMessage" >
                                                      <div className="loading"></div>
                                                  </div>)

    const [examsList,setExamsList] = useState('')

    const [emptyExamsMessage,setEmptyExamsMessage] = useState(<div className="emptyExamsMessage" >
                                                  <div className="loading"></div>
                                              </div>)            


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






    const [normalSortType,setSortType] = useState('asc')

    function changeSortType(event){
        const value = event.currentTarget.querySelector("p").innerHTML
        if (value === 'asc'){
            setSortType('des')
        }else{
            setSortType('asc')
        }
        event.currentTarget.parentElement.querySelector(".activeSelectOption").click()
    }

    function sortWorkBoxes(sortBy) {
        const workContainer = document.querySelector('.courseAssignment.courseData.column');
        const workBoxes = Array.from(workContainer.querySelectorAll('.workBox'));
        if (sortBy === 'yourGrade'){
            console.log("inside")
            workBoxes.sort((a, b) => {
                const aValue = extractValue(a, sortBy);
                const bValue = extractValue(b, sortBy);
                if (normalSortType=== 'asc'){
                    if(aValue.includes('-')){
                        return -1
                    }else if (bValue.includes('-')){
                        return 1
                    }else{
                    return Number(aValue) - Number(bValue);}
                }else{
                    if(aValue.includes('-')){
                        return 1
                    }else if (bValue.includes('-')){
                        return -1
                    }else{
                    return Number(bValue) - Number(aValue);}
                }
            }); 
        }else if(sortBy === 'publishDate' || sortBy === 'dueDate' ){
            console.log("poop")
            workBoxes.sort((a, b) => {
                const aValue = extractValue(a, sortBy);
                const bValue = extractValue(b, sortBy);
                console.log("COmaper: ",  new Date(aValue).getTime() > new Date(bValue).getTime())
                if(normalSortType === 'asc'){
                    return new Date(aValue).getTime() - new Date(bValue).getTime();
                }else{
                    return new Date(bValue).getTime() - new Date(aValue).getTime();

                }
            });
        }else if (sortBy === 'homeworkStatus'){
            const labelsChart = [pageLang["still"],pageLang['late'],pageLang['completed'],pageLang['doneLate']]
            workBoxes.sort((a, b) => {

            const aValue = extractValue(a, sortBy);
            const bValue = extractValue(b, sortBy);
            if(normalSortType=== 'asc'){
                return labelsChart.indexOf(aValue) - labelsChart.indexOf(bValue)
            }else{
                return labelsChart.indexOf(bValue) - labelsChart.indexOf(aValue)

            }
        }); 

        }else{

            workBoxes.sort((a, b) => {
                const aValue = extractValue(a, sortBy);
                const bValue = extractValue(b, sortBy);
                console.log("COmaper: ", aValue.localeCompare(bValue))
                if(normalSortType ==='asc'){
                    return aValue.localeCompare(bValue); // Use localeCompare for string comparison
                }else{
                    return bValue.localeCompare(aValue); // Use localeCompare for string comparison

                }
            });
        }
        workBoxes.forEach(box => workContainer.appendChild(box));
    }
    
    function extractValue(workBox, sortBy) {
        const workInfo = workBox.querySelector('.workInfo');
        switch (sortBy) {
            case 'publishDate':
                return workInfo.querySelector('h4').textContent.split(' - ')[0];
            case 'dueDate':
                return workInfo.querySelector('h4').textContent.split(' - ')[1];
            case 'name':
                return workInfo.querySelector('h2').textContent;
            case 'yourGrade':
                return workBox.querySelector('.workStatus h3').textContent.split(' / ')[0];
            case 'homeworkStatus':
                return workBox.querySelector('.workStatus span').textContent;
            default:
                return '';
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
                {/* <button onClick={switchWork}>{pageLang['announce']}</button> */}
            </div> 
            <div className='row sortBy'>
                <p>{pageLang['sortBy']}</p>
                <DropDownList obj={[
                    {
                        'text':pageLang['publish'],
                        'function':()=>{sortWorkBoxes("publishDate")}
                    },
                    {
                        'text':pageLang['due'],
                        'function':()=>{sortWorkBoxes("dueDate")}
                    },
                    {
                        'text':"name",
                        'function':()=>{sortWorkBoxes("name")}
                    },
                    {
                        'text':"yourGrade",
                        'function':()=>{sortWorkBoxes("yourGrade")}
                    },
                    {
                        'text':"Status",
                        'function':()=>{sortWorkBoxes("homeworkStatus")}
                    }
                    ]}/>
                    <div onClick={changeSortType} className='row sortIcon'><p>{normalSortType}</p>{normalSortType ==='asc'? <FontAwesomeIcon icon="fa-solid fa-arrow-down-short-wide" />:<FontAwesomeIcon icon="fa-solid fa-arrow-down-wide-short" />}</div>
                
            </div>
            <div className='row worklistAndAnalysis'>
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

            <div className='analysisAssignment column'>
                    <div className='Graph column'>
                        <PieChart chartData={chartData} title = "Homeworks"/>

                        <div className='row labelsRow'>
                            <p><span style={{backgroundColor:'#EFEE8F'}}></span> {pageLang['still']}</p>
                            <p><span style={{backgroundColor:'red'}}></span> {pageLang['late']}</p>
                            <p>< span  style={{backgroundColor:'lightgreen'}}></span> {pageLang['completed']}</p>
                            <p><span  style={{backgroundColor:'#ff00007a'}}></span> {pageLang['doneLate']}</p>
                        </div>

                    </div>
                    <div className='lineStatus column'> 
                        <h2>{pageLang['grades']}</h2>
                        <p>{homeworkGrades}%</p>
                        <div className='linePercentage' style={{width:homeworkGrades+"%"}}></div>
                    </div>
                    
                </div>
            </div>

        </div>
    </div>
    );
}

export default CourseDataPage;
