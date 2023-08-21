import './styles/studentWork.css'

import WorkExamsPanel from '../components/workExamPanel';
import TopBar from '../../general/components/topBar';


function ParentExamListPage() {
  const lang = localStorage.getItem('lang')
  const pageLang = {
    Exams:        lang === "en" ? "Exams":"الاختبارات",
    NotSubmitted: lang === 'en' ? "Not Submitted Yet":"لم تسلم بعد",
    submitted:    lang === 'en' ? "Submitted":"تم تسليمها"
  }
  function switchWork(event){

    //Toggle The Active Features
    const parentClass = event.currentTarget.parentElement
    parentClass.querySelector('.activeSide').classList.remove('activeSide')
    event.currentTarget.classList.add('activeSide')

    //Show the Selected Section
    if (event.currentTarget.textContent == pageLang['NotSubmitted']){
        document.getElementsByClassName('NotTodo')[0].style.display = 'none'
        document.getElementsByClassName('todo')[0].style.display = 'block'

    }else if(event.currentTarget.textContent == pageLang['submitted']){
        document.getElementsByClassName('NotTodo')[0].style.display = 'block'
        document.getElementsByClassName('todo')[0].style.display = 'none'
      }
    }
  return (
    <div className='assignments'>
      <TopBar title={pageLang['Exams']}/>
      {/* <WorkExamsPanel type={'Exams'} limit ={false}/> */}
      <div className='subNavButtons'>
                <button onClick={switchWork} className='activeSide'>{pageLang['NotSubmitted']}</button>
                <button onClick={switchWork}>{pageLang['submitted']}</button>
                {/* <button onClick={switchWork}>{pageLang['announce']}</button> */}
      </div>
      <div className='todo'>
        <WorkExamsPanel type={'Exams'} limit ={false}/>  
      </div> 
      <div className='NotTodo'>
        <WorkExamsPanel type={'Exams'} limit ={false} submitted={true}/>  
      </div>
    </div>
  );
}

export default ParentExamListPage;
