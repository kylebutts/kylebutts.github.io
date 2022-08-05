import React from "react"

const Hello = () => {
	const memojis = [
		"/images/memoji_1.png",
		"/images/memoji_2.png",
		"/images/memoji_3.png",
	]
	const [hovered, setHovered] = React.useState(false)

	return (
		<div className="not-prose flex items-center gap-x-size-sm">
			<div className="flex h-36 w-36 justify-center">
				<img src={memojis[2]} alt="A memoji of Kyle Butts face-palming"  className="m-0 h-36 rounded-full" />
			</div>
			<h2
				className="decoration-6 font-bold underline decoration-alice-400 decoration-4 "
				style={{ fontSize: "var(--size-2)" }}
			>
				Uhoh
			</h2>
		</div>
	)
}

export default Hello
