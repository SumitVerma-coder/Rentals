import Link from 'next/link'

const Header = () => (
  <header>
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
    </nav>
  </header>
)

export default Header
