import './styles/studentWork.css'

import WorkExamsPanel from '../components/workExamPanel';
import TopBar from '../components/topBar';


function StudentWorkPage({type}) {
  const lang = localStorage.getItem('lang')
  const pageLang = {
    Assignments : lang === 'en' ? "Assignments":"الواجبات",
    Exams:        lang === "en" ? "Exams":"الاختبارات"
  }
  return (
    <div className='assignments'>
    <TopBar title={pageLang[type]}/>
      <WorkExamsPanel type={type} limit ={false}/>
    </div>
  );
}

export default StudentWorkPage;
