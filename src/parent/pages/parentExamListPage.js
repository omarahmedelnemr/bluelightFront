import './styles/studentWork.css'

import WorkExamsPanel from '../../student/components/workExamPanel';
import TopBar from '../../general/components/topBar';


function ParentExamListPage() {
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

export default ParentExamListPage;
