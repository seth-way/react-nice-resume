import React from 'react';
import Carousel, { consts} from 'react-elastic-carousel';
import CarouselCard from './CarouselCard';

class CarouselComponent extends React.Component {
  constructor(props) {
    super(props);
    const { algorithms } = props; 
  
    this.state = { 
      algorithms: algorithms,
    };

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

  render() {
    const {
      algorithms,
    } = this.state;
    const fileNames = Object.keys(algorithms);
    fileNames.sort((a, b) => (algorithms[a].daysOld - algorithms[b].daysOld));

    return (

      algorithms.length === 0 ?
        <div></div> :
        <div className="carouselContainer">
          <Carousel
            renderArrow={this.myArrow}
            pagination={false}
            breakPoints={this.breakPoints}
          >           
            {fileNames.map((fileName) => (<CarouselCard key={fileName} algorithm={algorithms[fileName]} />))}
          </Carousel>
        </div>
    );  
  }
} 

export default CarouselComponent;