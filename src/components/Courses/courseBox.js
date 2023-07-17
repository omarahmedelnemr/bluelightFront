import "./styles/courseBox.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function CourseBox({img,name,teacher}) {
  return (
    <div className="CourseBox">
        <img src={img}/>
        <div className="courseInfo">
            <div>
                <h2>{name}</h2>
                <p>{teacher}</p>
            </div>
            <FontAwesomeIcon icon="fa-solid fa-heart" />
        </div>
    </div>
  );
}

export default CourseBox;
