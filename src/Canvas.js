import React, {
    useRef,
    useEffect
} from 'react';

import {
    Ball
} from "./Ball"

const buttons = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40
}

const arrowVelocity = -2;

const Canvas = props => {
    const canvasRef = useRef();
    const {
        draw,
        ...rest
    } = props;
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        /* ideas
            could we put these into a queue
            then have a class arrow
            have right left up down arrow subclasses that extend arrow base class
            if we want to generate an arrow at a particular time (say left arrow is drums)
            then we can just call that whenever we detect drums and add to queue
            then we have a renderer class that pops from queue and renders it ?
        */
        const leftTarget = new Ball({
            ctx: context,
            x: (canvas.width/6),
            y: 0,
            color: "#FF0000"
        });
        const upTarget = new Ball({
            ctx: context,
            x: (canvas.width/6) * 2,
            y: 0,
            color: "#FF0000"
        });
        const downTarget = new Ball({
            ctx: context,
            x: (canvas.width/6)*3,
            y: 0,
            color: "#FF0000"
        });
        const rightTarget = new Ball({
            ctx: context,
            x: (canvas.width/6)*4,
            y: 0,
            color: "#FF0000"
        });
        
        const arrows = {
            leftArrow: new Ball({
                ctx: context,
                x: (canvas.width/6),
                y: canvas.height,
                color: "#F0FFFF"
            }),
            rightArrow: new Ball({
                ctx: context,
                x: (canvas.width/6) * 2,
                y: canvas.height,
                color: "#F0FFFF"
            }),
            downArrow: new Ball({
                ctx: context,
                x: (canvas.width/6)*3,
                y: canvas.height,
                color: "#F0FFFF"
            }),
            upArrow: new Ball({
                ctx: context,
                x: (canvas.width/6)*4,
                y: canvas.height,
                color: "#F0FFFF"
            })
        }
        
    function animate() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        // draw targets
        leftTarget.draw();
        upTarget.draw();
        downTarget.draw();
        rightTarget.draw();

        // draw arrows that go to targets
        arrows.leftArrow.draw();
        arrows.upArrow.draw();
        arrows.downArrow.draw();
        arrows.rightArrow.draw();

        arrows.leftArrow.y += arrowVelocity;
        arrows.upArrow.y += arrowVelocity;
        arrows.downArrow.y += arrowVelocity;
        arrows.rightArrow.y += arrowVelocity;
        for (const [arrowName, arrowObject] of Object.entries(arrows)) {
            if (arrowObject.y < 0) {
                arrowObject.y = canvas.height;
            }
        }
    }

    setInterval(animate, 10);
    }, []);

    return <canvas style = {
        {
            background: "black"
        }
    }
    ref = {
        canvasRef
    } {
        ...props
    }
    />
}

export default Canvas;