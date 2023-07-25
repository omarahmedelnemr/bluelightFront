import './styles/studentWork.css'

import WorkExamsPanel from '../../components/student/workExamPanel';
import TopBar from '../../components/topBar';


function StudentExamPage() {
  const lang = localStorage.getItem('lang')
  const pageLang = {
    Exams:        lang === "en" ? "Exams":"الاختبارات"
  }
  return (
    <div className='assignments'>
      <TopBar title={pageLang['Exams']}/>
      <WorkExamsPanel type={'Exams'} limit ={false}/>
    </div>
  );
}

export default StudentExamPage;
