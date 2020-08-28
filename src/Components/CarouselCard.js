import React, { Component } from 'react';

// array used for [border, background] card colors
const colorPicker = {
  Easy: ['#52A551', "#9DD49C"],
  Medium: ['#D89B46', "#F4C583"],
  Hard: ['#C34A46', "#E48683"] ,
};

const CarouselCard = (props) => {
    const { algorithm } = props;
    const { filename, message, daysOld, title, url, difficulty, body } = algorithm;
    const styleObj ={
      border: `10px solid ${colorPicker[difficulty][0]}`,
      backgroundColor: colorPicker[difficulty][1],
    }
    return(
      <div
        className="carouselCard"
        style={styleObj}
      >
        <h3>{title}</h3>
        <p>
          {daysOld === 0 ? 'Solved Today!' : daysOld === 1 ? 'Solved Yesterday' : `Solved ${daysOld} days ago...`}
        </p>
        <a><img src="./images/algorithms/leetcode.png" alt="leetcode_logo" /></a>
        <h5>{difficulty}</h5>
      </div>
    )
};

export default CarouselCard;
