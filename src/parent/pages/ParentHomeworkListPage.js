import './styles/studentWork.css'

import WorkExamsPanel from '../components/workExamPanel';
import TopBar from '../../general/components/topBar';


function ParentHomeworkListPage() {
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

export default ParentHomeworkListPage;
