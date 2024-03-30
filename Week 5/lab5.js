function Question(title, text){
  this.title = title;
  this.text = text;
  
  this.toHTML = function(){
    var res = "";
    
    res += "<h3>" + this.title + "</h3>\n";
    res += "<p>" + this.text + "</p>\n";
    
    return res;
  }
  this.getAnswers = function(){
    return {};
  }
  
}

function multipleChoice(title, text, options){
   Question.call(this,title,text);
   var res = "";
   this.HTML = function(){
     res += this.toHTML();
     res += '<ul id = "'+ title +'">\n'
     for(var i = 0; i < options.length; i++){
       res += '<li><input type="radio" name="' + title + '" value="' + options[i] + '">' + options[i] + '</li>\n';
     }
     res +="</ul>\n"
     return res;
   }
   
   this.getAnswers = function(){
     var answers = {};
     var current = 0;
     var inputs = document.getElementById(title).getElementsByTagName("input");
     
     for(var i = 0; i < inputs.length; i++){
      answers[inputs[i].value] = inputs[i].checked;
     }
     return answers;
   }
}

function multipleSelect(title, text, options) {
  Question.call(this, title, text);
  var res = "";
  this.HTML = function() {
    res += this.toHTML();
    res += '<ul id="'+ title +'">\n';
    for (var i = 0; i < options.length; i++) {
      res += '<li><input type="checkbox" name="' + title + '" value="' + options[i] + '">' + options[i] + '</li>\n';
    }
    res += "</ul>\n";
    return res;
  }
  
  this.getAnswers = function(){
     var answers = {};
     var current = 0;
     var inputs = document.getElementById(title).getElementsByTagName("input");
     
     for(var i = 0; i < inputs.length; i++){
      answers[inputs[i].value] = inputs[i].checked;
     }
     return answers;
   }
}

function shortAnswer(title, text){
  Question.call(this, title,text);
  var res = "";
   this.HTML = function(){
     res += this.toHTML();
     res += '<p>Please type your answer here: <input id = "'+ title +'"type="text" name "' + title + '" ></p>\n';
     
     return res;
   }
   this.getAnswers = function(){
     var answers = {};
     var input = document.getElementById(title);
     
     answers[title] = input.value;
     
     return answers;
   }
}

function multipleChoiceOther(title, text, options) {
   multipleChoice.call(this, title, text, options); // Pass options array
   var superToHTML = this.HTML;
   var superGetAnswers = this.getAnswers;
   this.HTML = function(){
     var res = superToHTML.call(this) + '<p>Other: <input id="' + title + '_other" type="text" name="Other"></p>\n';
     return res;
   }
   
   this.getAnswers = function(){
    var answers = superGetAnswers.call(this);
    var input = document.getElementById(title + "_other");
    answers["Other"] = input.value;
    
    return answers;
   }
}


function submitSurvey() {
    var allQuestions = document.querySelectorAll('input[type="radio"]:checked, input[type="checkbox"]:checked');
    var allQuestionsAnswered = true;
    allQuestions.forEach(function(question) {
        if (!question.value) {
            allQuestionsAnswered = false;
        }
    });
    var relationshipOptions = document.querySelectorAll('input[name="Relationship"]');
    var relationshipAnswered = false;
    var otherChecked = false;

    relationshipOptions.forEach(function(option) {
        if (option.checked && option.value !== "Other") {
            relationshipAnswered = true;
        } else if (option.checked && option.value === "Other") {
            var otherTextInput = option.parentNode.querySelector('input[type="text"]');
            if (otherTextInput.value.trim() !== "") {
                otherChecked = true;
            }
        }
    });
    if (allQuestionsAnswered && (relationshipAnswered || otherChecked)) {
        const messageElement = document.getElementById("message");
        messageElement.textContent = "Good job in completing the survey";
        alert("Thanks for completing the survey");

        // Attach the event listener for reloading the page
        document.getElementById('submit').addEventListener('click', function(event) {
            event.preventDefault();
            location.reload();
        });
    } else {
        const messageElement = document.getElementById("message");
        messageElement.textContent = "Please answer all questions before submitting, and choose either 'Other' or one of the options for the Relationship question.";
    }
}

function Section(title, questions){
  this.title = title;
  this.HTML = function(){
     var result = "<h2>" + title + "</h2>";
     
     for(var i = 0; i < questions.length; i++){
       result += questions[i].HTML();
     }
     return result;
  }
  
  this.getAnswers = function(){
    var answers = {};
    for(var i = 0; i < questions.length; i++){
      answers[questions[i].title] = questions[i].getAnswers();
    }
    return answers;
  }
}


function surveryQuestions(){
  var q1 = new multipleChoice("Income", "What is your income?", ["5000 and below", "10000", "20000", "40000 or above"]);
  var q2 = new multipleChoice("Eviction", "Have you ever been at risk of eviction or threatened with eviction?", ["yes", "no"]);
  var q3 = new multipleSelect("Favorite Color", "What are your favorite colors?", ["Red", "Blue", "Green", "Yellow", "Purple"]);
  var q4 = new shortAnswer("Favorite Food", "What is your favorite food?");
  var q5 = new multipleChoiceOther("Relationship", "What is your relationship status?", ["Single", "Married", "Partnered"]);
  var s1 = new Section("Housing/Income", [q1, q2]);
  var s2 = new Section("Personal", [q3, q4]);
  var s3 = new Section("Relationship", [q5]);
  
  return new Survey("Questions", [s1, s2, s3]);
  
}

function Survey(title, sections){
  this.HTML = function(){
     var result = "<h1>" + title + "</h1>";
     
     for(var i = 0; i < sections.length; i++){
       result += sections[i].HTML();
     }
     return result;
    }
    
     this.getAnswers = function(){
       var answers = {};
       for(var i = 0; i < sections.length; i++){
         answers[sections[i].title] = sections[i].getAnswers();
       }
       
       return answers;
     }
}

function init(){
  var result = surveryQuestions();
  
  function submit(){
    var answers = result.getAnswers();
    var form = document.createElement('form');
    form.method = 'POST';
    form.action = 'submit_survey.php';
    form.innerHTML = '<input type="hidden" name ="answers" value = "'+ encodeURIComponent(JSON.stringify(answers)) + '">';
    document.getElementsByTagName('body')[0].appendChild(form);
    form.submit();
  }
  document.getElementById("questions").innerHTML = result.HTML();
  document.getElementById("submit").addEventListener("click", submit);
}
window.addEventListener('load', init);
