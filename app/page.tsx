import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full">
      <Image
        src="/placeholders/placeholder.svg"
        alt="DuQuantum"
        width={1920}
        height={3800}
        className="w-full h-auto"
        priority
      />
    </main>
  );
}
