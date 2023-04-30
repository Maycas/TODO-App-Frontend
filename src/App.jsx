import TaskForm from './components/TaskForm/TaskForm'
import TaskList from './components/TaskList/TaskList'

import './App.module.css'
function App() {
  return (
    <>
      <h1>TODO List</h1>
      <TaskForm></TaskForm>
      <TaskList></TaskList>
    </>
  )
}

export default App
