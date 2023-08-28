import TopBar from '../../general/components/topBar';
import './styles/messages.css'
import '../../general/pages/styles/general.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Global from '../../publicFunctions/globalVar';
import {  useParams } from 'react-router-dom';
import formatTime from '../../publicFunctions/formatTime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import routeTo from '../../publicFunctions/reroute'
import io from "socket.io-client";

const socket = io(); // Connect to the Socket.IO server
function ParentMessagesPage() {
    const lang = localStorage.getItem('lang')
    // const studentName = localStorage.getItem('currentStudentName').split(" ")[0]
    // const studentArName = localStorage.getItem('currentStudentArName').split(" ")[0]
    const pageLang = {
        messages:    lang === 'en' ? "Messages":"الرسائل",
        teacher:     lang === 'en' ? "Teacher":"مدرس",
        private:     lang === 'en' ? "Private":"خاص",
        // public:      lang === 'en' ? "Public For "+studentName:"عام ل"+studentArName,
        notYet:      lang === 'en' ? "No Messages Yet":"لا رسائل بعد",
        Messages:    lang === 'en' ? "Messages":"الرسائل"
    }
    const {ID} = useParams()
    const [bigPreview,setBigPreview] = useState(null)
    const [chatroomBoxes,setChatroomBoxes] = useState(null)
    const [messages,setMessages] = useState(null)
    const [activeImage,setActiveImage] = useState(null)
    const [activeUsername,setActiveUserName] = useState(null)
    const [loading,setLoading] = useState(<div className="loading"></div> )
    const [activeTeacher,setActiveTeacher] = useState(null)
    const [counter,setCounter] =useState(0)
    const [srRole,setsrRole] = useState(null)
    const [toggleTrue,setToggleTrue] = useState(0)
    
    useEffect(() => {
        const intervalID = setInterval(() =>  {
            const myID = localStorage.getItem("id")
            const role = localStorage.getItem("role")
            const lastDate = localStorage.getItem("LatestDate")
            axios.get(Global.BackendURL+"/messageupdate?userID="+myID+"&role="+role+"&lastDate="+lastDate).then((res)=>{
                console.log(res.data)
                if (res.data.newUpdate){
                    setToggleTrue(toggleTrue+1)
                }
            }).catch((err)=>{
                console.log("Error!!\n",err)
            })
        }, 1000);
    
        return () => clearInterval(intervalID);
    }, []);

    useEffect(()=>{
        console.log("Toggeled")
        const role = localStorage.getItem("role")
        const myID = localStorage.getItem("id")
        axios.get(Global.BackendURL+"/chatrooms?userID="+myID+"&role="+role).then((res)=>{
            console.log(res.data)
            const data = res.data
            const preElement = []
            // if (data.length !=0 ){
            //     localStorage.setItem("LatestDate",data[0]["lastUpdate"])
            // }
            for(var i=0;i<data.length;i++){
                var date = new Date(data[i]["lastUpdate"]).toLocaleTimeString().split(":")
                date[2] = date[2].slice(3,5)
                date = date[0] + ":" + date[1] +" "+date[2]
                const targetUsers = role === 'teacher' ? data[i]['srRole']: "teacher"
                preElement.push(
                    <div className='chatroomBox row' onClick={openChatRoom}>
                        <div className='chatroomInfo row'>
                            <img src={Global.BackendURL+"/avatar/"+data[i][targetUsers]['img_dir']}/>
                            <div className='column senderInfo'>
                                <h3 className='senderName'>{(data[i][targetUsers]['name']).split(" ").slice(0,2).join(" ")}</h3>
                                <span>{date} - {targetUsers}</span>
                                <p className='latestMessage'>{data[i]['latest']}</p>
                                <div className='row'>
                                    {/* <span className='Tags warning'>Warning</span>
                                    <span className='Tags'>Publish</span> */}
                                </div>
                            </div>
                        </div>
                        <div className='newSeen'>
                            <span className='newMessage'></span>
                            <span className='messageType green'>PR</span>
                        </div>
                        <p className='hide chatroomID'>{data[i]['id']}</p>
                        <p className='hide teacherID'>{data[i]['teacher']['id']}</p>
                        <p className='hide srRole'>{data[i]['srRole']}</p>
                        <p className='hide lastUpdate'>{data[i]['lastUpdate']}</p>
                    </div>
                )
            }
            setChatroomBoxes(preElement)





        }).catch((err)=>{
            console.log("Error!\n",err)
        })

        if (activeTeacher != null){
            axios.get(Global.BackendURL+"/message?teacherID="+activeTeacher+"&srRole="+role+"&srID="+myID).then((res)=>{
                const data = res.data
                console.log("Messages: ",data)
                const preElement = []
                for(var i=data.length-1;i>=0;i--){
                    var date = new Date(data[i]["date"]).toLocaleTimeString().split(":")
                    date[2] = date[2].slice(3,5)
                    date = date[0] + ":" + date[1] +" "+date[2]
                    if (data[i]['sender'] === role){
                        preElement.push(
                            <div className='messageBox sent'>
                                <p className='hide messageID'>{data[i]['id']}</p>
                                <div className='messageInfo'>
                                    <p>{data[i]['text']}</p>
                                    <span className='sendDate'>{date}</span>
                                    {/* <FontAwesomeIcon icon="fa-solid fa-check-double" /> */}
                                </div>
    
                            </div>
                        )
                    }else{
                        preElement.push(
                            <div className='messageBox received'>
                                <p className='hide messageID'>{data[i]['id']}</p>
                                <div className='messageInfo'>
                                    <p>{data[i]['text']}</p>
                                    <span className='sendDate'>{date}</span>
                                    {/* <FontAwesomeIcon icon="fa-solid fa-check-double" /> */}
                                </div>
                            </div>
                        )
                    }
                }
                setMessages(preElement)
                document.querySelector(".chatMessages").scrollTop = "20000px"

            }).catch((err)=>{
                console.log("Error!!\n",err)
            })
        }
    },[activeTeacher,toggleTrue])

    function openChatRoom(event){
        const el = event.currentTarget
        const teacherID = el.querySelector(".teacherID").innerHTML
        const srRole = el.querySelector(".srRole").innerHTML
        const username = el.querySelector(".senderName").innerHTML
        const lastUpdate = el.querySelector(".lastUpdate").innerHTML
        
        setActiveTeacher(teacherID)
        setsrRole(srRole)
        const userImage = el.querySelector("img").src
        setActiveUserName(username)
        setActiveImage(userImage)
        localStorage.setItem("LatestDate",lastUpdate)
        
        const role = localStorage.getItem("role") === "teacher" ? srRole:"teacher"
        const myID = localStorage.getItem("id")
        axios.get(Global.BackendURL+"/message?teacherID="+teacherID+"&srRole="+role+"&srID="+myID).then((res)=>{
            const data = res.data
            console.log("Messages: ",data)
            const preElement = []
            for(var i=data.length-1;i>=0;i--){
                var date = new Date(data[i]["date"]).toLocaleTimeString()//.split(":")
                console.log("dataEEE: ",data[i]["date"])
                // date[2] = date[2].slice(3,5)
                // date = date[0] + ":" + date[1] +" "+date[2]
                console.log("if: ",data[i]['sender']," : ", role, " : ",data[i]['sender'] === role)
                if (data[i]['sender'] === localStorage.getItem("role")){
                    preElement.push(
                        <div className='messageBox sent'>
                            <p className='hide messageID'>{data[i]['id']}</p>
                            <div className='messageInfo'>
                                <p>{data[i]['text']}</p>
                                <span className='sendDate'>{date}</span>
                                {/* <FontAwesomeIcon icon="fa-solid fa-check-double" /> */}
                            </div>

                        </div>
                    )
                }else{
                    preElement.push(
                        <div className='messageBox received'>
                            <p className='hide messageID'>{data[i]['id']}</p>
                            <div className='messageInfo'>
                                <p>{data[i]['text']}</p>
                                <span className='sendDate'>{date}</span>
                                {/* <FontAwesomeIcon icon="fa-solid fa-check-double" /> */}
                            </div>
                        </div>
                    )
                }
            }
            setMessages(preElement)
        }).catch((err)=>{
            console.log("Error!!\n",err)
        })
    }

    function sendMessage(event){
        const req = {
            teacherID: activeTeacher,
            srRole : srRole,
            srID   : localStorage.getItem("id"),
            sender : localStorage.getItem("role"),
            date   : new Date(),
            text   : event.currentTarget.parentElement.querySelector(".sendInput").value
        }
        event.currentTarget.parentElement.querySelector(".sendInput").value = ''
        console.log("req: ",req)
        axios.post(Global.BackendURL+"/message",req).then((res)=>{
            console.log(res.data)
        }).catch((err)=>{
            console.log("Error!!\n",err)

        })
    }

    function openSearchList(event){
        const element = event.currentTarget
        if (element.style.transform === "rotate(-225deg)" ){
            element.style.transform = "rotate(0deg)"
        }else{
            element.style.transform = "rotate(-225deg)"
        }
        console.log("hello")
        // console.log(element.style.addProperty())
    }
    return (
    <div id='StudentMessagesPage'>
        <TopBar title={pageLang['messages']}/>
        {bigPreview}

        <div className='row pageContent'>
            <div className='mailBox column'>
                <div className='header row'>
                    <div className='row'>
                        <h2>{pageLang['Messages']}</h2>
                        <span className='NewNumber'>2</span>
                    </div>
                    <div className='NewMessageButton'  onClick={openSearchList}>
                        <FontAwesomeIcon icon="fa-solid fa-plus" />
                    </div>
                    <a href="./sendMessage" className='hiddenRoute'></a>
                </div>
                <div className='searchInSent'>
                    <input type='text' placeholder='Find in Chats'/>
                </div>      
                {/* {loading}            */}
                {chatroomBoxes}
            </div>
            <div className='ChatRoom'>
                <div className='header row'>
                    <img src ={activeImage}/>
                    <h3>{activeUsername}</h3>
                </div>
                <div className='chatMessages'>
                    {messages}
                </div>
                <div className='sendMessage row'>
                    <input type='text' className='sendInput'/>
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>

    </div>
    );
}

export default ParentMessagesPage;
