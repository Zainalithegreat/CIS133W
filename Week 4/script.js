function isNumber(isNum){
  var submitForm = document.getElementById("submitForm");
  var userMessage = document.getElementById("userMessage");
  if (isNum) {
    userMessage.textContent = "";
    submitForm.disabled = false;
  } else {
    submitForm.disabled = true;
    userMessage.textContent = "Username should contain at least 1 number";
  }
}
function checkLoop(userId, isNum){
  for (var i = 0; i < userId.length; i++) {
    if (!isNaN(parseInt(userId[i]))) {
      isNum = true;
      break;
    }
  }
  return isNum;
}
function checkUsername() {
  var userId = document.getElementById("username").value;
  var isNum = false;
  
  isNum = checkLoop(userId, isNum);
  
  isNumber(isNum);
}

function validBool(isValid){
  var submitForm = document.getElementById("submitForm");
  var passMessage = document.getElementById("passMessage");
  if (isValid) {
    submitForm.disabled = false;
    passMessage.textContent = "";
  } else {
    submitForm.disabled = true;
    passMessage.textContent = "The password should include a special character";
    
  }
}
function containsSpecialCharacter(punctuationChars, passId, isValid){
  for(var i = 0; i < passId.length; i++){
    if(punctuationChars.indexOf(passId[i]) != -1){
      isValid = true;
      break;
    }
  }
  return isValid;
}
function checkPass(){
  var passId = document.getElementById("password").value;
  var submitForm = document.getElementById("submitForm");
  var isValid = false;
  var punctuationChars = ['!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~'];
  isValid = containsSpecialCharacter(punctuationChars, passId, isValid);
  
  validBool(isValid);
  return isValid;
}