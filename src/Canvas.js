import React, {
    useRef,
    useEffect
} from 'react';

import {
    Ball
} from "./Ball"



const Canvas = props => {
    const canvasRef = useRef();
    const {
        draw,
        ...rest
    } = props;
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const leftTarget = new Ball({
            ctx: context,
            x: canvas.width / 2,
            y: canvas.height,
            color: "#FF0000"
        });
        const upTarget = new Ball({
            ctx: context,
            x: canvas.width / 3,
            y: canvas.height,
            color: "#FF0000"
        });
        const downTarget = new Ball({
            ctx: context,
            x: canvas.width / 4,
            y: canvas.height,
            color: "#FF0000"
        });
        const rightTarget = new Ball({
            ctx: context,
            x: canvas.width / 5,
            y: canvas.height,
            color: "#FF0000"
        });

        leftTarget.draw();
        upTarget.draw();
        downTarget.draw();
        rightTarget.draw();
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