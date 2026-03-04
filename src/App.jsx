import { useState } from 'react'
import { LayoutDashboard, CheckSquare, Clock } from 'lucide-react'
import { useTasks } from './hooks/useTasks'
import { TaskList } from './components/TaskList'
import { TaskModal } from './components/TaskModal'
import './App.css'

function App() {
  const { tasks, addTask, updateTask, toggleTask, deleteTask, stats } = useTasks()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState(null)
  const [filter, setFilter] = useState('all')

  // Date formatting for header
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  })

  // Dynamic greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return { text: 'Good Morning', emoji: '☀️' }
    if (hour < 17) return { text: 'Good Afternoon', emoji: '🌤️' }
    if (hour < 21) return { text: 'Good Evening', emoji: '🌆' }
    return { text: 'Good Night', emoji: '🌙' }
  }
  const greeting = getGreeting()

  // Handlers for modal
  const handleOpenModal = (task = null) => {
    setTaskToEdit(task)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTaskToEdit(null)
  }

  const handleSaveTask = (idOrData, data) => {
    if (taskToEdit) {
      updateTask(idOrData, data)
    } else {
      addTask(idOrData)
    }
  }

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="logo-section">
          <CheckSquare className="logo-icon" size={28} />
          <span className="text-gradient">TaskFlow</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
          <div
            style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              color: filter === 'all' ? 'var(--text-primary)' : 'var(--text-secondary)',
              padding: '0.75rem 1rem',
              background: filter === 'all' ? 'var(--glass-bg)' : 'transparent',
              border: filter === 'all' ? '1px solid var(--glass-border)' : '1px solid transparent',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              transition: 'var(--transition-fast)'
            }}
            onClick={() => setFilter('all')}
          >
            <LayoutDashboard size={20} />
            <span style={{ fontWeight: 500 }}>Dashboard</span>
          </div>
          <div
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              color: filter === 'active' ? 'var(--text-primary)' : 'var(--text-secondary)',
              padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)',
              background: filter === 'active' ? 'var(--glass-bg)' : 'transparent',
              border: filter === 'active' ? '1px solid var(--glass-border)' : '1px solid transparent',
              cursor: 'pointer',
              transition: 'var(--transition-fast)'
            }}
            onClick={() => setFilter('active')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Clock size={20} />
              <span>Pending Tasks</span>
            </div>
            {stats.pending > 0 && (
              <span style={{ background: 'var(--accent-primary)', color: 'white', fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '10px', fontWeight: 600 }}>
                {stats.pending}
              </span>
            )}
          </div>
        </nav>

        <div style={{ marginTop: 'auto', padding: '1.5rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
          <h4 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>Task Progress</h4>
          <div style={{ width: '100%', height: '6px', background: 'var(--bg-secondary)', borderRadius: '3px', overflow: 'hidden', marginBottom: '0.5rem' }}>
            <div style={{
              width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%`,
              height: '100%',
              background: 'var(--gradient-main)',
              transition: 'var(--transition-slow)'
            }} />
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textAlign: 'right' }}>
            {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}% Completed
          </p>
        </div>
      </aside>

      <main className="main-content">
        <header style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
              {today}
            </p>
            <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem', letterSpacing: '-0.025em' }}>
              {greeting.text} {greeting.emoji}
            </h1>
            <p style={{ color: 'var(--text-tertiary)' }}>
              {stats.pending === 0
                ? "You've completed all your tasks!"
                : `You've got ${stats.pending} task${stats.pending === 1 ? '' : 's'} to complete today.`}
            </p>
          </div>
        </header>

        <section className="glass-panel" style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', minHeight: '400px' }}>
          <TaskList
            tasks={tasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={handleOpenModal}
            onAdd={() => handleOpenModal()}
            filter={filter}
            onFilterChange={setFilter}
          />
        </section>
      </main>

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTask}
        taskToEdit={taskToEdit}
      />
    </div>
  )
}

export default App
