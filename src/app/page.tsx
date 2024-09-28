import MarkdownEditor from "./editor";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between p-24 text-black">
      <MarkdownEditor /> 
    </main>
  );
}
