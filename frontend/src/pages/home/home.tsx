import { ChatLayout } from "@/components/chat/chat-layout";

export default function HomePage() {
  const defaultLayout = undefined;

  return (
    <main className="flex h-[calc(100dvh)] w-full flex-col items-center justify-center">
      <div className="z-10 border rounded-lg w-full h-full text-sm lg:flex">
        <ChatLayout defaultLayout={defaultLayout} navCollapsedSize={8} />
      </div>
    </main>
  );
}
