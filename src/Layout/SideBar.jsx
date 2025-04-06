import React, { useState, useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { fetchGenres, fetchTags } from '../services/api';

const Sidebar = ({ filters, onFilterChange }) => {
  const [genres, setGenres] = useState([]);
  const [tags, setTags] = useState([]);
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const [genresData, tagsData] = await Promise.all([
          fetchGenres(),
          fetchTags()
        ]);
        
        setGenres(genresData.results);
        setTags(tagsData.results.slice(0, 20)); 

        const currentYear = new Date().getFullYear();
        const yearsList = Array.from({ length: currentYear - 1979 }, (_, i) => currentYear - i);
        setYears(yearsList);
        
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch filter options:', err);
        setLoading(false);
      }
    };

    fetchFilterOptions();
  }, []);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterUpdate = (name, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagToggle = (tagId) => {
    const updatedTags = localFilters.tags.includes(tagId)
      ? localFilters.tags.filter(id => id !== tagId)
      : [...localFilters.tags, tagId];
    
    handleFilterUpdate('tags', updatedTags);
  };

  const applyFilters = () => {
    onFilterChange(localFilters);
  };

  const resetFilters = () => {
    const resetValues = {
      category: '',
      tags: [],
      year: '',
      ordering: '-rating'
    };
    setLocalFilters(resetValues);
    onFilterChange(resetValues);
  };

  if (loading) {
    return (
      <Card className="sidebar-card">
        <Card.Body>
          <Card.Title>Filters</Card.Title>
          <div className="text-center my-4">Loading filters...</div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="sidebar-card">
      <Card.Body>
        <Card.Title className="mb-4">Filters</Card.Title>
        
        {/* Categories/Genres */}
        <Form.Group className="mb-4">
          <Form.Label className="fw-bold">Categories</Form.Label>
          <Form.Select 
            value={localFilters.category}
            onChange={(e) => handleFilterUpdate('category', e.target.value)}
          >
            <option value="">All Categories</option>
            {genres.map(genre => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        
        {/* Release Year */}
        <Form.Group className="mb-4">
          <Form.Label className="fw-bold">Release Year</Form.Label>
          <Form.Select 
            value={localFilters.year}
            onChange={(e) => handleFilterUpdate('year', e.target.value)}
          >
            <option value="">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        
        {/* Sort By */}
        <Form.Group className="mb-4">
          <Form.Label className="fw-bold">Sort By</Form.Label>
          <Form.Select 
            value={localFilters.ordering}
            onChange={(e) => handleFilterUpdate('ordering', e.target.value)}
          >
            <option value="-rating">Popularity (High to Low)</option>
            <option value="rating">Popularity (Low to High)</option>
            <option value="-released">Release Date (Newest)</option>
            <option value="released">Release Date (Oldest)</option>
            <option value="name">Name (A-Z)</option>
            <option value="-name">Name (Z-A)</option>
          </Form.Select>
        </Form.Group>
        
        {/* Tags - Check boxes */}
        <Form.Group className="mb-4">
          <Form.Label className="fw-bold">Popular Tags</Form.Label>
          <div className="tags-container" style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {tags.map(tag => (
              <Form.Check 
                key={tag.id}
                type="checkbox"
                id={`tag-${tag.id}`}
                label={tag.name}
                checked={localFilters.tags.includes(tag.id)}
                onChange={() => handleTagToggle(tag.id)}
                className="mb-2"
              />
            ))}
          </div>
        </Form.Group>
        
        {/* Filter Buttons */}
        <div className="d-grid gap-2">
          <Button variant="primary" onClick={applyFilters}>
            Apply Filters
          </Button>
          <Button variant="outline-secondary" onClick={resetFilters}>
            Reset Filters
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Sidebar;