import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count => count + 1)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-5 rounded">
      {count}
    </button>
  )
}

export default App
