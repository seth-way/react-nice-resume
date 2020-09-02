import React, { Component } from 'react';
import Modal from 'react-modal';
import { render } from 'react-dom';
import AlgarithmModal from './AlgorithmModal';

// array used for [border, background] card colors
const colorPicker = {
  Easy: ['#52A551', "#9DD49C"],
  Medium: ['#D89B46', "#F4C583"],
  Hard: ['#C34A46', "#E48683"] ,
};

Modal.setAppElement('#root');

class CarouselCard extends Component {
    constructor(props) {
      super(props);
      const { algorithm } = props;
      this.state = {
        algorithm,
        modalIsOpen: false,
      };
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
      this.setState({modalIsOpen: true});
    }

    closeModal() {
      this.setState({modalIsOpen: false});
    }

    render() {
      const { algorithm, modalIsOpen } = this.state;
      const { filename, message, daysOld, title, url, difficulty, body } = algorithm;
      const styleObj ={
        border: `10px solid ${colorPicker[difficulty][0]}`,
        backgroundColor: colorPicker[difficulty][1],
      };
      return(
        <div
          className="carouselCard"
          style={styleObj}
          onClick={modalIsOpen ? () => {} : () => this.openModal()}
        >
          <h3 style={title.length < 18 ? {} : title.length < 25 ? {fontSize: 16} : {fontSize: 14}}>{title}</h3>
          <p>
            {daysOld === 0 ? 'Solved Today!' : daysOld === 1 ? 'Solved Yesterday' : `Solved ${daysOld} days ago...`}
          </p>
          <a><img src="./images/algorithms/leetcode.png" alt="leetcode_logo" /></a>
          <h5>{difficulty}</h5>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => this.closeModal()}
            contentLabel={title}
            className="algorithmModal"
            overlayClassName="algorithmOverlay"
            shouldCloseOnOverlayClick={false}
          >
            <AlgarithmModal algorithm={algorithm} closeModal={this.closeModal} />
          </Modal>
        </div>
      );
    };
};

export default CarouselCard;
