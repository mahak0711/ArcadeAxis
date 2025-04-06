import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsStar, BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/favouritesSlice'; // ✅ adjust path if needed
import '../components/games/gamescard.css';

const GameCard = ({ game, searchHighlight }) => {
  const { id, name, background_image, rating, genres, released } = game;

  const dispatch = useDispatch();

  const isBookmarked = useSelector((state) =>
    state.favorites.favorites.some((fav) => fav.id === id)
  );

  const handleToggleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(game));
  };

  const highlightSearchTerm = (text, searchTerm) => {
    if (!searchTerm || typeof text !== 'string') return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="search-highlight">{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <Card className="game-card h-100">
      <Link to={`/game/${id}`} className="game-card-link">
        <div className="game-image-container">
          <Card.Img
            variant="top"
            src={background_image || 'https://via.placeholder.com/300x180?text=No+Image'}
            className="game-card-image"
          />
          <button
            className="bookmark-button"
            onClick={handleToggleBookmark}
            aria-label={isBookmarked ? "Remove from library" : "Add to library"}
          >
            {isBookmarked ? <BsBookmarkFill /> : <BsBookmark />}
          </button>
        </div>

        <Card.Body>
          <Card.Title className="game-title">
            {searchHighlight ? highlightSearchTerm(name, searchHighlight) : name}
          </Card.Title>

          <div className="mb-2 game-rating">
            <BsStar className="rating-star" />
            <span>{rating ? rating.toFixed(1) : 'N/A'}</span>
          </div>

          <div className="mb-2">
            <small className="text-muted">
              Released: {released ? new Date(released).getFullYear() : 'Unknown'}
            </small>
          </div>

          <div className="game-genres">
            {genres && genres.slice(0, 3).map((genre) => (
              <Badge key={genre.id} bg="secondary" className="me-1 mb-1">
                {genre.name}
              </Badge>
            ))}
          </div>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default GameCard;
