
import '@/app/globals.css';
import LoginPage from "@/pages/loginPage";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LoginPage />
    </main>
  );
}
