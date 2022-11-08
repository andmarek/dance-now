/*
TODO: https://stackoverflow.com/questions/46138145/where-should-functions-in-function-components-go#:~:text=In%20most%20cases%20you%20should,function%20will%20be%20defined%20again.
*/

import {
    React,
    useRef,
    useEffect,
    useState
} from 'react';
import {
    Arrow,
    ArrowTypes
} from "./Arrow"

const arrowBufferPx = 100;
const arrowVelocity = -10;
const screenOffsetY = 50;
let gameScore = 0;
let ticks = 0;
const numToCreateArrowMap = {
    "1": createLeftArrow,
    "2": createDownArrow,
    "3": createUpArrow,
    "4": createDownArrow
}

function isClose(targetY, incomingY) {
    return (incomingY - targetY <= arrowBufferPx) && (incomingY - targetY >= 5)
}

const Game = props => {
    const [score, setScore] = useState(gameScore);
    const canvasRef = useRef();
    const {} = props;

    useEffect(() => {
        function handleArrowPress(targetArrow) {
            targetArrow.color = "blue";
            for (let arrowObject of generatedIncomingArrows) {
                if (arrowObject.arrowType == targetArrow.arrowType) {
                    if (isClose(targetArrow.y, arrowObject.y)) {
                        gameScore++;
                        setScore(gameScore);
                    }
                }
            }
        }
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        /*
            let img = document.getElementById("myImage");
            context.drawImage(img, 10, 30);
        */

        let targets = generateTargets();

        document.addEventListener('keydown', keyPressDown, false);
        document.addEventListener('keyup', keyPressUp, false);

        function keyPressDown(e) {
            switch (e.key) {
                case "ArrowDown":
                    handleArrowPress(targets.downTarget)
                    break;
                case "ArrowUp":
                    handleArrowPress(targets.upTarget)
                    break;
                case "ArrowLeft":
                    handleArrowPress(targets.leftTarget)
                    break;
                case "ArrowRight":
                    handleArrowPress(targets.rightTarget)
                    break;
                default:
                    break;
            }
        }

        function keyPressUp(e) {
            switch (e.key) {
                case "ArrowDown":
                    targets.downTarget.color = "red";
                    break;
                case "ArrowUp":
                    targets.upTarget.color = "red";
                    break;
                case "ArrowLeft":
                    targets.leftTarget.color = "red";
                    break;
                case "ArrowRight":
                    targets.rightTarget.color = "red";
                    break;
                default:
                    break;
            }
        }

        function generateTargets() {
            return {
                leftTarget: new Arrow({
                    ctx: context,
                    arrowType: ArrowTypes.LEFT,
                    x: 400,
                    y: screenOffsetY,
                    color: "#FF0000"
                }),
                downTarget: new Arrow({
                    ctx: context,
                    arrowType: ArrowTypes.DOWN,
                    x: 500,
                    y: screenOffsetY,
                    color: "#FF0000"
                }),
                upTarget: new Arrow({
                    ctx: context,
                    arrowType: ArrowTypes.UP,
                    x: 600,
                    y: screenOffsetY,
                    color: "#FF0000"
                }),
                rightTarget: new Arrow({
                    ctx: context,
                    arrowType: ArrowTypes.RIGHT,
                    x: 700,
                    y: screenOffsetY,
                    color: "#FF0000"
                })
            }
        }
        /* TODO: generate these "randomly" at some point / right function
            to generate them instead of statically putting them in code like this.
        */
        const generatedIncomingArrows = [];

        // generate random amount thing 
        function generateIncomingArrows() {
            const max = 4;
            const min = 1;

            const numberOfArrows = Math.floor(Math.random() * (max - min + 1)) + min;
            let arrowTuple = [];

            for (let i = 0; i < numberOfArrows; i++) {
                const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
                arrowTuple.push(randomNumber);
            }

            let generatedArrow = null;
            if (ticks % 100 == 0) {
                arrowTuple.forEach((arrowNum) => {
                    generatedArrow = numToCreateArrowMap[arrowNum](context, canvas, "white");
                    generatedIncomingArrows.push(generatedArrow);
                });
            }
        }

        function animate() {
            generateIncomingArrows();
            context.clearRect(0, 0, canvas.width, canvas.height);

            for (const [_, targetObject] of Object.entries(targets)) {
                targetObject.draw();
            }
            for (const arrowObject of generatedIncomingArrows) {
                arrowObject.draw();
                arrowObject.y += arrowVelocity;
            }
            ticks++;
        }
        setInterval(animate, 10);
    }, []);

    return ( 
        <div> 
            <canvas style={{background: "black"}} ref={canvasRef} {...props}/>
            <p> Score: {score}</p > 
        </div>
    )
}

function createLeftArrow(context, canvas, color) {
    return new Arrow({
        arrowType: ArrowTypes.LEFT,
        ctx: context,
        x: 400,
        y: canvas.height,
        color: color
    })
}

function createDownArrow(context, canvas, color) {
    return new Arrow({
        arrowType: ArrowTypes.DOWN,
        ctx: context,
        x: 500,
        y: canvas.height,
        color: color
    })
}

function createUpArrow(context, canvas, color) {
    return new Arrow({
        arrowType: ArrowTypes.UP,
        ctx: context,
        x: 600,
        y: canvas.height,
        color: color
    })
}

function createRightArrow(context, canvas, color) {
    return new Arrow({
        arrowType: ArrowTypes.RIGHT,
        ctx: context,
        x: 700,
        y: canvas.height,
        color: color
    })
}
export default Game;
