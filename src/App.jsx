import { Box, Button, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'

import TaskForm from './components/TaskForm/TaskForm'
import TaskList from './components/TaskList/TaskList'
import TaskModal from './components/hoc/Modal/TaskModal'
import AlertPopup from './components/hoc/Alerts/Alert'

import './App.module.css'

function App() {
  const [refreshTaskList, toggleRefreshTaskList] = useState(false)
  const [modalClosed, toggleModal] = useState(true)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editTaskInfo, setEditTaskInfo] = useState({})
  const [error, setError] = useState('')

  const handleRefreshTaskList = () => {
    toggleRefreshTaskList(!refreshTaskList)
  }

  const handleEditTask = task => {
    setEditTaskInfo(task)
  }

  const toggleAddTaskModalHandler = () => {
    setIsEditMode(false)
    toggleModal(!modalClosed)
  }

  const toggleEditTaskModalHandler = () => {
    setIsEditMode(true)
    toggleModal(!modalClosed)
  }

  const onErrorHandler = message => {
    setError(message)
  }

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setError('')
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

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={toggleAddTaskModalHandler}>
          Add
        </Button>
      </Box>

      <TaskModal open={!modalClosed} onClose={toggleAddTaskModalHandler}>
        <TaskForm
          onRefresh={handleRefreshTaskList}
          isEditMode={isEditMode}
          task={editTaskInfo}
          onError={onErrorHandler}
        />
      </TaskModal>

      <TaskList
        refresh={refreshTaskList}
        onEditButtonClicked={toggleEditTaskModalHandler}
        onEditTask={handleEditTask}
        onError={onErrorHandler}
      />

      <AlertPopup
        open={Boolean(error)}
        handleClose={handleAlertClose}
        severity={'error'}
        message={error}
        autoHideDuration={3000}
      />
    </>
  )
}

export default App
