import '../../general/pages/styles/general.css'
import './styles/examPage.css'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TopBar from '../../general/components/topBar';
import subjectSideImage from '../../content/subjectSideImage.jpeg'
import axios from '../../publicFunctions/axiosAuth';
import Global from '../../publicFunctions/globalVar';
import Question_MCQ from '../../general/components/question_mcq';
import Question_Written from '../../general/components/question_written';
import Question_Attachment from '../../general/components/question_attachment';
import compareDates from '../../publicFunctions/compareDates';
import formatTime from '../../publicFunctions/formatTime';
function ParentExamPage() {
    const {courseName,examID} = useParams() 
    const lang = localStorage.getItem("lang")
    const pageLang ={
      Exam:        lang === 'en' ? 'Exam':"الواجبات",
      exams:           lang === "en" ? "Exams":"الاختبارات",
      announce:        lang === 'en' ? "Announcements":"الاعلانات",
      due:             lang === 'en' ? "Due":"متاح حتي",
      publish:         lang === 'en' ? "Publish":"نشر في",
      notSubmitted:    lang === 'en' ? "Not Submitted":"لم يسلم بعد",
      done:            lang === 'en' ? 'Done':"تم",
      doneLate:        lang === 'en' ? "Done Late":"تم متاخرا",
      points:          lang === 'en' ? 'Points':"درجة",
      submit:          lang === 'en' ? "Submit":"تسليم",
      unsubmit:        lang === 'en' ? "unsubmit":"الغاء التسليم",
      connectionError: lang === 'en' ? "Error While Submitted, Please Try Again":"حدث خطأ, حاول مرة اخري",
      mcqMissing:      lang === "en" ? "There is a MCQ You Didn't answer Yet" : " يوجد سوال اختيار من متعدد لم يتم الاجابه عليه", 
      writtenMissing:  lang === "en" ? "There is a Written Question You Didn't answer Yet" : "يوجد سوال كتابي لم يتم الاجابة عليه", 
      attachMissing:   lang === "en" ? "There is an Attachment Question You Didn't answer Yet" : "يوجد سؤال لم يتم الاجابة عليه", 
      cantUnsubmit:    lang === "en" ? "You Can't unsubmit Graded Exam":"لا يمكنك الغاء تسليم واجب تم تصحيحه",
      notAllowed:      lang === 'en' ? "Not Allowed To See Un Submitted Exam Questions":"ليس مسموح برؤية اسئلة الاختبارات قبل تسليم الطالب لها",
    }
    const [title,setTitle] = useState(pageLang['Exam'])
    const [examTitle,setExamTitle] = useState('')
    const [publishDate,setPublishDate] = useState("-/-/-")
    const [dueDate,setDueDate] = useState("-/-/-")
    const [totalGrade,setTotalGrade] = useState("-")
    const [yourGrade,setYourGrade] = useState('-')
    const [submitted,setSubmitted] = useState('-')
    const [graded,setGraded] = useState(false)
    const [description,setDescription] = useState(null)
    const [questionElements,setQuestionElements] = useState(null)
    const [DoneStatus,setDoneStatus] = useState(null)
    const [submissionDate,setSubmissionDate] = useState('')
    const studentID =localStorage.getItem("currentStudentID")
    // Get Exam Headers
    useEffect(()=>{
        axios.get(Global.BackendURL+"/student/examheader?examID="+examID+"&studentID="+studentID).then((res)=>{
            const data = res.data
            setDescription(data['exam']['description'])
            setExamTitle(data['exam']['name'])
            setTotalGrade(data['exam']['grade'])
            setPublishDate(formatTime(data['exam']['publish_date']))
            setDueDate(formatTime(data['exam']['due_date']))
            if(data['submitted']){
                setGraded(data['graded'])
                // setSubmitted(data['submitted'])
                setSubmissionDate(formatTime(data['submissionDate']))
                if (data['exam']['due_date'] === null){
                    setDoneStatus(pageLang['done'])
                }else{
                    const statusDates = compareDates(data['exam']['due_date'],data['submissionDate'])
                    if (statusDates ==='late'){
                        setDoneStatus(pageLang['doneLate'])
                    }else{
                        setDoneStatus(pageLang['done'])
                    }

                }
                if (data['graded']){
                    setYourGrade(<p>{data['grade']} / {data['exam']['grade']}</p>)
                }else{
                    setYourGrade(<p>- / { data['exam']['grade']}</p>)
                }

            }else{
                setYourGrade(<p>{pageLang['notSubmitted']}</p>)
            }
            setSubmitted(data['submitted'])

            // console.log(data)
        }).catch((err)=>{
            console.log("error !!")
            console.log(err)
        })
    },[1000])


    // Get Exam Quesions
    useEffect(()=>{
        if(submitted == false){
            // axios.get(Global.BackendURL+"/student/examquestions?examID="+examID).then((res)=>{
            //     const data = res.data
            //     const QuestionList = []
            //     for(var i=0;i<data.length;i++){
            //         if(data[i]['type'] ==='smcq' || data[i]['type'] ==='mmcq'){
            //             QuestionList.push(<Question_MCQ questionInfo={data[i]} mode = {"exam"} answered = {false}/>)
            //         }else if(data[i]['type'] ==='written'){
            //             QuestionList.push(<Question_Written questionInfo={data[i]} mode = {"exam"} answered = {false}/>)
            //         }else{
            //             QuestionList.push(<Question_Attachment questionInfo={data[i]} mode = {"exam"} answered = {false}/>)

            //         }
            //     }
            //     setQuestionElements(QuestionList)
            // }).catch((err)=>{
            //     console.log("error !!")
            //     console.log(err)
            // })
            setQuestionElements(<p>{pageLang['notAllowed']}</p>)
        }else if(submitted ==true){
            axios.get(Global.BackendURL+"/parent/submittedexamquestions?examID="+examID+"&studentID="+studentID).then((res)=>{
                const data = res.data
                const QuestionList = []
                console.log("test Graded: ",graded)
                for(var i=0;i<data.length;i++){
                    if(data[i]['type'] ==='smcq' || data[i]['type'] ==='mmcq'){
                        QuestionList.push(<Question_MCQ questionInfo={data[i]} answered = {true} graded={graded}/>)
                    }else if(data[i]['type'] ==='written'){
                        QuestionList.push(<Question_Written questionInfo={data[i]} answered = {true} graded={graded}/>)
                    }else{
                        QuestionList.push(<Question_Attachment questionInfo={data[i]} answered = {true} graded={graded}/>)

                    }
                }
                setQuestionElements(QuestionList)
            }).catch((err)=>{
                console.log("error !!")
                console.log(err)
            })
        }else{
            console.log("still Loading")
        }
        },[submitted])
  return (
    <div className="exam" id='examPage'>
        <TopBar title={title} />
        <div className='PageContent'>
            <div className='courseBar row'>
                <h1>{courseName.padStart()}</h1>
                <img src={subjectSideImage}/>
            </div>

            <div className='examSection'>

                <div className='examInfo row'>
                    <div className='info column'>
                        <h1>{examTitle}</h1>
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

                    <div className='examQuestions'>
                        {questionElements}
                    </div>
                </div>
            </div>
        </div>


    </div>
  );
}

export default ParentExamPage;
