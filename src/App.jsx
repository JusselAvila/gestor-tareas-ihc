import { useEffect, useState } from 'react'

import Header from './components/Header'
import Footer from './components/Footer'
import TaskCard from './components/TaskCard'
import ActivityForm from './components/ActivityForm'

const API_URL = 'http://localhost:3001/tasks'

function App() {
  const [taskList, setTaskList] = useState([])
  const [editingTask, setEditingTask] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // =========================
  // TRAER DATOS CON GET
  // =========================
  async function loadTasks() {
    try {
      setLoading(true)
      setError('')
      const response = await fetch(API_URL)

      if (!response.ok) {
        throw new Error('Error al obtener las tareas')
      }

      const data = await response.json()
      setTaskList(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  // =========================
  // AGREGAR (POST)
  // =========================
  async function addTask(newTask) {
    try {
      setLoading(true)
      setError('')
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      })

      if (!response.ok) {
        throw new Error('Error al crear la tarea')
      }

      const savedTask = await response.json()
      setTaskList([...taskList, savedTask])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // =========================
  // ELIMINAR (DELETE)
  // =========================
  async function deleteTask(id) {
    try {
      setLoading(true)
      setError('')
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Error al eliminar la tarea')
      }

      const newList = taskList.filter(
        task => task.id !== id
      )

      setTaskList(newList)

      if (editingTask?.id === id) {
        setEditingTask(null)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // =========================
  // INICIAR EDICIÓN
  // =========================
  function editTask(task) {
    setEditingTask(task)
  }

  // =========================
  // ACTUALIZAR (PUT)
  // =========================
  async function updateTask(updatedTask) {
    try {
      setLoading(true)
      setError('')
      const response = await fetch(`${API_URL}/${updatedTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      })

      if (!response.ok) {
        throw new Error('Error al actualizar la tarea')
      }

      const savedTask = await response.json()

      const newList = taskList.map((task) => {
        if (task.id === savedTask.id) {
          return savedTask
        }
        return task
      })

      setTaskList(newList)
      setEditingTask(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // =========================
  // CANCELAR EDICIÓN
  // =========================
  function cancelEdit() {
    setEditingTask(null)
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <Header />

      <main className="max-w-5xl mx-auto px-6 py-8">

        <ActivityForm
          onAddTask={addTask}
          onUpdateTask={updateTask}
          editingTask={editingTask}
          onCancelEdit={cancelEdit}
        />

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="flex items-center justify-between mb-6">

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Mis tareas
            </h2>

            <p className="text-gray-500 mt-1">
              Gestiona tus actividades académicas
            </p>
          </div>

          <span className="text-sm text-gray-500">
            Total: {taskList.length}
          </span>

        </div>

        {loading && taskList.length === 0 ? (
          <div className="text-center py-8 text-gray-500 font-medium">Cargando tareas...</div>
        ) : taskList.length === 0 ? (

          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">

            <h3 className="text-lg font-semibold text-gray-900">
              No hay tareas registradas
            </h3>

            <p className="text-gray-500 mt-2">
              Utiliza el formulario para registrar una nueva tarea.
            </p>

          </div>

        ) : (

          <div className="grid gap-5 md:grid-cols-2">

            {taskList.map((task) => (

              <TaskCard
                key={task.id}
                {...task}
                onEdit={() => editTask(task)}
                onDelete={deleteTask}
              />

            ))}

          </div>

        )}

      </main>

      <Footer />

    </div>
  )
}

export default App