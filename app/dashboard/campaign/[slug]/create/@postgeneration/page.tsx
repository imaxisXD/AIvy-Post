import InputWithTransition from "./inputButton";

export default function PostGeneration() {
  return (
    <section className="mt-5 w-full">
      <h1 className="font-urban font-bold text-4xl pb-0.5 text-black">
        Post Generation
      </h1>
      <h2 className="text-base text-purple-400 pb-4">
        Generate a post for your campaign with the help of AI
      </h2>
      <InputWithTransition />
    </section>
  );
}
