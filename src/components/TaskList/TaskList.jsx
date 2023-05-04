import { Box, Typography } from '@mui/material'
import TaskCard from './TaskCard/TaskCard'

const TaskList = ({ taskList, onDeleteTask, onEditTask }) => (
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
      {taskList.length ? (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: [
              'repeat(1, 1fr)',
              'repeat(2, 1fr)',
              'repeat(3, 1fr)',
              'repeat(4, 1fr)',
            ],
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
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))}
        </Box>
      ) : (
        <Typography>No tasks available</Typography>
      )}
    </Box>
  </>
)

export default TaskList
