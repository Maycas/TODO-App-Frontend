import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from '@mui/material'
import { Edit, Delete, Event } from '@mui/icons-material'

import { STATUS } from '../../../utils/constants/constants'

const TaskCard = ({ id, title, dueDate, status, onEdit, onDelete }) => {
  const onEditHandler = () => {
    onEdit({
      id: id,
      title: title,
      status: status,
      dueDate: dueDate,
    })
  }

  const onDeleteHandler = () => {
    onDelete(id)
  }

  const cardColor = {
    [STATUS.PROGRESS]: 'rgba(72, 108, 254, .7)',
    [STATUS.PENDING]: 'rgba(230, 162, 60, .7)',
    [STATUS.COMPLETED]: 'rgba(47, 170, 116, .7)',
    [STATUS.POSTPONED]: 'rgba(224, 64, 51, .7)',
    [STATUS.DELETED]: 'rgba(111, 113, 121, .7)',
  }

  return (
    <Card
      sx={{
        mb: '0.75em',
        boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
        backgroundColor: cardColor[status],
      }}>
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
        <Typography
          sx={{
            mt: 2,
            fontSize: {
              xs: '0.6em',
              sm: '0.9em',
            },
          }}
          color="text.secondary">
          Status: {status}
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
