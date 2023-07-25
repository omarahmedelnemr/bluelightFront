import './styles/studentWork.css'

import WorkExamsPanel from '../../components/student/workExamPanel';
import TopBar from '../../components/student/topBar';


function StudentHomeworkPage() {
  const lang = localStorage.getItem('lang')
  const pageLang = {
    Assignments : lang === 'en' ? "Assignments":"الواجبات"
  }
  return (
    <div className='assignments'>
      <TopBar title={pageLang['Assignments']}/>
      <WorkExamsPanel type={'Assignments'} limit ={false}/>
    </div>
  );
}

export default StudentHomeworkPage;
