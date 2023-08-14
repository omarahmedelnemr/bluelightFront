import './styles/studentWork.css'

import WorkExamsPanel from '../../components/student/workExamPanel';
import TopBar from '../../components/topBar';


function TimeTablePage() {
  const lang = localStorage.getItem('lang')
  const pageLang = {
    timetable : lang === 'en' ? "Time Table":"جدول الحصص"
  }
  return (
    <div className='assignments'>
      <TopBar title={pageLang['timetable']}/>
        <h1>Still Developing</h1>
    </div>
  );
}

export default TimeTablePage;
