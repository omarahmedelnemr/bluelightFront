import './styles/account.css'
import './styles/general.css'
import checkAutherization from '../general/checkAuth';
import Global from '../general/globalVar';
import TopBar from '../components/topBar';
function Account() {
    if (checkAutherization() !== 'Auth'){
        window.location.href ='/login'
    }
    const lang = localStorage.getItem('lang') 
    const profileImage = Global.BackendURL+localStorage.getItem("img_dir") 
    const pageText = {
        account:       lang === "en" ? "Account" : "حسابي",
        changeMessage: lang === 'en' ? "If any Data Needs To Be Changed, Please Contact your Teacher":"لو احتجت لتغيير اي بيانات, بالرجاء التواصل مع الاستاذ المشرف الاجتماعي",
        name:          lang === "en" ? "English Name": "الاسم بالانجليزية",
        arabicName:    lang === "en" ? "Arabic Name" : "الاسم بالعربية",
        classroom:     lang === "en" ? "Classroom" : "الفصل",
        role:          lang === "en" ? "Role" : "الوصف"
    }
    return (
        <div className="Account column fullWidth">
            <TopBar title={pageText["account"]}/>
            <div className='content column'>

                <div className='ProfileImage'>
                    <img src={profileImage}/>
                </div>
                <div className='personalInfo column'>
                    <div className='row'>
                        <p>{pageText['name']}</p>
                        <p>{localStorage.getItem('name')}</p>
                    </div>
                    <div className='row'>
                        <p>{pageText["arabicName"]}</p>
                        <p>{localStorage.getItem('arname')}</p>
                    </div>
                    <div className='row'>
                        <p>{pageText["classroom"]}</p>
                        <p>{localStorage.getItem('classroom')}</p>
                    </div>
                    <div className='row'>
                        <p>{pageText['role']}</p>
                        <p>{localStorage.getItem('role')}</p>
                    </div>
                </div> 
                <div className='changeDataMessage'>
                    <p>{pageText['changeMessage']}</p>
                </div>
            </div>
        
        </div>
    );
}

export default Account;
