import React, { useState, useEffect } from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import { useThemeToggle } from '../hooks/ThemeContext'
import Twemoji from './Twemoji'

const useStyles = createUseStyles(theme => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'flex-end',
        margin: 4,
        opacity: 0.7
    },
    button: {
        color: theme.colorSurfaceAccent,
        backgroundColor: 'transparent',
        boxSizing: 'border-box',
        border: '3px solid',
        borderColor: theme.colorSurfaceAccent,
        borderRadius: 16,
        height: 32,
        width: 56,
        margin: '0 4px',
        position: 'relative',
        cursor: 'pointer',
        transition: theme.colorTransition,
        outline: 'none !important',
    },
    switch: {
        backgroundColor: theme.colorSurfaceAccent,
        borderRadius: '50%',
        height: 22,
        width: 22,
        transition: theme.colorTransition + ', left 0.5s',
        position: 'absolute',
        top: 2,
        left: ({ isOn }) => isOn ? 26 : 2
    },
    emojiLeft: {
        position: 'absolute',
        top: 3,
        left: 3,
        opacity: ({ isOn }) => !isOn ? 0.2 : 1,
        transition: 'opacity 0.5s',
    },
    emojiRight: {
        position: 'absolute',
        top: 3,
        right: 3,
        opacity: ({ isOn }) => isOn ? 0.2 : 1,
        transition: 'opacity 0.5s',
    }
}))

export default () => {
    const theme = useTheme()
    const [isOn, setIsOn] = useState(false)
    const classes = useStyles({ isOn, theme })
    const toggleTheme = useThemeToggle()

    const onClick = () => {
        setIsOn(!isOn)
        toggleTheme()
    }

    return (
        <div className={classes.container}>
            <button onClick={onClick} className={classes.button}>
                <Twemoji emoji={'☀️'} size={20} className={classes.emojiLeft}/>
                <Twemoji emoji={'🌑'} size={20} className={classes.emojiRight}/>
                <div className={classes.switch}></div>
            </button>
        </div>
    )
}
