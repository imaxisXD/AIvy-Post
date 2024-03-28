import { PrismicNextLink } from "@prismicio/next";
import {
  PrismicRichText as BasePrismicRichText,
  JSXFunctionSerializer,
  JSXMapSerializer,
  PrismicRichTextProps,
} from "@prismicio/react";

import { Heading } from "./heading";
import { LinkResolverFunction } from "@prismicio/client";

/** @type {import("@prismicio/react").JSXMapSerializer} */
const defaultComponents = {
  heading1: ({ children }: { children: React.ReactNode }) => (
    <Heading as="h2" size="3xl" className="mb-7 mt-12 first:mt-0 last:mb-0">
      {children}
    </Heading>
  ),
  heading2: ({ children }: { children: React.ReactNode }) => (
    <Heading as="h3" size="2xl" className="mb-7 last:mb-0">
      {children}
    </Heading>
  ),
  heading3: ({ children }: { children: React.ReactNode }) => (
    <Heading as="h4" size="xl" className="mb-7 last:mb-0">
      {children}
    </Heading>
  ),
  paragraph: ({ children }: { children: React.ReactNode }) => (
    <p className="mb-7 last:mb-0">{children}</p>
  ),
  oList: ({ children }: { children: React.ReactNode }) => (
    <ol className="mb-7 pl-4 last:mb-0 md:pl-6">{children}</ol>
  ),
  oListItem: ({ children }: { children: React.ReactNode }) => (
    <li className="mb-1 list-decimal pl-1 last:mb-0 md:pl-2">{children}</li>
  ),
  list: ({ children }: { children: React.ReactNode }) => (
    <ul className="mb-7 pl-4 last:mb-0 md:pl-6">{children}</ul>
  ),
  listItem: ({ children }: { children: React.ReactNode }) => (
    <li className="mb-1 list-disc pl-1 last:mb-0 md:pl-2">{children}</li>
  ),
  preformatted: ({ children }: { children: React.ReactNode }) => (
    <pre className="mb-7 rounded bg-slate-100 p-4 text-sm last:mb-0 md:p-8 md:text-lg">
      <code>{children}</code>
    </pre>
  ),
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  field: ({ children }: { children: React.ReactNode }) => (
    <span className="mb-7 last:mb-0">{children}</span>
  ),
  hyperlink: ({ children, node }: { children: React.ReactNode; node: any }) => (
    <PrismicNextLink
      field={node.data}
      className="underline decoration-1 underline-offset-2"
    >
      {children}
    </PrismicNextLink>
  ),
};

export function PrismicRichText({
  field,
  components,
  ...props
}: PrismicRichTextProps<LinkResolverFunction<any>> & {
  components?: JSXMapSerializer | JSXFunctionSerializer;
}) {
  return (
    <BasePrismicRichText
      field={field}
      components={{ ...defaultComponents, ...components }}
      {...props}
    />
  );
}
