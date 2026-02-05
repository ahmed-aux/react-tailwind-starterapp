/** @satisfies {import('@webcontainer/api').FileSystemTree} */

export const files = {
  "index.html": {
    file: {
      contents: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React WebContainer App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,
    },
  },
  src: {
    directory: {
      "main.tsx": {
        file: {
          contents: `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`,
        },
      },
      "App.tsx": {
        file: {
          contents: `import { useState } from 'react'

interface Todo {
  id: number;
  text: string;
}

function App() {
  const [count, setCount] = useState<number>(0)
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState<string>('')

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input }])
      setInput('')
    }
  }

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h1 style={{ color: '#3b82f6' }}>React + Vite WebContainer 🚀</h1>
      
      <div style={{ marginTop: '30px', padding: '20px', background: '#f3f4f6', borderRadius: '8px' }}>
        <h2>Counter Demo</h2>
        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Count: {count}</p>
        <button 
          onClick={() => setCount(count + 1)}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            marginRight: '10px'
          }}
        >
          Increment
        </button>
        <button 
          onClick={() => setCount(0)}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          Reset
        </button>
      </div>

      <div style={{ marginTop: '30px', padding: '20px', background: '#f3f4f6', borderRadius: '8px' }}>
        <h2>Todo List Demo</h2>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Enter a todo..."
            style={{
              flex: 1,
              padding: '10px',
              fontSize: '16px',
              border: '2px solid #d1d5db',
              borderRadius: '5px'
            }}
          />
          <button 
            onClick={addTodo}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              background: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '5px'
            }}
          >
            Add
          </button>
        </div>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {todos.map(todo => (
            <li 
              key={todo.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px',
                marginBottom: '8px',
                background: 'white',
                borderRadius: '5px'
              }}
            >
              <span>{todo.text}</span>
              <button
                onClick={() => removeTodo(todo.id)}
                style={{
                  padding: '5px 10px',
                  cursor: 'pointer',
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  fontSize: '14px'
                }}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
        {todos.length === 0 && (
          <p style={{ color: '#6b7280', textAlign: 'center' }}>No todos yet. Add one above!</p>
        )}
      </div>

      <div style={{ marginTop: '30px', padding: '15px', background: '#dbeafe', borderRadius: '8px' }}>
        <p style={{ margin: 0, fontSize: '14px' }}>
          ✨ <strong>Edit src/App.tsx</strong> to see changes instantly with HMR (Hot Module Replacement)
        </p>
      </div>
    </div>
  )
}

export default App`,
        },
      },
      "index.css": {
        file: {
          contents: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #ffffff;
  color: #1f2937;
}

#root {
  min-height: 100vh;
}`,
        },
      },
    },
  },
  "package.json": {
    file: {
      contents: `{
  "name": "vite-react-webcontainer",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "start": "vite --port 3111 --host"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.3.0",
    "vite": "^5.1.0"
  }
}`,
    },
  },
  "vite.config.js": {
    file: {
      contents: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3111,
    strictPort: true,
    watch: {
      usePolling: true,
    },
    hmr: {
      port: 3111,
      overlay: true,
    }
  }
})`,
    },
  },
  "tsconfig.json": {
    file: {
      contents: `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}`,
    },
  },
};
