import TaskForm from './components/TaskForm/TaskForm'
import TaskList from './components/TaskList/TaskList'

import './App.module.css'
import { Typography } from '@mui/material'
function App() {
  return (
    <>
      <Typography
        variant="h1"
        sx={{
          fontSize: '3em',
          fontWeight: 'bold',
        }}>
        TODO List
      </Typography>
      <TaskForm></TaskForm>
      <TaskList></TaskList>
    </>
  )
}

export default App
