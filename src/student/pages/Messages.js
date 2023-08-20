import TopBar from '../../general/components/topBar';
import './styles/messages.css'
import '../../general/pages/styles/general.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Global from '../../publicFunctions/globalVar';
import {  useParams } from 'react-router-dom';
import formatTime from '../../publicFunctions/formatTime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function StudentMessagesPage() {
    const lang = localStorage.getItem('lang')
    const pageLang = {
        messages: lang === 'en' ? "Messages":"الرسائل",
        teacher:  lang === 'en' ? "Teacher":"مدرس",
        private:  lang === 'en' ? "Private":"خاص",
        public:   lang === 'en' ? "Public":"عام"
    }
    const {ID} = useParams()
    const [bigPreview,setBigPreview] = useState(null)
    const [messages,setMessages] = useState(null)
    const [messagesList,setMessagesList] = useState([])
    const [senderName,setSenderName] = useState(null)
    const [senderImage,setSenderImage] = useState(null)
    const [senderState,setSenderState] = useState(null)
    const [title,setTitle] = useState(null)
    const [sendDate,setSendDate] = useState(null)
    const [mainText,setMainText] = useState(null)
    const [attachmentsList,setAttachmentsList] = useState(null)
    const [loading,setLoading] = useState(<div className="loading"></div> )
    // Show a Preview of attachment With Type Image
    function showBigImage(event){
        var element = event.currentTarget.querySelector("img")
        // console.log("ASdasdasdas: )

        setBigPreview(
        <div className='bigImage'>
            <div className='grayBackground' onClick={(event)=>{setBigPreview(null)}}></div>
            <img src={element.src}/>
        </div>
        )
    }


    // Get All Private Messages
    useEffect(()=>{
        axios.get(Global.BackendURL+"/student/messages?studentID="+localStorage.getItem('id')).then((res)=>{
            const data = res.data
            const Elements = []
            setLoading(null)
            for (var i=0;i<data.length;i++){
                Elements.push(
                    <div className='messageBox row' id={"messageNum"+data[i]['id']} onClick={ShowMessageDetails}>
                        <div className='column messageOverview'>
                            <span><img src={Global.BackendURL+"/profilepic/"+data[i]['teacher']["img_dir"]}/>&nbsp;<span className='senderName'> {lang === 'en'? data[i]['teacher']['name']:data[i]['teacher']['arName']}</span></span>
                            <h2>{data[i]['title']}</h2>
                            <span>{formatTime(data[i]['sendDate'])}</span>
                            <p className='hide messageID'>{data[i]['id']}</p>
                        </div>
                        <div className='column seenPublic'>
                            <span className={data[i]['seen']?'':'notReadMessages'}></span>
                            <span className={data[i]['private']?"private":"public"}>{data[i]['private']?pageLang['private']:pageLang['public']}</span>
                        </div>
                        <span className='hide allData'>{JSON.stringify(data[i])}</span>
                    </div>
                )
            }
                console.log("ddd: ",data)
            if (data.length > 0){
                setMessages(Elements)

            }else{
                setMessages([
                <div className='EmptyMailBox'>
                    <FontAwesomeIcon icon="fa-solid fa-comment-slash" />
                    <p>Not Message Yet</p>
                </div>])
            }
        }).catch((err)=>{
            console.log("Error!!")
            console.log(err)
        })
    },[1000])

    //Check History URL
    useEffect(()=>{
        console.log("Hello")
        console.log("messageNum"+ID)
        if (ID != undefined){
            try{
                document.getElementById("messageNum"+ID).click()
            }catch(err){
                console.log("Still Loading")
            }
        }
    },[ID])


    function ShowMessageDetails(event){

        // // // Add the Click to URL History
        // if (typeof (window.history.pushState) != "undefined" && ID!= event.currentTarget.querySelector(".messageID").innerHTML) {
        //     var obj = {
        //         Title: 'hello',
        //         Url: '/student/messages/'+event.currentTarget.querySelector(".messageID").innerHTML
        //     };
        //     window.history.pushState(obj, obj.Title, obj.Url);
        // }      
        
        // Activate the Selected Message
        if(event.currentTarget.parentElement.parentElement.querySelector(".reading") !== null){
            event.currentTarget.parentElement.parentElement.querySelector(".reading").classList.remove("reading")
        }
        event.currentTarget.classList.add('reading')

        const currentMessage = JSON.parse(event.currentTarget.querySelector(".allData").innerHTML)
        setSenderName(lang === 'en' ? currentMessage['teacher']['name']:currentMessage['teacher']['arName'])
        setSenderImage(Global.BackendURL+"/profilepic/"+currentMessage['teacher']['img_dir'])
        setSenderState(pageLang['teacher'])
        setTitle(event.currentTarget.querySelector('h2').innerHTML)
        setMainText(currentMessage['bodyText'])
        setSendDate(formatTime(currentMessage['sendDate']))

        const attachments = []
        for (var i =0;i<currentMessage['attachments'].length;i++){
            if(currentMessage['attachments'][i]['attachment'].split('.')[1] ==='pdf'){
                attachments.push(
                    <div className='attachmentPreview'>
                        <a href={Global.BackendURL+"/file/"+currentMessage['attachments'][i]['attachment']} target="_blank">
                            <embed src={Global.BackendURL+"/file/"+currentMessage['attachments'][i]['attachment']} className='embedMiniPreview'></embed>
                            <p>PDF</p>
                        </a>
                        
                    </div>
                )
            }else{
                attachments.push(
                    <div className='attachmentPreview' onClick={showBigImage}>
                        <img src={Global.BackendURL+"/file/"+currentMessage['attachments'][i]['attachment']} />
                        <p>Image</p>
                    </div>
                    )
            }

        }
        setAttachmentsList(attachments)

        // Mark as Readed
        if (event.currentTarget.querySelector(".notReadMessages")!==null){
            event.currentTarget.querySelector(".notReadMessages").classList.remove("notReadMessages")
            axios.post(Global.BackendURL+"/student/seeMessage",{
                "studentID":localStorage.getItem('id'),
                "messageID":currentMessage['id'],
                "private": currentMessage['private']
            }).then((res)=>{
                console.log(res.data)
            }).catch((err)=>{
                console.log("Error!!\n",err)
            })
        }


    }
    return (
    <div id='StudentMessagesPage'>
        <TopBar title={pageLang['messages']}/>
        {bigPreview}

        <div className='row pageContent'>
            <div className='mailBox column'>      
                    {loading}           
                    {messages}
            </div>
            {title === null?"":
            <div className='MessageInfo'>
                <div className='header'>
                    <div className='senderCard row'>
                        <img src={senderImage} />
                        <div className='column'>
                            <span>{senderName}</span>
                            <span>{senderState}</span>

                        </div>
                    </div>
                    <hr/>
                    
                    <h1>{title}</h1>
                    <span>{sendDate}</span>
                </div>
                <div className='body'>
                    <p>{mainText}</p>
                    <div className='attachmentsOverview'>
                        {attachmentsList}
                    </div>
                </div>
        </div>
            }
            </div>

    </div>
    );
}

export default StudentMessagesPage;
