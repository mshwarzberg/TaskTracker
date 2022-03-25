import React, { useEffect, useState } from "react"
import axios from "axios"
import ManageTask from "./ManageTask"
import x from './x.png'
import check from './check.png'
import './css/viewtasks.css'

export const dataToEdit = React.createContext()

function ViewTask() {
    
    
    const [taskData, setTaskData] = useState([])

    useEffect(() => {
          const abortCont = new AbortController()
          axios
              .get('http://localhost:5000/task/view', { signal: abortCont.signal })
              .then(result => {
                  setTaskData(result.data)
              })
              .catch(err => {})
            return () => {
              abortCont.abort();
            }}
    )

    const renderTasks = taskData.map(task => {
          return ( 
            <div key={task._id} id="task--cards">
                <h4 
                  id='task--view-header'
                  >
                  Task Name: {task.header}
                </h4>
                <p 
                  id="task--view-details"
                  >
                  Comments: {task.details}
                </p>
                <p 
                  id="task--view-deadline"
                  >
                  Deadline/Due Date: {task.deadline}
                </p>
                <p 
                  id="task--view-category"
                  >
                  Category: {task.typeof}
                </p>
                {
                  <p 
                  id="task--view-reminder"
                  >
                  {task.reminder ? <img id="task--view-symbol" src={check} alt='checkmark'/>: <img id="task--view-symbol" src={x} alt='xmark'/>} You {task.reminder ? "will" : "won't"} get a reminder for this task
                </p>
                }
                <div className="task--view-buttons">
                  <dataToEdit.Provider value={taskData}>
                    <ManageTask taskID={task._id}/>
                  </dataToEdit.Provider>
                </div>
              </div>
          )
    })                   

    return (
      <div className="task--viewpage">
        {taskData.length > 0 && <h1>View/Edit Tasks</h1>}
        <div className="task--view">
            {taskData.length === 0 ? <h1>You have no tasks</h1> : renderTasks }
        </div>
      </div>
    )
}

export default ViewTask