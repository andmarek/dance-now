export default class Engine {
    constructor({
        canvas,
        context
    }) {
        this.canvas = canvas;
        this.context = context
    }

    generateTargets() {
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

    generateIncomingArrows() {
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

    createLeftArrow(context, canvas, color) {
        return new Arrow({
            arrowType: ArrowTypes.LEFT,
            ctx: context,
            x: 400,
            y: canvas.height,
            color: color
        })
    }

    createDownArrow(context, canvas, color) {
        return new Arrow({
            arrowType: ArrowTypes.DOWN,
            ctx: context,
            x: 500,
            y: canvas.height,
            color: color
        })
    }

    createUpArrow(context, canvas, color) {
        return new Arrow({
            arrowType: ArrowTypes.UP,
            ctx: context,
            x: 600,
            y: canvas.height,
            color: color
        })
    }

    createRightArrow(context, canvas, color) {
        return new Arrow({
            arrowType: ArrowTypes.RIGHT,
            ctx: context,
            x: 700,
            y: canvas.height,
            color: color
        })
    }
}
