export default function CampaignPage({ params }: { params: { slug: string } }) {
  return <h1>Campaign {params.slug}</h1>;
}
