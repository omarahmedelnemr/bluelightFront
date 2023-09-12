import '../../general/pages/styles/general.css'
import './styles/classrooms.css'
import TopBar from '../../general/components/topBar';
import { useEffect, useState } from 'react';
import axios from '../../publicFunctions/axiosAuth';
import Global from '../../publicFunctions/globalVar';
function ClassroomsPage() {

    const lang = localStorage.getItem('lang') 
    const pageText = {
        SchoolName: lang === 'en' ? "Nile Egyption International Schools":"مدارس النيل الدولية",
        classrooms: lang === 'en' ? "Classrooms":"الفصول",
        kg:         lang === 'en' ? "KG":"حضانة",
        E:          lang === 'en' ? "Elementary":"ابتدائي",
        P:          lang === 'en' ? "Preparatory":"اعدادي",
        S:          lang === 'en' ? "Secondary":"ثانوي"

    }
    const [classes,setClasses] = useState(null)
    const [navButtons,setNavButtons] = useState(null)
    const [loading,setLoading] = useState(<div className="loading"></div>)
    useEffect(()=>{
        axios.get(Global.BackendURL+"/teacher/classrooms?teacherID="+localStorage.getItem('id')).then((res)=>{
            const data = res.data
            setLoading(null)
            var inClass = []
            const generalDivs = []
            const subjects = Object.keys(data)
            const buttons = []
            var levelName;
            for(var i=0;i < subjects.length;i++){
                for(var x=0;x<data[subjects[i]].length;x++){
                    levelName=data[subjects[i]][x]['id'][0] ==='k' ? 'kg':data[subjects[i]][x]['id'][0]
                    inClass.push(<a href={'./classrooms/'+data[subjects[i]][x]['id'].replace('/','_')}><div className='classroomBox'><p> {data[subjects[i]][x]['name']} {pageText[levelName]}</p></div></a>)
                }
                if (generalDivs.length ===0){
                    generalDivs.push(<div className={'SubjectBoxes boxShow'} id = {'teacherClassroomSubjectBox'+i}>
                                            {inClass}
                                        </div>)
                }else{
                    generalDivs.push(<div className={'SubjectBoxes'} id = {'teacherClassroomSubjectBox'+i}>
                                        {inClass}
                                    </div>) 
                }
                inClass = []
                buttons.length === 0 ?
                buttons.push(<button className='activeSide' onClick={switchSubNavButtons}><span style={{display:'none'}}>{"teacherClassroomSubjectBox"+ i}</span>{subjects[i]}</button>)
                :buttons.push(<button onClick={switchSubNavButtons}><span style={{display:'none'}}>{"teacherClassroomSubjectBox"+ i}</span>{subjects[i]}</button>)
            }
            setClasses(generalDivs)
            setNavButtons(buttons)
            console.log("General: ",generalDivs)
            console.log(data)

        }).catch((err)=>{
            console.log("Internal Error!")
            console.log(err)
        })
    },1000)
  function switchSubNavButtons(event){
    const parent = event.currentTarget.parentElement
    parent.querySelector('.activeSide').classList.remove('activeSide')
    event.currentTarget.classList.add('activeSide')

    parent.parentElement.querySelector('.boxShow').classList.remove('boxShow')
    console.log(event.currentTarget.querySelector('span'))
    document.getElementById(event.currentTarget.querySelector('span').innerHTML).classList.add('boxShow')

  }
    return (
        <div className="classroomsPage column fullWidth">
   {loading}

            <TopBar title={pageText["classrooms"]}/>
            <div className='subNavButtons'>
                {/* <button onClick={switchSubNavButtons}>fav</button> */}
                {navButtons}
            </div>
            <div className='row classroomsContainer'>
                {classes}
            </div>
        </div>
    );
}

export default ClassroomsPage;
