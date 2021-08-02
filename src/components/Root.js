import React from 'react'
import { useTheme, createUseStyles } from 'react-jss'
import 'fontsource-montserrat'

const useStyles = createUseStyles(theme => ({
    root: {
        width: '100vw',
        height: '100vh',
        color: theme.colorContrast,
        backgroundColor: theme.colorSurface,
        transition: theme.colorTransition,
        fontFamily: 'Montserrat',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden'
    }
}))

export default ({children}) => {
    const theme = useTheme()
    const classes = useStyles({theme})

    return <div className={classes.root} >{children}</div>
}