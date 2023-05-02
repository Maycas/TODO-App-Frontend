import { Box, Button, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useState, useEffect } from 'react'
import axios from 'axios'

import TaskForm from './components/TaskForm/TaskForm'
import TaskList from './components/TaskList/TaskList'
import TaskModal from './components/hoc/Modal/TaskModal'
import AlertPopup from './components/hoc/Alerts/Alert'

import './App.module.css'
import { STATUS } from './utils/constants/constants'
const API_URL = import.meta.env.VITE_API_URL

function App() {
  // Si tienes que tener un estado para obligar a que un componente se repinte, es sintoma de que algo no esta bien,
  // la gracia de react es que los componentes reaccionen en funcion de cambios de estado o props
  // al tener el estado de la lista metido en otro componente te ves obligado a poder decirle de alguna manera que tiene que volver a pedir datos
  // pero hay un problema: un bolean solo puede tener 2 estados, y si pasas de false a true, se pediran datos, pero si vuelves a ponder true,
  // el useEffect que obliga a TaskList a pedir datos, no se disparara. si te ves obligado a hacer esto
  // asegurate de que siempre sea un valor nuevo, por ejemplo: toggleRefreshTaskList(Date.now())
  // const [refreshTaskList, toggleRefreshTaskList] = useState(false)

  // Es un poco raro controlar si el modal esta abierto de esta manera,
  // si lo piensas no parece logico que para pasar un prop que significa si está open, utilizamos una que se llama closed y la negamos.
  // que te parece así: 
  const [isModalOpen, setIsModalOpen] = useState(false)
  // hay una convencion en la que los boolean se nombran de esta manera, así cuando los usas en un if o al leerlos queda mas natural: if (isModalOpen) tralara...


  const [taskList, setTaskList] = useState([])
  // Aqui hay un tema tambien chunguele, estas manteniendo dos estados para definir lo mismo: si estas editando una task
  // que te parece si en lugar de esto, lo que hacemos es usar editTaskInfo para ponderlo a undefined cuando no estemos editando nada? 
  // const [isEditMode, setIsEditMode] = useState(false)
  const [editTaskInfo, setEditTaskInfo] = useState()
  const [error, setError] = useState('')

  // Lo de forzar resfrescos viene de que tienes un componente que pinta una lista, pero otro que la puede editar,
  // en este caso hay un mal diseño de los componentes, lo correcto seria subir el control de la actualizacion de la lista de tareas
  // a un componente superior (padre) de los componentes que lo editen, a ver que te parece poner aqui los metodos
  // que modifiquen la lista y además hacer que este componente sea el que pida la lista.
  useEffect(() => {
    tasksGetter()
  }, [])

  const queryParamsFormatter = queryObj => {
    const filteredQueryObj = Object.fromEntries(
      Object.entries(queryObj).filter(([, value]) => value !== undefined) // si no necesitas una posicion de una array al destructurar, puede dejar la , y listo
    )
    filteredQueryObj.status = filteredQueryObj.status.join(',')

    return new URLSearchParams(filteredQueryObj).toString()
  }

  // si declaras los metodos asi, no tendras que preocuparte de si estas usando la funcion antes de declararla
  // todas las funciones se declaran al principio del codigo (Hoisting), miratelo porque es un concepto importante de JS
  async function tasksGetter () {
    const queryObject = {
      status: Object.values(STATUS).filter(status => status !== STATUS.DELETED),
    }
    const queryParams = queryParamsFormatter(queryObject)
    const request = `${API_URL}?${queryParams}`

    try {
      const { data } = await axios.get(request)
      setTaskList(data)
    } catch (error) {
      console.error(error)
    }
  }

  const postTask = async newTask => {
    try {
      await axios.post(API_URL, newTask)
      tasksGetter()
      setIsModalOpen(false)
    } catch (error) {
      setError(error.response.data.msg)
    }
  }

  const updateTask = async updatedTask => {
    const { id, ...rest } = updatedTask

    try {
      await axios.put(`${API_URL}/${id}`, rest)
      setEditTaskInfo(undefined)
      tasksGetter()
      setIsModalOpen(false)
    } catch (error) {
      setError(error.response.data.msg)
    }
  }

  const taskDelete = async id => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      tasksGetter()
    } catch (error) {
      setError(error.response.data.msg)
    }
  }

  const handleEditTask = task => {
    setEditTaskInfo(task)
    setIsModalOpen(true)
  }

  const toggleAddTaskModalHandler = () => {
    setEditTaskInfo(undefined)
    setIsModalOpen(!isModalOpen)
  }

  const handleAlertClose = (_, reason) => { // si hay un argumento que no necesitas, puedes poner _ y asi no se genera una variable que no vas a usar
    if (reason === 'clickaway') {
      return
    }
    setError('')
  }

  return (
    <>
      <Typography
        variant="h1"
        sx={{
          fontSize: '3em',
          fontWeight: 'bold',
        }}>
        TODO List
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={toggleAddTaskModalHandler}>
          Add
        </Button>
      </Box>

      <TaskList
        taskList={taskList}
        onEditTask={handleEditTask}
        onTaskDelete={taskDelete}
      />

      {/* Aqui un consejo de perro viejo, no es algo que te tenga que preocupar ahora, pero material en este punto monta el modal aunque usa la prop open
          para mostrarlo en pantalla o no, el problema es que genera estados y demas mierdas. Es buena practica montar solo los componentes cuando los necesitemos,
          te propongo condicionar el montaje/renderizado del modal a si está abierto. Y otra mania, para tener mas claro lo que se estara pintando en pantalla,
          al ser un model que ira a pantalla completa independiente del flujo del documento, normalmente lo ponemos al final
        */}
      {isModalOpen && <TaskModal open={isModalOpen} onClose={toggleAddTaskModalHandler}>
        <TaskForm
          task={editTaskInfo}
          postTask={postTask}
          updateTask={updateTask}
        />
      </TaskModal>}

      {error && <AlertPopup
        open={Boolean(error)}
        handleClose={handleAlertClose}
        severity={'error'}
        message={error}
        autoHideDuration={3000}
      />}

    </>
  )
}

export default App
