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
         showSolution: false,
      };

      this.openSolution = this.openSolution.bind(this);
      this.closeSolution = this.closeSolution.bind(this);
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
                                .catch(console.log);
                        }
                    })
                    .catch(console.log);
            })
        })
        .then(() => {
            const { algorithms } = this.state;
            algorithms['githubRepository'] = {
                filename: 'github repository',
                daysOld: 999999999999999999999999999999999,
                title: 'Check Out the Entire Repo on Github!'
            };
        })
        .catch(console.log);
   }
  
   componentDidMount() {
    this.fetchAlgorithmsFromAPI();
   }

   openSolution() {
     this.setState({showSolution: true});
   }

   closeSolution() {
     this.setState({showSolution: false});
   }
   
   render() {
    const { algorithms, showSolution } = this.state;
    
    return (
      <section id="algorithms">  
        <div className="row">
            <h1 style={showSolution ? {display: "none"} : {}}>
                I try to challenge myself with algorithms daily.
                Check out my most recent solutions!
            </h1>
            <div style={{marginTop: "5px", marginBottom: "15px" }}>
                {Object.keys(algorithms).length > 0 ?
                    <CarouselComponent
                        algorithms={algorithms}
                        showSolution={showSolution}
                        openSolution={this.openSolution}
                        closeSolution={this.closeSolution}
                    /> :
                ''}
            </div>
            <h1 style={showSolution ? {display: "none"} : {}}>
                ... or visit the entire repo on
                <a
                    href="https://github.com/seth-way/algorithms"
                    rel="noopener noreferrer"
                    target="_blank"
                    style= {{color: "#872657"}}
                >
                    {' '}GitHub
                </a>
                .
            </h1>
        </div>
    </section>
    );
   }
}

export default Algorithms;
