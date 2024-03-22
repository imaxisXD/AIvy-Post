function CampaignLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-dot-black/[0.1] flex min-h-screen flex-col items-center border p-9">
      {children}
    </main>
  );
}

export default CampaignLayout;
