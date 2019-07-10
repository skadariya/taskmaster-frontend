import React, {useState, useEffect} from 'react';
import './app.css';

// need to add this for API in EB
const proxyurl = "https://cors-anywhere.herokuapp.com/";
//API
const API = 'http://task-dev.us-west-2.elasticbeanstalk.com/tasks';

function Tasks () {

  // so you declare  taskList which is [] and setTask is a built in method which assigns values to the declared variable. So setTask(10) would set taskList value to 10
  const [taskList, setTask] = useState([]);

  //this is _getTask function defination
  const _getTask = () => {
    fetch(proxyurl+API)
    //convert that data recieved from API to json
    .then( data => data.json() )
    // set value in taskList
    .then( task => setTask(task) )
    .catch( console.error );
  };

  // function call to getTask
  useEffect(_getTask, []);

  return (
    <div class="tasks">
        {console.log("this is task list: " + taskList)}
        
        {taskList.map( (eachTask) =>
        <ul>
          <li key={eachTask.id}>
                  <p>Task: {eachTask.title}</p>
                  <p>Description: {eachTask.description}</p> 
                  <p>Status: {eachTask.status}</p>
                  <p>Assignee: {eachTask.assignee}</p>
                  <img  alt=" " src={`${eachTask.images}`}/>
                  <p>The thumb img</p>
                  <div class="tasksThumb">
                    <img  alt=" " src={`${eachTask.thumbImg}`}/>
                  </div>
                  <form action={`${API}/${eachTask.id}/images`} method="post" encType="multipart/form-data">
                  <label>
                    <span>Upload Image </span>
                    <input name="file" type="file" />
                  </label>
                  <button>Save</button>
                </form>
            </li>     
        </ul>
        )}
    </div>
  )
}

function App() {
  return (
    <>
      <header>Welcome to the Task Master</header>
      <main>
        <Tasks />
      </main>
      </>
  );
}

export default App;