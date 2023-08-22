import TopBar from '../../general/components/topBar';
import './styles/sendMessage.css'
import '../../general/pages/styles/general.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Global from '../../publicFunctions/globalVar';
import {  useParams } from 'react-router-dom';
import formatTime from '../../publicFunctions/formatTime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import routeTo from '../../publicFunctions/reroute'
import Input from '../../general/components/input';
function ParentSendMessagePage() {
    const lang = localStorage.getItem('lang')
    const studentName = localStorage.getItem('currentStudentName').split(" ")[0]
    const studentArName = localStorage.getItem('currentStudentArName').split(" ")[0]
    const pageLang = {
        sendmessage:         lang === 'en' ? "Send Message":"أرسل رسالة",
        teacher:             lang === 'en' ? "Teacher":"مدرس",
        private:             lang === 'en' ? "Private":"خاص",
        public:              lang === 'en' ? "Public For "+studentName:"عام ل"+studentArName,
        notYet:              lang === 'en' ? "No Messages Yet":"لا رسائل بعد",
        newMessage:          lang === 'en' ? "New Message":"رسالة جديدة",
        sendTo:              lang === 'en' ? "Send To Mr/Ms. :":"أرسل الي أستاذ\\أستاذة. :",
        titlePlaceholder:    lang === 'en' ? "Message Title":"عنوان الرسالة",
        textareaPlaceholder: lang === 'en' ? "Message Main Text":"نص الرسالة",
        teacherNameTitle:    lang === 'en' ? "Teacher Name":"أسم المدرس"
    }
    const [errorMessage,setErrorMessage] = useState(null)
    return (
    <div id='StudentSendMessagePage'>
        <TopBar title={pageLang['sendmessage']}/>
        <div className='pageContent'>
            <div className='sendToInfo row'>
                <p className='sentToText'>{pageLang['sendTo']}&nbsp;</p>
                {/* <p>Mohamed Ahmed</p> */}
                <div className='searchTarget'>
                    <Input type={'text'} label={pageLang['teacherNameTitle']} onChange/>
                    <div className='suggestions'>
                        <p>Mohamed Ahmed - Math</p>
                        <p>Mohamed Ahmed - Math</p>
                        <p>Mohamed Ahmed - Math</p>
                        <p>Mohamed Ahmed - Math</p>
                        <p>Mohamed Ahmed - Math</p>
                    </div>
                </div>

                {/* <span className='changeSendTo'>&nbsp;Change</span> */}
            </div>
            <div className='FormComponants'>
                <p className='red'>{errorMessage}</p>
                <Input type={'text'} label={pageLang['titlePlaceholder']} />
                <textarea placeholder={pageLang['textareaPlaceholder']}></textarea>
                <button className={"buttonStatus"}>{pageLang['sendmessage']}</button>
            </div>      
        </div>
    </div>
    );
}

export default ParentSendMessagePage;
