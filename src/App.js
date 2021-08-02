import React from 'react'
import './App.css'
import Clock from './components/Clock'
import ThemeToggle from './components/ThemeToggle'
import Root from './components/Root'
import { SocketProvider } from './hooks/SocketContext'
import { TimesyncProvider } from './hooks/TimesyncContext'
import { ThemeProvider } from './hooks/ThemeContext'

function App() {
  return (
    <div className="App">
      <SocketProvider>
        <TimesyncProvider>
          <ThemeProvider>
            <Root>
              <ThemeToggle/>
              <Clock />
            </Root>
          </ThemeProvider>
        </TimesyncProvider>
      </SocketProvider>
    </div>
  );
}

export default App;
