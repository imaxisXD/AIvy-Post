import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";
import Link from "next/link";
import * as prismic from "@prismicio/client";

export default async function Blog() {
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const client = createClient();
  const blogs = await client.getAllByType("BlogPost", {
    orderings: [
      { field: "data.publish_date", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
  });

  return (
    <main className="max-w-screen relative mx-auto flex min-h-screen w-full flex-col items-center justify-center border p-10 shadow-inner bg-grid-small-black/[0.2]">
      <div className="gradient absolute inset-0 w-full opacity-10 backdrop-blur-sm">
        <div className="from-1% absolute inset-0 border border-red-300 bg-gradient-to-t from-white to-35%" />
      </div>
      <header className="flex w-full flex-col items-start justify-center gap-2 px-12 py-16 pb-8 text-black/75 drop-shadow-sm">
        <h1 className="font-urban text-3xl font-black sm:text-4xl lg:text-6xl">
          Blog
        </h1>
        <h2 className="mt-1 text-lg text-gray-500">
          All the latest posts from our blog
        </h2>
      </header>
      <div className="min-h-[50vh] rounded-xl border border-gray-200 bg-gradient-to-b from-white/80 to-transparent backdrop-blur-2xl">
        <div className="lg:p10 mx-auto grid w-full max-w-screen-xl grid-cols-1 gap-4 px-5 py-5 md:grid-cols-3">
          {blogs.map((blog) => (
            <Link
              key={blog.uid}
              href={`/blog/${blog.uid}`}
              className="flex flex-col rounded-lg border border-gray-200 drop-shadow-sm transition-all duration-300 ease-in-out hover:border-gray-400 hover:shadow-md"
            >
              <PrismicNextImage
                field={blog.data.meta_image}
                className="rounded-t-lg object-cover blur-0"
                style={{ color: "transparent" }}
              />
              <div className="flex flex-1 flex-col justify-between rounded-b-lg bg-white p-6 shadow-inner">
                <div>
                  <h2 className="font-display line-clamp-2 text-xl font-bold text-gray-700">
                    {blog.data.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                    {blog.data.description}
                  </p>
                </div>
                <div className="mt-4 flex items-center space-x-2">
                  <time
                    dateTime={blog.data.publish_date!}
                    className="text-sm text-gray-500"
                  >
                    {dateFormatter.format(
                      prismic.asDate(blog.data.publish_date!),
                    )}
                  </time>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

export const metadata = {
  title: "Blog | All Posts on LinkedInFy",
  description: "All the latest posts from our blog",
  openGraph: {
    title: "Blog | All Posts on LinkedInFy",
    images: [
      {
        url: "https://www.linkedinfy.com/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};
