import "./styles/courseBox.css"
function CourseBox({img,name,teacher,route,fav,id}) {
  function addToFav(event){
      // Get the parent div element (courseInfo)
      const parentDiv = event.currentTarget.parentElement;

      // Find the sibling span element with class "hiddenMetadata"
      const siblingSpan = parentDiv.querySelector('h2');

      // Get the value of the sibling span and log it to the console
      const courseName = siblingSpan.textContent;    
      
      //get Student's id
      const studentID = localStorage.getItem("currentStudentID")

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
        </div>
    </div>
  );
}

export default CourseBox;
