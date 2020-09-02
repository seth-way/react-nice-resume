import React, { Component } from 'react';

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

const AlgorithmModal = ({ algorithm, closeModal }) => {
    const { title, body } = algorithm;
    let [leetCodeLink, solutionBody] = parseLeetCodeLink(body);
    let [description, solution] = parseDescriptionSolution(solutionBody);
    description = removeLeadingTrailingNewLines(description);
    solution = removeLeadingTrailingNewLines(solution);
    return (
        <div>
            <h1>{title}</h1>
            <div className="description">
                <p>CHALLENGE:</p>
                {description.split('\\n').map((line) => <p>{line}</p>)}
            </div>
            <div className="solution">
                <p>SOLUTION:</p>
                {solution.split('\\n').map((line) => <p>{line}</p>)}
            </div>
            <div className="algorithmButtons">
                <span
                    onClick={() => closeModal()}
                >
                    <a  
                        className="button btn close-btn"
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
};

export default AlgorithmModal;