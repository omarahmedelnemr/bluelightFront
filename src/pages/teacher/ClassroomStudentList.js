import '../styles/general.css'
import './styles/ClassroomStudentList.css'
import checkAutherization from '../../general/checkAuth';
import TopBar from '../../components/topBar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Global from '../../general/globalVar';
import { useParams } from 'react-router-dom';
function ClassroomStudentList() {
    if (checkAutherization() !== 'Auth'){
        window.location.href ='/login'
    }

    var {classroomID} = useParams()
    classroomID = classroomID.replace('_','/')
    console.log("Classroom: ",classroomID)
    const lang = localStorage.getItem('lang') 
    const [loading,setLoading] = useState(<div className="loading"></div>)
    const [studentCards,setStudentCards] = useState(null)
    const pageText = {
        SchoolName:    lang === 'en' ? "Nile Egyption International Schools":"مدارس النيل الدولية",
        classrooms:    lang === 'en' ? "Classrooms":"الفصول",
        yearsOld:      lang === 'en' ? 'Years old':'سنة',
        sendMessage:   lang === 'en' ? "Send a Message":"أرسل رسالة",
        contactParent: lang === 'en' ? "Contact the Parents" : "تواصل مع ولي الامر",
        kg:            lang === 'en' ? "KG":"حضانة",
        E:             lang === 'en' ? "Elementary":"ابتدائي",
        P:             lang === 'en' ? "Preparatory":"اعدادي",
        S:             lang === 'en' ? "Secondary":"ثانوي",
        male:          lang === "en" ? "Male":"ذكر",
        female:        lang === "en" ? "Female":"أنثي"

    }

    useEffect(()=>{
        axios.get(Global.BackendURL+"/teacher/studentslist?classroomID="+classroomID).then((res)=>{
            const data = res.data
            console.log(data)
            const cards = []
            for(var i =0;i<data.length;i++){
                cards.push(
                    <div className='studentInfoCard row'>
                        <div className='LeftStudentInfo row'>
                            
                            <img src={Global.BackendURL+"/profilepic/"+data[i]['img_dir']}  alt='Profile Picture'/>
                            
                            <div className='column textInfo'>
                                <p className='studentName'>{lang === 'en' ? data[i]['name']: data[i]['arName']}</p>
                                <span>{data[i]['age'] + " "+ pageText["yearsOld"]} - {pageText[data[i]['gender']]}</span>
                            </div>
                        </div>
                        <div className='RightStudentInfo'>
                            <a href={'/teacher/sendMessage?sendTo=student&id='+data[i]['id']}>{pageText["sendMessage"]}</a>
                            <a href={'/teacher/sendMessage?sendTo=parent&id='+data[i]['id']}>{pageText['contactParent']}</a>
                        </div>
                    </div>
                )
            }
            setStudentCards(cards)
            setLoading(null)
        }).catch((err)=>{
            console.log("Internal Error!")
            console.log(err)
        })
    },[1000])

    function searchForStudent(event){
        const allCards = document.getElementsByClassName('studentInfoCard')
        const searchVal = event.target.value
        for(var i =0;i<allCards.length;i++){
            if ( ( (allCards[i].querySelector(".studentName").innerHTML).toLowerCase() ).includes(searchVal.toLowerCase()) ){
                allCards[i].style.display ='flex'
            }else{
                allCards[i].style.display ='none'

            }
        }
    }
    return (
        <div className="ClassroomStudentList column fullWidth">
            {loading}
            <TopBar title={pageText['classrooms']+": "+(classroomID[0] === 'k'? (classroomID.slice(2)+pageText['kg']):(classroomID.slice(1)+pageText[classroomID[0]]))}/>
            <div className='searchBar'>
                <input type='text' placeholder='Find a Student With the Name' onChange={searchForStudent}/>
            </div>
            <div className='studentListContainer column'>
                {studentCards} 
            </div>
        </div>
    );
}

export default ClassroomStudentList;
