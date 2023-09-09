import TopBar from '../../general/components/topBar';
import './styles/general.css'
import './styles/events.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function EventsPage() {
    const lang = localStorage.getItem('lang')
    const pageLang = {
        events:    lang === 'en' ? "Events":"الفعاليات"
    }
    function openClose(event){
        if (event.currentTarget.parentElement.querySelector(".eventBody").classList.contains("active")){
            document.querySelector(".active").classList.remove("active")
        }else{
            try{
                document.querySelector(".active").classList.remove("active")
            }catch{
                console.log("no Active Event")
            }
            event.currentTarget.parentElement.querySelector(".eventBody").classList.add("active")
        }

    }
    return (
    <div id='EventsPage'>
        <TopBar title={pageLang['events']}/>
        <div className='eventsList column'>
            <div className='event column'>
                <div className='eventHeader row' onClick={openClose}>
                    <div className='eventHeaderInfo'>
                        <h2>Welcome</h2>
                        <span>aug 12/12</span>
                    </div>
                    <div className='arrow'>
                        <FontAwesomeIcon icon="fa-solid fa-angle-down" />
                    </div>
                </div>
                <div className='eventBody'>

                </div>
            </div>
            <div className='event column'>
                <div className='eventHeader row' onClick={openClose}>
                    <div className='eventHeaderInfo'>
                        <h2>Welcome</h2>
                        <span>aug 12/12</span>
                    </div>
                    <div className='arrow'>
                        <FontAwesomeIcon icon="fa-solid fa-angle-down" />
                    </div>
                </div>
                <div className='eventBody'>
                    <div className='eventBodyConetnt'>
                        <h1>Hello</h1>
                        <span>aug 12/12</span>
                        <hr/>
                        <p>i would like to say i would like to say i would like to say i would like to say i would like to say </p>
                    </div>
                </div>
            </div>
            <div className='event column'>
                <div className='eventHeader row' onClick={openClose}>
                    <div className='eventHeaderInfo'>
                        <h2>Welcome</h2>
                        <span>aug 12/12</span>
                    </div>
                    <div className='arrow'>
                        <FontAwesomeIcon icon="fa-solid fa-angle-down" />
                    </div>
                </div>
                <div className='eventBody'>

                </div>
            </div>
            <div className='event column'>
                <div className='eventHeader row' onClick={openClose}>
                    <div className='eventHeaderInfo'>
                        <h2>Welcome</h2>
                        <span>aug 12/12</span>
                    </div>
                    <div className='arrow'>
                        <FontAwesomeIcon icon="fa-solid fa-angle-down" />
                    </div>
                </div>
                <div className='eventBody'>

                </div>
            </div>
        </div>
    </div>
    );
}

export default EventsPage;
