export default function CreatePageLayout({
  children,
  postgeneration,
}: {
  children: React.ReactNode;
  postgeneration: React.ReactNode;
}) {
  return (
    <>
      {/* {children} */}
      {postgeneration}
    </>
  );
}
