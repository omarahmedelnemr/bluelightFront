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
const RedesignOnWidth = 920
function TeacherMessagesPage() {
    const lang = localStorage.getItem('lang')
    const pageLang = {
        parent:            lang === 'en' ? "Parent":"ولي أمر",
        student:           lang === 'en' ? "Student":"طالب",
        messages:          lang === 'en' ? "Messages":"الرسائل",
        teacher:           lang === 'en' ? "Teacher":"مدرس",
        private:           lang === 'en' ? "Private":"خاص",
        notYet:            lang === 'en' ? "No Messages Yet":"لا رسائل بعد",
        Messages:          lang === 'en' ? "Messages":"الرسائل",
        teacher:           lang === 'en' ? "Teacher":"مدرس",
        sendAmessage:      lang === 'en' ? "Send a Message":"أرسل رسالة",
        findInChats:       lang === 'en' ? "Find in Chats":"ابحث في الرسائل",
        searchInNew:       lang === 'en' ? "Search For New Message":"أبحث عن رسالة جديدة",
        chatEmptyMain:     lang === 'en' ? "Chat is Still Empty, Send The First Message":"المحادثة لاتزال فارغة, ارسل اول رسالة",
        chatNoActiveMain:  lang === 'en' ? "No Active Chat Yet":"لا توجد محادثةة مفعلة بعد",
        connectionLost:    lang === 'en' ? "Unfortunatly, We Lost the Connection, please Refresh The Page to Re-Connect":"للاسف, لقد قفدنا الاتصال, بالرجاء اعادة تحميل الصفحة لاعادة الاتصال",
        refresh:           lang === 'en' ? "Refresh":"اعادة التحميل"
    
    }
    const [chatroomBoxes,setChatroomBoxes] = useState(null)
    const [messages,setMessages] = useState(<div className='ChatroomMainMessage'>
                                                <FontAwesomeIcon icon="fa-solid fa-comments" />
                                                <p>{pageLang['chatNoActiveMain']}</p>
                                            </div>)
    const [activeImage,setActiveImage] = useState(null)
    const [activeUsername,setActiveUserName] = useState(null)
    const [loading,setLoading] = useState(<div className="loading"></div> )
    // const [activeTeacher,setActiveTeacher] = useState(null)
    const [srRole,setsrRole] = useState(null)
    const [unseenCount,setUnseetCount] = useState(0)
    const [suggestionsList,setSuggestionsList] = useState(null)
    const [connectionLost,setConnectionLostMessage] = useState(null)
    const [emptyMailBox,setEmptyMailBox] = useState(null)

    useEffect(()=>{
        const role = localStorage.getItem("role")
        const myID = localStorage.getItem("id")
        socket.on("chatrooms",(data)=>{
            if (data  ==='error'){
                return data
            }
            const preElement = []
            console.log("Chatrooms: ",data)
            for(var i=0;i<data.length;i++){
                var date = new Date(data[i]["lastUpdate"])
                date = chatDateFormat(date)
                const targetUsers = data[i]['srRole']
                preElement.push(
                    <div className='chatroomBox row' onClick={openChatRoom}>
                        <div className='chatroomInfo row'>
                            <img src={Global.BackendURL+"/avatar/"+data[i][targetUsers]['img_dir']}/>
                            <div className='column senderInfo'>
                                <h3 className='senderName'>{(data[i][targetUsers][lang==='en'?'name':"arName"]).split(" ").slice(0,2).join(" ")}</h3>
                                <span className='chatLastDate'>{date} - {pageLang[targetUsers]}</span>
                                <p className='latestMessage'>{data[i]['latestSeen'] || (Number(localStorage.getItem("ActiveChat")) === Number(data[i]['id'])) ?"":data[i]['latest']}</p>
                                <div className='row'>
                                    {/* <span className='Tags warning'>Warning</span>
                                    <span className='Tags'>Publish</span> */}
                                </div>
                            </div>
                        </div>
                        <div className='newSeen'>
                        <span className={`newMessage ${data[i]['latestSeen'] || (Number(localStorage.getItem("ActiveChat")) === Number(data[i]['id']))?"":"red"}` }></span>
                            {/* <span className='messageType green'>PR</span> */}
                        </div>
                        <p className='hide chatroomID'>{data[i]['id']}</p>
                        <p className='hide teacherID'>{data[i]['teacher']['id']}</p>
                        <p className='hide srRole'>{data[i]['srRole']}</p>
                        <p className='hide srID'>{data[i]['srID']}</p>
                        <p className='hide lastUpdate'>{data[i]['lastUpdate']}</p>
                    </div>
                )
            }
            setChatroomBoxes(preElement)
            setLoading(null)

            if (data.length === 0){
                setEmptyMailBox(
                    <div className='emptyMailBoxMessage'>
                        <FontAwesomeIcon icon="fa-solid fa-envelope-open" />
                        <p>No Messages To Display</p>
                    </div>
                )
            }



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
                                <FontAwesomeIcon icon="fa-solid fa-check-double" color={data[i]['seen']?"blue":"white"}/>
                                {
                                    data[i]['seen']?null:
                                    <div  onClick={ShowDeleteButton}>
                                    <FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" className='messageOptions'/>
                                </div>
                                  } 
                            </div>
                            <div className='options' onClick={DeleteAmessage}>
                                <span><FontAwesomeIcon icon="fa-solid fa-trash" /></span>
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

            if (data === "Done"){
                console.log("Updateing ")
                const activeChat = localStorage.getItem("ActiveChat")
                socket.emit("chatrooms",{id:myID,role:role})
                socket.emit("getMessageCount",{userID:myID,role:role})

                if (activeChat != null && activeChat != ''){
                    
                    socket.emit("messages",{chatroomID:activeChat,userRole:role})
                }else{
                    console.log("No Active Teacher")
                }
            }

        })

        socket.on("disconnect",()=>{
            setConnectionLostMessage(
                <div className='disconnected'>
                    <div className='DisconnectBox'>
                        <FontAwesomeIcon icon="fa-solid fa-tower-cell" />
                        <p>{pageLang['connectionLost']}</p>
                        <button onClick={refreshPage}>{pageLang['refresh']}</button>

                    </div>
                </div>   
            )
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
        if (activeChatroom !== null && activeChatroom !== '' && window.innerWidth > RedesignOnWidth){
            const elements = document.querySelectorAll(".chatroomBox")
            for(var i=0;i<elements.length;i++){
                if (elements[i].querySelector(".chatroomID").innerHTML === activeChatroom){
                    elements[i].click()
                    break
                }
            }
        }
    },[chatroomBoxes])

    // Event listener for the popstate event (browser's back button)
    window.addEventListener('popstate', (event) => {

            if (!(event.state && event.state.overlayOpen) && window.location.pathname.includes("/messages") && window.innerWidth <= RedesignOnWidth && localStorage.getItem("ActiveChat")!= null ){
                HideChatRoom();

            }

    });

    function openChatRoom(event){
        console.log(`Width ${ window.innerWidth}`)
        if (window.innerWidth <= RedesignOnWidth){
            window.history.pushState({ overlayOpen: false }, null, ''); // Push a state to the history

            // window.history.pushState(null, '', './openChat');
            console.log(window.history)
            document.querySelector(".ChatRoom").style.left = "-100%"
            document.querySelector(".CloseChatRoom").style.display = 'flex'

        }
        const activeBox =  event.currentTarget.parentElement.querySelector(".active")
        if(activeBox !== null){
            activeBox.classList.remove("active")
        }
        event.currentTarget.classList.add("active")
        const el = event.currentTarget
        const teacherID = el.querySelector(".teacherID").innerHTML
        const srRole = el.querySelector(".srRole").innerHTML
        const srID = el.querySelector(".srID").innerHTML
        const username = el.querySelector(".senderName").innerHTML
        const activeChat = el.querySelector(".chatroomID").innerHTML
        const lastUpdate = el.querySelector(".lastUpdate").innerHTML
        const userImage = el.querySelector("img").src
        const myRole = localStorage.getItem('role')
        localStorage.setItem("ActiveTeacher",teacherID)
        localStorage.setItem("ActiveChat",activeChat)
        localStorage.setItem("LatestDate",lastUpdate)
        localStorage.setItem("activeSrRole",srRole)
        localStorage.setItem("activeSrID",srID)
        setActiveUserName(username)
        setActiveImage(userImage)
        
        socket.emit("messages",{chatroomID:activeChat,userRole:myRole})
        document.querySelector(".sendMessage").style.display = 'flex'

    }

    function initializeChatroom(event){
        event.currentTarget.parentElement.style.display = "none"
        const teacherName = event.currentTarget.querySelector(".teacherName").innerHTML
        const teacherID = event.currentTarget.querySelector(".teacherID").innerHTML
        const teacherImg = event.currentTarget.querySelector("img").src

        const currentChatBoxes = document.querySelectorAll('.chatroomBox')
        for (var i =0;i<currentChatBoxes.length;i++){
            if (Number(currentChatBoxes[i].querySelector('.teacherID').innerHTML) === Number(teacherID)){
                currentChatBoxes[i].click()
                break
            }
        }

        // If the Chat Doesn't Exist in Current Chat Boxs
        if (i === currentChatBoxes.length){
            setActiveImage(teacherImg)
            setActiveUserName(teacherName)
            localStorage.setItem("ActiveChat","new")
            localStorage.setItem("ActiveTeacher",teacherID)
            document.querySelector(".sendMessage").style.display = 'flex'
            setMessages(<div className='ChatroomMainMessage'>
                            <FontAwesomeIcon icon="fa-solid fa-handshake" />
                            <p>{pageLang['chatEmptyMain']}</p>
                        </div>)
        }
        document.querySelector(".NewMessageButton").click()

        
    }


    function sendMessage(event){
        const currentParent = event.currentTarget.parentElement
        const messageText = event.currentTarget.parentElement.querySelector(".sendInput").value
        if (messageText === ''){
            return
        }

        const activelocalChatroom = localStorage.getItem("ActiveChat")
        const activeSrRole = localStorage.getItem("activeSrRole")
        const activeSrID = localStorage.getItem("activeSrID")
        if (activelocalChatroom === null){ //if There is No Active Chats
            return
        }else if(activelocalChatroom === 'new'){  // If The Chat is New
            const req = {
                teacherID:localStorage.getItem("ActiveTeacher"),
                srRole:activeSrRole,
                srID: activeSrID
            }
            setMessages([
                <div className='messageBox sent'>
                    <div className='messageInfo'>
                        <p>{messageText}</p>
                        <span className='sendDate'>Sending</span>
                        {/* <FontAwesomeIcon icon="fa-solid fa-check-double" color={data[i]['seen']?"blue":"white"}/> */}
                    </div>
                </div>
                ])
            axios.post(Global.BackendURL+"/chatroom",req).then((res)=>{
                const data =res.data
                localStorage.setItem("ActiveChat",data['newChatroom'])
                const newReq = {
                    chatroomID: data['newChatroom'],
                    sender : localStorage.getItem("role"),
                    date   : new Date(),
                    text   : messageText
                }
                socket.emit("sendMessage",newReq)
                currentParent.querySelector(".sendInput").value = ''
                console.log("Message Sent")
                
            }).catch((err)=>{
                console.log("Error!!\n",err)
            })
        }else{
            const req = {
                chatroomID: localStorage.getItem("ActiveChat"),
                sender : localStorage.getItem("role"),
                date   : new Date(),
                text   : messageText
            }
            setMessages([
                <div className='messageBox sent'>
                <div className='messageInfo'>
                    <p>{messageText}</p>
                    <span className='sendDate'>Sending</span>
                    {/* <FontAwesomeIcon icon="fa-solid fa-check-double" color={data[i]['seen']?"blue":"white"}/> */}
                </div>
            </div>
                ,...messages])
            socket.emit("sendMessage",req)
            currentParent.querySelector(".sendInput").value = ''
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

    function filterSuggestionsList(event) {
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
        if (suggestionsList === null){
            axios.get(Global.BackendURL+"/teachersList").then((res)=>{
                const data = res.data
                const preElement = []
                for (var i=0;i<data.length;i++){
                    preElement.push(
                            <div className='chatSuggestion' onClick={initializeChatroom}>
                                <img src={Global.BackendURL+"/avatar/"+data[i]['img_dir']}/>
                                <div className='column'>
                                    <p className='teacherName'>{lang === 'en' ? data[i]['name']:data[i]['arName']}</p>
                                    <span>{lang === 'en' ? data[i]['course']['name'] +" "+pageLang['teacher'] :pageLang['teacher'] +" "+ data[i]['course']['name']}</span>
                                </div>
                                <p className='teacherID hide'>{data[i]['id']}</p>
                            </div>
                    )
                }
                setSuggestionsList(preElement)
            }).catch((err)=>{
                console.log("Error!!\n",err)
            })
        }
        console.log(element.parentElement.querySelector(".newChatroomSuggestions"))
        if (element.style.transform === "rotate(-225deg)" ){
            element.style.transform = "rotate(0deg)"
            element.parentElement.querySelector("input").style.setProperty("width","40px")
            element.parentElement.querySelector(".newChatroomSuggestions").style.display = 'none'
        }else{
            element.style.transform = "rotate(-225deg)"
            element.parentElement.querySelector("input").style.setProperty("width","87%")
        
        }

    }

    function HideChatRoom(){
        document.querySelector(".ChatRoom").style.left = '100%'
        localStorage.removeItem("ActiveChat")
        localStorage.removeItem("ActiveTeacher")
        localStorage.removeItem("activeSrRole")
        localStorage.removeItem("activeSrID")
        setMessages(null)
        setActiveImage(null)
        setActiveUserName(null)
        // window.history.back()

    }

    function refreshPage(){
        window.location.reload()
    }

    function ShowDeleteButton(event){
        // console.log("N: ",(event.currentTarget.parentElement.parentElement.querySelector(".options").classListss.includes("open")))
        if (event.currentTarget.parentElement.parentElement.querySelector(".options.open") !== null){
                event.currentTarget.parentElement.parentElement.querySelector(".options").classList.remove("open")

        }else{
            if (document.querySelector(".options.open") !=null){
                document.querySelector(".options.open").classList.remove("open")
    
            }
            event.currentTarget.parentElement.parentElement.querySelector(".options").classList.add("open")
        } 

    }

    function DeleteAmessage(event){
        const messageID = event.currentTarget.parentElement.querySelector(".messageID").innerHTML
        socket.emit("deleteMessage",{messageID:messageID})
    }
    return (
    <div id='TeacherMessagesPage'>
        <TopBar title={pageLang['messages']}/>
        {connectionLost}     
        <div className='row pageContent'>
            <div className='mailBox column'>
                {emptyMailBox}
                <div className='header row'>
                    <div className='row'>
                        <h2>{pageLang['Messages']}</h2>
                        <span className='NewNumber'>{unseenCount}</span>
                    </div>
                    <div>

                    </div>
                    <div className='newChatroom'>
                        <input type={"text"} className={lang}  placeholder={pageLang['searchInNew']} onClick={(event)=>{document.querySelector(".newChatroomSuggestions").style.display = 'block'}} onChange={filterSuggestionsList}/>
                        <div className='NewMessageButton'  onClick={openSearchList}>
                            <FontAwesomeIcon icon="fa-solid fa-plus" />
                        </div>
                        <div className='newChatroomSuggestions'>
                            {suggestionsList}
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
                <div className='CloseChatRoom' onClick={HideChatRoom}>
                    <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
                </div>
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

export default TeacherMessagesPage;
