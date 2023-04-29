import axios from 'axios'
import TaskCard from './TaskCard/TaskCard'
import { useEffect, useState } from 'react'

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
      <h2>My Tasks</h2>
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
    </>
  )
}

export default TaskList
