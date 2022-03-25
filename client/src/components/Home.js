import { useNavigate } from "react-router-dom"
import "./css/home.css"

function Home() {

  const navigate = useNavigate()

  function linkToNew() {
      navigate('/newtask')
  }
  function linkToView() {
      navigate('/viewtasks')
  }

  return (
    <div className="home--button">
       <button id="newtaskbutton" onClick={linkToNew}>Create New Task</button>
       <button id="viewtaskbutton" onClick={linkToView}>View All Tasks</button>
    </div>
  )
}

export default Home