import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
} from '@mui/material'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import formatDate from '../../utils/helperFunctions/formatDate'
import dayjs from 'dayjs'
import { STATUS } from '../../utils/constants/constants'

const schema = yup.object({
  title: yup.string().required('Title is a required field'),
  dueDate: yup
    .date()
    .typeError('Date must be of format YYYY/MM/DD HH:MM:SS')
    .required('Due Date is a required field'),
})

function TaskForm({ task, postTask, updateTask }) {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (task) {
      setValue('title', task.title)
      setValue('dueDate', task.dueDate)
      setValue('status', task.status)
    }
  }, [setValue, task])

  const onSubmit = data => {
    if (task) {
      updateTask({
        ...task,
        title: data.title,
        dueDate: formatDate(data.dueDate),
        status: data.status,
      })
    } else {
      postTask({
        title: data.title,
        dueDate: formatDate(data.dueDate),
      })
    }
  }

  return (
    <>
      <Box>
        <Typography
          variant="h2"
          sx={{ fontSize: '2em', mb: '0.75em', fontWeight: 'bold' }}>
          {task ? 'Edit task' : 'Add task'}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column">
            <Controller
              name="title"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Title"
                    sx={{
                      height: '80px',
                      mb: '10px',
                    }}
                    value={field.value ?? ''}
                    error={Boolean(errors.title)}
                    helperText={errors.title?.message}
                  />
                )
              }}
            />
            <Controller
              name="dueDate"
              control={control}
              render={({ field }) => {
                return (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      {...field}
                      label="Due Date"
                      value={field.value ? dayjs(field.value) : null} // Initialize value to null
                      ampm={false}
                      sx={{
                        height: '80px',
                        mb: '10px',
                      }}
                      slotProps={{
                        textField: {
                          error: Boolean(errors.dueDate),
                          helperText: errors.dueDate?.message,
                        },
                      }}
                    />
                  </LocalizationProvider>
                )
              }}
            />
            {task && (
              <Controller
                name="status"
                control={control}
                render={({ field }) => {
                  return (
                    <FormControl fullWidth>
                      <InputLabel id="status-label">Status</InputLabel>
                      <Select
                        {...field}
                        labelId="status-label"
                        label="Status"
                        value={field.value ? field.value : STATUS.PENDING}
                        sx={{
                          mb: '25px',
                        }}>
                        {Object.entries(STATUS).map(([key, value]) => {
                          return (
                            <MenuItem key={key} value={value}>
                              {value}
                            </MenuItem>
                          )
                        })}
                      </Select>
                    </FormControl>
                  )
                }}
              />
            )}
            <Button type="submit" variant="contained" color="primary">
              {task ? 'Update Task' : 'Add Task'}
            </Button>
          </Box>
        </form>
      </Box>
    </>
  )
}

export default TaskForm
