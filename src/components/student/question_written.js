import { useState } from 'react';
import Global from '../../general/globalVar';
import './styles/QuestionGeneral.css'
import './styles/Written.css'

function Question_Written({questionInfo,answered,mode,graded = null}) {
    const [bigPreview,setBigPreview] = useState(null)

    const lang = localStorage.getItem("lang")
    const compLang = {
        yourAnswer: lang === 'en' ? "Your Answer":"اجابتك هنا"
    }

    // Show a Preview of attachment With Type Image
    function showBigImage(event){
        var element = event.currentTarget
        console.log(element.nodeName)
        if (element.nodeName === 'DIV'){
            element = element.querySelector("embed")
        }
        setBigPreview(
        <div className='bigImage'>
            <div className='grayBackground' onClick={(event)=>{setBigPreview(null)}}></div>
            <img src={element.src}/>
        </div>
        )
    }

    var uniqueLocalID =mode+questionInfo['id']+"Q"+questionInfo['QNumber']
    function saveToLocalStorage(event){
        localStorage.setItem(uniqueLocalID,event.currentTarget.value)
        
    }
    // Display Attachment That in The Question Description
    const questionAttachmentsPreview =[]
    var attachSrc;
    for(var i=0;i<questionInfo['attachments'].length;i++){
        attachSrc = questionInfo['attachments'][i]['attachmentDir']
        if (attachSrc.split('.')[1] ==='pdf'){
            questionAttachmentsPreview.push(
                <div className='attachmentPreview'>
                        <a href={Global.BackendURL+"/file/"+attachSrc} target="_blank"> <embed src={Global.BackendURL+"/file/"+attachSrc} className='embedMiniPreview'></embed></a>
                    </div>
            )
        }else{
            questionAttachmentsPreview.push(
                <div className='attachmentPreview'>
                        <img src={Global.BackendURL+"/file/"+attachSrc} onClick={showBigImage}/>
                    </div>
            )
        }
    
    }

    return (
        <div className='written question'>
            {bigPreview}
            <div className='row'>
                <p className='questionText'>{questionInfo['QNumber']}) {questionInfo['questionText']} </p>
                {graded && questionInfo['yourGrade'] > 0 ?<span className='plus'>&nbsp;&nbsp; +{questionInfo['yourGrade']}</span>:''}
            </div>
            
            <div className='preview'>
                {questionAttachmentsPreview}
            </div>
            <p className='hide questionID'>{questionInfo['id']}</p>
            {answered?
                <textarea className='textAnswer' placeholder={compLang['yourAnswer']} disabled value={questionInfo['Studentanswer']}></textarea>
                :
                <textarea className='textAnswer' placeholder={compLang['yourAnswer']} onChange={saveToLocalStorage} defaultValue={localStorage.getItem(uniqueLocalID)}></textarea>
                }
        </div>
  );
}

export default Question_Written;
