import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Image, Badge, Spinner, Button, Carousel } from 'react-bootstrap';
import { BsArrowLeft, BsStar, BsBookmark, BsBookmarkFill, BsGlobe } from 'react-icons/bs';
import { fetchGameDetails, fetchGameScreenshots } from '../services/api';

const GameDetailPage = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const isBookmarked = false;

  useEffect(() => {
    const loadGameData = async () => {
      try {
        setLoading(true);
        const [gameData, screenshotsData] = await Promise.all([
          fetchGameDetails(id),
          fetchGameScreenshots(id),
        ]);
        setGame(gameData);
        setScreenshots(screenshotsData.results || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to load game details. Please try again later.');
        setLoading(false);
      }
    };

    loadGameData();
  }, [id]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <div className="alert alert-danger">{error}</div>
        <Button as={Link} to="/" variant="primary">
          <BsArrowLeft className="me-2" />
          Back to Games
        </Button>
      </Container>
    );
  }

  if (!game) {
    return (
      <Container className="py-5">
        <div className="alert alert-warning">Game not found</div>
        <Button as={Link} to="/" variant="primary">
          <BsArrowLeft className="me-2" />
          Back to Games
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Button as={Link} to="/" variant="outline-secondary" className="mb-4">
        <BsArrowLeft className="me-2" />
        Back to Games
      </Button>

      {/* Game Header */}
      <div className="game-detail-header mb-4">
        <h1 className="game-detail-title">{game.name}</h1>
        <div className="d-flex align-items-center flex-wrap mb-3">
          <div className="me-3 d-flex align-items-center">
            <BsStar className="text-warning me-1" />
            <span className="fw-bold">{game.rating.toFixed(1)}</span>
            <span className="text-muted ms-1">({game.ratings_count} ratings)</span>
          </div>
          <div className="me-3">
            <span className="text-muted">Released: </span>
            <span>{new Date(game.released).toLocaleDateString()}</span>
          </div>
          <Button
            variant={isBookmarked ? 'success' : 'outline-success'}
            className="ms-auto"
            size="sm"
          >
            {isBookmarked ? <BsBookmarkFill className="me-1" /> : <BsBookmark className="me-1" />}
            {isBookmarked ? 'Saved to Library' : 'Add to Library'}
          </Button>
        </div>
      </div>

      {/* Screenshots */}
      {screenshots.length > 0 && (
        <Carousel className="mb-4">
          {screenshots.map((shot) => (
            <Carousel.Item key={shot.id}>
              <img
                className="d-block w-100 rounded"
                src={shot.image}
                alt="Screenshot"
                style={{ maxHeight: '500px', objectFit: 'cover' }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      )}

      {/* Game Info */}
      <Row>
        <Col md={8}>
          <h4>Description</h4>
          <div dangerouslySetInnerHTML={{ __html: game.description }} className="mb-4" />

          <h5>Platforms</h5>
          <p>
            {game.platforms?.map((p) => (
              <Badge bg="secondary" className="me-2 mb-2" key={p.platform.id}>
                {p.platform.name}
              </Badge>
            ))}
          </p>

          <h5>Genres</h5>
          <p>
            {game.genres?.map((genre) => (
              <Badge bg="info" className="me-2 mb-2" key={genre.id}>
                {genre.name}
              </Badge>
            ))}
          </p>

          <h5>Tags</h5>
          <p>
            {game.tags?.slice(0, 10).map((tag) => (
              <Badge bg="dark" className="me-2 mb-2" key={tag.id}>
                {tag.name}
              </Badge>
            ))}
          </p>
        </Col>

        <Col md={4}>
          <h5>Additional Info</h5>
          <p><strong>Metacritic Score:</strong> {game.metacritic || 'N/A'}</p>
          <p><strong>Developers:</strong> {game.developers?.map(d => d.name).join(', ')}</p>
          <p><strong>Publishers:</strong> {game.publishers?.map(p => p.name).join(', ')}</p>
          {game.website && (
            <p>
              <Button
                variant="outline-primary"
                size="sm"
                href={game.website}
                target="_blank"
                rel="noreferrer"
              >
                <BsGlobe className="me-1" /> Visit Website
              </Button>
            </p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default GameDetailPage;
