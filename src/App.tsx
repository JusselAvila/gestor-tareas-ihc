import { useState } from 'react'
import ActivityForm from './components/ActivityForm'
import TaskFilters from './components/TaskFilters'
import { tasks as initialTasks, type Task } from './data/tasks'

function App() {
  // ESTADO GLOBAL: Mantiene la lista viva de tareas usando TypeScript
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

  // FUNCIÓN TRANSMISORA: Recibe los datos del formulario, les crea un ID único y los añade a la lista
  const handleAddTask = (newTaskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      id: Date.now().toString(),
      ...newTaskData,
    }
    setTasks([newTask, ...tasks])
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-800 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <section aria-labelledby="tasks-heading">
          <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 id="tasks-heading" className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Mis tareas
              </h1>
            </div>
          </div>

          {/* CONEXIÓN: Se le pasa la función handleAddTask al formulario como prop */}
          <ActivityForm onAddTask={handleAddTask} />

          {/* LISTADO: Se le pasa el estado global tasks para renderizar las tarjetas */}
          <TaskFilters tasks={tasks} />
        </section>
      </div>
    </main>
  )
}

export default App