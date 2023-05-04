import { useEffect, useState } from 'react'

import { Box, Button, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import axios from 'axios'

import TaskForm from './components/TaskForm/TaskForm'
import TaskList from './components/TaskList/TaskList'
import TaskModal from './components/hoc/Modal/TaskModal'
import AlertPopup from './components/hoc/Alerts/Alert'

import { STATUS } from './utils/constants/constants'
const API_URL = import.meta.env.VITE_API_URL

import './App.module.css'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [taskList, setTaskList] = useState([])
  const [editedTask, setEditedTask] = useState({})
  const [error, setError] = useState('')

  useEffect(() => {
    getTasks()
  }, [])

  const queryParamsFormatter = queryObj => {
    const filteredQueryObj = Object.fromEntries(
      Object.entries(queryObj).filter(([, value]) => value !== undefined)
    )
    filteredQueryObj.status = filteredQueryObj.status.join(',')

    return new URLSearchParams(filteredQueryObj).toString()
  }

  // API Requests
  const getTasks = async () => {
    const queryObject = {
      status: Object.values(STATUS).filter(status => status !== STATUS.DELETED),
    }
    const queryParams = queryParamsFormatter(queryObject)
    const request = `${API_URL}?${queryParams}`

    try {
      const { data } = await axios.get(request)
      setTaskList(data)
    } catch (error) {
      console.error(error)
    }
  }

  const postTask = async newTask => {
    try {
      await axios.post(API_URL, newTask)
      getTasks()
      setIsModalOpen(false)
    } catch (error) {
      setError(error.response.data.msg)
    }
  }

  const updateTask = async updatedTask => {
    const { id, ...rest } = updatedTask

    try {
      await axios.put(`${API_URL}/${id}`, rest)
      setEditedTask(undefined)
      getTasks()
      setIsModalOpen(false)
    } catch (error) {
      setError(error.response.data.msg)
    }
  }

  const deleteTask = async id => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      getTasks()
    } catch (error) {
      setError(error.response.data.msg)
    }
  }

  // Handlers
  const editTaskHandler = task => {
    setEditedTask(task)
    setIsModalOpen(true)
  }

  const toggleAddTaskModalHandler = () => {
    setEditedTask(undefined)
    setIsModalOpen(!isModalOpen)
  }

  const alertCloseHandler = (_, reason) => {
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

      <TaskList
        taskList={taskList}
        onEditTask={editTaskHandler}
        onDeleteTask={deleteTask}
      />

      {isModalOpen && (
        <TaskModal open={isModalOpen} onClose={toggleAddTaskModalHandler}>
          <TaskForm
            task={editedTask}
            postTask={postTask}
            updateTask={updateTask}
          />
        </TaskModal>
      )}

      {error && (
        <AlertPopup
          open={Boolean(error)}
          handleClose={alertCloseHandler}
          severity={'error'}
          message={error}
          autoHideDuration={3000}
        />
      )}
    </>
  )
}

export default App
