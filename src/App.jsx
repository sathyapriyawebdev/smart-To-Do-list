import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import AISuggestions from './components/AISuggestions'

const STORAGE_TASKS_KEY = 'smart-todo-tasks'
const STORAGE_THEME_KEY = 'smart-todo-theme'
const priorityWeight = {
  High: 1,
  Medium: 2,
  Low: 3
}

function App() {
  const [tasks, setTasks] = useState([])
  const [selectedTask, setSelectedTask] = useState(null)
  const [filter, setFilter] = useState('All')
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const savedTasks = window.localStorage.getItem(STORAGE_TASKS_KEY)
    const savedTheme = window.localStorage.getItem(STORAGE_THEME_KEY)
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks))
      } catch (error) {
        setTasks([])
      }
    }
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark')
    } else {
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_TASKS_KEY, JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    window.localStorage.setItem(STORAGE_THEME_KEY, darkMode ? 'dark' : 'light')
  }, [darkMode])

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1
      }
      const priorityDiff = priorityWeight[a.priority] - priorityWeight[b.priority]
      if (priorityDiff !== 0) return priorityDiff
      if (!a.deadline) return 1
      if (!b.deadline) return -1
      return new Date(a.deadline) - new Date(b.deadline)
    })
  }, [tasks])

  const filteredTasks = useMemo(() => {
    if (filter === 'Completed') return sortedTasks.filter((task) => task.completed)
    if (filter === 'Pending') return sortedTasks.filter((task) => !task.completed)
    if (filter === 'High Priority') return sortedTasks.filter((task) => task.priority === 'High')
    return sortedTasks
  }, [filter, sortedTasks])

  const addOrUpdateTask = (taskData) => {
    if (selectedTask) {
      setTasks((prev) =>
        prev.map((task) => (task.id === selectedTask.id ? { ...task, ...taskData } : task))
      )
      setSelectedTask(null)
      return
    }

    const newTask = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title: taskData.title,
      priority: taskData.priority,
      deadline: taskData.deadline,
      completed: false,
      createdAt: new Date().toISOString()
    }
    setTasks((prev) => [newTask, ...prev])
  }

  const handleEditTask = (task) => {
    setSelectedTask(task)
  }

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
    if (selectedTask?.id === taskId) setSelectedTask(null)
  }

  const handleToggleComplete = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <AISuggestions tasks={tasks} />
            <TaskForm onSubmit={addOrUpdateTask} selectedTask={selectedTask} onCancel={() => setSelectedTask(null)} />
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-soft backdrop-blur-xl dark:border-slate-700/40 dark:bg-slate-900/80">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Your Tasks</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Filter, complete, and manage everything from a clean dashboard.
            </p>
            <TaskList
              tasks={filteredTasks}
              filter={filter}
              setFilter={setFilter}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onToggleComplete={handleToggleComplete}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
