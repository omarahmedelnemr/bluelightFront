import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SideNavigation from "../../general/components/SideNav";
import SideNavigationButton from "../../general/components/SideNavButton";

function StudentSideNavigation() {
    const navList = ['home',"courses","messages","assignments","exams","account", "settings", "timetable"] //,"bus"
    const lang = localStorage.getItem('lang') 
    const compText = {
        home:        lang === 'en' ? "Home":"الرئيسية",
        courses:     lang === 'en' ? "Courses":"المقررات",
        assingments: lang === 'en' ? "Assignments" : "الواجبات" ,
        exams:       lang === 'en' ? "Exams" :"الاختبارات",
        Events:      lang === 'en' ? "Events":"المناسبات",
        messages:    lang === 'en' ? "Messages":"الرسائل",
        bus:         lang === 'en' ? "Bus":"الباص",
        account:     lang === 'en' ? "Account":"حسابي",
        settings:    lang === 'en' ? "Settings":"الاعدادات",
        timetable:   lang === 'en' ? "TimeTable":"جدول الحصص" 
        
    }

    return (
        <SideNavigation navList={navList}>
            <SideNavigationButton route={""} text={compText["home"]} icon={<FontAwesomeIcon icon="fa-solid fa-house" />} active={true}/>
            <SideNavigationButton route={"courses"} text={compText["courses"]} icon={<FontAwesomeIcon icon="fa-solid fa-book" />}/>
            <SideNavigationButton route={"assignments"} text={compText["assingments"]} icon={<FontAwesomeIcon icon="fa-solid fa-book-open" />}/>
            <SideNavigationButton route={"exams"} text={compText["exams"]} icon={<FontAwesomeIcon icon="fa-solid fa-file-lines" />}/>
            <SideNavigationButton route={"messages"} text={compText["messages"]} icon={<FontAwesomeIcon icon="fa-solid fa-message" />}/>
            <SideNavigationButton route={"timetable"} text={compText["timetable"]} icon={<FontAwesomeIcon icon="fa-solid fa-calendar" />}/>
            <SideNavigationButton route={"account"} text={compText["account"]} icon={<FontAwesomeIcon icon="fa-solid fa-user" />}/>
            <SideNavigationButton route={"settings"} text={compText["settings"]} icon={<FontAwesomeIcon icon="fa-solid fa-gear" />}/>                    
        </SideNavigation>

    );
}

export default StudentSideNavigation;
