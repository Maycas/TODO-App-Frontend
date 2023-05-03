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
import axios from 'axios'
import formatDate from '../../utils/helperFunctions/formatDate'
import dayjs from 'dayjs'
import { STATUS } from '../../utils/constants/constants'

const API_URL = import.meta.env.VITE_API_URL

const schema = yup.object({
  title: yup.string().required('Title is a required field'),
  dueDate: yup
    .date()
    .typeError('Date must be of format YYYY/MM/DD HH:MM:SS')
    .required('Due Date is a required field'),
})

function TaskForm({ onRefresh, onClose, isEditMode, task, onError }) {
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
    if (isEditMode) {
      console.log('getValues on useEffect', getValues())
      setValue('title', task.title)
      setValue('dueDate', task.dueDate)
      setValue('status', task.status)
    }
  }, [isEditMode, setValue, task])

  const postTask = async newTask => {
    try {
      await axios.post(API_URL, newTask)
      onClose()
      onRefresh()
    } catch (error) {
      onError(error.response.data.msg)
    }
  }

  const updateTask = async updatedTask => {
    updatedTask = {
      ...task,
      ...updatedTask,
    }

    const { id, ...rest } = updatedTask

    try {
      await axios.put(`${API_URL}/${id}`, rest)
      onClose()
      onRefresh()
    } catch (error) {
      onError(error.response.data.msg)
    }
  }

  const onSubmit = data => {
    console.log(data)
    console.log('getValues on onSubmit', getValues())

    if (isEditMode) {
      console.log(data)
      updateTask({
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
          {isEditMode ? 'Edit task' : 'Add task'}
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
                console.log('field', field)
                console.log('duedate', field.value)
                console.log('duedate formatted', dayjs(field.value).toDate())
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
            {!isEditMode ? null : (
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
              {isEditMode ? 'Update Task' : 'Add Task'}
            </Button>
          </Box>
        </form>
      </Box>
    </>
  )
}

export default TaskForm
