import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from '@mui/material'
import { Edit, Delete, Event } from '@mui/icons-material'

const TaskCard = ({ id, title, dueDate, status, onEdit, onDelete }) => {
  const onEditHandler = () => {
    onEdit(id)
  }

  const onDeleteHandler = () => {
    onDelete(id)
  }

  return (
    <Card sx={{ mb: '0.75em', boxShadow: '0 2px 5px rgba(0,0,0,0.3)' }}>
      <CardContent sx={{ padding: '1em 0 0 0' }}>
        <Typography
          variant="h3"
          component="div"
          sx={{
            fontSize: {
              xs: '1em',
              sm: '1.2em',
              md: '1.5em',
            },
          }}>
          {title}
        </Typography>
        <Typography
          sx={{
            mt: 2,
            fontSize: {
              xs: '0.6em',
              sm: '0.9em',
            },
          }}
          color="text.secondary">
          <Event sx={{ fontSize: 'medium', mr: 0.5 }} />
          Due Date: {dueDate}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '0 2px 0 0',
        }}>
        <IconButton onClick={onEditHandler}>
          <Edit />
        </IconButton>
        <IconButton onClick={onDeleteHandler}>
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default TaskCard
