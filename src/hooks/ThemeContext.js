import React, { useState, useContext, createContext } from 'react'
import { ThemeProvider as JSSThemeProvider } from 'react-jss'

const darkTheme = {
    colorSurface: '#071e3d',
    colorSurfaceAccent: '#1f4287',
    colorContrastLess: '#278ea5',
    colorContrast: '#21e6c1',
}

const lightTheme = {
    colorSurface: '#f1f6f9',
    colorSurfaceAccent: '#9ba4b4',
    colorContrastLess: '#394867',
    colorContrast: '#14274e',
}

const globalTheme = {
    colorTransition: 'color 0.5s, background-color 0.5s, border-color 0.5s'
}

const ThemeContext = createContext({})

const ThemeProvider = ({children}) => {
    const [isDark, setIsDark] = useState(true)
    return <ThemeContext.Provider value={{setIsDark, isDark}}>
        <JSSThemeProvider theme={{...globalTheme, ...(isDark ? darkTheme : lightTheme)}}>
            {children}
        </JSSThemeProvider>
    </ThemeContext.Provider>
}

const useThemeToggle = () => {
    const {isDark, setIsDark} = useContext(ThemeContext)
    return () => {
        setIsDark(!isDark)
    }
}

export {ThemeProvider, useThemeToggle}