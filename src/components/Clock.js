import React, { useState, useEffect } from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import { useTime } from '../hooks/TimesyncContext'
import { useSocket } from '../hooks/SocketContext'
import Twemoji from './Twemoji'

const useStyles = createUseStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.colorSurface,
    transition: theme.colorTransition,
    marginTop: 200,
    marginBottom: 80
  },
  display: {
    width: 200,
    height: 200,
    padding: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid',
    borderColor: theme.colorContrast,
    color: theme.colorContrast,
    borderRadius: '50%',
    boxSizing: 'border-box',
    transition: theme.colorTransition,
  },
  number: {
    fontSize: 100,
    textAlign: 'center',
    lineHeight: 100,
    height: 100,
    display: 'flex',
    alignItems: 'center',
    transition: theme.colorTransition,
  },
  button: {
    color: theme.colorContrast,
    backgroundColor: 'transparent',
    boxSizing: 'border-box',
    border: 0,
    padding: 10,
    display: 'flex',
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
    transition: 'opacity 0.5s',
    outline: 'none !important',
    cursor: props => props.disabled ? 'initial' : 'pointer',
    transition: theme.colorTransition + ', opacity 0.5s',
    '&:hover': {
      opacity: props => props.disabled ? 0.5 : 1
    }
  },
  buttonText: {
    fontFamily: 'Montserrat',
    fontSize: 24,
  },
  '@media (max-width: 767.98px)': {
    container: {
      marginTop: '80px',
    }
  }
}))

const buttonTexts = [
  'You ready?', 
  'Ready?', 
  'Let\'s clap at five.', 
  'Top of the minute.', 
  'Thirty seconds?', 
  'You good?', 
  'Alright, ready?', 
  'Ready when you are.',
  'Good to go?',
  'Oh that was a good clap.',
  'God that was a weak clap.',
  'Clap at ten?',
  'Ready whenever.',
  'Ah let\'s do another one, mine was bad.',
  'Alright, I\'m set.'
]

export default () => {
  const theme = useTheme()
  const now = useTime(5)
  const [clapTime, setClapTime] = useState(0)
  const [buttonTextIndex, setButtonTextIndex] = useState(0)
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [waiting, setWaiting] = useState(false)
  const setButtonText = () => setButtonTextIndex(Math.floor(Math.random() * buttonTexts.length))
  const socket = useSocket()
  const classes = useStyles({disabled: buttonDisabled, theme})

  useEffect(() => {
    socket.on('clap', date => {
      setClapTime(date)
      setWaiting(true)
      if (!buttonDisabled) {
        setButtonDisabled(true)
      }
    })
  }, [])

  const startClap = () => {
    console.log('beginning clap...')
    socket.emit('begin')
    setButtonDisabled(true)
  }

  const timeRemaining = clapTime - now + 1000

  let display
  if (waiting) {
    if (timeRemaining > 0) {
      const secondsRemaining = Math.floor(timeRemaining / 1000)
      if (secondsRemaining > 0) {
        display = <div className={classes.number}>{secondsRemaining}</div>
      }
      else {
        display = <Twemoji emoji={'👏'} size={'100%'}/>
      }
    }
    else {
      setButtonDisabled(false)
      setWaiting(false)
      setButtonText()
    }
  }
  
  return (
    <div className={classes.container}>
      <div className={classes.display}>{ display }</div>
      <button className={classes.button} onClick={startClap} disabled={buttonDisabled}>
        <div className={classes.buttonText}>{'"' + buttonTexts[buttonTextIndex] + '"'}</div>
      </button>
    </div>
  )
}
