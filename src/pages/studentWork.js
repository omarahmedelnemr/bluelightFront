import './styles/studentWork.css'

import WorkExamsPanel from '../components/workExamPanel';
import TopBar from '../components/topBar';


function StudentWorkPage({type}) {
  return (
    <div className='assignments'>
    <TopBar title={type}/>
      <WorkExamsPanel type={type} limit ={false}/>
    </div>
  );
}

export default StudentWorkPage;
