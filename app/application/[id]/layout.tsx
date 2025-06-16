import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <Header />
        <div className="flex-1 w-full flex flex-col gap-20 p-5 max-w-5xl">
          {children}
        </div>

        <Footer />
      </div>
    </main>
  );
}
