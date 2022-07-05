import React from "react"

const Hello = () => {
	const memojis = ["/images/memoji_1.png", "/images/memoji_2.png"]
	const [hovered, setHovered] = React.useState(false)

	return (
		<div className="not-prose flex items-center gap-x-size-sm">
			<div
				className="flex h-36 w-36 justify-center"
				onMouseEnter={() => {
					setHovered(true)
				}}
				onMouseLeave={() => {
					setHovered(false)
				}}
			>
				{hovered ? (
					<img src={memojis[1]} className="m-0 h-36 rounded-full" />
				) : (
					<img src={memojis[0]} className="m-0 h-36 rounded-full" />
				)}
			</div>
			<h2
				className="decoration-6 font-bold underline decoration-alice-400 decoration-4 "
				style={{ fontSize: "var(--size-2)" }}
			>
				Hi!
			</h2>
		</div>
	)
}

export default Hello
