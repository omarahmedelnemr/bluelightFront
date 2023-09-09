import "./styles/courseBox.css"
function CourseBox({img,name,teacher,route}) {

  return (
    <div className="CourseBox">
        <img src={img}/>
        <div className="courseInfo">
            <div>
                <h2>{name}</h2>
                <p>{teacher}</p>
            </div>
            <a href={route} className="hiddenRoute"></a>
        </div>
    </div>
  );
}

export default CourseBox;
