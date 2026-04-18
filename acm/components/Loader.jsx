import React from 'react';
import styled from 'styled-components';

const Loader = () => {
    return (
        <StyledWrapper>
            <div className="pyramid-loader">
                <div className="wrapper">
                    <span className="side side1" />
                    <span className="side side2" />
                    <span className="side side3" />
                    <span className="side side4" />
                    <span className="side side5" />
                    <span className="side side6" />
                    <span className="side side7" />
                    <span className="side side8" />
                    <span className="shadow" />
                </div>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
    position: fixed;
    inset: 0;
    height: 100vh;
    width: 100vw;

    display: flex;
    justify-content: center;
    align-items: center;

    background: black; /* background behind loader */
    z-index: 99999;



    .pyramid-loader {
        width: 100px;
        height: 100px;
        position: relative;
        display: block;
        transform-style: preserve-3d;
        transform: rotateX(-20deg);
    }

    .wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
        animation: spin 2s ease-in-out infinite;
    }

    @keyframes spin {
        100% {
            transform: rotateY(360deg);
        }
    }

    .pyramid-loader .wrapper .side {
        width: 100%;
        height: calc(100% * 167 / 240);
        clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        transform-origin: center top;
        background: conic-gradient(from 0deg, #00ffcc, #00c896, #007e7e, #00ffcc);
    }

    .pyramid-loader .wrapper .side1 { transform: rotateZ(-45deg) rotateY(90deg); }
    .pyramid-loader .wrapper .side2 { transform: rotateZ(45deg) rotateY(90deg); }
    .pyramid-loader .wrapper .side3 { transform: rotateX(45deg); }
    .pyramid-loader .wrapper .side4 { transform: rotateX(-45deg); }
    .pyramid-loader .wrapper .side5 { transform: rotateZ(-45deg) rotateY(90deg) rotateX(180deg); top: 148%; }
    .pyramid-loader .wrapper .side6 { transform: rotateZ(45deg) rotateY(90deg) rotateX(180deg); top: 148%; }
    .pyramid-loader .wrapper .side7 { transform: rotateX(45deg) rotateX(180deg); top: 148%; }
    .pyramid-loader .wrapper .side8 { transform: rotateX(-45deg) rotateX(180deg); top: 148%; }

    .pyramid-loader .wrapper .shadow {
        width: 66%;
        height: 66%;
        position: absolute;
        top: 55%;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        transform: rotateX(90deg) translateZ(-40px);
        background: #00c896;
        filter: blur(20px);
    }
`;

export default Loader;
