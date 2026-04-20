const priorityStyles = {
  Low: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200',
  Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200',
  High: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200'
}

const TaskItem = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const isOverdue = task.deadline && !task.completed && new Date(task.deadline) < new Date(new Date().toISOString().split('T')[0])

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-soft transition hover:shadow-lg dark:border-slate-700/60 dark:bg-slate-900/90">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onToggleComplete}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl border transition ${
                task.completed
                  ? 'border-sky-600 bg-sky-100 text-sky-700 dark:border-sky-400 dark:bg-sky-500/20 dark:text-sky-200'
                  : 'border-slate-300 bg-slate-100 text-slate-600 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {task.completed ? '✓' : '○'}
            </button>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${priorityStyles[task.priority]}`}>
              {task.priority}
            </span>
          </div>

          <h3 className={`text-lg font-semibold ${task.completed ? 'text-slate-400 line-through dark:text-slate-500' : 'text-slate-950 dark:text-slate-100'}`}>
            {task.title}
          </h3>

          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
            <span>{task.deadline ? new Date(task.deadline).toLocaleDateString() : 'No deadline'}</span>
            <span className={`rounded-full px-3 py-1 ${isOverdue ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>
              {task.completed ? 'Completed' : isOverdue ? 'Overdue' : 'Pending'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <button
            type="button"
            onClick={onEdit}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2 text-rose-700 transition hover:bg-rose-100 dark:border-rose-800 dark:bg-rose-900/30 dark:text-rose-200 dark:hover:bg-rose-900/50"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskItem
