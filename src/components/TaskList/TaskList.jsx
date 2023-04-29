import TaskCard from './TaskCard/TaskCard'

function TaskList() {

  return (
    <>
      <h2>My Tasks</h2>
      <TaskCard
        title="Coming home early"
        dueDate="2023/02/14 23:32"
        status='COMPLETED'
        onEdit={() => console.log('edit')}
        onDelete={() => console.log('delete')}
      />
    </>
  )
}

export default TaskList
