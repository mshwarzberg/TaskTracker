import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './css/newtask.css'

function NewTask() {

    const navigate = useNavigate()

    const [todaysDate, setTodaysDate] = useState('2022-01-01')

    const [showButton, setShowButton]  = useState(false)

    const [taskDetails, setTaskDetails] = useState({
        header: "",
        details: "",
        deadline: "",
        typeof: "",
        reminder: false
    })

    useEffect(() => {
        const getDate = new Date()
        const theDate = getDate.toISOString().split('T')[0]
        setTodaysDate(theDate)
    }, [])
    
    function handleChange(e) {
        const {name, value, checked, type} = e.target
        setTaskDetails(prevTaskDetails => {
          return {
              ...prevTaskDetails,
              [name]: type === 'checkbox' ? checked : value
          }
        })
    }
    
    function handleSubmit(e) {
        e.preventDefault()
        axios
            .post('http://localhost:5000/task/new', taskDetails)
            .then(() => setShowButton(true))
            .catch(err => console.log(err))
    }

    return (
      <div className='new--task'>
          <h1>Create New Task</h1>
          <form className='newtask--form' onSubmit={handleSubmit}>
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
                  value={taskDetails.header}
                  id="task--new-name" 
                  type="text"
                  required
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
                  value={taskDetails.details}
                  type="text" 
                  id="task--new-details" 
              />
              <br />
              <label 
                  htmlFor="task--new-deadline"
              >
                  Task deadline/due date:
              </label>
              <br />
              <input 
                  type="date" 
                  min={todaysDate}
                  max="2025-01-01"
                  id="task--new-deadline"
                  name='deadline'
                  onChange={handleChange}
                  required
              />
              <br />
              <label 
                  htmlFor="task--new-typeof"
              >   
                  Category:
              </label>
              <br />
              <select 
                  id="task--new-typeof"
                  name='typeof'
                  value={taskDetails.typeof}
                  onChange={handleChange}
                  required
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
              <label 
                  title="This doesn't work, but it's here anyway. Deal with it" 
                  className='reminder-label'
              >
              <input 
                  className='reminder-input'
                  onChange={handleChange}
                  value={taskDetails.reminder}
                  name='reminder'
                  id="task--new-reminder" 
                  type="checkbox" 
                  title="This doesn't work, but it's here anyway. Deal with it"
              />
                  Do you want a reminder?
              </label>
              <br />
              <button id="task--new-button">Save Task</button>
              {showButton && <button onClick={() => navigate('/viewtasks')}>View/Edit Tasks</button>}
          </form>
      </div>
    )
}

export default NewTask