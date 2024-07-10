import Header from './components/Header'
import Task from './components/Tasks'
import AddTask from './components/AddTask'
import { useState } from 'react'


function App() {
  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([
    {
        id: 1,
        text: 'Soccer Practice',
        day: 'Jan 10th, 20:30',
        reminder: true,
    },
    {
        id: 2,
        text: 'Doctor Appointment',
        day: 'Aug 14th, 1:30',
        reminder: false,
    },
    {
        id: 3,
        text: 'Food shopping',
        day: 'Feb 5th, 14:30',
        reminder: false,
    },
])

  // Add Task
  const addTask = (task) => {
    // create id for now
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask = (id) => {
    // show us the items whose id does not match the selected, filter out the element that is clicked on, set as state.
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task)
    )
  }

  return (
    <div className="container">
      <Header 
        onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}
      />
      
      {showAddTask && <AddTask onAdd={addTask}/>}
      
      {tasks.length > 0 ? 
      <Task 
        tasks={tasks} 
        onDelete={deleteTask} 
        onToggle={toggleReminder}
      /> 
      : 'No Tasks to Show'}
    </div>
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