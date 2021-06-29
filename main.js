rightWristX = "";
rightWristY = "";
scorerightWrist = "";
game_status = "";

function preload(){

}

function setup(){
    var canvas = createCanvas(700, 600);
    canvas.parent('canvas');
    video = createCapture(VIDEO);
    video.size(700, 600);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('modelLoaded');
}

function start(){
    game_status = "start";
    document.getElementById("status").innerHTML = "Game Is Loading";
  }

function gotPoses(results){
	if(results.length > 0){
        console.log(results);
        scoreRightWrist =  results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist );
    
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);
        }
}

function draw(){
    if(game_status == "start"){
        background(0);
        image(video, 0, 0, 700, 600);

        fill("black");
        stroke("black");
        rect(600,0,20,700);
        
        fill("black");
        stroke("black");
        rect(0,0,20,700);

        if(scoreRightWrist > 0.2){
            fill("#FF0000");
            stroke("#FF0000");
            circle(rightWristX,rightWristY,30);
        }

        paddleInCanvas();

        fill(250,0,0);
        stroke(0,0,250);
        strokeWeight(0.5);
        paddle1Y = rightWristY;
        rect(paddle1X,paddle1Y,paddle1,paddle1Height,100);

        fill("#FFA500");
        stroke("#FFA500");
        var paddle2y = ball.y - paddle2Height/2;  rect(paddle2Y,paddle2y,paddle2,paddle2Height,100);

        midLine();

        drawScore();

        models();

        move();
    }
}