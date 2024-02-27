function CampaignLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center flex-col p-10 border">
      {children}
    </main>
  );
}

export default CampaignLayout;
