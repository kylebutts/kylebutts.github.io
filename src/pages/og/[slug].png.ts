import { getCollection } from "astro:content";
import { generateOGImage } from "../../utils/generateOG";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params }) => {
  try {
    const slug = params.slug;
    if (!slug) {
      return new Response("Missing slug parameter", { status: 400 });
    }

    // Decode the slug in case it has URL encoding
    const decodedSlug = decodeURIComponent(slug);

    // Try to find the content in different collections
    const [blogPosts, papers] = await Promise.all([
      getCollection("blog", ({ data }) => !data.draft),
      getCollection("papers", ({ data }) => !data.draft),
    ]);

    let content: any = undefined;

    // Look for blog post first
    content = blogPosts.find((post) => post.slug === decodedSlug);

    // If not found in blog, look in papers
    if (!content) {
      content = papers.find((paper) => paper.slug === decodedSlug);
    }

    // If still not found, try to match by title
    if (!content) {
      content = [...blogPosts, ...papers].find(
        (item) =>
          item.data.title.toLowerCase() === decodedSlug.toLowerCase() ||
          item.data.title === decodedSlug,
      );
    }

    if (!content) {
      return new Response("Content not found", { status: 404 });
    }

    // Generate the OG image
    const imageBuffer = await generateOGImage({
      title: content.data.title,
      author: content.data.author || "Kyle Butts",
    });

    return new Response(imageBuffer as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error generating OG image:", error);
    return new Response("Error generating image", { status: 500 });
  }
};

export async function getStaticPaths() {
  const [blogPosts, papers] = await Promise.all([
    getCollection("blog", ({ data }) => !data.draft),
    getCollection("papers", ({ data }) => !data.draft),
  ]);

  const paths = [
    ...blogPosts.map((post) => ({
      params: { slug: post.slug },
    })),
    ...papers.map((paper) => ({
      params: { slug: paper.slug },
    })),
  ];

  return paths;
}
