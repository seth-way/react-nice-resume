import React, { Component } from 'react';
import CarouselComponent from './CarouselComponent';
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
         algorithms: [],
      };
   }
   getDummyData(){
      axios.get('./dummyData.json')
        .then(({ data }) => {this.setState({algorithms: data})})
        .catch((err) => {alert(err)})
  }

  componentDidMount(){
    this.getDummyData();
  }
  /*
   componentDidMount() {


        fetchFromAPI('https://api.github.com/repos/seth-way/algorithms/commits', (err, data) => {
            if (err) {
                alert(err);
            } else {
                for (let i = 0; i < 15; i += 1) {
                    const { sha } = data[i];
                    fetchFromAPI(`https://api.github.com/repos/seth-way/algorithms/commits/${sha}`, (err2, data) => {
                        if (err2) {
                            console.log(err2);
                        } else if (data.files[0] && data.files[0].status === 'added' && data.files[0].filename[0] !== '.') {
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
                                    const body = data;
                                    const { algorithms } = this.state;
                                    algorithms.push({
                                        message,
                                        filename,
                                        daysOld,
                                        title,
                                        url,
                                        difficulty,
                                        body,
                                    });
                                    this.setState({ algorithms: algorithms });
                                }
                            });
                        }
                    });
                }
            }
        });
   }
   */
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
            {algorithms.length > 0 ? <CarouselComponent algorithms={algorithms}/> : ''}
          </div>
        </div>
    </section>
    );
   }
   /*
   render() {
        if (this.state.algorithms.length) {
            var algorithms = this.state.algorithms.sort((a, b) => (a.daysOld - b.daysOld)).slice(0, 3).map((algorithm) => {
              var algorithmImage = 'images/algorithms/' + algorithm.difficulty + '.jpg';
              const daysOldMessage = algorithm.daysOld === 0 ? 'today' : `${algorithm.daysOld} day${algorithm.daysOld > 1 ? 's' : ''} ago... `;

              return (
                <div key={algorithm.title} className="columns algorithms-item">
                  <div className="item-wrap">
                    <a href={algorithm.url} title={algorithm.title}>
                      <img alt={algorithm.title} src={algorithmImage} />
                      <div className="overlay">
                        <div className="algorithms-item-meta">
                          <h5>{algorithm.title}</h5>
                          <p>{daysOldMessage}</p>
                          <p>{algorithm.difficulty}</p>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              )
            })
        }

        return (
            <section id="algorithms">
      
              <div className="row">
      
                <div className="twelve columns collapsed">
      
                  <h1>
                      I try to challenge myself with algorithms daily.<br />
                      Check out my most recent solutions!
                  </h1>

                  <div id="algorithms-wrapper" className="bgrid-quarters s-bgrid-thirds cf">
                    {algorithms}
                    <div key="github" className="columns algorithms-item">
                      <div className="item-wrap">
                        <a href="https://github.com/seth-way/algorithms" title="Algorithms Repo">
                          <img alt="gitHubLogo" src="images/algorithms/github.jpg" />
                          <div className="overlay">
                            <div className="algorithms-item-meta">
                              <h5>Want More Solutions?</h5>
                              <p className="gitHubPrompt">
                                Check out my github repository for more work with algorithms!
                              </p>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
        );
   }
  */
}

export default Algorithms;
