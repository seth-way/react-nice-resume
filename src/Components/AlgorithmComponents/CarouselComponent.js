import React, {Component} from 'react';
import Carousel, { consts} from 'react-elastic-carousel';
import CarouselCard from './CarouselCard';
import Solution from './Solution';

class CarouselComponent extends Component {
  constructor(props) {
    super(props);
    const {
      algorithms,
     } = props; 
  
    this.state = { 
      algorithms,
      activeSolution: '',
    };

    this.setActiveSolution = this.setActiveSolution.bind(this);

    this.breakPoints = [
      { width: 1, itemsToShow: 1},
      { width: 770, itemsToShow: 2, itemsToScroll: 2 },
      { width: 850, itemsToShow: 3 },
      { width: 1150, itemsToShow: 4, itemsToScroll: 2 },
      { width: 1450, itemsToShow: 5 },
      { width: 1750, itemsToShow: 6 },
    ]
  }

  myArrow({ type, onClick, isEdge }) {
    const pointer = type === consts.PREV ?
      <div id="scroll-left"><a><i className="icon-left-open"></i></a></div> :
      <div id="scroll-right"><a><i className="icon-right-open"></i></a></div>
    return (
      <button onClick={onClick} disabled={isEdge}>
        {pointer}
      </button>
    )
  }

  setActiveSolution({ target }) {
    this.setState({ activeSolution: target.getAttribute('value') });
  }

  render() {
    const {
      algorithms,
      activeSolution,
    } = this.state;
    const { openSolution, closeSolution, showSolution } = this.props;
    const fileNames = Object.keys(algorithms);
    fileNames.sort((a, b) => (algorithms[a].daysOld - algorithms[b].daysOld));

    return (

      algorithms.length === 0 ?
        <div></div> :
        <div>
          <div
            className="carouselContainer"
            style={showSolution ? {display: "none"} : {}}
          >
            <Carousel
              renderArrow={this.myArrow}
              pagination={false}
              breakPoints={this.breakPoints}
            >           
              {fileNames.map((fileName) => (
                <CarouselCard
                  key={fileName}
                  algorithm={algorithms[fileName]}
                  setActiveSolution={this.setActiveSolution}
                  openSolution={openSolution}
                />
              ))}
            </Carousel>
          </div>
          <div
            style={showSolution ? {} : {display: "none", height: "0px"}}
          >
            {
              activeSolution === "" ?
              <div>{activeSolution}</div> :
              <Solution
                algorithm={algorithms[activeSolution]}
                closeSolution={closeSolution}
                showSolution={showSolution}
              />
            }
          </div>
        </div>
    );  
  }
} 

export default CarouselComponent;