import './styles/Homepage.css'
import './styles/general.css'
import TopBar from '../components/topBar';
import DropDownList from '../components/dropDownList';
import ContentBox1 from '../components/ContentBox1';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import WorkExamsPanel from '../components/workExamPanel';
import checkAutherization from '../checkAuth';
function Homepage() {
    if (checkAutherization() !== 'Auth'){
        window.location.href ='/login'
    }
    return (
        <div className="Homepage column fullWidth">
            <TopBar title={"Nile Egyption International Schools"}/>

            <div className='row overviewTitle'>
                <h2>overview</h2>
                <DropDownList mainText={"last 30 Days"}/>
            </div>  
            <div className='row statusBoxes'>
                <div className='row'>
                <ContentBox1 icon = {<FontAwesomeIcon icon="fas fa-book" />} iconColor = {"#d798eb"} title = {"Assignment"} commentNum={2} comment={"late Submission"} spanColor={"red"} actualNum = {15} totalNum={30}/>
                <ContentBox1 icon = {<FontAwesomeIcon icon="fas fa-edit" />} iconColor = {"#ee9981 "} title = {"Exams"} commentNum={2} comment={"late Submission"} spanColor={"red"} actualNum = {15} totalNum={30}/>
                
                </div>
                <div className='row'>
                <ContentBox1 icon = {<FontAwesomeIcon icon="fas fa-calendar-check" />} iconColor = {"#67a5e7 "} title = {"Attendance"} commentNum={2} comment={"late Submission"} spanColor={"red"} actualNum = {15} totalNum={30}/>
                <ContentBox1 icon = {<FontAwesomeIcon icon="fas fa-envelope" />} iconColor = {"#f4c075"} title = {"Messages"} commentNum={2} comment={"late Submission"} spanColor={"red"} actualNum = {15} totalNum={30}/>
                <ContentBox1 icon = {<FontAwesomeIcon icon="fas fa-envelope" />} iconColor = {"#a675f4"} title = {"Events"} commentNum={1} comment={"Event You Didn't See"} spanColor={"red"} actualNum = {2} totalNum={3} className={"hideInSmall"} />
            
                </div>
        </div>     
            <div className='row dataColumns'>
                <div className='column workToSubmit'>
                    <WorkExamsPanel type={"Assignments"}/>
                    <WorkExamsPanel type={"Exams"}/>
                </div>
                <div className='column analytics'>
                    <div className='test'>

                    </div>
                    <div className='test'>

                    </div>
                </div>
            </div> 
        </div>
    );
}

export default Homepage;
