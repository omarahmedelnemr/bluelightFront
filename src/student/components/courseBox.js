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
      const studentID = localStorage.getItem("id")
      // if(localStorage.getItem('favorite')==null){
      //   localStorage.setItem('favorite',courseName)
      // }else{
      //   const item = localStorage.getItem('favorite')
      //   const favList = item.split(',')
      //   if (favList.includes(courseName)){
      //     event.currentTarget.style.color = 'white'
      //     console.log(favList.indexOf(courseName))
      //     favList.splice(favList.indexOf(courseName),1)
      //   }else{
      //     favList.push(courseName)
      //     event.currentTarget.style.color = 'red'
      //     console.log(event.currentTarget)
      //   }
      //   localStorage.setItem('favorite',favList.join(','))
        
      // }
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
            {/* <span className="hiddenMetadata">{id}</span> */}
            {/* <FontAwesomeIcon icon="fa-solid fa-heart" style={{color:fav?"red":"white"}} onClick={addToFav}/> */}
        </div>
    </div>
  );
}

export default CourseBox;
