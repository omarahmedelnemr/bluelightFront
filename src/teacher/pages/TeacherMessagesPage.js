import TopBar from '../../general/components/topBar';
import './styles/messages.css'
import '../../general/pages/styles/general.css'
import { useEffect, useState } from 'react';
import Global from '../../publicFunctions/globalVar';
import formatTime from '../../publicFunctions/formatTime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import io from "socket.io-client";

const socket = io(Global.BackendURL+"/chat"); // Connect to the Socket.IO server
socket.emit("userInfo",{id:localStorage.getItem("id"),role:localStorage.getItem("role")})
function TeacherMessagesPage() {
    const lang = localStorage.getItem('lang')
    const pageLang = {
        messages:    lang === 'en' ? "Messages":"الرسائل",
        teacher:     lang === 'en' ? "Teacher":"مدرس",
        private:     lang === 'en' ? "Private":"خاص",
        notYet:      lang === 'en' ? "No Messages Yet":"لا رسائل بعد",
        Messages:    lang === 'en' ? "Messages":"الرسائل"
    }
    const [bigPreview,setBigPreview] = useState(null)
    const [chatroomBoxes,setChatroomBoxes] = useState(null)
    const [messages,setMessages] = useState(null)
    const [activeImage,setActiveImage] = useState(null)
    const [activeUsername,setActiveUserName] = useState(null)
    const [loading,setLoading] = useState(<div className="loading"></div> )
    const [srRole,setsrRole] = useState(null)
    

    useEffect(()=>{
        console.log("Toggeled")
        const role = localStorage.getItem("role")
        const myID = localStorage.getItem("id")
        socket.on("chatrooms",(data)=>{
            console.log("SOCKET Data",data)
            if (data  ==='error'){
                return data
            }
            const preElement = []
            for(var i=0;i<data.length;i++){
                var date = new Date(data[i]["lastUpdate"]).toLocaleTimeString().split(":")
                date[2] = date[2].slice(3,5)
                date = date[0] + ":" + date[1] +" "+date[2]
                const targetUsers = data[i]['srRole']
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
                        <p className='hide userID'>{data[i][targetUsers]['id']}</p>
                        <p className='hide srRole'>{data[i]['srRole']}</p>
                        <p className='hide lastUpdate'>{data[i]['lastUpdate']}</p>
                    </div>
                )
            }
            setChatroomBoxes(preElement)
            setLoading(null)




        })
        socket.on("messages",(data)=>{
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
        })

        socket.on("update",(data)=>{
            const activeChat = localStorage.getItem("ActiveChat")
            console.log("I am on Update, mydata is : ",data)
            if (data === "Done"){
                socket.emit("chatrooms",{id:myID,role:role})
                if (activeChat != null && activeChat != ''){
                    socket.emit("messages",{chatroomID:activeChat})
                }else{
                    console.log("No Active Teacher")
                }
            }

        })

        socket.emit("chatrooms",{id:myID,role:role})
        if (localStorage.getItem("activeChat") !== null && localStorage.getItem("activeChat") !== ''){
            socket.emit("messages",{chatroomID:localStorage.getItem("activeChat")})
        }
    },[])

    function openChatRoom(event){
        const activeBox =  event.currentTarget.parentElement.querySelector(".active")
        if(activeBox !== null){
            activeBox.classList.remove("active")
        }
        event.currentTarget.classList.add("active")

        const el = event.currentTarget
        const userID = el.querySelector(".userID").innerHTML
        const srRole = el.querySelector(".srRole").innerHTML
        const username = el.querySelector(".senderName").innerHTML
        const activeChat = el.querySelector(".chatroomID").innerHTML
        const lastUpdate = el.querySelector(".lastUpdate").innerHTML
        const userImage = el.querySelector("img").src

        localStorage.setItem("ActiveChat",activeChat)
        localStorage.setItem('activeChatUser' , userID)
        localStorage.setItem('activeChatUserRole' , srRole)
        localStorage.setItem("LatestDate",lastUpdate)
        setActiveUserName(username)
        setActiveImage(userImage)
        
        socket.emit("messages",{chatroomID:activeChat})
    }

    function sendMessage(event){
        const req = {
            teacherID: localStorage.getItem("id"),
            srRole : srRole,
            srID   : localStorage.getItem("activeChatUser"),
            chatroomID: localStorage.getItem("ActiveChat"),
            sender : localStorage.getItem("role"),
            date   : new Date(),
            text   : event.currentTarget.parentElement.querySelector(".sendInput").value
        }
        socket.emit("sendMessage",req)
        event.currentTarget.parentElement.querySelector(".sendInput").value = ''

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

export default TeacherMessagesPage;
