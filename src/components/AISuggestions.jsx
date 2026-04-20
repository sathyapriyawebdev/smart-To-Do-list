import { useEffect, useState } from 'react'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const DEFAULT_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta2/models/gemini-1.5-mini:generateText'

const AISuggestions = ({ tasks }) => {
  const [suggestion, setSuggestion] = useState('Loading smart suggestions...')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    const pendingTasks = tasks.filter((task) => !task.completed)
    const overdueTasks = pendingTasks.filter((task) => task.deadline && task.deadline < today)
    const todayTasks = pendingTasks.filter((task) => task.deadline === today)
    const highPriorityTasks = pendingTasks.filter((task) => task.priority === 'High')

    const fallbackSuggestion = () => {
      if (tasks.length === 0) {
        return 'No tasks yet — add your first task and keep your day organized.'
      }
      if (todayTasks.length > 0) {
        return `You have ${todayTasks.length} task${todayTasks.length > 1 ? 's' : ''} due today. Prioritize them first.`
      }
      if (overdueTasks.length > 0) {
        return `You have ${overdueTasks.length} overdue task${overdueTasks.length > 1 ? 's' : ''}. Resolve them quickly.`
      }
      if (highPriorityTasks.length > 1) {
        return 'Complete high priority tasks first to stay on track.'
      }
      if (pendingTasks.length > 5) {
        return 'You have too many pending tasks. Break them into smaller steps.'
      }
      return 'Nice work! Keep moving with your current priorities.'
    }

    if (!API_KEY) {
      setSuggestion(`${fallbackSuggestion()} (Set VITE_GEMINI_API_KEY in your .env for Gemini-powered suggestions.)`)
      return
    }

    if (tasks.length === 0) {
      setSuggestion(fallbackSuggestion())
      return
    }

    const endpoint = `${import.meta.env.VITE_GEMINI_API_ENDPOINT || DEFAULT_ENDPOINT}?key=${API_KEY}`
    const prompt = `You are an AI assistant for managing tasks.

Tasks:
${tasks
      .map((task, index) =>
        `${index + 1}. ${task.title} | Priority: ${task.priority} | Deadline: ${task.deadline || 'none'} | Status: ${task.completed ? 'Completed' : 'Pending'}`
      )
      .join('\n')}

Provide one concise suggestion to help the user prioritize tasks.`

    const fetchSuggestion = async () => {
      setLoading(true)
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            prompt: {
              text: prompt
            },
            temperature: 0.7,
            maxOutputTokens: 120
          })
        })

        if (!response.ok) {
          throw new Error(`Gemini API error ${response.status}`)
        }

        const data = await response.json()
        const text = data?.candidates?.[0]?.content || data?.candidates?.[0]?.output?.[0]?.content || ''
        setSuggestion(text || fallbackSuggestion())
      } catch (error) {
        setSuggestion(`${fallbackSuggestion()} (Gemini API unavailable.)`)
      } finally {
        setLoading(false)
      }
    }

    fetchSuggestion()
  }, [tasks])

  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-soft backdrop-blur-xl dark:border-slate-700/40 dark:bg-slate-900/90">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-500">AI Suggestion</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-slate-100">Smart ideas for your day</h2>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          AI Powered
        </span>
      </div>

      <p className="mt-5 min-h-[3rem] text-sm leading-7 text-slate-600 dark:text-slate-300">
        {loading ? 'Generating suggestion from Gemini...' : suggestion}
      </p>
    </section>
  )
}

export default AISuggestions
