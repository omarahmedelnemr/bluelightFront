import './styles/QuestionGeneral.css'
import './styles/MCQ.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import Global from '../../publicFunctions/globalVar';
function Question_MCQ({questionInfo,answered,mode,graded=null}) {
    var uniqueLocalID =mode+questionInfo['id']+"Q"+questionInfo['QNumber']
    const options =[]
    var questionGrades = null;
    if (questionInfo['yourGrade'] >0 && graded){
        questionGrades = <span className='plus'>&nbsp;&nbsp; +{questionInfo['yourGrade']}</span>
    }

    // Show a Preview of Question attachment With Type Image
    const [bigPreview,setBigPreview] = useState(null)
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


    for(var i=0;i<questionInfo['options'].length;i++){
        if (answered){
            if (graded ===null || graded === false){
                options.push(
                    <div className={'option disabled'+  (questionInfo['options'][i]["Studentanswer"]? " selected":'')}>
                        <div className='checkBox'></div>
                        <p className='hide optionID'>{questionInfo['options'][i]['id']}</p>
                        <p className='optionText'>{questionInfo['options'][i]['text']}</p>
                    </div>
                )
            }else{
                var correct; 
                if (questionInfo['options'][i]["Studentanswer"] ===true){
                    if (questionInfo['options'][i]["isRight"] === true){
                        correct = " correct"
                        console.log(questionInfo[i])
                        // setQuestionGrades(<span className='plus'>&nbsp;&nbsp; +5</span>)
                    }else{
                        correct = " wrong"

                    }
                }else{
                    if (questionInfo['options'][i]["isRight"] === true){
                        if (questionInfo['type'] === 'mmcq'){
                            correct = " missing"
                        }else{
                            correct = " Right_Answer"
                        }
                    }else{
                        correct = ""

                    }  
                }
                
                options.push(
                    <div className={'option disabled'+  (questionInfo['options'][i]["Studentanswer"]? " selected":'')+correct}>
                        <div className='checkBox'>
                            <FontAwesomeIcon icon="fa-solid fa-check" className='correctMark'/>
                            <FontAwesomeIcon icon="fa-solid fa-xmark"  className='wrongMark'/>
                        </div>
                        <p className='hide optionID'>{questionInfo['options'][i]['id']}</p>
                        <p className='optionText'>{questionInfo['options'][i]['text'] +"  "+correct.replace("_"," ")}</p>
                    </div>
                )
            }
        }else{
            var selectedLocal = localStorage.getItem(uniqueLocalID)
            if (selectedLocal !== null){
                selectedLocal = selectedLocal.split(",")
                selectedLocal =  selectedLocal.includes(String(questionInfo['options'][i]['id'])) ? " selected":""

            }else{
                selectedLocal = ''
            }
            options.push(
                <div className={'option disabled'+selectedLocal}>
                    <div className='checkBox'>
                    </div>
                    <p className='hide optionID'>{questionInfo['options'][i]['id']}</p>
                    <p className='optionText'>{questionInfo['options'][i]['text']}</p>
                </div>
            )
        }
    }


    
  return (
    <div className={questionInfo['type']+' question enabled mcq'}>
        {bigPreview}
        <div className='row'>
            <p className='questionText'>{mode === 'homework'? questionInfo['QNumber']+")":"" } {questionInfo['questionText']} </p>
            <p className='isRequired'>&nbsp;{questionInfo['isRequired']?"*":""}</p>
            {questionGrades}
        </div>
        <div className='preview'>
            {questionAttachmentsPreview}
        </div>
        <p className='hide questionID'>{questionInfo['id']}</p>
        <p className='hide questionNumber'>{questionInfo['QNumber']}</p>
        <div className='options'>
            {options}
        </div>
    </div>
  );
}

export default Question_MCQ;
