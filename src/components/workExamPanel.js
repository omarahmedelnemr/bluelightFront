import "./styles/workExamPanel.css"
function WorkExamsPanel({type}) {
    var title;
    
    return (
        <div className="workExamPanel">
            <div className="row titleSeemore">
                <p className="panelTitle">{type}</p>
                <a href="#">See All  </a>
            </div>
            <table>
                <tr className="tableHeaders">
                    <th>Name</th>
                    <th>Assignment Num</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Course</th>
                </tr>
                <hr/>
                <tr>
                    <td>evaluate the Next </td>
                    <td>6</td>
                    <td>25/6/2023</td>
                    <td>Completed</td>
                    <td>math</td>
                </tr>
                <tr>
                    <td>evaluate the Next </td>
                    <td>6</td>
                    <td>25/6/2023</td>
                    <td>Completed</td>
                    <td>math</td>
                </tr>
                <tr>
                    <td>evaluate the Next </td>
                    <td>6</td>
                    <td>25/6/2023</td>
                    <td>Completed</td>
                    <td>math</td>
                </tr>
                <tr>
                    <td>evaluate the Next </td>
                    <td>6</td>
                    <td>25/6/2023</td>
                    <td>Completed</td>
                    <td>math</td>
                </tr>
                <tr>
                    <td>evaluate the Next </td>
                    <td>6</td>
                    <td>25/6/2023</td>
                    <td>Completed</td>
                    <td>math</td>
                </tr>
                
            </table>
        </div>
    );
}

export default WorkExamsPanel;
