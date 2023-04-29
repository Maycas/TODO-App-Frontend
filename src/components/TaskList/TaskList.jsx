import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import TaskCard from './TaskCard/TaskCard'
import axios from 'axios'

function TaskList() {
  const [taskList, setTaskList] = useState([])

  useEffect(() => {
    tasksGetter()
  }, [])

  const tasksGetter = async () => {
    try {
      const { data } = await axios.get('http://localhost:5001/tasks')
      setTaskList(data)
    } catch (error) {
      console.error(error)
    }
  }

  const editButtonHandler = () => {
    console.log('edit clicked')
  }

  const deleteButtonHandler = () => {
    console.log('delete clicked')
  }

  return (
    <>
      <Box sx={{
        backgroundColor: '#fff',
        mt: '30px',
        padding: '20px',
        boxShadow: ' 0 2px 5px rgba(0,0,0,0.3)',
        maxHeight: '70vh'
      }}>
        <h2>My Tasks</h2>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 1,
          }}>
          {taskList.map(task => (
            <TaskCard
              key={task.id}
              title={task.title}
              dueDate={task.dueDate}
              status={task.status}
              onEdit={editButtonHandler}
              onDelete={deleteButtonHandler}
            />
          ))}
        </Box>
      </Box>
    </>
  )
}

export default TaskList
