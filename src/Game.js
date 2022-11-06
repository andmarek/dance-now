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
console.log("component")
const Game = props => {
    console.log("Start of game");
    const [score, setScore] = useState(gameScore);
    const canvasRef = useRef();
    const {} = props;

    useEffect(() => {
        document.addEventListener('keydown', keyPressDown, false);
        document.addEventListener('keyup', keyPressUp, false);

        function keyPressDown(e) {
            switch (e.key) {
                case "ArrowDown":
                    arrows.downArrow.color = "red";
                    if (arrows.downArrow.y - targets.downTarget.y < 50) {
                        console.log("DOWN GOT HIT");
                        let newScore = gameScore;
                        gameScore+=2;
                        setScore(newScore);
                    }
                    break;
                case "ArrowUp":
                    arrows.upArrow.color = "red";
                    if (arrows.upArrow.y == targets.upTarget.y) {
                        console.log("UP GOT HIT");
                        let newScore = score;
                        newScore+=2;
                        setScore(newScore);
                    }
                    break;
                case "ArrowLeft":
                    arrows.leftArrow.color = "red";
                    if (arrows.leftArrow.y == targets.leftTarget.y) {
                        score++;
                    }
                    break;
                case "ArrowRight":
                    arrows.rightArrow.color = "red";
                    if (arrows.rightArrow.y == targets.rightTarget.y) {
                        score++;
                    }
                    break;
                default:
                    break;
            }
        }

        function keyPressUp(e) {
            switch (e.key) {
                case "ArrowDown":
                    arrows.downArrow.color = "white";
                    break;
                case "ArrowUp":
                    arrows.upArrow.color = "white";
                    break;
                case "ArrowLeft":
                    arrows.leftArrow.color = "white";
                    break;
                case "ArrowRight":
                    arrows.rightArrow.color = "white";
                    break;
                default:
                    break;
            }
        }
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
        const targets = {
            leftTarget: new Arrow({
                ctx: context,
                x: (canvas.width / 6),
                y: screenOffsetY,
                color: "#FF0000"
            }),
            upTarget: new Arrow({
                ctx: context,
                x: (canvas.width / 6) * 4,
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
                x: (canvas.width / 6) * 2,
                y: screenOffsetY,
                color: "#FF0000"
            })
        }

        /* TODO: fix math on these. Can we make arrow generation easy? */
        const arrows = {
            leftArrow: new Arrow({
                ctx: context,
                x: (canvas.width / 6),
                y: canvas.height,
                color: "#F0FFFF"
            }),
            rightArrow: new Arrow({
                ctx: context,
                x: (canvas.width / 6) * 4,
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
                x: (canvas.width / 6) * 2,
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