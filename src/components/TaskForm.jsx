import { useEffect, useState } from 'react'

const TaskForm = ({ onSubmit, selectedTask, onCancel }) => {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [deadline, setDeadline] = useState('')

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title)
      setPriority(selectedTask.priority)
      setDeadline(selectedTask.deadline || '')
      return
    }
    setTitle('')
    setPriority('Medium')
    setDeadline('')
  }, [selectedTask])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!title.trim()) return
    onSubmit({ title: title.trim(), priority, deadline })
    setTitle('')
    setPriority('Medium')
    setDeadline('')
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-soft backdrop-blur-xl dark:border-slate-700/40 dark:bg-slate-900/80">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Add a new task</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Create tasks, set priority, and schedule deadlines.</p>
        </div>
        <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700 dark:bg-sky-900/30 dark:text-sky-200">
          {selectedTask ? 'Editing' : 'Create'}
        </span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Task Title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="e.g. Finish project report"
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-sky-500 dark:focus:ring-sky-900/20"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Priority</span>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-sky-500 dark:focus:ring-sky-900/20"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Deadline</span>
          <input
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            type="date"
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-sky-500 dark:focus:ring-sky-900/20"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        {selectedTask && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="rounded-2xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-500"
        >
          {selectedTask ? 'Update Task' : 'Add Task'}
        </button>
      </div>
    </form>
  )
}

export default TaskForm
