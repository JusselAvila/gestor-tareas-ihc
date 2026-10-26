import { useState, type ChangeEvent, type FormEvent } from 'react'
import { type Task, type TaskStatus } from '../data/tasks'

interface ActivityFormProps {
  onAddTask: (task: Omit<Task, 'id'>) => void
}

export default function ActivityForm({ onAddTask }: ActivityFormProps) {
  
  /*
  ========================================================================= 
  Se agruparon todos los campos del formulario en un solo objeto de estado (useState) 
  para mantener controlados los datos que se van escribiendo de forma unificada.
  =========================================================================
  */

  const [form, setForm] = useState({
    nombre_materia: '',
    docente: '',
    tarea: '',
    fecha: '',
    estado: 'Pendiente' as TaskStatus,
  })

  /*
  =========================================================================
  Se añade el formateo y obtención de la fecha actual para el calendario.
  =========================================================================
  */ 

  const today = new Date().toLocaleDateString('en-CA')

  // Función genérica para actualizar el estado del formulario dinámicamente usando 'name'
  function changeForm(event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = event.target
    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!form.nombre_materia.trim() || !form.docente.trim()) return

    /*
    =========================================================================
    Validación estricta de la descripción (campo 'tarea'): 
    Se eliminan los espacios en blanco y se verifica que tenga más de 10 caracteres.
    =========================================================================
    */

    const caracteresSinEspacios = form.tarea.replace(/\s/g, '')
    if (caracteresSinEspacios.length <= 10) {
      alert('La descripción debe tener más de 10 caracteres (sin contar los espacios).')
      return
    }

    /*
    =========================================================================
    Validación del formato y restricción de fechas para impedir fechas pasadas.
    =========================================================================
    */

    if (form.fecha && form.fecha < today) {
      alert('No puedes seleccionar una fecha de entrega en el pasado.')
      return
    }

    onAddTask({
      materia: form.nombre_materia.trim(),
      docente: form.docente.trim(),
      fecha: form.fecha || today,
      estado: form.estado,
    })

    // Limpiar formulario después de guardar
    setForm({
      nombre_materia: '',
      docente: '',
      tarea: '',
      fecha: '',
      estado: 'Pendiente',
    })
  }

  return (
    <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:mb-8 sm:p-5">
      <h2 className="mb-4 text-lg font-bold text-slate-900">Nueva tarea</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Nombre Materia */}
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Nombre materia</span>
          <input
            id="materia"
            name="nombre_materia"
            type="text"
            value={form.nombre_materia}
            onChange={changeForm}
            placeholder="Ej. Interacción Humano-Computador"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            required
          />
        </label>

        {/* Docente */}
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Docente</span>
          <input
            id="docente"
            name="docente"
            type="text"
            value={form.docente}
            onChange={changeForm}
            placeholder="Ej. Docente asignado"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            required
          />
        </label>

        {/* Fecha de entrega */}
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Fecha de entrega</span>
          <input
            id="fecha"
            name="fecha"
            type="date"
            value={form.fecha}
            min={today}
            onChange={changeForm}
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            required
          />
        </label>

        {/* Descripción (Campo Tarea) */}
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Descripción / Tarea (Mín. 10 caracteres sin espacios)</span>
          <textarea
            id="tarea"
            name="tarea"
            value={form.tarea}
            onChange={changeForm}
            placeholder="Escribe los detalles..."
            rows={3}
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            required
          />
        </label>

        {/* Estado */}
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Estado</span>
          <select
            id="estado"
            name="estado"
            value={form.estado}
            onChange={changeForm}
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
          >
            <option value="Pendiente">Pendiente</option>
            <option value="En progreso">En progreso</option>
            <option value="Finalizada">Finalizada</option>
          </select>
        </label>

        {/* Botón de envío */}
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Guardar tarea
          </button>
        </div>
      </form>
    </section>
  )
}