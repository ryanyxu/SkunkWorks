import Link from 'next/link';
import '../style.css';
import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
      <div>
      <Navbar className="nav" expand="md">
        <NavbarBrand href="/">SkunkWorks</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/About">About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">temp</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">temp</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
export default Header;