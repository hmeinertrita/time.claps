import React from 'react'
import twemoji from 'twemoji'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    container: {
        width: ({size}) => size,
        height: ({size}) => size,
        display: ({inline}) => inline ? 'inline-block' : 'block'
    },
    image: {
        width: ({size}) => size,
        height: ({size}) => size,
    }
})

export default ({ emoji, size, inline, className }) => {
    const classes = useStyles({size, inline})
    return (<div
        className={[classes.container, className].join(' ')}
        dangerouslySetInnerHTML={{
            __html: twemoji.parse(typeof emoji === 'string' ? emoji : '', {
                folder: 'svg',
                ext: '.svg',
                className: classes.image
            })
        }}
    />)
}