import '../styles/general.css'
import './styles/homework.css'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TopBar from '../../components/topBar';
import subjectSideImage from '../../content/subjectSideImage.jpeg'
import axios from 'axios';
import Global from '../../general/globalVar';
import Question_MCQ from '../../components/student/question_mcq';
import Question_Written from '../../components/student/question_written';
import Question_Attachment from '../../components/student/question_attachment';
import cleanArr from '../../general/cleanArr';
import compareDates from '../../general/compareDates';
import formatTime from '../../general/formatTime';
import checkAutherization from '../../general/checkAuth';
function HomeworkPage() {
    if (checkAutherization() !== 'Auth'){
        window.location.href ='/login'
    }
    const {courseName,homeworkID} = useParams() 
    const lang = localStorage.getItem("lang")
    const pageLang ={
      assingments:     lang === 'en' ? 'Assignments':"الواجبات",
      exams:           lang === "en" ? "Exams":"الاختبارات",
      announce:        lang === 'en' ? "Announcements":"الاعلانات",
      due:             lang === 'en' ? "Due":"متاح حتي",
      publish:         lang === 'en' ? "Publish":"نشر في",
      notSubmitted:    lang === 'en' ? "Not Submitted":"لم يسلم بعد",
      done:            lang === 'en' ? 'Done':"تم",
      doneLate:        lang === 'en' ? "Done Late":"تم متاخرا",
      points:          lang === 'en' ? 'Points':"درجة",
      submit:          lang === 'en' ? "Submit":"تسليم",
      unsubmit:        lang === 'en' ? "unSubmit":"الغاء التسليم",
      connectionError: lang === 'en' ? "Error While Submitted, Please Try Again":"حدث خطأ, حاول مرة اخري",
      mcqMissing:      lang === "en" ? "There is a MCQ You Didn't answer Yet" : " يوجد سوال اختيار من متعدد لم يتم الاجابه عليه", 
      writtenMissing:  lang === "en" ? "There is a Written Question You Didn't answer Yet" : "يوجد سوال كتابي لم يتم الاجابة عليه", 
      attachMissing:   lang === "en" ? "There is an Attachment Question You Didn't answer Yet" : "يوجد سؤال لم يتم الاجابة عليه", 
      cantUnsubmit:    lang === "en" ? "You Can't ubSubmit Graded Homework":"لا يمكنك الغاء تسليم واجب تم تصحيحه",


    }
    const [title,setTitle] = useState('Homework')
    const [homeworkTitle,setHomeworkTitle] = useState('')
    const [publishDate,setPublishDate] = useState("-/-/-")
    const [dueDate,setDueDate] = useState("-/-/-")
    const [totalGrade,setTotalGrade] = useState("-")
    const [yourGrade,setYourGrade] = useState('-')
    const [submitted,setSubmitted] = useState('-')
    const [graded,setGraded] = useState(false)
    const [description,setDescription] = useState(null)
    const [questionElements,setQuestionElements] = useState(null)
    const [incompleteMessage,setIncompleteMessage] = useState(null)
    const [submittingStatus,setSubmittingStatus] = useState('')
    const [DoneStatus,setDoneStatus] = useState(null)
    const [submissionDate,setSubmissionDate] = useState('')

    // Get Homework Headers
    useEffect(()=>{
        axios.get(Global.BackendURL+"/student/homeworkheader?homeworkID="+homeworkID+"&studentID="+localStorage.getItem('id')).then((res)=>{
            const data = res.data
            setDescription(data['homework']['description'])
            setHomeworkTitle(data['homework']['name'])
            setTotalGrade(data['homework']['grade'])
            setPublishDate(formatTime(data['homework']['publish_date']))
            setDueDate(formatTime(data['homework']['due_date']))
            if(data['submitted']){
                setGraded(data['graded'])
                // setSubmitted(data['submitted'])
                setSubmissionDate(formatTime(data['submissionDate']))
                if (data['homework']['due_date'] === null){
                    setDoneStatus(pageLang['done'])
                }else{
                    const statusDates = compareDates(data['homework']['due_date'],data['submissionDate'])
                    if (statusDates ==='late'){
                        setDoneStatus(pageLang['doneLate'])
                    }else{
                        setDoneStatus(pageLang['done'])
                    }

                }
                if (data['graded']){
                    setYourGrade(<p>{data['grade']} / {data['homework']['grade']}</p>)
                }else{
                    setYourGrade(<p>- / { data['homework']['grade']}</p>)
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


    // Get Homework Quesions
    useEffect(()=>{
        if(submitted == false){
            axios.get(Global.BackendURL+"/student/homeworkquestions?homeworkID="+homeworkID).then((res)=>{
                const data = res.data
                const QuestionList = []
                for(var i=0;i<data.length;i++){
                    if(data[i]['type'] ==='smcq' || data[i]['type'] ==='mmcq'){
                        QuestionList.push(<Question_MCQ questionInfo={data[i]} mode = {"homework"} answered = {false}/>)
                    }else if(data[i]['type'] ==='written'){
                        QuestionList.push(<Question_Written questionInfo={data[i]} mode = {"homework"} answered = {false}/>)
                    }else{
                        QuestionList.push(<Question_Attachment questionInfo={data[i]} mode = {"homework"} answered = {false}/>)

                    }
                }
                setQuestionElements(QuestionList)
            }).catch((err)=>{
                console.log("error !!")
                console.log(err)
            })
        }else if(submitted ==true){
            axios.get(Global.BackendURL+"/student/submittedhomeworkquestions?homeworkID="+homeworkID+"&studentID="+localStorage.getItem("id")).then((res)=>{
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

    function submitWork(event){
        if (event.currentTarget.classList.contains("disabled")){
            return;
        }
        const questions  = event.currentTarget.parentElement.getElementsByClassName("question")
        var questionType;
        const submission = {
            "studentID":localStorage.getItem('id'),
            "homeworkID" :homeworkID,
            "answers":[]
        }

        for(var i = 0 ;i < questions.length;i++){
            questionType = questions[i].classList[0]
            const ans = {}
            ans['id'] = Number(questions[i].querySelector(".questionID").innerHTML)
            if (questionType === 'smcq' || questionType === 'mmcq'){
                ans['answer'] = ''
                ans['attachments']=null
                ans["options"] = []
                const options = questions[i].getElementsByClassName('option')
                var answered = 0;
                for (var x = 0;x<options.length;x++){
                    ans["options"].push({
                        "id":Number(options[x].querySelector(".optionID").innerHTML),
                        "checked":options[x].classList.contains('selected')
                    })
                    answered+=options[x].classList.contains('selected')
                }
                if (answered ===0){
                    setIncompleteMessage(<p className='wrongMessage'>{pageLang['mcqMissing']}</p>)
                    
                    return;
                }
            }
            else if(questionType === "written"){
                ans['answer'] = questions[i].querySelector("textarea").value
                ans['attachments']=null
                ans["options"] = null

                if(ans['answer']===null || ans['answer'] === ''){

                    setIncompleteMessage(<p className='wrongMessage'>{pageLang['writtenMissing']}</p>)
                    return;
                }
            }else{
                ans['answer'] = ''
                ans['attachments']=cleanArr(questions[i].querySelector('.attachmentsValues').innerHTML.split(","),'')
                ans["options"] = null
                console.log(ans['attachments'])
                if(ans['attachments']===null || ans['attachments'][0] === undefined || ans['attachments'][0] === '' || ans['attachments'] === undefined){
                    console.log('incise')
                    setIncompleteMessage(<p className='wrongMessage'>{pageLang['attachMissing']}</p>)
                    return;
                }
            }
            submission['answers'].push(ans)
        }
        setIncompleteMessage(null)
        setSubmittingStatus(" disabled")
        submission['submissionDate'] = new Date()
        axios.post(Global.BackendURL+"/student/homeworksubmission",submission).then((res)=>{
            console.log("Done")
            const data = res.data
            console.log(data)
            setSubmittingStatus("")
            for (var i =0;i<questions.length;i++){
                const Qid = questions[i].querySelector(".questionID").innerHTML
                localStorage.removeItem('homework'+Qid+"Q"+(i+1))
            }
            window.location.reload(false);
        }).catch((err)=>{
            setIncompleteMessage(<p className='wrongMessage'>{pageLang["connectionError"]}</p>)
            setSubmittingStatus("")    
            console.log("Error !!")
            console.log(err)
        })
        console.log(submission)
    }

    function unSubmitWork(even){
        const req = {
            "homeworkID":homeworkID,
            "studentID":localStorage.getItem('id')
        }
        console.log("rq: ",req)
        axios.delete(Global.BackendURL+"/student/homeworksubmission",{data:req}).then((res)=>{
            console.log("Unsubmitted")
            const data = res.data
            console.log(data)
            window.location.reload(false);
            
        }).catch((err)=>{
            console.log("Error!")
            console.log(err)
        })
    }
  return (
    <div className="homework" id='homeworkPage'>
        <TopBar title={title} />
        <div className='PageContent'>
            <div className='courseBar row'>
                <h1>{courseName.padStart()}</h1>
                <img src={subjectSideImage}/>
            </div>

            <div className='homeworkSection'>

                <div className='homeworkInfo row'>
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

                    <div className='homeworkQuestions'>
                        {incompleteMessage}
                        {questionElements}
                        {submitted===false?
                            <div className={'SubmitButton'+submittingStatus} onClick={submitWork}>
                                <div className='loading'></div>
                                {pageLang['submit']}</div>
                        :graded===false?
                        <div className={'SubmitButton'+submittingStatus} onClick={unSubmitWork}>
                        <div className='loading'></div>
                        {pageLang['unsubmit']}</div>:
                        <span>{pageLang['cantUnsubmit']}</span>}
                    </div>
                </div>
            </div>
        </div>


    </div>
  );
}

export default HomeworkPage;
