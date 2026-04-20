import TaskItem from './TaskItem'

const filters = ['All', 'Completed', 'Pending', 'High Priority']

const TaskList = ({ tasks, filter, setFilter, onEdit, onDelete, onToggleComplete }) => {
  return (
    <div className="mt-6 space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        {filters.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setFilter(option)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              filter === option
                ? 'bg-slate-900 text-white dark:bg-slate-200 dark:text-slate-950'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {tasks.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300/80 bg-slate-50 px-6 py-8 text-center text-slate-500 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-400">
          <p className="text-lg font-medium">No tasks to show</p>
          <p className="mt-2 text-sm">Add a new task to get started or adjust your filter.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={() => onEdit(task)}
              onDelete={() => onDelete(task.id)}
              onToggleComplete={() => onToggleComplete(task.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default TaskList
