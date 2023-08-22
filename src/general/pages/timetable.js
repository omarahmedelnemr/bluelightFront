
import { useEffect, useState } from 'react';
import TopBar from '../components/topBar';

import './styles/timetable.css'
import axios from 'axios';
import Global from '../../publicFunctions/globalVar';
function TimeTablePage() {
  const lang = localStorage.getItem('lang')
  const pageLang = {
    timetable : lang === 'en' ? "Time Table":"جدول الحصص"
  }

    var classroomID;
    if(localStorage.getItem("role") === 'student'){
        classroomID = localStorage.getItem("classroom")
    }else if (localStorage.getItem("role") === 'parent'){
        classroomID = localStorage.getItem("currentStudentClassroom")
        
    }
    const days = ["Sunday","Monday","Tuesday","Wednesday","Friday"]
    const [tableHeaders,setHeaders] = useState(null)
    const [tableElements,setTableElements] = useState(null)
    useEffect(()=>{
        axios.get(Global.BackendURL+"/timetable?classroomID="+classroomID).then((res)=>{
            const data = res.data
            const tableDays = Object.keys(data)
            const headers = Object.keys(data[tableDays[0]])
            const preHeadsElement =[]
            for(var i=0;i<headers.length;i++){
                preHeadsElement.push(
                    <th>{headers[i]}</th>
                )

            }
            var preTableCell = []
            const preTableRow = []
            for (var i=0;i<tableDays.length;i++){
                preTableCell.push(<td className='dayCell'>{tableDays[i]}</td>)
                for (var x = 0;x<headers.length;x++){
                    const teacherName = (lang === 'en' ? data[tableDays[i]][headers[x]]['teacher'] : data[tableDays[i]][headers[x]]['arTeacher']).split(" ").slice(0,2).join(" ")
                    preTableCell.push(
                        <td><div>{data[tableDays[i]][headers[x]]['course']} <span>{ teacherName}</span></div></td>

                    )
                }
                preTableRow.push(
                    <tr>
                        {preTableCell}
                    </tr>
                )
                preTableCell = []

            }
            setHeaders(preHeadsElement)
            setTableElements(preTableRow)

            console.log(data)
        }).catch((err)=>{
            console.log("Error!\n",err)
        })
    },[1000])
    return (
        <div id="TimeTablePage" className='column'>
            <TopBar title={pageLang['timetable']}/>
            <div className='tableContainer'>
                <table className='mainTable'>
                    <thead>
                        <tr>
                            <th>Day</th>
                            {tableHeaders}
                        </tr>
                    </thead>
                    <tbody>
                        {tableElements}
                    </tbody>

                </table>
            </div>

        </div>
    );
}

export default TimeTablePage;
