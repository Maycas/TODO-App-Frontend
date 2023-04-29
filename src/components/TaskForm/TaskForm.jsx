import { useForm, Controller } from "react-hook-form";
import { Box, TextField, Button, StyledEngineProvider } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import formatDate from '../../utils/helperFunctions/formatDate'

import styles from './TaskForm.module.css';
 
const schema = yup.object({
  title: yup.string().required('Title is a required field'),
  duedate: yup.date().typeError('Date must be of format YYYY/MM/DD HH:MM:SS').required('Due Date is a required field')
})

function TaskForm() {
    const { control, handleSubmit, formState: { errors }} = useForm({ resolver: yupResolver(schema) })

    const onSubmit = data => {  
      console.log(data)
      if(data.title) console.log('title', data.title)
      if(data.duedate) console.log('duedate', formatDate(data.duedate))
    }  

    return (
      <>
        <h2>Add a new Task</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledEngineProvider injectFirst>
            <Box display='flex' flexDirection='column'>
              <Controller
                name='title'
                control={ control }
                render={( { field } ) => (
                  <TextField
                    {...field}
                    label="Title"
                    className={styles.input}
                    error={Boolean(errors.title)}
                    helperText={errors.title?.message} 
                  />
                )}
              />
              <Controller
                name='duedate' 
                control={ control }
                render={( { field } ) => {
                  return(
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        {...field}
                        label="Due Date"
                        value={field.value ? field.value.toDate(): null}
                        ampm={false}
                        className={`${styles.input} ${errors.duedate ? styles.error : ''}`}
                        slotProps= {{
                          textField: {
                            error: Boolean(errors.duedate),
                            helperText: errors.duedate?.message
                          }
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
          </StyledEngineProvider>
        </form>
      </>
    )
}

export default TaskForm