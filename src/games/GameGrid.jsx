import React from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import GameCard from './GameCard';

const GameGrid = ({ games, loading, searchQuery }) => {
  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!games || games.length === 0) {
    return (
      <div className="text-center my-5">
        <p className="lead">No games found matching your criteria.</p>
        <p>Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <Row xs={1} sm={2} md={2} lg={3} xl={4} className="g-4">
      {games.map(game => (
        <Col key={game.id}>
          <GameCard 
            game={game} 
            searchHighlight={searchQuery}
          />
        </Col>
      ))}
    </Row>
  );
};

export default GameGrid;