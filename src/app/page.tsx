import { Header } from "@/components/header";
import { BackgroundBeams } from "@/components/ui/backgrounds-beans";
import '@/app/globals.css';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header />
      <BackgroundBeams />
    </main>
  );
}
