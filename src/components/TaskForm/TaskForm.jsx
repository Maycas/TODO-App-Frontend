import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Box, TextField, Button, Typography } from '@mui/material'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import formatDate from '../../utils/helperFunctions/formatDate'

const API_URL = import.meta.env.VITE_API_URL

const schema = yup.object({
  title: yup.string().required('Title is a required field'),
  dueDate: yup
    .date()
    .typeError('Date must be of format YYYY/MM/DD HH:MM:SS')
    .required('Due Date is a required field'),
})

function TaskForm({ onRefresh, onClose, isEditMode, task }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const postTask = async newTask => {
    try {
      await axios.post(API_URL, newTask)
      onClose()
      onRefresh()
    } catch (error) {
      //TODO: Manage task already exist errors
      console.error(error.response.data.msg)
    }
  }

  const updateTask = async task => {}

  const onSubmit = data => {
    if (isEditMode) {
      console.log('update task')
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
                // console.log('task', task)
                // console.log('input', field)
                // console.log('input', field.value)
                return (
                  <TextField
                    {...field}
                    label="Title"
                    sx={{
                      height: '80px',
                      mb: '10px',
                    }}
                    value={field.value}
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
                // console.log('duedate', field)
                // console.log('duedate', field.value)
                return (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      {...field}
                      label="Due Date"
                      value={field.value ? field.value.toDate() : null}
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
