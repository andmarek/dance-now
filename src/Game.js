import {
    React,
    useRef,
    useEffect,
    useState
} from 'react';
import {
    Arrow
} from "./Arrow"

const arrowVelocity = -2;
const screenOffsetY = 50;
let gameScore = 0;

const Game = props => {
    console.log("Start of game");
    const [score, setScore] = useState(gameScore);
    const canvasRef = useRef();
    const {} = props;

    function handleArrowPress(targetArrow, incomingArrow, currentScore) {
        targetArrow.color = "blue";
        if (targetArrow.y - incomingArrow.y > 50) {
            let newScore = currentScore;
            newScore++;
            setScore(newScore);
        }
    }
    /* 
        let's you perform side effects in function components 
    */
    useEffect(() => {
        document.addEventListener('keydown', keyPressDown, false);
        document.addEventListener('keyup', keyPressUp, false);

        function keyPressDown(e) {
            switch (e.key) {
                case "ArrowDown":
                    handleArrowPress(targets.downTarget, arrows.downArrow, score);
                    break;
                case "ArrowUp":
                    handleArrowPress(targets.upTarget, arrows.downArrow, score);
                    break;
                case "ArrowLeft":
                    handleArrowPress(targets.leftTarget, arrows.leftArrow, score);
                    break;
                case "ArrowRight":
                    handleArrowPress(targets.rightTarget, arrows.rightArrow, score);
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
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        let targets = generateTargets();
        /* ideas
            could we put these into a queue
            then have a class arrow
            have right left up down arrow subclasses that extend arrow base class
            if we want to generate an arrow at a particular time (say left arrow is drums)
            then we can just call that whenever we detect drums and add to queue
            then we have a renderer class that pops from queue and renders it ?
        */
        function generateTargets() {
            return {
                leftTarget: new Arrow({
                    ctx: context,
                    x: (canvas.width / 6),
                    y: screenOffsetY,
                    color: "#FF0000"
                }),
                upTarget: new Arrow({
                    ctx: context,
                    x: (canvas.width / 6) * 2,
                    y: screenOffsetY,
                    color: "#FF0000"
                }),
                downTarget: new Arrow({
                    ctx: context,
                    x: (canvas.width / 6) * 3,
                    y: screenOffsetY,
                    color: "#FF0000"
                }),
                rightTarget: new Arrow({
                    ctx: context,
                    x: (canvas.width / 6) * 4,
                    y: screenOffsetY,
                    color: "#FF0000"
                })
            }
        }
        /* TODO: generate these "randomly" at some point / right function
            to generate them instead of statically putting them in code like this.
        */
        const arrows = {
            leftArrow: new Arrow({
                ctx: context,
                x: (canvas.width / 6),
                y: canvas.height,
                color: "#F0FFFF"
            }),
            rightArrow: new Arrow({
                ctx: context,
                x: (canvas.width / 6) * 2,
                y: canvas.height,
                color: "#F0FFFF"
            }),
            downArrow: new Arrow({
                ctx: context,
                x: (canvas.width / 6) * 3,
                y: canvas.height,
                color: "#F0FFFF"
            }),
            upArrow: new Arrow({
                ctx: context,
                x: (canvas.width / 6) * 4,
                y: canvas.height,
                color: "#F0FFFF"
            })
        }

        function animate() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            
            for (const [_, targetObject] of Object.entries(targets)) {
                targetObject.draw();
            }
            for (const [_, arrowObject] of Object.entries(arrows)) {
                arrowObject.draw();
                arrowObject.y += arrowVelocity;
                if (arrowObject.y < 0) {
                    arrowObject.y = canvas.height;
                }
            }
        }
        
        setInterval(animate, 10);
    }, []);

    return <div > < canvas style = {
        {
            background: "black"
        }
    }
    ref = {
        canvasRef
    } {
        ...props
    }
    /> <p> Score: {score}</p > </div>

}
export default Game;