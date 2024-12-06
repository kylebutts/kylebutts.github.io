export default function BlogCard({ post }) {
  // 2023-02-17 -> February 17th, 2023
  let dateText = new Date(post.data.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (

    <li class="border-l-2 border-mine-shaft-200 hover:border-mine-shaft-800 transition-all duration-200 px-4 py-2">
    
      <p class="text-size--1 text-mine-shaft-400" ><time datetime={post.data.date}>
        {dateText}
      </time></p>
      
      <h2
        class="mt-2 font-white cursor-pointer text-size-1 font-bold"
      >
        <a href={`/blog/${post.slug}`} innerHTML={post.data.title}></a>
      </h2>

      <p 
        innerHTML={post.data.description} 
        class="mt-size-2xs md:mt-size-xs text-size--1" 
      ></p>
    </li>
  );
}
