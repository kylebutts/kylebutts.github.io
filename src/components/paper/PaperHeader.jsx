import { For } from "solid-js"

const AuthorLink = function({ author }) {
  return (
    <a href={author.url} class="underline">{author.name}</a>
  )
}

export default function PaperHeader({ data }) {
	return (
		<div class="mt-size-sm">
			<h2
				class="font-white dark:font-mine-shaft-900 text-size-2 font-bold tracking-tighter"
				innerHTML={data.title}
        transition:name={data.slug}
			></h2>

			<p class="mt-size-xs text-size-1 tracking-tight">
				<For each={data.author}>
					{(author, i) => {
            if (data.author.length == 1) {
              return (<AuthorLink author={author} />)
            } else if (data.author.length == 2 & i() == 0) {
              return (<><AuthorLink author={author} /> </>)
            } else if ((data.author.length - 1) == i()) {
              return (<><span>and </span><AuthorLink author={author} /></>)
            } else {
              return (<><AuthorLink author={author} />, </>)
            }
          }}
				</For>
			</p>

			<h3
				class="mt-size-3xs text-size-1 font-light text-alice-500"
				innerHTML={data.status}
			></h3>

      <Show when={data.summary}>
        <div class="mt-size-md">
          <p innerHTML={data.summary} class="text-size-0" />
        </div>
      </Show>

      {/* <p class="mt-size-sm text-mine-shaft-400 font-bold tracking-tight text-size-0">Links:</p> */}
      <ul role="list" class="mt-size-md flex flex-row flex-wrap gap-size-2xs">
        {data.links.map((link, i) => (
          <li class="text-size--1 italic inline-flex items-center rounded-md border-2 border-mine-shaft-200 hover:border-alice-400 px-2.5 py-0.5 transition-colors bg-mine-shaft-100 text-mine-shaft-700 ">
            <a href={link.url}>{link.name}</a>
          </li>
        ))}
      </ul> 
		</div>
	)
}

