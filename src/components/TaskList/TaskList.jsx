import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import TaskCard from './TaskCard/TaskCard'
import axios from 'axios'

import { STATUS } from '../../utils/constants/constants'

const API_URL = import.meta.env.VITE_API_URL

function TaskList({ refresh, onEditButtonClicked, onEditTask, onError }) {
  const [taskList, setTaskList] = useState([])

  useEffect(() => {
    tasksGetter()
  }, [refresh])

  const queryParamsFormatter = queryObj => {
    const filteredQueryObj = Object.fromEntries(
      Object.entries(queryObj).filter(([key, value]) => value !== undefined)
    )
    filteredQueryObj.status = filteredQueryObj.status.join(',')

    return new URLSearchParams(filteredQueryObj).toString()
  }

  const tasksGetter = async () => {
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

  const taskDelete = async id => {
    try {
      const { data } = await axios.delete(`${API_URL}/${id}`)
      tasksGetter()
    } catch (error) {
      onError(error.response.data.msg)
    }
  }

  const deleteButtonHandler = id => {
    taskDelete(id)
  }

  const editButtonHandler = task => {
    onEditButtonClicked()
    onEditTask(task)
  }

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#d8d5d5',
          mt: '30px',
          padding: '20px',
          boxShadow: ' 0 2px 5px rgba(0,0,0,0.3)',
        }}>
        <Typography
          variant="h2"
          sx={{ fontSize: '2em', mb: '0.75em', fontWeight: 'bold' }}>
          My tasks
        </Typography>
        {taskList.length !== 0 ? (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: ['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)'],
              gap: 1,
              overflow: 'auto',
              maxHeight: '90vh',
            }}>
            {taskList.map(task => (
              <TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                dueDate={task.dueDate}
                status={task.status}
                onEdit={editButtonHandler}
                onDelete={deleteButtonHandler}
              />
            ))}
          </Box>
        ) : (
          <Typography>No tasks available</Typography>
        )}
      </Box>
    </>
  )
}

export default TaskList
