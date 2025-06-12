import { auth0 } from "@/lib/auth0";
import { LoanApplicationForm, NavBar } from "./components";


export default async function Home() {
  const session = await auth0.getSession()

  // remove if cant figure out auth
  if (false) {
    return (
      <main>
        <a href="/auth/login?screen_hint=signup">Sign up</a>
        <a href="/auth/login">Log in</a>
      </main>
    )
  }

  return <div>
    <NavBar />
    <div className="px-[160px] py-[20px]">
      <LoanApplicationForm />
    </div>
  </div>;
}
