import React, { Component } from 'react';
import Modal, { setAppElement } from 'react-modal';
import { render } from 'react-dom';

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
        windowWidth: 1400,
      };
    }

    updateDimensions = () =>{
      this.setState({ windowWidth: window.innerWidth});
    }

    componentDidMount() {
      window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateDimensions);
    }

    render() {
      const { algorithm, windowWidth } = this.state;
      const { filename, title } = algorithm;
      const { setActiveSolution, openSolution } = this.props;

      const cardWidth = windowWidth > 770 ? '300px' : '150px';

      const styleObj = {
        width: cardWidth,
        height: cardWidth,
      };

      const sizePicker = {
        wide: {
          long: 14,
          medium: 16,
          short: 22,
        },
        narrow : {
          long: 8,
          medium: 10,
          short: 14, 
        }
      }

      const size = sizePicker[windowWidth > 770 ? 'wide' : 'narrow'][title.length < 18 ? 'short' : title.length < 25 ? 'medium': 'long' ]
        const h3Style = {
        fontSize: size,
      }

      if (filename !== 'github repository') {
        const { message, daysOld, url, difficulty, body } = algorithm;
        
        styleObj.border = `10px solid ${colorPicker[difficulty][0]}`;
        styleObj.backgroundColor = colorPicker[difficulty][1];
         
        return(
          <div
            onClick={(e) => {
              setActiveSolution(e);
              openSolution();
            }}
          >
            <div
              className="carouselCard"
              style={styleObj}
              value={filename}
            >
              <h3
                style={h3Style}
                value={filename}
              >
                {title}
              </h3>
              <p
                style={windowWidth > 770 ? {} : {margin: '-20px auto 0 auto'}}
                value={filename}
              >
                {daysOld === 0 ? 'Solved Today!' : daysOld === 1 ? 'Solved Yesterday' : `Solved ${daysOld} days ago...`}
              </p>
              <a value={filename}>
                <img value={filename} src="./images/algorithms/leetcode.png" alt="leetcode_logo" style={windowWidth > 770 ? {} : {height: '0px', width: '0px'}}/>
              </a>
              <h5 style={windowWidth > 770 ? {} : {margin: '-25px auto 0 auto'}} value={filename} >{difficulty}</h5>
            </div>
          </div>
        );
      } else {
        h3Style.fontSize += 10;

        return(
          <div
            className="carouselCard"
            style={styleObj}
          >
            <a
              id="githubCard"
              href="https://github.com/seth-way/algorithms"
              rel="noopener noreferrer"
              target="_blank"
            >
              <h3 style={h3Style}>{title}</h3>
            </a>     
          </div>
        );
      }
    };
};

export default CarouselCard;
