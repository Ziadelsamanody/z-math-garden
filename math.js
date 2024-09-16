// set the game logic

var answer;
var score = 0 ;
var backgorundImages = [];

// serving the new question
function nextQuestion() {
  const n1 = Math.floor(Math.random() * 5); // multiply the rounded by 5 get number betwwen 0, 4
  document.getElementById("n1").innerHTML = n1;

  const n2 = Math.floor(Math.random() * 6);  //multiply the round number by 6 to get  number betwwen 0, 5 
  document.getElementById("n2").innerHTML = n2;
  answer = n1 + n2;
}

function checkAnswer() {
  const prediction = predictImage();
  console.log(`answer : ${answer}, prediction ${prediction}`);

  if (prediction == answer){
    score++;  //incresase score
    console.log(`Correct. Score is ${score}`);
    if (score <=6){
      
    backgorundImages.push(`url('./images/background${score}.svg')`);
    document.body.style.backgroundImage = backgorundImages;

    }else{
      alert("Well done!. your math garden is full bloom! want to start again?")
      score = 0;
      backgorundImages = [];
      document.body.style.backgroundImage = backgorundImages;
    }
  
  }

  else{
    if (score !=0) {score--;}
    console.log(`Wrong. Score: ${score}`);
    alert("Ops Check your calculation and try writing the number neater next time! ")
    setTimeout(function () {
      backgorundImages.pop();
      document.body.style.backgroundImage = backgorundImages;

      
    }, 1000);
    
  }

}
