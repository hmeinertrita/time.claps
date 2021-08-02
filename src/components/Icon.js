import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    containter: {
        width: ({size}) => size,
        height: ({size}) => size
    },
    icon: {
        width: '100% !important',
        height: '100% !important',
        display: ({inline}) => inline ? 'inline-block' : 'block',
        color: ({color}) => color
    }
})

export default ({icon, size, color, inline}) => {
    const classes = useStyles({size, color, inline})
    return <div className={classes.containter}>
        <FontAwesomeIcon icon={icon} className={classes.icon} />
    </div>
}