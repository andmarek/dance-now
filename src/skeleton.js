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
import {
    Engine
} from "./Engine"

const arrowBufferPx = 100;
const arrowVelocity = -10;
const screenOffsetY = 50;

let currentStreak = 0;
let gameScore = 0;
let ticks = 0;

const numToCreateArrowMap = {
    "1": createLeftArrow,
    "2": createDownArrow,
    "3": createUpArrow,
    "4": createRightArrow
}

function isClose(targetY, incomingY) {
    return (incomingY - targetY <= arrowBufferPx) && (incomingY - targetY >= 5)
}

function handleArrowPress(targetArrow, generatedIncomingArrows) {
    targetArrow.color = "blue";
    for (let arrowObject of generatedIncomingArrows) {
        handleScore(arrowObject, targetArrow);
    }
}

const Game = props => {
    const [score, setScore] = useState(gameScore);
    const [streak, setStreak] = useState(currentStreak);

    const canvasRef = useRef();
    const {} = props;

    function handleScore(incomingArrow, targetArrow) {
        if (incomingArrow.arrowType == targetArrow.arrowType) {
            if (isClose(targetArrow.y, incomingArrow.y)) {
                gameScore++;
                setScore(gameScore);
            }
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        let gameEngine = new Engine({canvas, context});
        let targets = gameEngine.generateTargets();

        document.addEventListener('keydown', keyPressDown, false);
        document.addEventListener('keyup', keyPressUp, false);

        function keyPressDown(e) {
            console.log(e.key);
            switch (e.key) {
                case "s":
                    handleArrowPress(targets.downTarget)
                    break;
                case "d":
                    handleArrowPress(targets.upTarget)
                    break;
                case "a":
                    handleArrowPress(targets.leftTarget)
                    break;
                case "f":
                    handleArrowPress(targets.rightTarget)
                    break;
                default:
                    break;
            }
        }

        function keyPressUp(e) {
            switch (e.key) {
                case "s":
                    targets.downTarget.color = "red";
                    break;
                case "d":
                    targets.upTarget.color = "red";
                    break;
                case "a":
                    targets.leftTarget.color = "red";
                    break;
                case "f":
                    targets.rightTarget.color = "red";
                    break;
                default:
                    break;
            }
        }

        /* TODO: generate these "randomly" at some point / right function
            to generate them instead of statically putting them in code like this.
        */
        const generatedIncomingArrows = [];

        // generate random amount thing 
        

        function animate() {
            gameEngine.generateIncomingArrows;
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
            <p> Streak: {streak}</p > 
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
