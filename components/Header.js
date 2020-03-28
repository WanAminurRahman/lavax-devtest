import Link from 'next/link'
import 'bulma/css/bulma.min.css';

const linkStyle = {
  marginRight: 15
}

export default function Header() {
  return (
    <nav className="level">
      <Link href="/">
        <p className="level-item has-text-centered">
            <a className="link is-info">Home</a>
        </p>
      </Link>
      <Link href="/rocket">
        <p className="level-item has-text-centered">
            <a className="link is-info">Rocket</a>
        </p>
      </Link>
    </nav>
  )
}