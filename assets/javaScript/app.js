var panel = $('#quiz-area');
var countStartNumber = 30;

$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});

var questions = [{
  question: "which horror film features an unstoppable killer from Camp Crystal Lake?",
  answers: ["Cabin in the Woods", "Cabin Fever", "Friday the 13th", "Sleepaway Camp"],
  correctAnswer: "Friday the 13th",
  image:"assets/images/friday13.gif"
}, {
  question: "In the Horror Franchise Evil Dead, What Does Ash Call His Shotgun?",
  answers: ["Boomstick", "Shotgun Kelly", "Mr Remington", "Reggie"],
  correctAnswer: "Boomstick",
  image:"assets/images/boomstick.gif"
}, {
  question: "Which film features an intergalactic hunter that stalks a platoon of soldiers in the jungle?",
  answers: ["Killer Klowns from Outer Space", "Aliens", "Predator", "Swamp Thing"],
  correctAnswer: "Predator",
  image:"assets/images/predator.gif"
}, {
  question: "This film features two brothers who move to california and end up fighting a gang of vampires.",
  answers: ["Kalifornia", "The Lost Boys", "Vampires", "Night of the Bloodsucking Freaks"],
  correctAnswer: "The Lost Boys",
  image:"assets/images/lostboys.gif"
}, {
  question: "Two friends backpacking through England are attacked by a werewolf which results in the surviving friend slowly transforming.",
  answers: ["The Howling", "Wolf", "An American Werewolf in London", "Teen Wolf"],
  correctAnswer: "An American Werewolf in London",
  image:"assets/images/werewolf.gif"
}, {
  question: "Which famous actor's face was used for the horrific mask in Halloween? ",
  answers: ["William Shatner", "Robert Englund", "Rob Zombie", "Glen Danzig"],
  correctAnswer: "William Shatner",
  image:"assets/images/halloween.gif"
}, {
  question: "Which film gives us two friends fighting against various zombie movie cliches in England ?",
  answers: ["Dale and Tucker Vs Evil", "Zombieland", "Shaun of the Dead", "Return of the Living Dead"],
  correctAnswer: "Shaun of the Dead",
  image:"assets/images/shaun.gif"
}, {
  question: "What kind of shark was Jaws ?",
  answers: ["Tiger Shark", "Great White Shark", "Megalodon", "Bull Shark"],
  correctAnswer: "Great White Shark",
  image:"assets/images/jaws.gif"
},{
    question: "This wild film has a former ice cream man turned hero fighting against the Tall Man.",
    answers: ["Phantasm", "Army of Darkness", "The Ice Cream Man", "Ice Scream"],
    correctAnswer: "Phantasm",
    image:"assets/images/phantasm.gif"
},{
    question: "What is the name of the smart zombie in Day of the Dead?",
    answers: ["Bart", "Stubs", "Bub", "Ash"],
    correctAnswer: "Bub",
    image:"assets/images/bubba.gif"
},{
    question: "This queen of horror was a well known host for her cult tv horror show that featured low budget horror films.",
    answers: ["Vampirella", "Lady Death", "Morticia", "Elvira"],
    correctAnswer: "Elvira",
    image:"assets/images/elvira.gif"
}];


var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('You Were Too Slow! The Zombies have Caught You');
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Too Slow! Zombies Caught You and Ate Your Brains</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

    panel.html('<h2>End of the Film! Did you Survive?</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Wrong! Nervous?</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
 reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};