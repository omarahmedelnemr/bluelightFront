import './styles/general.css'
import './styles/reportPage.css'
import TopBar from '../components/topBar';
import Input from '../components/input';
import { useState } from 'react';
import axios from '../../publicFunctions/axiosAuth';
import { useNavigate } from 'react-router-dom';
import Global from '../../publicFunctions/globalVar';
function ReportPage() {
    const lang = localStorage.getItem('lang') 
    const [errorMessage,setErrorMessage] = useState(null)
    const [buttonStatus,setButtonStatus] = useState('')
    const navigate = useNavigate()
    const pageText = {
        reportIssu:          lang === 'en' ? "Report":"ابلاغ",
        titlePlaceholder:    lang === 'en' ? "Write a Title":"اكتب عنوانا",
        textareaPlaceholder: lang === 'en' ? "Write Your Complain, Suggestions, or Request":"اكتب مشكلتك, اقتراحك, او طلبك",
        send:                lang === 'en' ? "Send":"أرسل",
        sending:             lang === 'en' ? "Sending":"جار الارسال",
        sent:                lang === 'en' ? "Sent Successfully":"تم الارسال بنجاح",
        sendAgain:           lang === 'en' ? "Filed To Send, Click To Send Again":"فشل الارسال,اضغط للارسال مره اخري",
        fillAll:             lang === 'en' ? "Please Fill All Inputs below":"برجاء ملء جميع الخانات بالاسفل"
    }

    const [send,setSend] = useState(pageText['send'])
    function submitIssu(event){
        setButtonStatus("disabled")
        const title = event.currentTarget.parentElement.querySelector("input").value
        const bodyText = event.currentTarget.parentElement.querySelector("textarea").value
        if (title === '' || title === undefined || bodyText === '' || bodyText === undefined){
            setErrorMessage(pageText['fillAll'])

        }else{
            setSend(pageText['sending'])

            setErrorMessage(null)
            const req = {
                userID:   localStorage.getItem('id'),
                role:     localStorage.getItem("role"),
                title:    title,
                bodyText: bodyText,
                publish_date: new Date()
            }
            axios.post(Global.BackendURL+"/issureport",req).then((res)=>{
                const data = res.data
                console.log(data)
                setSend(pageText['sent'])
            }).catch((err)=>{
                setSend(pageText['sendAgain'])
                setButtonStatus("")

                console.log("Error!!\n",err)
            })
        
        }

    }
    return (
        <div id ={"ChangeUsername"} className="reportPage column fullWidth">
            <TopBar title={pageText["reportIssu"]}/>
            <div className='reportForm'>
                <div className='FormComponants'>
                    <p className='red'>{errorMessage}</p>
                    <Input type={'text'} label={pageText['titlePlaceholder']} />
                    <textarea placeholder={pageText['textareaPlaceholder']}></textarea>
                    <button onClick={submitIssu} className={buttonStatus}>{send}</button>
                </div>
            </div>
        </div>
    );
}

export default ReportPage;
