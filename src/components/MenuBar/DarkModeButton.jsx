import React, { useState, useEffect } from "react"
import { SunIcon, MoonIcon } from "@heroicons/react/solid/index.js"

// Note SetupDarkMode.astro already ensures local storage is already
// setup while using prefersDarkMode
const DarkModeButton = () => {
	// Declare a new state variable, which we'll call "count"
	const initial = localStorage.getItem("theme")
	const [theme, setTheme] = useState(initial)

	useEffect(() => {
		if (theme == "dark") {
			document.documentElement.classList.add("dark")
			localStorage.setItem("theme", "dark")
		} else {
			document.documentElement.classList.remove("dark")
			localStorage.setItem("theme", "light")
		}
	}, [theme])

	return (
		<button aria-label="Dark Mode Toggle" onClick={() => setTheme(theme == "light" ? "dark" : "light")}>
			{theme == "light" ? (
				<MoonIcon className="h-5 w-5 text-alice-500 dark:text-alice-400 cursor-pointer" />
			) : (
				<SunIcon className="h-5 w-5 text-alice-500 dark:text-alice-400 cursor-pointer" />
			)}
		</button>
	)
}

export default DarkModeButton
