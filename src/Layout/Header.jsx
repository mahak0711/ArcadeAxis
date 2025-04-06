import React, { useState, useCallback } from 'react';
import {
  Navbar,
  Container,
  Form,
  FormControl,
  Button,
  Nav,
} from 'react-bootstrap';
import { useClerk } from '@clerk/clerk-react';

import {
  Link,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import {
  BsSearch,
  BsBookmark,
  BsPerson,
  BsX,
  BsBoxArrowRight,
} from 'react-icons/bs';
import { debounce } from 'lodash';
import { SignOutButton } from '@clerk/clerk-react';

const Header = ({ onSearch }) => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();
  const { signOut } = useClerk();

  
  
  const debouncedSearch = useCallback(
    debounce((query) => {
      if (onSearch) {
        onSearch(query);
      }

      const params = new URLSearchParams();
      if (query) params.set('search', query);

      navigate(`/?${params.toString()}`);
      setIsTyping(false);
    }, 500),
    [onSearch, navigate]
  );

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsTyping(true);
    debouncedSearch(query);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    debouncedSearch.cancel();

    if (onSearch) {
      onSearch(searchQuery);
    }

    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('search', searchQuery.trim());

    navigate(`/?${params.toString()}`);
    setIsTyping(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    if (onSearch) {
      onSearch('');
    }
    navigate('/');
  };

  const handleLogout = () => {
    signOut(); 
  };
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="header-navbar sticky-top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            className="image"
            src="/Arcade Axis.png"
            alt="Logo"
            style={{ height: '40px', marginRight: '10px' }}
          />
          Arcade Axis
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/bookmarks">
              <BsBookmark /> Bookmarks
            </Nav.Link>
            <Nav.Link as={Link} to="/profile">
              <BsPerson /> Profile
            </Nav.Link>
            <Nav.Link onClick={handleLogout}>
              <BsBoxArrowRight /> Logout
            </Nav.Link>
          </Nav>
          <Form className="d-flex position-relative" onSubmit={handleSearchSubmit}>
            <FormControl
              type="search"
              placeholder="Search..."
              className="me-2"
              value={searchQuery}
              onChange={handleSearchChange}
              aria-label="Search"
            />
            {searchQuery && (
              <Button
                variant="outline-light"
                onClick={clearSearch}
                className="position-absolute end-0 top-0 mt-1 me-1 p-1"
                style={{ zIndex: 10 }}
              >
                <BsX />
              </Button>
            )}
            <Button variant="outline-success" type="submit">
              <BsSearch />
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
