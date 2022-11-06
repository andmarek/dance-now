import {
    React,
    useRef,
    useEffect,
    useState
} from 'react';
import {
    Arrow, ArrowTypes
} from "./Arrow"

const arrowBufferPx = 50;
const arrowVelocity = -5;
const screenOffsetY = 50;
let gameScore = 0;

const Game = props => {
    console.log("Start of game");
    const [score, setScore] = useState(gameScore);
    const canvasRef = useRef();
    const {} = props;
    

    // since we're gonna use a random amount of arrows, we should instead 
    //  when an incoming arrow gets to the "space" where it needs to be pressed,
    // we can have global state like "keydown" and if keydown when it's on the spot,
    // increase the score
    // so now the arrows are asking for game state 
    // instead of gamestate asking for arrows
    // then we can change from dict to just list of arrows we're generating
    useEffect(() => {
        function handleArrowPress(targetArrow, incomingArrow) {
            targetArrow.color = "blue";
            if ((incomingArrow.y - targetArrow.y <= arrowBufferPx) && (incomingArrow.y - targetArrow.y >= 5)) {
                console.log("buffer" + (targetArrow.y - incomingArrow.y))
                gameScore++;
                setScore(gameScore);
            }
        }
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        let targets = generateTargets();

        document.addEventListener('keydown', keyPressDown, false);
        document.addEventListener('keyup', keyPressUp, false);

        function keyPressDown(e) {
            switch (e.key) {
                case "ArrowDown":
                    handleArrowPress(targets.downTarget, incomingArrows.downArrow, score);
                    break;
                case "ArrowUp":
                    handleArrowPress(targets.upTarget, incomingArrows.downArrow, score);
                    break;
                case "ArrowLeft":
                    handleArrowPress(targets.leftTarget, incomingArrows.leftArrow, score);
                    break;
                case "ArrowRight":
                    handleArrowPress(targets.rightTarget, incomingArrows.rightArrow, score);
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
                    x: 400,
                    y: screenOffsetY,
                    color: "#FF0000"
                }),
                upTarget: new Arrow({
                    ctx: context,
                    x: 500,
                    y: screenOffsetY,
                    color: "#FF0000"
                }),
                downTarget: new Arrow({
                    ctx: context,
                    x: 600,
                    y: screenOffsetY,
                    color: "#FF0000"
                }),
                rightTarget: new Arrow({
                    ctx: context,
                    x: 700,
                    y: screenOffsetY,
                    color: "#FF0000"
                })
            }
        }
        /* TODO: generate these "randomly" at some point / right function
            to generate them instead of statically putting them in code like this.
        */
        const incomingArrows = {
            leftArrow: new Arrow({
                arrowTypetype: ArrowTypes.LEFT,
                ctx: context,
                x: 400,
                y: canvas.height,
                color: "#F0FFFF"
            }),
            upArrow: new Arrow({
                arrowTypetype: ArrowTypes.UP,
                ctx: context,
                x: 500,
                y: canvas.height,
                color: "#F0FFFF"
            }),
            downArrow: new Arrow({
                arrowTypetype: ArrowTypes.DOWN,
                ctx: context,
                x: 600,
                y: canvas.height,
                color: "#F0FFFF"
            }),
            rightArrow: new Arrow({
                arrowTypetype: ArrowTypes.RIGHT,
                ctx: context,
                x: 700,
                y: canvas.height,
                color: "#F0FFFF"
            })
        }

        function animate() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            
            for (const [_, targetObject] of Object.entries(targets)) {
                targetObject.draw();
            }
            for (const [_, arrowObject] of Object.entries(incomingArrows)) {
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