import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)
const STORAGE_KEY = 'cwh_theme'

function getInitialTheme() {
    if (typeof window === 'undefined') return 'light'
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(getInitialTheme)

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark')
        localStorage.setItem(STORAGE_KEY, theme)
    }, [theme])

    const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
    const ctx = useContext(ThemeContext)
    if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
    return ctx
}
