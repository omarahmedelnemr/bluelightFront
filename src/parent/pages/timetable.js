import './styles/studentWork.css'

import TopBar from '../../general/components/topBar';


function ParentTimeTablePage() {
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

export default ParentTimeTablePage;
