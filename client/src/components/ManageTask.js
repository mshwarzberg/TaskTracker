import React, { useState, useContext } from 'react'
import { dataToEdit } from './ViewTask';
import EditPopup from './EditPopup'
import { useNavigate } from "react-router-dom"
import axios from 'axios'

function ManageTask(props) {

  const navigate = useNavigate()

  const importedDataFromContext = useContext(dataToEdit)

  const [exportTaskState, setExportTaskState] = useState({})

  const [showPopup, setShowPopup] = useState(false)

  function deleteTask(ID) {
        
    return function deleteTask(){
        
        axios
          .delete('http://localhost:5000/task/delete', ID)
          .then(() => navigate('/viewtask'))
          .catch(error => console.log(error))
    }
  }
  
  function editTask(ID) {
      return function editTask() {
          setShowPopup(!showPopup)
          return importedDataFromContext.map(thingBroughtIn => {
              if (thingBroughtIn._id === ID) {
                  return setExportTaskState(thingBroughtIn)
              }
              return {}
          })
      }
  }

  return (
    <div>
        <div>
            <button 
                id='task--view-button-edit'
                onClick={editTask(props.taskID)}
            >
                Edit Task
            </button>
            {showPopup && <EditPopup editingTask={exportTaskState}/>}
        </div>
        <button 
            id='task--view-button-delete' 
            onClick={deleteTask(props.taskID)}
        >
            Delete Task
        </button>
    </div>
  )
}

export default ManageTask