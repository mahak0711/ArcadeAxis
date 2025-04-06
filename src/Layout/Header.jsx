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
            src="data:image/png;base64,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"
            alt="Logo"
            style={{ height: '40px', marginRight: '10px' }}
          />
          ArcadeAxis
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
