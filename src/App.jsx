import { Box, Button, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'

import TaskForm from './components/TaskForm/TaskForm'
import TaskList from './components/TaskList/TaskList'
import TaskModal from './components/hoc/Modal/TaskModal'

import './App.module.css'

function App() {
  const [refreshTaskList, toggleRefreshTaskList] = useState(false)
  const [modalClosed, toggleModal] = useState(true)
  const [mode, setMode] = useState('edit')
  const [editTaskInfo, setEditTaskInfo] = useState({})

  const handleRefreshTaskList = () => {
    toggleRefreshTaskList(!refreshTaskList)
  }

  const handleEditTask = task => {
    setEditTaskInfo(task)
  }

  const toggleAddTaskModalHandler = () => {
    setMode('add')
    toggleModal(!modalClosed)
  }

  const toggleEditTaskModalHandler = () => {
    setMode('edit')
    toggleModal(!modalClosed)
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

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
        <Button variant="contained" color="success" startIcon={<AddIcon />} onClick={toggleAddTaskModalHandler} >
          Add Task
        </Button>
      </Box>

      <TaskModal open={!modalClosed} onClose={toggleAddTaskModalHandler}>
        <TaskForm onRefresh={handleRefreshTaskList} mode={mode} task={editTaskInfo}></TaskForm>
      </TaskModal>
      <TaskList refresh={refreshTaskList} onEditButtonClicked={toggleEditTaskModalHandler} onEditTask={handleEditTask}></TaskList>
    </>
  )
}

export default App
