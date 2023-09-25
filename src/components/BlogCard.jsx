export default function BlogCard({ post }) {
  // 2023-02-17 -> February 17th, 2023
  let dateText = new Date(post.data.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  console.log(post)

  return (
    <a href={`/blog/${post.slug}`} class="rounded-lg border-2 border-mine-shaft-200 transition-all duration-100 bg-mine-shaft-50 dark:bg-mine-shaft-800 dark:border-mine-shaft-700 shadow-sm p-size-xs md:p-size-sm hover:border-alice-300 dark:hover:border-alice-600 hover:cursor-pointer">
      <p class="mb-size-sm text-size--1 text-mine-shaft-400 dark:text-mine-shaft-500" ><time datetime={post.data.date}>
        {dateText}
      </time></p>
      <h2
        class="font-white dark:font-mine-shaft-900 cursor-pointer text-size-2 font-bold tracking-tighter"
        innerHTML={post.data.title}
      />

      <p 
        innerHTML={post.data.description} 
        class="mt-size-2xs md:mt-size-xs text-size-0" 
      ></p>
    </a>
  );
}
