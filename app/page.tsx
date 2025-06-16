import Header from "@/components/header";
import Link from "next/link";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 w-full flex flex-col items-center gap-20">
        <Header />
        <div className="flex-1 flex flex-col w-full gap-20 p-5 rounded-xl">
          <div
            className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4 rounded-xl"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuC19Cu9HQmjX2TGC9jmfjw_xxa4WZP955nGQXFRMkJBhMteV-47Pb3PSmwYSzmvddxD8U5ex5Co6FOf0nRwMSXK_63H4M-iqZDTlehgkw-yoq7T36P6myEpFgfpIjpjv0si6pYPW1eDLJaI8tGTfVz-K7yLQsDCbzpbmmxKZqO6DNqGlzieEmmfzgaZcnxkuIMiBrG4fkaWsDMj5Wl9JJnzH1fwmN8LMwaMyn_-ElGhmZNYjNlG0U_f4P9CEcSi7D4pQEyVs0l-lmU")',
            }}
          >
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                AI-Powered Business Loans
              </h1>
              <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                Smart loans for growing businesses. Get faster approvals,
                personalized options, and data-driven insights.
              </h2>
            </div>
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#3f7fbf] text-gray-50 text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
              <Link href="/home">
                <span className="truncate">Get Started</span>
              </Link>
            </button>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
