import React, { Component } from 'react';
import request from 'request';
import * as Promise from 'bluebird';
import CarouselComponent from './AlgorithmComponents/CarouselComponent';
import config from '../config.js';

Promise.config({longStackTraces: false, warnings: false})

const fetchAlgorithms = async (path, callback) => {
    const options = {
        headers: {
            'User-Agent': 'request',
            'Authorization': `token ${config.TOKEN}`
        }
    };

    let response = await fetch(path, options)

    if (response.ok) {
        let data = await response.json();
        callback(null, data);
    } else {
        callback(response.status);
    }
};

const fetchAlgorithmsPromisified = Promise.promisify(fetchAlgorithms);

const calculateAgeInHours = (date) => {
    const oneHour = 60 * 60 * 1000;
    const now = new Date();
    const diff = (now - new Date(date)) / oneHour;
    return diff;
}

const calculateAgeInDays = (date) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    const today = new Date();
    const diff = Math.round(Math.abs((today - new Date(date)) / oneDay));
    return diff;
}

class Algorithms extends Component {
   constructor(props) {
      super(props);

      this.state = { 
         algorithms: {},
      };
   }
   
   fetchAlgorithmsFromAPI() {
    const atob = require('atob');
    fetchAlgorithmsPromisified('https://api.github.com/repos/seth-way/algorithms/commits')
        .then((commits) => {
            commits.forEach(({ sha }) => {
                fetchAlgorithmsPromisified(`https://api.github.com/repos/seth-way/algorithms/commits/${sha}`)
                    .then((data) => {
                        if (data.files[0] && data.files[0].status === 'added' && data.files[0].filename[0] !== '.' && !this.state.algorithms[data.files[0].filename]) {
                            const { message } = data.commit;
                            const { filename } = data.files[0];
                            const daysOld = calculateAgeInDays(data.commit.author.date);
                            const title = filename.split('/')[1].slice(0, -3);
                            const url = `https://github.com/seth-way/algorithms/blob/master/${filename.split(' ')[0]}%20${filename.split(' ')[1]}`;
                            const difficulty = filename[0] === '1' ? 'Easy' : filename[0] === '2' ? 'Medium' : 'Hard';
                            fetchAlgorithmsPromisified(`https://api.github.com/repos/seth-way/algorithms/contents/${filename}`)
                                .then(({ content }) => {
                                    const body = JSON.stringify(atob(content));
                                    const { algorithms } = this.state;
                                    algorithms[filename] = {
                                        message,
                                        filename,
                                        daysOld,
                                        title,
                                        url,
                                        difficulty,
                                        body,
                                    };
                                    if (body.length) {
                                        this.setState({ algorithms });
                                    }
                                })
                                .catch(alert);
                        }
                    })
                    .catch(alert);
            })
        })
        .then(() => {console.log('finished ', this.state.algorithms)})
        .catch(alert);
   }
  
   componentDidMount() {
    this.fetchAlgorithmsFromAPI();
   }
   
   render() {
    const { algorithms } = this.state;

    return (
      <section id="algorithms">  
        <div className="row">
          <h1>
            I try to challenge myself with algorithms daily.
            Check out my most recent solutions!
          </h1>
          <div>
            {Object.keys(algorithms).length > 0 ? <CarouselComponent algorithms={algorithms}/> : ''}
          </div>
        </div>
    </section>
    );
   }
}

export default Algorithms;
