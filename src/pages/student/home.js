import './styles/Homepage.css'
import '../styles/general.css'
import TopBar from '../../components/student/topBar';
import WorkExamsPanel from '../../components/student/workExamPanel';
import checkAutherization from '../../general/checkAuth';
import StatusBoxes from '../../components/student/statusBoxes';
function Homepage() {
    if (checkAutherization() !== 'Auth'){
        window.location.href ='/login'
    }
    const lang = localStorage.getItem('lang') 
    const pageText = {
        nileSchools: lang === 'en' ? "Nile Egyption International Schools":"مدارس النيل الدولية",
        overview:{
            "en":"overview",
            "ar":"نظرة عامة"
        },
        last30:{
            "en":"last 30 Days",
            "ar":"خلال 30 يوم"
        },

    }
    return (
        <div className="Homepage column fullWidth">
            <TopBar title={pageText["nileSchools"]}/>

            <div className='row overviewTitle'>
                <h2>{pageText['overview'][lang]}</h2>
                {/* <DropDownList mainText={pageText["last30"][lang]}/> */}
            </div>  
            {/* <div className='row statusBoxes'> */}
                 {/* <div className='row'>
                    <ContentBox1 icon = {<FontAwesomeIcon icon="fas fa-book" />} iconColor = {"#d798eb"} title = {"Assignments"} commentNum={2} comment={"late Submission"} spanColor={"red"} actualNum = {15} totalNum={30}/>
                    <ContentBox1 icon = {<FontAwesomeIcon icon="fas fa-edit" />} iconColor = {"#ee9981 "} title = {"Exams"} commentNum={null} comment={"No Late Exams"} spanColor={"red"} actualNum = {4} totalNum={4}/>  
                </div>
                <div className='row'>
                    <ContentBox1 icon = {<FontAwesomeIcon icon="fas fa-calendar-check" />} iconColor = {"#67a5e7 "} title = {"Attendance"} commentNum={90} comment={"Attendance Rate"} spanColor={"green"} actualNum = {45} totalNum={50}/>
                    <ContentBox1 icon = {<FontAwesomeIcon icon="fas fa-envelope" />} iconColor = {"#f4c075"} title = {"Messages"} commentNum={1} comment={"unSeen Messages"} spanColor={"green"} actualNum = {15} totalNum={30}/>
                    <ContentBox1 icon = {<FontAwesomeIcon icon="fas fa-envelope" />} iconColor = {"#a675f4"} title = {"Events"} commentNum={1} comment={"Event You Didn't See"} spanColor={"red"} actualNum = {2} totalNum={3} className={"hideInSmall"} />
                </div>    */}
                <StatusBoxes />
            {/* </div>      */}
            <div className='row dataColumns'>
                <div className='column workToSubmit'>
                    <WorkExamsPanel type={"Assignments"} limit={true}/>
                    <div className='test'>

                    </div>  
                </div>
                <div className='column analytics'>
                    
                    <WorkExamsPanel type={"Exams"} limit={true}/>

                    <div className='test'>

                    </div>
                </div>
            </div> 
        </div>
    );
}

export default Homepage;
