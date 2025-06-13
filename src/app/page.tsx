import { LoanApplicationForm, NavBar } from './components'

export default async function Home() {
  return (
    <div>
      <NavBar />
      <div className="px-[160px] py-[20px]">
        <LoanApplicationForm />
      </div>
    </div>
  )
}
