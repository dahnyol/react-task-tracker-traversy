import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Task from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'
import TaskDetails from './components/TaskDetails'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    // fetch to dummy json server
    const response = await fetch('http://localhost:5000/tasks')
    const data = await response.json()
    
    return data
  }

  // Fetch Task
   const fetchTask = async (id) => {
    const response = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await response.json()
    
    return data
  }

  // Add Task
  const addTask = async (task) => {
    const response = await fetch(`http://localhost:5000/tasks`, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      })
    const data = await response.json()

    setTasks([...tasks, data])
    // create id for now
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, 
      {
        method: 'DELETE',
      })
    // show us the items whose id does not match the selected, filter out the element that is clicked on, set as state.
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
    
    const response = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await response.json()

    setTasks(
      tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task)
    )
  }

  return (
    <Router>
      <div className="container">
        <Header 
          onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}
        />
        <Routes>
          <Route 
            path='/'
            element={
            <>
              {showAddTask && <AddTask onAdd={addTask}/>}
              
              {tasks.length > 0 ? 
              <Task 
                tasks={tasks} 
                onDelete={deleteTask} 
                onToggle={toggleReminder}
              /> 
              : 'No Tasks to Show'}
            </>
            }
          />        
          <Route path='/about' element={<About />}
          />
          <Route path='/task/:id' element={<TaskDetails />}
          />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

// class App extends React.Component {
//   render(){
//     return (
//       <div className="container">
//        <Header />
//        <h1>Hello from a class</h1>
//       </div>
//     )
//   }
// }

export default App;