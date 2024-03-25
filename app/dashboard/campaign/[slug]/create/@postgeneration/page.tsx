import InputWithTransition from "./inputButton";

export default function PostGeneration() {
  return (
    <section className="w-full">
      <h1 className="mx-auto max-w-[48rem] pb-0.5 font-urban text-3xl font-bold text-black">
        Post Generation
      </h1>
      <h2 className="mx-auto max-w-[48rem] pb-8 text-base text-purple-500">
        Generate a post for your campaign with the help of AI
      </h2>
      <InputWithTransition />
    </section>
  );
}
