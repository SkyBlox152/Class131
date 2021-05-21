img = "";
status = "";
object = [];

function preload() {
    img = loadImage("dog_cat.jpg")
}

function setup() {
    canvas = createCanvas(500, 500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    video.size(500,500)
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
}

function draw() {
    image(video, 0, 0, 500, 500);
    if (status != "") {
        document.getElementById("num").innerHTML=object.length;
         r=random(255);
         g=random(255);
         b=random(255);
         objectDetector.detect(video, gotResult);
        for (var i = 0; i < object.length; i++) {
         fill(r,g,b);
            per=Math.floor((object[i].confidence)*100);
            text(object[i].label +" "+per+"%", object[i].x, object[i].y);
            noFill();
            stroke(r,g,b)
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}
function modelLoaded() {
    console.log("Model Loaded!")
    status = true;
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    object = results;
    console.log(results);
}
