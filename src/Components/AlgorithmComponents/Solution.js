import React, { Component } from 'react';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/tomorrow-night-bright.css';

hljs.registerLanguage('javascript', javascript);
hljs.configure({usBR: true});

const removeLeadingTrailingNewLines = (bodySTR) => {
    let result = bodySTR;

    if(result.lastIndexOf('\"') === result.length - 1) {
        result = result.slice(0, result.length - 1);
    }

    if (result.indexOf('\\n') === 0) {
        result = result.slice(2);
    }

    if (result.lastIndexOf('\\n') === result.length - 2) {
        result = result.slice(0, result.length - 2);
    }
    return result;
}

const parseLeetCodeLink = (bodySTR) => {
    const start = bodySTR.indexOf('\\n');
    const end = bodySTR.indexOf('\\n\\n');
    const link = bodySTR.slice(start + 2, end);
    const restOfBody = removeLeadingTrailingNewLines(bodySTR.slice(end + 2));

    return [link, restOfBody];
}

const parseDescriptionSolution = (bodySTR) => {
    const endDescription = bodySTR.indexOf('*/')
    const description = removeLeadingTrailingNewLines(bodySTR.slice(0, endDescription));
    const solution = removeLeadingTrailingNewLines(bodySTR.slice(endDescription + 2));
    return [description, solution];
}

const findLongestLineOfCode = (codeArray) => {
    return codeArray.reduce((acc, line) => {
        if (line.length > acc) {
            acc = line.length;
        }
        return acc;
    }, 0);
}

class Solution extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let preCodes = document.querySelectorAll("pre code:not(.hljs)");
        console.log(preCodes);
        for(var i = 0; i < preCodes.length; i++) {
          hljs.highlightBlock(preCodes[i]);
        }
    }

    componentDidUpdate() {
        let preCodes = document.querySelectorAll("pre code:not(.hljs)");
        console.log(preCodes);
        for(var i = 0; i < preCodes.length; i++) {
          hljs.highlightBlock(preCodes[i]);
        }
    }
    
    render() {
        const { algorithm, showSolution, closeSolution } = this.props;
        const { title, body } = algorithm;
        let [leetCodeLink, solutionBody] = parseLeetCodeLink(body);
        let [description, solution] = parseDescriptionSolution(solutionBody);
        description = removeLeadingTrailingNewLines(description);
        solution = removeLeadingTrailingNewLines(solution);
        const solutionArray = solution.split('\\n');
        const longestLine = findLongestLineOfCode(solutionArray);

        return (
            <div className="solution">
                <div
                    id="close-solution"
                    onClick={() => { showSolution ? closeSolution() : console.log('')}}
                >
                    <a><i className="icon-plus"></i></a>
                </div>
                <div className="solutionHeader">
                    <h1>{title}</h1>
                </div>
                <div className="content">
                    <div className="description">
                        <p className="codeHeader">CHALLENGE:</p>
                        <div className="dList">
                            {description.split('\\n').map((line) => <p>{line}</p>)}
                        </div>
                    </div>
                    <div className="code">
                        <p className="codeHeader">SOLUTION:</p>                     
                        <div className="codeList">
                            {solutionArray.map((line) => (
                                <p><pre ref="solutionCode"><code className="javascript">{line}</code></pre></p>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="algorithmButtons">
                    <span
                        onClick={
                            () => { showSolution ? closeSolution() : console.log('')}}
                    >
                        <a  
                            className="button btn close-btn"
                            href="#algorithms"
                        >Close Solution </a>
                    </span>
                    <span>
                        <a
                            href={leetCodeLink} rel="noopener noreferrer"
                            target="_blank"
                            className="button btn leetcode-btn"
                        >Checkout On Leetcode
                        </a>
                    </span>
                </div>
            </div>
        );
    }
};

export default Solution;