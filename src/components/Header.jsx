const Header = ({ darkMode, setDarkMode }) => {
  return (
    <header className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200/80 bg-white/80 px-6 py-6 shadow-soft backdrop-blur-xl dark:border-slate-700/40 dark:bg-slate-900/80 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-sky-500">Smart To-Do AI</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white sm:text-4xl">
          Keep your tasks smart, fast, and focused.
        </h1>
      </div>

      <button
        type="button"
        onClick={() => setDarkMode((prev) => !prev)}
        className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
      >
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
    </header>
  )
}

export default Header
