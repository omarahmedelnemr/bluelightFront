import './styles/account.css'
import './styles/general.css'
import checkAutherization from '../../publicFunctions/checkAuth';
import Global from '../../publicFunctions/globalVar';
import TopBar from '../components/topBar';
function Account() {
    if (checkAutherization() !== 'Auth'){
        window.location.href ='/login'
    }
    const lang = localStorage.getItem('lang') 
    const profileImage = Global.BackendURL+"/avatar/"+localStorage.getItem("img_dir") 
    const pageText = {
        account:       lang === "en" ? "Account" : "حسابي",
        changeMessage: lang === 'en' ? "If any other Data Needs To Be Changed, Please Contact Us":"لو احتجت لتغيير اي بيانات, بالرجاء التواصل معنا ",
        name:          lang === "en" ? "English Name": "الاسم بالانجليزية",
        arabicName:    lang === "en" ? "Arabic Name" : "الاسم بالعربية",
        classroom:     lang === "en" ? "Classroom" : "الفصل",
        role:          lang === "en" ? "Role" : "الوصف",
        age:           lang === "en" ? "Age" :"العمر",
        gender:        lang === "en" ? "Gender":"الجنس",
        male:          lang === "en" ? "Male":"ذكر",
        female:        lang === "en" ? "Female":"أنثي",
        changeImg:     lang === 'en' ? "Change Image":"تغيير الصورة",
    }
    return (
        <div className="Account column fullWidth">
            <TopBar title={pageText["account"]}/>
            <div className='content column'>

                <div className='ProfileImage'>
                    <div className='imgContainer'>
                        <a href="./changeAvatar">
                            <img src={profileImage}/>
                            <div className='ChangePicCover'>
                                <p>{pageText['changeImg']}</p>
                            </div>
                        </a>
                    </div>

                </div>
                <div className='personalInfo column'>
                    <div className='row'>
                        <p>{pageText['name']}</p>
                        <p>{localStorage.getItem('name')}</p>
                    </div>
                    <div className='row'>
                        <p>{pageText["arabicName"]}</p>
                        <p>{localStorage.getItem('arName')}</p>
                    </div>
                    <div className='row'>
                        <p>{pageText["age"]}</p>
                        <p>{localStorage.getItem('age')}</p>
                    </div>
                    <div className='row'>
                        <p>{pageText["gender"]}</p>
                        <p>{pageText[localStorage.getItem('gender')]}</p>
                    </div>
                    {localStorage.getItem('role') =='student'?
                    <div className='row'>
                        <p>{pageText["classroom"]}</p>
                        <p>{localStorage.getItem('classroom')}</p>
                    </div>
                    :""}
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
