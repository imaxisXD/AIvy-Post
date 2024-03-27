import Link from "next/link";
import * as prismic from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicText, SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { notFound } from "next/navigation";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function LatestArticle({ article }: any) {
  const date = prismic.asDate(
    article.data.publishDate || article.first_publication_date,
  );

  return (
    <li>
      <h1 className="mb-3 text-3xl font-semibold tracking-tighter text-slate-800 md:text-4xl">
        <PrismicNextLink document={article}>
          {article.data.title}
        </PrismicNextLink>
      </h1>
      <p className="font-serif italic tracking-tighter text-slate-500">
        {dateFormatter.format(date!)}
      </p>
    </li>
  );
}

export async function generateMetadata({ params }: any) {
  const client = createClient();

  const article = await client
    .getByUID("BlogPost", params.uid)
    .catch(() => notFound());

  return {
    title: `${article.data.title}`,
    description: article.data.meta_description,
    openGraph: {
      title: article.data.meta_title,
      images: [
        {
          url: article.data.meta_image.url,
        },
      ],
    },
  };
}

export default async function Page({ params }: any) {
  const client = createClient();

  const article = await client
    .getByUID("BlogPost", params.uid)
    .catch(() => notFound());

  const latestArticles = await client.getAllByType("BlogPost", {
    limit: 3,
  });

  const date = prismic.asDate(
    article.data.publish_date || article.first_publication_date,
  );

  return (
    <>
      <article>
        <h1 className="mb-3 text-3xl font-semibold tracking-tighter text-slate-800 md:text-4xl">
          {article.data.title}
        </h1>
        <p className="font-serif italic tracking-tighter text-slate-500">
          {dateFormatter.format(date)}
        </p>

        <SliceZone slices={article.data.slices} components={components} />
      </article>
      {latestArticles.length > 0 && (
        <div className="grid grid-cols-1 justify-items-center gap-16 md:gap-24">
          <div className="w-full">
            <h1 className="mb-10">Latest articles</h1>
            <ul className="grid grid-cols-1 gap-12">
              {latestArticles.map((article) => (
                <LatestArticle key={article.id} article={article} />
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export async function generateStaticParams() {
  const client = createClient();
  const articles = await client.getAllByType("BlogPost");
  return articles.map((article) => {
    return { uid: article.uid };
  });
}
