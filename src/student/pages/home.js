import './styles/Homepage.css'
import '../../general/pages/styles/general.css'
import TopBar from '../../general/components/topBar';
import WorkExamsPanel from '../../student/components/workExamPanel';
import checkAutherization from '../../publicFunctions/checkAuth';
import StatusBoxes from '../../student/components/statusBoxes';
function Homepage() {
    // if (checkAutherization() !== 'Auth'){
    //     window.location.href ='/login'
    // }
    const lang = localStorage.getItem('lang') 
    const pageText = {
        SchoolName: lang === 'en' ? "Bluelight Schools":"مدارس بلو لايت الدولية",
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
