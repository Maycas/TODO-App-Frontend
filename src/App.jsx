import TaskForm from './components/TaskForm/TaskForm'
import TaskList from './components/TaskList/TaskList'

import './App.module.css'
import { Typography } from '@mui/material'
import { useState } from 'react'
function App() {
  const [refreshTaskList, toggleRefreshTaskList] = useState(false)

  const handleRefreshTaskList = () => {
    toggleRefreshTaskList(!refreshTaskList)
  }

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
      <TaskForm onRefresh={handleRefreshTaskList}></TaskForm>
      <TaskList refresh={refreshTaskList}></TaskList>
    </>
  )
}

export default App
