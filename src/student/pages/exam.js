import { useEffect, useState } from 'react';
import TopBar from '../../general/components/topBar';
import './styles/examPage.css'
import { useParams } from 'react-router-dom';
import subjectSideImage from '../../content/subjectSideImage.jpeg'
import axios from '../../publicFunctions/axiosAuth';
import Global from '../../publicFunctions/globalVar';
import formatTime from '../../publicFunctions/formatTime';
import cleanArr from '../../publicFunctions/cleanArr';
import generateNumberList from '../../publicFunctions/randomList';
import Question_MCQ from '../../general/components/question_mcq';
import Question_Written from '../../general/components/question_written';
import Question_Attachment  from '../../general/components/question_attachment';
import compareDates from '../../publicFunctions/compareDates';



function ExamPage() {
    const lang = localStorage.getItem('lang')
    const pageLang = {
        Exams:           lang === "en" ? "Exams":"الاختبارات",
        publish:         lang === 'en' ? "Publish":"نشر",
        due:             lang === 'en' ? "Due":"حتي",
        startQuiz:       lang === 'en' ? "Start Quiz":"ابدأ الاختبار",
        points:          lang === 'en' ? "Points":"درجة",
        next:            lang === 'en' ? "Next":"التالي",
        back:            lang === 'en' ? 'Back':"السابق",
        submit:          lang === 'en' ? "Submit":"تسليم",
        submitting:      lang === 'en' ? "Submitting ...":"... جار التسليم",
        timeremaining:   lang === 'en' ? "Time Remaining":"الوقت المتبقي",
        yourSubmitedIt:  lang === 'en' ? "You Have Already Submitted this Quiz":"لقد سلمت هذا بالفعل الاختبار",
        mcqMissing:      lang === "en" ? "There is a MCQ You Didn't answer Yet" : " يوجد سوال اختيار من متعدد لم يتم الاجابه عليه", 
        writtenMissing:  lang === "en" ? "There is a Written Question You Didn't answer Yet" : "يوجد سوال كتابي لم يتم الاجابة عليه", 
        attachMissing:   lang === "en" ? "There is an Attachment Question You Didn't answer Yet" : "يوجد سؤال لم يتم الاجابة عليه",
        notSubmitted:    lang === 'en' ? "Not Submitted Yet":"لم يسلم بعد" ,
        cannotShow:      lang === 'en' ? "You Cannot View Your Work For This Exam After Submission":"لا يمكنك رؤية اجاباتك لهذا الاختبار بعد التسليم",
        done:            lang === 'en' ? 'Done':"تم",
        doneLate:        lang === 'en' ? "Done Late":"تم متاخرا",
        noLate:          lang === 'en' ? "You Cannot Submit This Exam After Due Date":"لا يمكنك تسليم هذا الاختبار بعد معاد تسليمه المحدد"
    }

    const {courseName,examID} = useParams() 
    if(localStorage.getItem("StartedExam")!=null && examID != localStorage.getItem("StartedExam")){
        window.location.href = './'+localStorage.getItem("StartedExam")
    }
    const [homeworkTitle,setHomeworkTitle] = useState('')
    const [publishDate,setPublishDate] = useState('12-12-2023')
    const [dueDate,setDueDate] = useState('-')
    const [totalGrade,settotalGrade] = useState('')
    const [yourGrade,setyourGrade] = useState('')
    const [DoneStatus,setDoneStatus] = useState('')
    const [submissionDate,setsubmissionDate] = useState('')
    const [description,setdescription] = useState(null)
    const [bacgkroundStatus,setbacgkroundStatus] = useState("notBlock")
    const [QuestionsLoadingBar,setQuestionsLoadingBar] = useState(null)
    const [nextButtonStatus,setNextButtonStatus] = useState("") 
    const [backButtonStatus,setBackButtonStatus] = useState("disabled") 
    const [submitButtonStatus,setsubmitButtonStatus] = useState("hide")
    const [currentQuestionNumber,setCurrentNumber] = useState(1)
    const [QestionsLength,setQuestionsLength] = useState(6)
    const [showWindow,setShowWindow] = useState("hide")
    const [questionElements,setQuestionElements] = useState(null)
    const [submittedQuestionElements,setSubmittedQuestionElements] = useState(null)
    const [duration,setduration] = useState(0)
    const [submitted,setSubmitted] = useState(false)
    const [incompleteMessage,setIncompleteMessage] = useState(null)
    const [submitText,setStubmitText] = useState(pageLang['submit'])
    const [randomizeQuestions,setRandomizeQuestion] = useState(false)
    const [timeLeft, setTimeLeft] = useState(null); // in seconds
    const [isRunning, setIsRunning] = useState(false);
    const [showAfterGrading,setShowAfterGrading] = useState(null)
    const [graded,setGraded] = useState(false)
    const [loading,setLoading] = useState(null)
    const [canSubmitLate,setSubmitLate]  = useState(false)
    //Get the Exam Headers
    useEffect(()=>{
        axios.get(Global.BackendURL+"/student/examHeader?examID="+examID+"&studentID="+localStorage.getItem("id")).then((res)=>{
            const data = res.data
            const submissionDateCheck = formatTime(data['submissionDate'])
            setHomeworkTitle(data['exam']['name'])
            setPublishDate(formatTime(data['exam']['publish_date']))
            setDueDate(formatTime(data["exam"]['due_date']))
            settotalGrade(data['exam']["grade"])
            setdescription(data['exam']['description'])
            setsubmissionDate(submissionDateCheck === 'none' ?pageLang['notSubmitted']:submissionDateCheck)
            setyourGrade(<p>{data['graded'] === true?data['grade']:'-'} / {data['exam']['grade']}</p>)
            setduration(data['exam']['duration'])
            setSubmitted(data['submitted'])
            setRandomizeQuestion(data['exam']['randomQuestions'])
            setShowAfterGrading(data['exam']['showQuestionsAfterGrading'])
            setGraded(data['graded'])
            setSubmitLate(data['exam']['acceptLate'])
            const statusDates = compareDates(data['exam']['due_date'],new Date())
            if (statusDates ==='late'){
                setDoneStatus("late")
            }else{
                setDoneStatus("still")
            }
        }).catch((err)=>{
            console.log("Error!!")
            console.log(err)
        })
    },[1000])

    // Timer Functions
    useEffect(() => {
        const savedStartTime = localStorage.getItem('startTime');
        const savedDuration = localStorage.getItem('duration');

        if (savedStartTime && savedDuration) {
            const elapsedSeconds = Math.floor((Date.now() - parseInt(savedStartTime)) / 1000);
            const remainingSeconds = Math.max(parseInt(savedDuration) - elapsedSeconds, 0);
            setTimeLeft(remainingSeconds);
            setIsRunning(true);
        }
    }, []);
    
    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            const interval = setInterval(() => {
                setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
            }, 1000);

            return () => clearInterval(interval);
        } else if (timeLeft === 0) {
            setIsRunning(false);
            localStorage.removeItem('startTime');
            localStorage.removeItem('duration');
            setNextButtonStatus("hide")
            setsubmitButtonStatus("")
            document.getElementById("ExamSubmissionButton").click()

        }
    }, [isRunning, timeLeft]);

    const formatRemainingTime = seconds => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    // Get Submitted Questions
    useEffect(()=>{
        if (showAfterGrading === true && graded){
            setLoading(<div className='loading'></div>)
            axios.get(Global.BackendURL+"/student/submittedexamsquestions?examID="+examID+"&studentID="+localStorage.getItem("id")).then((res)=>{
                const data = res.data
                const QuestionList = []
                for(var i=0;i<data.length;i++){
                    if(data[i]['type'] ==='smcq' || data[i]['type'] ==='mmcq'){
                        QuestionList.push(<Question_MCQ questionInfo={data[i]} answered = {true} graded={graded}/>)
                    }else if(data[i]['type'] ==='written'){
                        QuestionList.push(<Question_Written questionInfo={data[i]} answered = {true} graded={graded}/>)
                    }else{
                        QuestionList.push(<Question_Attachment questionInfo={data[i]} answered = {true} graded={graded}/>)

                    }
                }
                setSubmittedQuestionElements(QuestionList)
                setLoading(null)

            }).catch((err)=>{
                console.log("error !!")
                console.log(err)
            })
        }else if(showAfterGrading === false ){
            setSubmittedQuestionElements(<p>{pageLang['cannotShow']}</p>)
        }
    },[showAfterGrading])

    // Start The Quiz Functions
    function startQuiz(event){
        document.querySelector('.sideNav').style.width = '0'
        document.querySelector('.sideNav').style.overflow = 'hidden'
        setbacgkroundStatus("block")
        setQuestionsLoadingBar(<div className='loading'></div>)

        axios.get(Global.BackendURL+"/student/examquestions?examID="+examID).then((res)=>{
            const data = res.data
            const preElement = []
            const indexes = generateNumberList(data.length,randomizeQuestions)
            for (var x =0;x<data.length;x++){
                var i = indexes[x]
                if (data[i]['type'] === 'smcq' || data[i]['type'] === 'mmcq'){
                    preElement.push(
                        <div className={'ExamQuestion column' + (x==0 ? " currentQuestion": " nextQuestion")}>
                            <Question_MCQ questionInfo={data[i]} answered={false} mode={'exam'}/>
                        </div>
                    )
                }else if (data[i]['type'] === 'written'){
                    preElement.push(
                        <div className={'ExamQuestion column' + (x==0 ? " currentQuestion": " nextQuestion")}>
                            <Question_Written questionInfo={data[i]} answered={false} mode={'exam'}/>
                        </div>
                    )
                }else{
                    preElement.push(
                        <div className={'ExamQuestion column' + (x==0 ? " currentQuestion": " nextQuestion")}>
                            <Question_Attachment questionInfo={data[i]} answered={false} mode={'exam'}/>
                        </div>
                    )
                }
            }
            setQuestionElements(preElement)
            setQuestionsLoadingBar("")
            setShowWindow("")
            setQuestionsLength(data.length)

            const durationInSeconds = duration * 60; // 20 minutes in seconds
            const startTime = Date.now();
            if(localStorage.getItem("startTime") === null && localStorage.getItem(duration) === null){
                localStorage.setItem('startTime', startTime.toString());
                localStorage.setItem('duration', durationInSeconds.toString());
                setTimeLeft(durationInSeconds);
                setIsRunning(true);
            }else if (timeLeft === 0) {
                setIsRunning(false);
                localStorage.removeItem('startTime');
                localStorage.removeItem('duration');
                setNextButtonStatus("hide")
                setsubmitButtonStatus("")
                document.getElementById("ExamSubmissionButton").click()
    
            }
            localStorage.setItem("StartedExam",examID)
        }).catch((err)=>{
            console.log("Error!\n",err)
        })
        
    }

    // Slide to Next Question
    function nextQuestion(event){
        const current = event.currentTarget.parentElement.parentElement.querySelector(".currentQuestion")
        const allElements = event.currentTarget.parentElement.parentElement.querySelectorAll(".ExamQuestion")
        for(var i =0;i<allElements.length;i++){
            if (allElements[i] == current){
                setCurrentNumber(i+2)
                if (i+1 != allElements.length){
                    allElements[i+1].classList.add("currentQuestion")
                    allElements[i+1].classList.remove("nextQuestion")
                    allElements[i].classList.add("previesQuesion")
                    allElements[i].classList.remove("currentQuestion")
                    setBackButtonStatus("")
                    if (i+2 == allElements.length){
                        setNextButtonStatus("hide")
                        setsubmitButtonStatus("")

                    }
                }
            }
        }
    }

    // Slide to Previous Question
    function prevQuestion(event){
        const current = event.currentTarget.parentElement.parentElement.querySelector(".currentQuestion")
        const allElements = event.currentTarget.parentElement.parentElement.querySelectorAll(".ExamQuestion")
        for(var i =0;i<allElements.length;i++){
            if (allElements[i] == current){
                setCurrentNumber(i)
                if(i!=0){
                allElements[i-1].classList.add("currentQuestion")
                allElements[i-1].classList.remove("previesQuesion")
                allElements[i].classList.add("nextQuestion")
                allElements[i].classList.remove("currentQuestion")
                setNextButtonStatus("")
                setsubmitButtonStatus("hide")
                if (i === 1){
                    setBackButtonStatus("disabled")
                }   
                }
            }
        }
    }

    // Submit the Exam
    function submitTheExam(event){
        console.log("Submitted")

        if (event.currentTarget.classList.contains("disabled")){
            return;
        }
        const questions  = event.currentTarget.parentElement.parentElement.getElementsByClassName("question")
        var questionType;
        const submission = {
            "studentID":localStorage.getItem('id'),
            "examID" :localStorage.getItem('StartedExam'),
            "submissionDate": new Date ().toLocaleString(),
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
                if (answered ===0  && isRunning && questions[i].querySelector(".isRequired").innerHTML=='&nbsp;*'){
                    setIncompleteMessage(<p className='wrongMessage'>{pageLang['mcqMissing']}</p>)
                    return;
                }
            }
            else if(questionType === "written"){
                ans['answer'] = questions[i].querySelector("textarea").value
                ans['attachments']=null
                ans["options"] = null

                if((ans['answer']===null || ans['answer'] === '') && isRunning  && questions[i].querySelector(".isRequired").innerHTML=='&nbsp;*' ){

                    setIncompleteMessage(<p className='wrongMessage'>{pageLang['writtenMissing']}</p>)
                    return;
                }
            }else{
                ans['answer'] = ''
                ans['attachments']=cleanArr(questions[i].querySelector('.attachmentsValues').innerHTML.split(","),'')
                ans["options"] = null
                if((ans['attachments']===null || ans['attachments'][0] === undefined || ans['attachments'][0] === '' || ans['attachments'] === undefined) && isRunning  && questions[i].querySelector(".isRequired").innerHTML=='&nbsp;*'){
                    setIncompleteMessage(<p className='wrongMessage'>{pageLang['attachMissing']}</p>)
                    return;
                }
            }
            submission['answers'].push(ans)
        }
        setIncompleteMessage(null)
        setsubmitButtonStatus(" disabled")
        setStubmitText(pageLang['submitting'])
        setBackButtonStatus("disabled")
        axios.post(Global.BackendURL+"/student/examsubmission",submission).then((res)=>{
            const data = res.data
            for (var i =0;i<questions.length;i++){
                const Qid = questions[i].querySelector(".questionID").innerHTML
                const QActualNumber = questions[i].querySelector(".questionNumber").innerHTML
                localStorage.removeItem('exam'+Qid+"Q"+QActualNumber)
            }
            localStorage.removeItem("StartedExam")
            localStorage.removeItem("duration")
            localStorage.removeItem("startTime")
            window.location.reload(false);
        }).catch((err)=>{
            setIncompleteMessage(<p className='wrongMessage'>{pageLang["connectionError"]}</p>)
            console.log("Error !!")
            console.log(err)
        })
        console.log(submission)
    }


    useEffect(()=>{
        try{
            if (isRunning && bacgkroundStatus ==='notBlock' && localStorage.getItem("StartedExam") !== null){
                document.getElementById("startAQuizButton").click()
            }
        }catch(err){
            console.log("Loading")
        }
    })



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
                                <p>{yourGrade}<span>{DoneStatus}</span><span className='minutes'>{duration} Minutes</span><span className='submittedDate'> {submissionDate}</span></p>
                            </div>
                        </div>
                        <div className='workDescription'>
                            <p>{description}</p>
                        </div>
                        <div className={bacgkroundStatus}>
                            {QuestionsLoadingBar}
                            <div className={'QuestionWindow column '+showWindow}>
                                <div className='topQuestionBar column'>
                                    <p>{pageLang['timeremaining']}: {formatRemainingTime(timeLeft)}</p>
                                    <div className='statusBar row'>
                                        <div className='totalBar'>
                                            <div className='currentBar' style={{width:(currentQuestionNumber*100/QestionsLength)+"%"}}>
                                            </div>
                                        </div>
                                        <p className='barNumber'>{currentQuestionNumber} / {QestionsLength}</p>
                                    </div>

                                </div>
                                <div className='QuestionContainer'>
                                    {incompleteMessage}
                                    {questionElements}
                                </div>
                                <div className='row examNavbuttons'>
                                    <button className={'QButton '+backButtonStatus} onClick={prevQuestion}>{pageLang['back']}</button>
                                    <button className={'QButton '+nextButtonStatus} onClick={nextQuestion}>{pageLang['next']}</button>
                                    <button id={"ExamSubmissionButton"} className={'QButton '+submitButtonStatus} onClick={submitTheExam}>{submitText}</button>
                                </div>

                            </div>

                        </div>
                        <div className='SubittedQuestions'>
                            {loading}
                            {submittedQuestionElements}
                        </div>
                    </div>
                </div>
                {submitted? 
                    <p>{pageLang['yourSubmitedIt']}</p>
                    :DoneStatus === 'still' || (canSubmitLate &&  DoneStatus === "late")?
                        <div id={"startAQuizButton"} className={'StartQuizButton'}  onClick={startQuiz}>
                            <div className='loading'></div>
                            {pageLang['startQuiz']}
                        </div>
                        :<p>{pageLang['noLate']}</p>
                     
                }
            </div>

        </div>
    );
}

export default ExamPage;
