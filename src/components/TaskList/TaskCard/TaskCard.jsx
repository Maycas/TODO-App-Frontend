import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from '@mui/material'
import { Edit, Delete, Event } from '@mui/icons-material'

const TaskCard = ({ title, dueDate, status, onEdit, onDelete }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography
          variant="h3"
          component="div"
          sx={{
            fontSize: {
              xs: '1em',
              sm: '2em',
              md: '2.5em',
            },
          }}>
          {title}
        </Typography>
        <Typography
          sx={{
            mt: 2,
            fontSize: {
              xs: '0.9em',
              sm: '1.2em',
            },
          }}
          color="text.secondary">
          <Event sx={{ fontSize: 'medium', mr: 0.5 }} />
          Due Date: {dueDate}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'flex-end', pt: 0 }}>
        <IconButton onClick={onEdit}>
          <Edit />
        </IconButton>
        <IconButton onClick={onDelete}>
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default TaskCard
