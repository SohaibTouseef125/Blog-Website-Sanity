import {PortableText} from '@portabletext/react'
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

export default async function page({params}:{params:{slug:string}}) {
  
  const queryUrl = `*[_type == "post"] | order(_createdAt asc){
  title,image,summary,content,
  author->{bio,name}
}[0] `
 const response = await client.fetch(queryUrl)
//  console.log(response);
 

  return (
    <article className="mt-12 mb-24 px-2 2xl:px-12 flex flex-col gap-y-8">

      {/* Blog Title */}
      <h1 className="text-xl xs:text-3xl lg:text-5xl font-bold text-dark dark:text-light">
        {response.title}
      </h1>

      {/* Featured Image */}
      <Image
        src={urlFor(response.image).url()}
        width={500}
        height={500}
        alt="AI for everyone"
        className="rounded"
      />

      {/* Blog Summary Section */}
      <section>
      <h2 className="text-xl xs:text-2xl md:text-3xl font-bold uppercase text-accentDarkPrimary">
        Summary
      </h2>
      <p className="text-base md:text-xl leading-relaxed text-justify text-dark/80 dark:text-light/80">
       {response.summary}
      </p>
      </section>

      {/* Author Section (Image & Bio) */}
      <section className="px-2 sm:px-8 md:px-12 flex gap-2 xs:gap-4 sm:gap-6 items-start xs:items-center justify-start">
        <Image
          src={"/logo.jpg"}
          width={200}
          height={200}
          alt="author"
          className="object-cover rounded-full h-12 w-12 sm:h-24 sm:w-24"
        />
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold text-dark dark:text-light">{response.author.name}</h3>
          <p className="italic text-xs xs:text-sm sm:text-base text-dark/80 dark:text-light/80">
          {response.author.bio}
          </p>
        </div>
      </section>

      {/* Main Body of Blog */}
      <p className="text-lg leading-normal text-dark/80 dark:text-light/80">
       <PortableText value={response.content} />
      </p>
    </article>
  );
}

// export const revalidate = 60
export const generateStaticParams = async () => {
  const queryUrl = `*[_type == "post"] | order(_createdAt asc){"slug":slug.current}`
  const response = await client.fetch(queryUrl)
  return response.map((post:Post) => ({
    slug: post.slug
  }))
}