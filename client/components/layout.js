import Navbar from "./navbar";

export default function Layout({ children }) {
  return (
    <>
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
      <main>{children}</main>
    </>
  )
}