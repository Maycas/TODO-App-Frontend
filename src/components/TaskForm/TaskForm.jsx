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
  duedate: yup
    .date()
    .typeError('Date must be of format YYYY/MM/DD HH:MM:SS')
    .required('Due Date is a required field'),
})

function TaskForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const postTask = async newTask => {
    try {
      const response = await axios.post(API_URL, newTask)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  const onSubmit = data => {
    postTask({
      title: data.title,
      dueDate: formatDate(data.duedate),
    })
  }

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#FFF',
          mt: '30px',
          padding: '20px',
          boxShadow: ' 0 2px 5px rgba(0,0,0,0.3)',
        }}>
        <Typography
          variant="h2"
          sx={{ fontSize: '2em', mb: '0.75em', fontWeight: 'bold' }}>
          Add a new Task
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column">
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Title"
                  sx={{
                    height: '80px',
                    mb: '10px',
                  }}
                  error={Boolean(errors.title)}
                  helperText={errors.title?.message}
                />
              )}
            />
            <Controller
              name="duedate"
              control={control}
              render={({ field }) => {
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
                          error: Boolean(errors.duedate),
                          helperText: errors.duedate?.message,
                        },
                      }}
                    />
                  </LocalizationProvider>
                )
              }}
            />
            <Button type="submit" variant="contained" color="primary">
              Add Task
            </Button>
          </Box>
        </form>
      </Box>
    </>
  )
}

export default TaskForm
