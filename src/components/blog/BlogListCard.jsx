export default function BlogCard({ post }) {
  // 2023-02-17 -> February 17th, 2023
  let dateText = new Date(post.data.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  return (
    <li >
      <h2 class="listing-title">
        <a
          href={`/blog/${post.id}`}
          innerHTML={`${post.data.draft ? "🚧 " : ""}${post.data.title}`}
        ></a>
      </h2>

      <p class="listing-date">
        <time datetime={post.data.date}>{dateText}</time>
      </p>

      <p
        innerHTML={post.data.description}
        class="listing-description"
      ></p>
    </li>
  );
}
