import TopBar from '../../general/components/topBar';
import './styles/messages.css'
import '../../general/pages/styles/general.css'
import { useEffect, useState } from 'react';
import Global from '../../publicFunctions/globalVar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import io from "socket.io-client";
import chatDateFormat from '../../publicFunctions/chatDate';
import axios from 'axios';

const socket = io(Global.BackendURL+"/chat"); // Connect to the Socket.IO server
function ParentMessagesPage() {
    const lang = localStorage.getItem('lang')
    const pageLang = {
        messages:     lang === 'en' ? "Messages":"الرسائل",
        teacher:      lang === 'en' ? "Teacher":"مدرس",
        private:      lang === 'en' ? "Private":"خاص",
        notYet:       lang === 'en' ? "No Messages Yet":"لا رسائل بعد",
        Messages:     lang === 'en' ? "Messages":"الرسائل",
        teacher:      lang === 'en' ? "Teacher":"مدرس",
        sendAmessage: lang === 'en' ? "Send a Message":"أرسل رسالة",
        findInChats:  lang === 'en' ? "Find in Chats":"ابحث في الرسائل",
        searchInNew:  lang === 'en' ? "Search For New Message":"أبحث عن رسالة جديدة"
    }
    const [bigPreview,setBigPreview] = useState(null)
    const [chatroomBoxes,setChatroomBoxes] = useState(null)
    const [messages,setMessages] = useState(null)
    const [activeImage,setActiveImage] = useState(null)
    const [activeUsername,setActiveUserName] = useState(null)
    const [loading,setLoading] = useState(<div className="loading"></div> )
    // const [activeTeacher,setActiveTeacher] = useState(null)
    const [srRole,setsrRole] = useState(null)
    const [unseenCount,setUnseetCount] = useState(0)
    const [teachersList,setTeachersList] = useState(null)

    useEffect(()=>{
        const role = localStorage.getItem("role")
        const myID = localStorage.getItem("id")
        socket.on("chatrooms",(data)=>{
            if (data  ==='error'){
                return data
            }
            const preElement = []
            for(var i=0;i<data.length;i++){
                var date = new Date(data[i]["lastUpdate"])
                date = chatDateFormat(date)
                const targetUsers = role === 'teacher' ? data[i]['srRole']: "teacher"
                preElement.push(
                    <div className='chatroomBox row' onClick={openChatRoom}>
                        <div className='chatroomInfo row'>
                            <img src={Global.BackendURL+"/avatar/"+data[i][targetUsers]['img_dir']}/>
                            <div className='column senderInfo'>
                                <h3 className='senderName'>{(data[i][targetUsers]['name']).split(" ").slice(0,2).join(" ")}</h3>
                                <span>{date} - {targetUsers}</span>
                                <p className='latestMessage'>{data[i]['latestSeen']?"":data[i]['latest']}</p>
                                <div className='row'>
                                    {/* <span className='Tags warning'>Warning</span>
                                    <span className='Tags'>Publish</span> */}
                                </div>
                            </div>
                        </div>
                        <div className='newSeen'>
                            <span className={`newMessage ${data[i]['latestSeen']?"":"red"}` }></span>
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
            setLoading(null)




        })
        socket.on("messages",(data)=>{
            const preElement = []
            for(var i= 0;i< data.length;i++){
                var date = new Date(data[i]["date"])//.split(":")
                date = chatDateFormat(date)
                if (data[i]['sender'] === localStorage.getItem("role")){
                    preElement.push(
                        <div className='messageBox sent'>
                            <p className='hide messageID'>{data[i]['id']}</p>
                            <div className='messageInfo'>
                                <p>{data[i]['text']}</p>
                                <span className='sendDate'>{date}</span>
                                {/* <FontAwesomeIcon icon="fa-solid fa-check-double" color={data[i]['seen']?"blue":"white"}/> */}
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
        socket.on("getMessageCount",(data)=>{
            if (data!='error'){
                setUnseetCount(data.count)
            }
        })
        socket.on("update",(data)=>{
            console.log("Updateing ")
            const activeChat = localStorage.getItem("ActiveChat")
            if (data === "Done"){
                socket.emit("chatrooms",{id:myID,role:role})
                socket.emit("getMessageCount",{userID:myID,role:role})

                if (activeChat != null && activeChat != ''){
                    
                    socket.emit("messages",{chatroomID:activeChat,userRole:role})
                }else{
                    console.log("No Active Teacher")
                }
            }

        })

        socket.emit("chatrooms",{id:myID,role:role})
        socket.emit("getMessageCount",{userID:myID,role:role})


        document.getElementById("chatSendInput").addEventListener('keypress', function(event) {
            if (event.key == 'Enter') {
                event.currentTarget.parentElement.querySelector("button").click()
            }
        });
        
    },[])
    useEffect(()=>{
        const activeChatroom = localStorage.getItem("ActiveChat")
        if (activeChatroom !== null && activeChatroom !== ''){
            const elements = document.querySelectorAll(".chatroomBox")
            for(var i=0;i<elements.length;i++){
                if (elements[i].querySelector(".chatroomID").innerHTML === activeChatroom){
                    elements[i].click()
                    break
                }
            }
        }
    },[chatroomBoxes])
    function openChatRoom(event){
        const activeBox =  event.currentTarget.parentElement.querySelector(".active")
        if(activeBox !== null){
            activeBox.classList.remove("active")
        }
        event.currentTarget.classList.add("active")
        const el = event.currentTarget
        const teacherID = el.querySelector(".teacherID").innerHTML
        const srRole = el.querySelector(".srRole").innerHTML
        const username = el.querySelector(".senderName").innerHTML
        const activeChat = el.querySelector(".chatroomID").innerHTML
        const lastUpdate = el.querySelector(".lastUpdate").innerHTML
        const userImage = el.querySelector("img").src
        const myRole = localStorage.getItem('role')
        localStorage.setItem("ActiveTeacher",teacherID)
        localStorage.setItem("ActiveChat",activeChat)
        localStorage.setItem("LatestDate",lastUpdate)
        setActiveUserName(username)
        setActiveImage(userImage)
        
        socket.emit("messages",{chatroomID:activeChat,userRole:myRole})
        document.querySelector(".sendMessage").style.display = 'flex'

    }

    function sendMessage(event){
        const req = {
            // teacherID: localStorage.getItem("ActiveTeacher"),
            // srRole : localStorage.getItem("role"),
            // srID   : localStorage.getItem("id"),
            chatroomID: localStorage.getItem("ActiveChat"),
            sender : localStorage.getItem("role"),
            date   : new Date(),
            text   : event.currentTarget.parentElement.querySelector(".sendInput").value
        }
        if(req.text !== ''){
            socket.emit("sendMessage",req)
            event.currentTarget.parentElement.querySelector(".sendInput").value = ''
            console.log("Message Sent")
        }


    }

    function handleChatroomSearchInput(event) {
        const searchValue = event.target.value.toLowerCase();
        const chatroomBoxes = document.querySelectorAll('.chatroomBox');
        chatroomBoxes.forEach((box) => {
          const senderTitle = box.querySelector('.senderName').textContent.toLowerCase();
          if (senderTitle.includes(searchValue)) {
            box.style.display = 'flex'; // Show the chatroomBox
          } else {
            box.style.display = 'none'; // Hide the chatroomBox
          }
        });
    }

    function filterTeachersList(event) {
        const searchValue = event.target.value.toLowerCase();
        const chatroomBoxes = document.querySelectorAll('.chatSuggestion');
        chatroomBoxes.forEach((box) => {
          const senderTitle = box.querySelector('.teacherName').innerHTML.toLowerCase();
          if (senderTitle.includes(searchValue)) {
            box.style.display = 'flex'; // Show the chatroomBox
          } else {
            box.style.display = 'none'; // Hide the chatroomBox
          }
        });
    }
    function openSearchList(event){
        const element = event.currentTarget
        if (teachersList === null){
            axios.get(Global.BackendURL+"/teachersList").then((res)=>{
                const data = res.data
                const preElement = []
                for (var i=0;i<data.length;i++){
                    preElement.push(
                            <div className='chatSuggestion'>
                                <img src={Global.BackendURL+"/avatar/"+data[i]['img_dir']}/>
                                <div className='column'>
                                    <p className='teacherName'>{lang === 'en' ? data[i]['name']:data[i]['arName']}</p>
                                    <span>{lang === 'en' ? data[i]['course']['name'] +" "+pageLang['teacher'] :pageLang['teacher'] +" "+ data[i]['course']['name']}</span>
                                </div>
                            </div>
                    )
                }
                setTeachersList(preElement)
            }).catch((err)=>{
                console.log("Error!!\n",err)
            })
        }
        if (element.style.transform === "rotate(-225deg)" ){
            element.style.transform = "rotate(0deg)"
            element.parentElement.querySelector("input").style.setProperty("width","40px")
        }else{
            element.style.transform = "rotate(-225deg)"
            element.parentElement.querySelector("input").style.setProperty("width","87%")
        
        }

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
                        <span className='NewNumber'>{unseenCount}</span>
                    </div>
                    <div>

                    </div>
                    <div className='newChatroom'>
                        <input type={"text"}  placeholder={pageLang['searchInNew']} onChange={filterTeachersList}/>
                        <div className='NewMessageButton'  onClick={openSearchList}>
                            <FontAwesomeIcon icon="fa-solid fa-plus" />
                        </div>
                        <div className='newChatroomSuggestions'>
                            {teachersList}
                        </div>
                    </div>
                </div>
                <div className='searchInSent'>
                    <input type='text' placeholder={pageLang['findInChats']} onChange={handleChatroomSearchInput}/>
                </div>      
                {loading}     
                <div className='currentChatBoxes'>
                    {chatroomBoxes}
                </div>      
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
                    <input type='text' className='sendInput'  id={"chatSendInput"} placeholder={pageLang['sendAmessage']}/>
                    <button className='sendMessagesButton' onClick={sendMessage}><FontAwesomeIcon icon="fa-solid fa-paper-plane" /></button>
                </div>
            </div>
        </div>

    </div>
    );
}

export default ParentMessagesPage;
