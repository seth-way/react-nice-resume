import React, { Component } from 'react';
import CarouselComponent from './AlgorithmComponents/CarouselComponent';
import axios from 'axios';

const fetchFromAPI = (path, callback) => {
    axios.get(path)
        .then(({ data }) => {
            callback(null, data);
        })
        .catch(err => {
            callback(err);
        });
}

const calculateAge = (date) => {
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

   getDummyData(){
      axios.get('./dummyData.json')
        .then(({ data }) => {this.setState({algorithms: data})})
        .catch((err) => {alert(err)})
   }

   fetchAlgorithms() {
    fetchFromAPI('https://api.github.com/repos/seth-way/algorithms/commits', (err, data) => {
        if (err) {
            alert(err);
        } else {
            for (let i = 0; i < data.length; i += 1) {
                const { sha } = data[i];
                fetchFromAPI(`https://api.github.com/repos/seth-way/algorithms/commits/${sha}`, (err2, data) => {
                    if (err2) {
                        console.log(err2);
                    } else if (data.files[0] && data.files[0].status === 'added' && data.files[0].filename[0] !== '.' && !this.state.algorithms[data.files[0].filename]) {
                        const { message } = data.commit;
                        const { filename } = data.files[0];
                        const daysOld = calculateAge(data.commit.author.date);
                        const title = filename.split('/')[1].slice(0, -3);
                        const url = `https://github.com/seth-way/algorithms/blob/master/${filename.split(' ')[0]}%20${filename.split(' ')[1]}`;
                        const difficulty = filename[0] === '1' ? 'Easy' : filename[0] === '2' ? 'Medium' : 'Hard';
                        fetchFromAPI(`https://raw.githubusercontent.com/seth-way/algorithms/master/${filename}`, (err3, data) => {
                            if (err3) {
                                console.log(err3);
                            } else {
                                const body = JSON.stringify(data);
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
                            }
                        });
                    }
                });
            }
        }
    });
   }
  
   componentDidMount() {
    // this.fetchAlgorithms();
    this.getDummyData();
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
