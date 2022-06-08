/* eslint-disable max-len */
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Network from '../d3-views/network';

const SimsSection = (props) => {
  const [showModal, setShowModal] = useState(true);
  return (
    <div>
      <Modal show={showModal}>
        <Modal.Header closeButton>
          <Modal.Title>Simulations Guide</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          There are three steps for running a simulation. First, modify the network as you desire:
          <br />
          <br />
          <ul>
            <li>Click to add a child to a given node.</li>
            <li>Click and HOLD SHIFT to delete a node.</li>
            <li>Click and drag between nodes to add an edge.</li>
          </ul>
          <br />
          Note that complex contagions spread better on denser networks (more shared ties)
          and simple contagions spread better on networks with lots of random connections.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { setShowModal(false); }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Network />
    </div>
  );
};

export default SimsSection;
