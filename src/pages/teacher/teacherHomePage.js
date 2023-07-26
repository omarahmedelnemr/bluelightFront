import '../styles/general.css'
import checkAutherization from '../../general/checkAuth';
import TopBar from '../../components/topBar';
function TeacherHomepage() {
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
            <h1>Still Developing </h1>
        </div>
    );
}

export default TeacherHomepage;
