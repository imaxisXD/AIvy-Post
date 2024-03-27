function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center border p-9 bg-grid-small-black/[0.01]">
      {children}
    </main>
  );
}

export default HomeLayout;
