import "./styles/courseBox.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import routeTo from "../../general/reroute";
function CourseBox({img,name,teacher,route}) {
  return (
    <div className="CourseBox" onClick={routeTo}>
        <img src={img}/>
        <div className="courseInfo">
            <div>
                <h2>{name}</h2>
                <p>{teacher}</p>
            </div>
            <a href={route} className="hiddenRoute"></a>
            <FontAwesomeIcon icon="fa-solid fa-heart" />
        </div>
    </div>
  );
}

export default CourseBox;
