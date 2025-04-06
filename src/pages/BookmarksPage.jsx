import React from 'react';
import { useSelector } from 'react-redux';
import GameCard from '../games/GameCard'; 
import { Container, Row, Col } from 'react-bootstrap';

const BookmarksPage = () => {
  const favorites = useSelector((state) => state.favorites.favorites);

  return (
    <Container className="mt-4">
      <h2>Your Bookmarked Games</h2>
      <Row>
        {favorites.length === 0 ? (
          <p className="text-muted">No bookmarked games yet.</p>
        ) : (
          favorites.map((game) => (
            <Col key={game.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <GameCard game={game} />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default BookmarksPage;
