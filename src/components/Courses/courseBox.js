import "./styles/courseBox.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import routeTo from "../../general/reroute";
import Cookies from "universal-cookie";
import axios from "axios";
import Global from "../../general/globalVar";
function CourseBox({img,name,teacher,route,fav,id}) {
  console.log("fav:",fav)
  function addToFav(event){
      // Get the parent div element (courseInfo)
      const parentDiv = event.currentTarget.parentElement;

      // Find the sibling span element with class "hiddenMetadata"
      const siblingSpan = parentDiv.querySelector('.hiddenMetadata');

      // Get the value of the sibling span and log it to the console
      const courseID = siblingSpan.textContent;    
      
      //get Student's id
      const cookieReader = new Cookies()
      const studentID = cookieReader.get('id')
      axios.post(Global.BackendURL+"/student/favoriteCourse",{studentID:studentID,courseID:courseID}).then((res)=>{
        console.log(res)
        try{
          // if(re)
        }catch(err){
          console.log("Request Sent But Somthing Went Wrong")
          console.log(err)
        }
      }).catch((err)=>{
        console.log(err)
      })
  }
  return (
    <div className="CourseBox">
        <img src={img}/>
        <div className="courseInfo">
            <div>
                <h2>{name}</h2>
                <p>{teacher}</p>
            </div>
            <a href={route} className="hiddenRoute"></a>
            <span className="hiddenMetadata">{id}</span>
            <FontAwesomeIcon icon="fa-solid fa-heart" style={{color:fav?"red":"white"}} onClick={addToFav}/>
        </div>
    </div>
  );
}

export default CourseBox;
