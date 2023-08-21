import './styles/studentWork.css'

import WorkExamsPanel from '../components/workExamPanel';
import TopBar from '../../general/components/topBar';


function ParentHomeworkListPage() {
  const lang = localStorage.getItem('lang')
  const pageLang = {
    Assignments : lang === 'en' ? "Assignments":"الواجبات",
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
      <TopBar title={pageLang['Assignments']}/>
      <div className='subNavButtons'>
                <button onClick={switchWork} className='activeSide'>{pageLang['NotSubmitted']}</button>
                <button onClick={switchWork}>{pageLang['submitted']}</button>
                {/* <button onClick={switchWork}>{pageLang['announce']}</button> */}
      </div>
      <div className='todo'>
        <WorkExamsPanel type={'Assignments'} limit ={false}/>  
      </div> 
      <div className='NotTodo'>
        <WorkExamsPanel type={'Assignments'} limit ={false} submitted={true}/>  
      </div>
    </div>
  );
}

export default ParentHomeworkListPage;
