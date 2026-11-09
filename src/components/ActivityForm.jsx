import { useEffect, useState } from 'react'

function ActivityForm({
  onAddTask,
  onUpdateTask,
  editingTask,
  onCancelEdit
}) {

  const initialForm = {
    nombre_materia: '',
    docente: '',
    tarea: '',
    fecha: '',
    estado: 'Inactivo'
  }

  const [form, setForm] = useState(initialForm)

  const [error, setError] = useState('')

  // =========================
  // CARGAR TAREA AL EDITAR
  // =========================
  useEffect(() => {

    if (editingTask) {

      setForm({
        id: editingTask.id,
        nombre_materia: editingTask.nombre_materia,
        docente: editingTask.docente,
        tarea: editingTask.tarea,
        fecha: editingTask.fecha,
        estado: editingTask.estado
      })

    } else {

      setForm(initialForm)
    }

  }, [editingTask])

  // =========================
  // CAMBIAR CAMPOS
  // =========================
  function changeForm(event) {

    const { name, value } = event.target

    setForm({
      ...form,
      [name]: value
    })
  }

  // =========================
  // ENVIAR FORMULARIO
  // =========================
  function handleSubmit(event) {

    event.preventDefault()

    if (
      form.nombre_materia.trim() === '' ||
      form.docente.trim() === '' ||
      form.tarea.trim() === '' ||
      form.fecha === ''
    ) {

      setError(
        'Complete todos los campos obligatorios.'
      )

      return
    }

    setError('')

    // =========================
    // MODO EDICIÓN
    // =========================
    if (editingTask) {

      onUpdateTask(form)

    } else {

      // =========================
      // MODO CREACIÓN
      // =========================
      const newTask = {
        id: Date.now(),
        ...form
      }

      onAddTask(newTask)
    }

    setForm(initialForm)
  }

  // =========================
  // CANCELAR EDICIÓN
  // =========================
  function handleCancel() {

    setForm(initialForm)

    setError('')

    onCancelEdit()
  }

  return (
    <section className="bg-white border border-gray-200 rounded-xl p-6 mb-8">

      <h2 className="text-xl font-bold text-gray-900 mb-5">

        {editingTask
          ? 'Editar tarea'
          : 'Nueva tarea'}

      </h2>

      {error && (
        <div
          role="alert"
          className="mb-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
        >
          {error}
        </div>
      )}

      <form
        className="grid gap-4 md:grid-cols-2"
        onSubmit={handleSubmit}
      >

        {/* MATERIA */}

        <div>

          <label
            htmlFor="materia"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Nombre materia
          </label>

          <input
            id="materia"
            name="nombre_materia"
            type="text"
            value={form.nombre_materia}
            onChange={changeForm}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* DOCENTE */}

        <div>

          <label
            htmlFor="docente"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Nombre docente
          </label>

          <input
            id="docente"
            name="docente"
            type="text"
            value={form.docente}
            onChange={changeForm}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* TAREA */}

        <div>

          <label
            htmlFor="tarea"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Descripción de la tarea
          </label>

          <input
            id="tarea"
            name="tarea"
            type="text"
            value={form.tarea}
            onChange={changeForm}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* FECHA */}

        <div>

          <label
            htmlFor="fecha"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Fecha
          </label>

          <input
            id="fecha"
            name="fecha"
            type="date"
            value={form.fecha}
            onChange={changeForm}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* ESTADO */}

        <div>

          <label
            htmlFor="estado"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Estado
          </label>

          <select
            id="estado"
            name="estado"
            value={form.estado}
            onChange={changeForm}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >

            <option value="Inactivo">
              Inactivo
            </option>

            <option value="Pendiente">
              Pendiente
            </option>

            <option value="En proceso">
              En proceso
            </option>

            <option value="Completado">
              Completado
            </option>

          </select>

        </div>

        {/* BOTONES */}

        <div className="md:col-span-2 flex gap-3">

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
          >

            {editingTask
              ? 'Actualizar tarea'
              : 'Guardar actividad'}

          </button>

          {editingTask && (

            <button
              type="button"
              onClick={handleCancel}
              className="border border-gray-300 text-gray-700 px-5 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              Cancelar
            </button>

          )}

        </div>

      </form>

    </section>
  )
}

export default ActivityForm