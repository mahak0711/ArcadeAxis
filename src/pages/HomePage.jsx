import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import Sidebar from '../Layout/SideBar';
import GameGrid from '../games/GameGrid';
import Pagination from '../components/Pagination';
import Header from '../Layout/Header';
import { fetchGames } from '../services/api';

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchResults, setSearchResults] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    tags: [],
    year: '',
    ordering: '-rating',
    search: searchParams.get('search') || ''
  });

  useEffect(() => {
    
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      setFilters(prev => ({ ...prev, search: searchQuery }));
    }
  }, [searchParams]);

  useEffect(() => {
    const getGames = async () => {
      try {
        setLoading(true);
        const response = await fetchGames(currentPage, filters);
        setGames(response.results);
        setTotalPages(Math.ceil(response.count / 20)); 
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch games. Please try again later.');
        setLoading(false);
      }
    };

    getGames();
  }, [currentPage, filters]);

  const handleSearch = (query) => {
    
    setFilters(prev => ({ ...prev, search: query }));
    setCurrentPage(1); 
    
    
    if (query) {
      setSearchResults(query);
    } else {
      setSearchResults(null);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleFilterChange = (newFilters) => {
    
    setFilters({ ...newFilters, search: filters.search });
    setCurrentPage(1); 
  };

  const clearSearch = () => {
    setFilters(prev => ({ ...prev, search: '' }));
    setSearchResults(null);
  };

  return (
    <>
      <Header onSearch={handleSearch} />
      <Container fluid className="py-4">
        <Row>
          <Col lg={3} md={4} className="sidebar-container mb-4">
            <Sidebar filters={filters} onFilterChange={handleFilterChange} />
          </Col>
          <Col lg={9} md={8}>
            <div className="main-content">
              {searchResults ? (
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h1 className="main-heading">Search Results: "{searchResults}"</h1>
                  <button 
                    className="btn btn-sm btn-outline-secondary" 
                    onClick={clearSearch}
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
                <h1 className="main-heading mb-4">Discover Games</h1>
              )}
              
              {error && <div className="alert alert-danger">{error}</div>}
              
              <GameGrid 
                games={games} 
                loading={loading} 
                searchQuery={filters.search}
              />
              
              {!loading && games.length === 0 && (
                <div className="text-center my-5">
                  <p className="lead">No games found matching your criteria.</p>
                  {filters.search && (
                    <button className="btn btn-primary" onClick={clearSearch}>
                      Clear Search
                    </button>
                  )}
                </div>
              )}
              
              {!loading && !error && games.length > 0 && (
                <Pagination 
                  currentPage={currentPage} 
                  totalPages={totalPages} 
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;