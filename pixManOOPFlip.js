console.log("version 0.2")


let w = 20;
let ww = window.innerWidth / (3 * w);
let h = 20;
let r = "red";
let b = "blue";
let br = "brown";
let bk = "grey";
let p = "pink";


class Pix {
    constructor(num, x, y, parent, c) {
        this.num = num;
        this.x = x;
        this.y = y;
        this.parent = parent;
        this.div = document.createElement("DIV");
        this.div.id = num;
        this.div.className = "pixel";
        this.div.style.height = `${ww}px`;
        this.div.addEventListener("mouseenter", function () {
            over(num)
        });
        console.log(c);

        this.div.style.background = c;
        this.parent = parent;
        this.parent.appendChild(this.div);
    }
}

function over(number) {
    console.log(number);
    let cl;
    for (let i in pixels) {
        if (i == number) {
            cl = "select"
        } else if (i % w == number % w) {
            cl = "line";
        } else if (Math.floor(i / w) == Math.floor(number / w)) {
            cl = "line";
        } else {
            cl = "other";
        }
        pixels[i].div.className = cl;
    }

    let flipNum = number + w - 1 - number%w;
    console.log(`${w} ${number%w} ${flipNum} ${number}`);
    for (let i in outPixels) {
        if (i == flipNum) {
            cl = "select"
        } else if (i % w == flipNum % w) {
            cl = "line";
        } else if (Math.floor(i / w) == Math.floor(flipNum / w)) {
            cl = "line";
        } else {
            cl = "other";
        }
        outPixels[i].div.className = cl;
    }

    let inDiv = document.getElementById("inNum");
    let outDiv = document.getElementById("outNum");

    let inDivText = "Equation:<br>PixNum = y*width+x<br>"
    inDivText += `x = ${number%w}<br>`
    inDivText += `y = ${Math.floor(number/w)}<br>`
    inDivText += `PixNum = ${Math.floor(number/w)}*${w}+${number%w}<br>`
    inDivText += `PixNum = ${number}<br>`
    inDivText += `image.pixels[${number}]`
    inDiv.innerHTML = inDivText;

    let outDivText = "Equation:<br>PixNum = y*width+width-1-x<br>"
    let x = number%w
    let y = Math.floor(number/w)
    outDivText += `x = ${x}<br>`
    outDivText += `y = ${y}<br>`
    outDivText += `PixNum = ${y}*${w}+${w}-1-${x}<br>`
    outDivText += `PixNum = ${y*w+w-1-x}<br>`
    outDivText += `pixels[${y*w+x}]`
    outDiv.innerHTML = outDivText;


}

let pixels = [];
let outPixels = [];
let colourPix = [];

function setup(mode) {

    let myCan = document.getElementById("myCan");
    let myCtx = myCan.getContext("2d");
    myCan.width = w;
    myCan.height = h;
    myCan.style.visibility = "hidden";
    myCan.style.position = "absolute";
    let myImg = new Image();
    colourPix = [];
    myImg.onload = function () {
        myCtx.drawImage(myImg, 0, 0, w, h);
        let imageData = myCtx.getImageData(0, 0, w, h);
        let stringer = "rgba(";
        for (let i in imageData.data) {
            stringer += `${imageData.data[i]},`;
            if (i % 4 == 3) {
                stringer = stringer.slice(0, -1);
                stringer += ")";
                colourPix.push(stringer);
                stringer = "rgb("
            }
        }
        console.log(colourPix[0]);

        let pixDiv = document.getElementById("pix");
        pixDiv.innerHtml = "";
        let template = "";
        for (let i = 0; i < w; i++) {
            template += "1fr "
        }
        pixDiv.style.gridTemplateColumns = template;
        pixels = [];
        for (let i = 0; i < w * h; i++) {
            pixels.push(new Pix(i, i % w, i / w, pixDiv, colourPix[i]));
        }

        let pixOutDiv = document.getElementById("pixOut");
        pixOutDiv.innerHtml = "";
        template = "";
        for (let i = 0; i < w; i++) {
            template += "1fr "
        }
        pixOutDiv.style.gridTemplateColumns = template;
        outPixels = [];
        for (let y = 0; y < h; y++){
            for (let x = 0; x< w; x++){
                let i = y*w - x+w-1;
                outPixels.push(new Pix(i, i % w, i / w, pixOutDiv,colourPix[i]));
            }
        }

    };

    myImg.src = 'parrot.png';






}


function changer(){
    w = window.prompt("please enter the number of pixels wide you would like the image");
    h = w;
    ww = window.innerWidth / (3 * w);


    setup();


}
