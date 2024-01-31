const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
console.log(ctx);
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;
const playerImage = new Image();
playerImage.src='adventurer_sprite_sheet.png';
const spriteWidth=575;
// total height of sprite sheet / 10 rows --> 523
const spriteHeight=523;
//assign frameX and frameY for ease of changing dimensions
let frameX=0;

let frameY=0;
//introduce gameFrame var to control animation speed
let gameFrame = 0;
const staggerFrames = 3;
const spriteAnimations=[];
const animationStates = [
    {
        name:'idle',
        frames: 7,
    },
    {
        name:'jump',
        frames: 7,
    }

];
animationStates.forEach((state, index)=> {
    let frames = {
        loc:[],
    }
    for (let i=0;i<state.frames; i++){
        let positionX = i * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations[state.name] = frames;
});
function animate(){
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations['idle'].loc.length;
    //ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
    //used for cutting out sprites one at a time
    //s = source dimension, d = destination dimension
    // changing x and y dimensions moves sprite sheet right and down respectively
    //origin is top left corner, so down is +y, up is -y...
    frameX = spriteWidth* position;
    ctx.drawImage(playerImage, frameX, frameY*spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    //simple animation loop
    // stagger frames statement will return true every X frames
    // thereby controlling frames per tick
 
    //endlessly increases
    gameFrame++;
    //problematic when not all rows have 7 frames (0-6)
    //so need a variable, not a hardcoded value
    //hence 

    requestAnimationFrame(animate);

};
animate();


