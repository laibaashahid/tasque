import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Calendar, CheckCircle2, Circle } from 'lucide-react';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('personal');
  const [selectedPriority, setSelectedPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [filter, setFilter] = useState('all');
  const [deleteAnimation, setDeleteAnimation] = useState(null);

  const categories = [
    { id: 'personal', label: 'Personal', color: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)' },
    { id: 'work', label: 'Work', color: 'linear-gradient(135deg, #e0e7ff 0%, #ddd6fe 100%)' },
    { id: 'health', label: 'Health', color: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)' },
    { id: 'learning', label: 'Learning', color: 'linear-gradient(135deg, #fef3c7 0%, #fcd34d 100%)' },
    { id: 'shopping', label: 'Shopping', color: 'linear-gradient(135deg, #fbcfe8 0%, #f9a8d4 100%)' },
  ];

  const priorities = [
    { id: 'low', label: 'Low', color: '#86efac' },
    { id: 'medium', label: 'Medium', color: '#fbbf24' },
    { id: 'high', label: 'High', color: '#f87171' },
  ];

  const getCategoryGradient = (catId) => {
    return categories.find(c => c.id === catId)?.color || 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)';
  };

  const getPriorityColor = (prioId) => {
    return priorities.find(p => p.id === prioId)?.color || '#f3f4f6';
  };

  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const task = {
      id: Date.now(),
      text: newTask,
      category: selectedCategory,
      priority: selectedPriority,
      dueDate: dueDate,
      completed: false,
      createdAt: new Date().toLocaleDateString(),
    };

    setTasks([task, ...tasks]);
    setNewTask('');
    setDueDate('');
    setSelectedPriority('medium');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTask = (id) => {
    setDeleteAnimation(id);
    setTimeout(() => {
      setTasks(tasks.filter(t => t.id !== id));
      setDeleteAnimation(null);
    }, 300);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  const completedCount = tasks.filter(t => t.completed).length;
  const completionRate = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const styles = {
    container: {
      background: 'linear-gradient(135deg, #faf8f5 0%, #f5f1ed 50%, #ede8e3 100%)',
      minHeight: '100vh',
      padding: '2rem 1rem',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    wrapper: {
      maxWidth: '900px',
      margin: '0 auto',
    },
    header: {
      marginBottom: '3rem',
      animation: 'fadeInDown 0.6s ease-out',
    },
    title: {
      fontSize: '2.8rem',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #d4456f 0%, #e8697a 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      margin: '0 0 0.5rem',
    },
    subtitle: {
      color: '#9b8b85',
      fontSize: '1.1rem',
      margin: 0,
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '1rem',
      marginBottom: '2rem',
      animation: 'fadeInUp 0.6s ease-out 0.1s both',
    },
    statCard: {
      background: 'white',
      padding: '1.5rem',
      borderRadius: '16px',
      textAlign: 'center',
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
      cursor: 'pointer',
    },
    form: {
      background: 'white',
      padding: '2rem',
      borderRadius: '20px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
      marginBottom: '2rem',
      animation: 'fadeInUp 0.6s ease-out 0.2s both',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.5)',
    },
    input: {
      width: '100%',
      padding: '1rem',
      border: '2px solid #f0e8e3',
      borderRadius: '12px',
      fontSize: '1rem',
      fontFamily: 'inherit',
      transition: 'all 0.3s',
      outline: 'none',
      boxSizing: 'border-box',
      marginBottom: '1.5rem',
    },
    button: {
      width: '100%',
      padding: '1rem',
      background: 'linear-gradient(135deg, #f4a5b0 0%, #ea7f92 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      boxShadow: '0 4px 15px rgba(244, 165, 176, 0.35)',
    },
    filters: {
      display: 'flex',
      gap: '0.5rem',
      marginBottom: '2rem',
      flexWrap: 'wrap',
      animation: 'fadeInUp 0.6s ease-out 0.3s both',
    },
    taskList: {
      display: 'grid',
      gap: '1rem',
      animation: 'fadeInUp 0.6s ease-out 0.4s both',
    },
  };

  const addKeyframesStyle = () => {
    return `
      @keyframes fadeInDown {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes slideOut {
        from {
          opacity: 1;
          transform: translateX(0);
        }
        to {
          opacity: 0;
          transform: translateX(100%);
        }
      }
      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.05);
        }
      }
    `;
  };

  return (
    <div style={styles.container}>
      <style>{addKeyframesStyle()}</style>
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <h1 style={styles.title}>Tasque</h1>
          <p style={styles.subtitle}>Keep track of what matters most</p>
        </div>

        <div style={styles.statsGrid}>
          <div
            style={styles.statCard}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.12)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
            }}
          >
            <p style={{ color: '#9b8b85', fontSize: '0.85rem', margin: '0 0 0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Total Tasks
            </p>
            <p style={{ fontSize: '2.5rem', fontWeight: '700', background: 'linear-gradient(135deg, #d4456f 0%, #e8697a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>
              {tasks.length}
            </p>
          </div>
          <div
            style={styles.statCard}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.12)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
            }}
          >
            <p style={{ color: '#9b8b85', fontSize: '0.85rem', margin: '0 0 0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Completed
            </p>
            <p style={{ fontSize: '2.5rem', fontWeight: '700', background: 'linear-gradient(135deg, #86efac 0%, #4ade80 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>
              {completedCount}
            </p>
          </div>
          <div
            style={styles.statCard}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.12)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
            }}
          >
            <p style={{ color: '#9b8b85', fontSize: '0.85rem', margin: '0 0 0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Progress
            </p>
            <p style={{ fontSize: '2.5rem', fontWeight: '700', background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>
              {completionRate}%
            </p>
          </div>
        </div>

        <form onSubmit={addTask} style={styles.form}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="What's on your mind today..."
            style={styles.input}
            onFocus={(e) => e.target.style.borderColor = '#ea7f92'}
            onBlur={(e) => e.target.style.borderColor = '#f0e8e3'}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', color: '#5a4a42', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #f0e8e3',
                  borderRadius: '10px',
                  fontSize: '0.95rem',
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'all 0.3s',
                }}
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', color: '#5a4a42', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Priority
              </label>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #f0e8e3',
                  borderRadius: '10px',
                  fontSize: '0.95rem',
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'all 0.3s',
                }}
              >
                {priorities.map(prio => (
                  <option key={prio.id} value={prio.id}>{prio.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', color: '#5a4a42', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #f0e8e3',
                  borderRadius: '10px',
                  fontSize: '0.95rem',
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'all 0.3s',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 20px rgba(244, 165, 176, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(244, 165, 176, 0.35)';
            }}
          >
            <Plus size={20} />
            Add Task
          </button>
        </form>

        <div style={styles.filters}>
          {['all', 'active', 'completed'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '0.6rem 1.2rem',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                background: filter === f ? 'linear-gradient(135deg, #f4a5b0 0%, #ea7f92 100%)' : 'white',
                color: filter === f ? 'white' : '#9b8b85',
                boxShadow: filter === f ? '0 4px 12px rgba(244, 165, 176, 0.3)' : 'none',
                textTransform: 'capitalize',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        <div style={styles.taskList}>
          {filteredTasks.length === 0 ? (
            <div style={{
              background: 'white',
              padding: '3rem 2rem',
              borderRadius: '16px',
              textAlign: 'center',
              color: '#9b8b85',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              animation: 'fadeInUp 0.6s ease-out',
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.3 }}>✨</div>
              <p style={{ fontSize: '1.1rem', margin: 0 }}>
                {tasks.length === 0 ? 'No tasks yet. Add one to get started!' : 'No tasks in this view.'}
              </p>
            </div>
          ) : (
            filteredTasks.map((task, idx) => (
              <div
                key={task.id}
                style={{
                  background: 'white',
                  padding: '1.25rem',
                  borderRadius: '14px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'flex-start',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  opacity: deleteAnimation === task.id ? 0 : 1,
                  transform: deleteAnimation === task.id ? 'translateX(100%)' : 'translateX(0)',
                  animation: `fadeInUp 0.5s ease-out ${0.05 * idx}s both`,
                }}
                onMouseOver={(e) => {
                  if (deleteAnimation !== task.id) {
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseOut={(e) => {
                  if (deleteAnimation !== task.id) {
                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                <button
                  onClick={() => toggleComplete(task.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '0.25rem',
                    color: task.completed ? '#86efac' : '#d4c5bb',
                    transition: 'all 0.3s',
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'scale(1.15)';
                    e.target.style.color = '#4ade80';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.color = task.completed ? '#86efac' : '#d4c5bb';
                  }}
                >
                  {task.completed ? (
                    <CheckCircle2 size={24} />
                  ) : (
                    <Circle size={24} />
                  )}
                </button>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    margin: '0 0 0.5rem',
                    fontSize: '1.05rem',
                    fontWeight: '500',
                    color: '#5a4a42',
                    textDecoration: task.completed ? 'line-through' : 'none',
                    textDecorationColor: '#ccc',
                    transition: 'all 0.3s',
                  }}>
                    {task.text}
                  </p>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.35rem 0.85rem',
                      borderRadius: '20px',
                      background: getCategoryGradient(task.category),
                      color: '#5a4a42',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}>
                      {categories.find(c => c.id === task.category)?.label}
                    </span>

                    <span style={{
                      display: 'inline-block',
                      padding: '0.35rem 0.85rem',
                      borderRadius: '20px',
                      background: getPriorityColor(task.priority),
                      color: '#5a4a42',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}>
                      {priorities.find(p => p.id === task.priority)?.label}
                    </span>

                    {task.dueDate && (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        color: '#9b8b85',
                        fontSize: '0.85rem',
                      }}>
                        📅 {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => deleteTask(task.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    color: '#d4a5ad',
                    transition: 'all 0.2s',
                  }}
                  onMouseOver={(e) => {
                    e.target.style.color = '#f4a5b0';
                    e.target.style.transform = 'scale(1.2) rotate(20deg)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.color = '#d4a5ad';
                    e.target.style.transform = 'scale(1) rotate(0)';
                  }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;