import React from 'react';
import Carousel, { consts} from 'react-elastic-carousel';
import CarouselCard from './CarouselCard';

class CarouselComponent extends React.Component {
  constructor(props) {
    super(props);

    const { algorithms } = props; 
  
    this.state = { 
      algorithms: algorithms,
      width: 0,
    };

    this.breakPoints = [
      { width: 1, itemsToShow: 1},
      { width: 600, itemsToShow: 2, itemsToScroll: 2 },
      { width: 850, itemsToShow: 3 },
      { width: 1150, itemsToShow: 4, itemsToScroll: 2 },
      { width: 1450, itemsToShow: 5 },
      { width: 1750, itemsToShow: 6 },
    ]
  }

  handleResize() {
    let width = Math.max(375, window.innerWidth)
    console.log('width ', width)
    this.setState({ width });
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize.bind(this))
  }

  changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });

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
      activeItemIndex,
      algorithms,
      width,
    } = this.state;

    return (

      algorithms.length === 0 ?
        <div></div> :
        <div className="carouselContainer">
          <Carousel
            itemsToShow={1}
            renderArrow={this.myArrow}
            pagination={false}
            breakPoints={this.breakPoints}
          >           
            {algorithms.map((algorithm) => (<CarouselCard algorithm={algorithm} />))}
          </Carousel>
        </div>
    );  
  }
} 

export default CarouselComponent;