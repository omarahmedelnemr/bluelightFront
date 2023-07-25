import './styles/Homepage.css'
import '../styles/general.css'
import TopBar from '../../components/topBar';
import WorkExamsPanel from '../../components/student/workExamPanel';
import checkAutherization from '../../general/checkAuth';
import StatusBoxes from '../../components/student/statusBoxes';
function Homepage() {
    if (checkAutherization() !== 'Auth'){
        window.location.href ='/login'
    }
    const lang = localStorage.getItem('lang') 
    const pageText = {
        SchoolName: lang === 'en' ? "Nile Egyption International Schools":"مدارس النيل الدولية",
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
            <TopBar title={pageText["SchoolName"]}/>

            <div className='row overviewTitle'>
                <h2>{pageText['overview'][lang]}</h2>
                {/* <DropDownList mainText={pageText["last30"][lang]}/> */}
            </div>  
            <StatusBoxes />
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
