import React, { createContext, useState, useContext, useEffect } from 'react'
import { useSocket } from './SocketContext'

const ts = require('timesync')
const TimesyncContext = createContext({})

const TimesyncProvider = props => {
  const socket = useSocket()
  const [timesync] = useState(ts.create({
    server: socket,
    interval: 5000
  }))

  timesync.send = function (_socket, data, timeout) {
    return new Promise(function (resolve, reject) {
      var timeoutFn = setTimeout(reject, timeout)
      _socket.emit('timesync', data, function () {
        clearTimeout(timeoutFn)
        resolve()
      })
    })
  }

  socket.on('timesync', function (data) {
    timesync.receive(null, data)
  })

  return (
    <TimesyncContext.Provider value={timesync}>
      {props.children}
    </TimesyncContext.Provider>
  )
}

const useTime = interval => {
  const timesync = useContext(TimesyncContext)
  const [now, setNow] = useState(timesync.now())
  useEffect(() => {
    setInterval(() => {
      setNow(timesync.now())
    }, interval)
  }, [interval])
  return now
}

const useAlarm = () => {
  const timesync = useContext(TimesyncContext)
  return (date, cb) => {
    const timer = setTimeout(cb, date - timesync.now())
    return function cancel() {
      clearTimeout(timer)
    }
  }
}

const useNow = () => {
  const timesync = useContext(TimesyncContext)
  return timesync.now
}

export { TimesyncProvider, TimesyncContext, useTime, useAlarm, useNow }
