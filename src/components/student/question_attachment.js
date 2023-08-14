import axios from 'axios';
import './styles/attachment.css'
import './styles/Written.css'
import Global from '../../general/globalVar';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Question_Attachment({questionInfo,answered,mode,graded = null}) {
    const [bigPreview,setBigPreview] = useState(null)
    const [attachLoading,setAttachLoading] = useState(null)
    const [AttachmentErrorMessage,setAttachmentErrorMessage] = useState(null)
    const lang =localStorage.getItem("lang")
    const compLang = {
        yourWork:  lang === 'en' ? "Your Work":"ملفاتك",
        upload:    lang === 'en' ? "Upload Your Files":"ارفع ملفاتك",
        uploading: lang === 'en' ? "Uploading":"جار الرفع",
        noFiles:   lang === 'en' ? "No Files Yet":"لا ملفات حتي الان"
    }

    //Check if the Question in Normal Mode (Homework) or in Exam Mode So No Local Storage
    // if (mode === 'homework'){

        //Check if there is Attachments in LocalStorage
        var uniqueLocalID =mode+questionInfo['id']+"Q"+questionInfo['QNumber']
        if (localStorage.getItem(uniqueLocalID) === undefined || localStorage.getItem(uniqueLocalID) === '' ||localStorage.getItem(uniqueLocalID) === null){
            var previewBaseEement = []
            localStorage.setItem(uniqueLocalID,'')
        }else{
            const loadedFiles = localStorage.getItem(uniqueLocalID).split(',')
            var previewBaseEement = []
            for(var i =0;i<loadedFiles.length;i++){
                if (loadedFiles[i] ===''){
                    continue
                }
                if (loadedFiles[i].split('.')[1] === 'pdf'){
                    const element = <div className='attachmentPreview'>
                                        <div className='CloseCross' onClick={removeFile}>
                                            <FontAwesomeIcon icon="fa-solid fa-xmark"/>
                                        </div>
                                        <a href={Global.BackendURL+"/file/"+loadedFiles[i]} target='_blank'>
                                            <iframe className='embedMiniPreview' src={Global.BackendURL+"/file/"+loadedFiles[i]} onClick={showBigImage}></iframe>
                                            <p>PDF</p>
                                        </a>
                                    </div>  
                    previewBaseEement.push(element)
                }else{
                    const Element = <div className='attachmentPreview'>
                                        <div className='CloseCross' onClick={removeFile}>
                                            <FontAwesomeIcon icon="fa-solid fa-xmark"/>
                                        </div>
                                        <div  onClick={showBigImage}>
                                            <img src={Global.BackendURL+"/file/"+loadedFiles[i]}/>
                                            <p>Image</p>
                                        </div>
                                    </div>
                previewBaseEement.push(Element)
                }
            }
        }
        var  attachVal = localStorage.getItem(uniqueLocalID).split(",")
        var   preVal = previewBaseEement
        var noFileVal =  previewBaseEement.length==0?<p>{compLang['noFiles']}</p>:null
    // }else{
    //     var attachVal = []
    //     var   preVal = []
    //     var noFileVal = <p>{compLang['noFiles']}</p>
    // }
    
    const [attachment,setAttachments]= useState(attachVal)
    var   [preview,setPreview] = useState(preVal)
    const [noFilesYet,setNoFilesYet] = useState(noFileVal)


    // Show a Preview of attachment With Type Image
    function showBigImage(event){
        var element = event.currentTarget.querySelector("img")
        console.log(element.nodeName)
        if (element.nodeName === 'DIV'){
            element = element.querySelector("iframe")
        }
        setBigPreview(
        <div className='bigImage'>
            <div className='grayBackground' onClick={(event)=>{setBigPreview(null)}}></div>
            <img src={element.src}/>
        </div>
        )
    }

    // Remove an Image From Preview List
    function removeFile(event){
        const element = event.currentTarget.parentElement

        // Check if image of pdf
        try{
            var file = element.querySelector("img").getAttribute("src").split('/')
            file = file[file.length-1]
        }catch{
            var file = element.querySelector("a").getAttribute("href").split('/')
            file = file[file.length-1]
        }

        //remove From Inner HTML value
        var attachmentValues = element.parentElement.parentElement.querySelector(".attachmentsValues").innerHTML
        attachmentValues = attachmentValues.replace(file+",",'')
        attachmentValues = attachmentValues.replace(','+file,'')
        attachmentValues = attachmentValues.replace(file,'')
        element.parentElement.parentElement.querySelector(".attachmentsValues").innerHTML = attachmentValues
        element.remove()

        //Check if the Question in Normal Mode (Homework) or in Exam Mode So No Local Storage
        if (mode === 'homework'){
            //remove From Local Storage
            var attachmentValues = localStorage.getItem(uniqueLocalID)
            attachmentValues = attachmentValues.replace(file+",",'')
            attachmentValues = attachmentValues.replace(','+file,'')
            attachmentValues = attachmentValues.replace(file,'')
            localStorage.setItem(uniqueLocalID,attachmentValues)
        }
        // if(attachmentValues === ''){
        //     setPreview(<p>{compLang['noFiles']}</p>)
        // }
        console.log("Removed")

    }

    // Display Attachment That in The Question Description
    const questionAttachmentsPreview =[]
    var attachSrc;
    for(var i=0;i<questionInfo['attachments'].length;i++){
        attachSrc = questionInfo['attachments'][i]['attachmentDir']
        if (attachSrc.split('.')[1] ==='pdf'){
            questionAttachmentsPreview.push(
                <div className='attachmentPreview'>
                    <a href={Global.BackendURL+"/file/"+attachSrc} target="_blank">
                        <iframe src={Global.BackendURL+"/file/"+attachSrc} className='embedMiniPreview'></iframe>
                        <p>PDF</p>
                    </a>
                </div>
            )
        }else{
            questionAttachmentsPreview.push(
                <div className='attachmentPreview'>
                    <div  onClick={showBigImage}>
                        <img src={Global.BackendURL+"/file/"+attachSrc}/>
                        <p>Image</p>
                    </div>

                </div>
            )
        }
    
    }


    // Dispaly Questions With it's answers if The Student Answer That Homework
    if (answered){
        const attachmentsNames = questionInfo['Studentattachment']
        
        preview = []
        for (var i=0;i<attachmentsNames.length;i++){
            console.log("Helllllo")
            if (attachmentsNames[i]['attachmentDir'].split('.')[1] ==='pdf'){
                preview.push(
                    <div className='attachmentPreview'>
                        <a href={Global.BackendURL+"/file/"+attachmentsNames[i]['attachmentDir']} target="_blank"> 
                            <iframe src={Global.BackendURL+"/file/"+attachmentsNames[i]['attachmentDir']} className='embedMiniPreview'></iframe>
                            <p>PDF</p>
                        </a>
                     </div>
                )
            }else{
                preview.push(
                    <div className='attachmentPreview'>
                         <div onClick={showBigImage}>
                            <img src={Global.BackendURL+"/file/"+attachmentsNames[i]['attachmentDir']} />
                            <p>Image</p>
                        </div>
                     </div>
                )
            }
        }
    }

    // Upload a File using File Input
    function uploadFile(event){
        const files = event.target.files;
        if (files.length === 0 ){
            console.log("Empty Input")
        }else{
            // Send the request using Axios
            console.log("attachments: ",attachment)
            setAttachLoading(
                <div className='loadingContainer'>
                    <div className='loading'></div>
                    </div>)
            axios.post(Global.BackendURL+"/upload", files)
            .then(response => {
                // Handle the response from the server if needed
                console.log("Upload successful:", response.data);
                setAttachments([...attachment,response.data])
                const oldLocal = localStorage.getItem(uniqueLocalID)
                localStorage.setItem(uniqueLocalID,oldLocal+","+response.data)
                if (response.data.split('.')[1] === 'pdf'){
                    const element = <div className='attachmentPreview'>
                                        <div className='CloseCross' onClick={removeFile}>
                                            <FontAwesomeIcon icon="fa-solid fa-xmark"/>
                                        </div>
                                        <a href={Global.BackendURL+"/file/"+response.data} target='_blank'>
                                            <iframe className='embedMiniPreview' src={Global.BackendURL+"/file/"+response.data} onClick={showBigImage}></iframe>
                                        </a>
                                    </div>  
                        if (preview.length ===0){
                            setNoFilesYet(null)
                        }
                        setPreview([...preview,element])
                }else{
                    const element = <div className='attachmentPreview'>
                                        <div className='CloseCross' onClick={removeFile}>
                                            <FontAwesomeIcon icon="fa-solid fa-xmark"/>
                                        </div>
                                        <div onClick={showBigImage}>
                                            <img src={Global.BackendURL+"/file/"+response.data}/>
                                            <p>Image</p>
                                        </div>
                                    </div>
                if (preview.length ===0){
                    setNoFilesYet(null)
                }
                setPreview([...preview,element])
                }


        
                setAttachLoading(null)
                    
            })
            .catch(error => {
                // Handle errors if the upload fails
                console.error("Error uploading:", error);
                try{
                    setAttachmentErrorMessage(
                        <p className='ErrorMessage'>{error.response.data}</p>
                    )
                }catch{
                    setAttachmentErrorMessage(
                        <p className='ErrorMessage'>Error Happend, Please try Uploading Again</p>
                    )
                }
                setAttachLoading(null)

            });
        }
    }

    return (
        <div className='attachment question'>
            {bigPreview}
            {/* <p className='questionText'>{questionInfo['QNumber']}) {questionInfo['questionText']}</p> */}
            <div className='row'>
                <p className='questionText'>{mode === 'homework'? questionInfo['QNumber']+")":"" } {questionInfo['questionText']} </p>
                {graded && questionInfo['yourGrade'] > 0 ?<span className='plus'>&nbsp;&nbsp; +{questionInfo['yourGrade']}</span>:''}
            </div>
            <div className='preview'>
                {questionAttachmentsPreview}
            </div>
            <p className='hide questionID'>{questionInfo['id']}</p>
            <p className='hide questionNumber'>{questionInfo['QNumber']}</p>
            
            <div className='attachemntFiles'>
                {AttachmentErrorMessage}
                <p>{compLang['yourWork']}:</p>
                <div className='preview'>
                    {noFilesYet}
                    {preview}
                </div>
                <p className='hide attachmentsValues'>{attachment.join(',')}</p>
                {/* <p className='hide attachmentsValues'>1691459483631.png,1691459483632.png,1691459483630.png</p> */}
                {answered?null:
                <label class="custom-file-upload">
                    {attachLoading === null?<input type="file" onChange={uploadFile}/>:<input type="file" onChange={uploadFile} disabled/>}
                    {attachLoading===null?compLang['upload']:compLang['uploading']}
                    {attachLoading}
                </label>}

            </div>

        </div>
    );
}

export default Question_Attachment;
