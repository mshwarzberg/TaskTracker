import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './css/editpopup.css'

function EditPopup(props) {
  
  const [newData, setNewData] = useState({
    header: '',
    details:'',
    deadline:'',
    typeof: '',
    reminder: false,
  })

  useEffect(() => {
      setNewData(props.editingTask)
  }, [props.editingTask])

  function handleChange(e) {
    const {name, value, type, checked} = e.target
    setNewData((oldData) => ({
        ...oldData,
        [name]: type === 'checkbox' ? checked: value
    }))
  }
  
  function handleSubmit(e) {
    e.preventDefault()
    axios
        .patch('http://localhost:5000/task/edit', newData)
        .then(res => console.log(res))
        .catch(err => console.log(err))
  }

  return (
    <div className='edit--task'>
          <form onSubmit={handleSubmit} className='edit--task-form'>
              <label 
                  htmlFor="task--new-name"
              >
                  Task to complete:
              </label>
              <br />
              <input 
                  placeholder='Task Name'
                  onChange={handleChange}
                  name='header'
                  value={newData.header || props.editingTask.header}
                  type="text"
              />
              <br />
              <label 
                  htmlFor="task--new-details"
              >
                  Comments:
              </label>
              <br />
              <textarea 
                  placeholder='Add comments or details for your task'
                  onChange={handleChange}
                  name='details'
                  value={newData.details || props.editingTask.details}
                  type="text" 
              />
              <br />
              <label 
                  htmlFor="task--new-deadline"
              >
                  Task deadline/due date:
              </label>
              <br />
              <input 
                  value={newData.deadline || props.editingTask.deadline}
                  type="date" 
                  max="2025-01-01"
                  name='deadline'
                  onChange={handleChange}
              />
              <br />
              <label 
                  htmlFor="task--new-typeof"
              >   
                  Category:
              </label>
              <br />
              <select 
                  name='typeof'
                  value={newData.typeof || props.editingTask.typeof}
                  onChange={handleChange}
              >
                      <option value="">Choose --</option>
                      <option value="Work">Work</option>
                      <option value="School">School</option>
                      <option value="Shopping">Shopping</option>
                      <option value="Personal">Personal</option>
                      <option value="Family">Family</option>
                      <option value="Medical">Medical</option>
                      <option value="Other">Other</option>
              </select>
              <br />
              <label>
              <input 
                  onChange={handleChange}
                  value={newData.reminder || props.editingTask.reminder}
                  name='reminder'
                  type="checkbox" 
              />
                  Do you want a reminder?
              </label>
              <br />
              <button>Save Task</button>
          </form>
      </div>
  )
}

export default EditPopup