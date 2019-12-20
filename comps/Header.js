import Link from 'next/link';
import '../style.css';

const linkStyle = {
  marginRight: 15
};

import {Navbar} from 'reactstrap';
const Header = () => (
  <div className="navbar">
    <Navbar>
      <Link href="/">
        <a style={linkStyle}>Home</a>
      </Link>
      <h2>SkunkWorks</h2>
      <Link href="/about">
        <a style={linkStyle}>About Us</a>
      </Link>
    </Navbar>
  </div>
);

export default Header;