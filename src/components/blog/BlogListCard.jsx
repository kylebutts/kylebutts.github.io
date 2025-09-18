export default function BlogCard({ post }) {
  // 2023-02-17 -> February 17th, 2023
  let dateText = new Date(post.data.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  return (
    <li class="border-l-2 border-zinc-200 hover:border-kyle-highlight px-4 py-2">
      <h2 class="font-white cursor-pointer text-size-1 font-bold">
        <a
          href={`/blog/${post.slug}`}
          innerHTML={`${post.data.draft ? "🚧 " : ""}${post.data.title}`}
        ></a>
      </h2>

      <p class="mt-size-3xs text-size--1 text-zinc-400">
        <time datetime={post.data.date}>{dateText}</time>
      </p>

      <p
        innerHTML={post.data.description}
        class="mt-size-2xs md:mt-size-xs text-size--1"
      ></p>
    </li>
  );
}
