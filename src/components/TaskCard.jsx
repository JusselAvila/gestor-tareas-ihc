function TaskCard({
  id,
  nombre_materia,
  docente,
  tarea,
  fecha,
  estado,
  onEdit,
  onDelete
}) {

  function handleDelete() {

    const confirmed = window.confirm(
      `¿Deseas eliminar la tarea "${tarea}"?`
    )

    if (confirmed) {
      onDelete(id)
    }
  }

  function getStatusClass() {

    if (estado === 'Pendiente') {
      return 'bg-yellow-100 text-yellow-800'
    }

    if (estado === 'En proceso') {
      return 'bg-blue-100 text-blue-800'
    }

    if (estado === 'Completado') {
      return 'bg-green-100 text-green-800'
    }

    return 'bg-gray-100 text-gray-700'
  }

  return (
    <article className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">

      <div className="flex justify-between items-start gap-4 mb-4">

        <div>

          <h3 className="text-xl font-bold text-gray-900">
            {tarea}
          </h3>

          <p className="text-gray-500 mt-1">
            {nombre_materia}
          </p>

        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass()}`}
        >
          {estado}
        </span>

      </div>

      <div className="space-y-2 text-gray-600">

        <p>
          <span className="font-medium text-gray-700">
            Docente:
          </span>

          {' '}

          {docente}
        </p>

        <p>
          <span className="font-medium text-gray-700">
            Fecha:
          </span>

          {' '}

          {fecha}
        </p>

      </div>

      <div className="flex gap-3 mt-6">

        <button
          type="button"
          onClick={onEdit}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Editar
        </button>

        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Eliminar
        </button>

      </div>

    </article>
  )
}

export default TaskCard