import BlogCard from "@/components/BlogCard";
import { client } from "@/sanity/lib/client";

export default async function Home() {
  const queryUrl = `*[_type == "post"] | order(_createdAt asc){
  image,title,summary,"slug":slug.current
}`;

  const response: Post[] = await client.fetch(queryUrl);

  return (
    <main className="flex min-h-screen flex-col ">
      <h1 className="text-2xl font-bold uppercase my-12 text-center text-dark dark:text-light sm:text-3xl lg:text-5xl ">
        Most Recent blogs
      </h1>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {response.map((post: Post) => (
          <BlogCard key={post.id} data={post} />
        ))}
      </section>
    </main>
  );
}
