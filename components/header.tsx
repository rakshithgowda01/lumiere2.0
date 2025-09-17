import Link from "next/link"

const Header = () => {
  return (
    <header className="bg-gray-800 p-4">
      <nav className="flex justify-between">
        <div className="flex space-x-4">
          <Link href="/" className="text-gray-300 hover:text-white transition-colors">
            Home
          </Link>
          {/* Updated Portfolio link to navigate to portfolio page */}
          <Link href="/portfolio" className="text-gray-300 hover:text-white transition-colors">
            Portfolio
          </Link>
          {/* </CHANGE> */}
          <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
            Contact
          </Link>
        </div>
        <div>
          <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
            Login
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
