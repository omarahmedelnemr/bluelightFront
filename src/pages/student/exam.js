import { useEffect, useState } from 'react';
import TopBar from '../../components/topBar';
import './styles/examPage.css'
import { useParams } from 'react-router-dom';
import subjectSideImage from '../../content/subjectSideImage.jpeg'
import axios from 'axios';
import Global from '../../general/globalVar';
import formatTime from '../../general/formatTime';



function ExamPage() {
    const lang = localStorage.getItem('lang')
    const pageLang = {
        Exams:        lang === "en" ? "Exams":"الاختبارات",
        publish:      lang === 'en' ? "Publish":"نشر",
        due:          lang === 'en' ? "Due":"حتي",
        startQuiz:    lang === 'en' ? "Start Quiz":"ابدأ الاختبار"
    }
    const {courseName,examID} = useParams() 
    const [homeworkTitle,setHomeworkTitle] = useState('')
    const [publishDate,setPublishDate] = useState('12-12-2023')
    const [dueDate,setDueDate] = useState('-')
    const [totalGrade,settotalGrade] = useState('')
    const [yourGrade,setyourGrade] = useState('')
    const [DoneStatus,setDoneStatus] = useState('')
    const [submissionDate,setsubmissionDate] = useState('')
    const [description,setdescription] = useState('this is New Exam')


    useEffect(()=>{
        axios.get(Global.BackendURL+"/student/examHeader?examID="+examID+"&studentID="+localStorage.getItem("id")).then((res)=>{
            const data = res.data
            setHomeworkTitle(data['exam']['name'])
            setPublishDate(formatTime(data['exam']['publish_date']))
            console.log(data)
        }).catch((err)=>{
            console.log("Error!!")
            console.log(err)
        })
    },[1000])

    function startQuiz(event){
    document.querySelector('.sideNav').style.display = 'none'
    document.querySelector('.topBar').style.display = 'none'
    }
    return (
        <div id='studentExamPage'>
            <TopBar title={pageLang['Exams']}/>
            <div className='PageContent'>
                <div>
                    <div className='courseBar row'>
                        <h1>{courseName.padStart()}</h1>
                        <img src={subjectSideImage}/>
                    </div>

                    <div className='ExamSection'>
                        <div className='examInfo row'>
                            <div className='info column'>
                                <h1>{homeworkTitle}</h1>
                                <p>{pageLang['publish']}: {publishDate} - {pageLang['due']}: {dueDate}</p>
                                <p>{totalGrade} {pageLang['points']}</p>
                                <hr />
                            </div>
                            <div className='status column'>
                                <p>{yourGrade}<span>{DoneStatus}</span><br/><span className='submittedDate'> {submissionDate}</span></p>
                            </div>
                        </div>
                        <div className='workDescription'>
                            <p>{description}</p>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
                <div className={'StartQuizButton'}  onClick={startQuiz}>
                    <div className='loading'></div>
                    {pageLang['startQuiz']}
                </div>
            </div>

        </div>
    );
}

export default ExamPage;
