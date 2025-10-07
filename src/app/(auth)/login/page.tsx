import MainLoginPanel from "@/components/login/main-panel"
import LoginShowcase from "@/components/login/login-showcase"

export default function LoginPage() {
  return (
    // main div
    <div className="flex flex-row min-h-svh">
      {/* main left panel */}
      <MainLoginPanel/>
      {/* showcase and designs */}
      <LoginShowcase/>
    </div>
  )
}
