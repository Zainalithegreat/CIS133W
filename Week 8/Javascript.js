window.addEventListener("load", function(){
  function Symmetric(str){
     str = str.toLowerCase();
     var str2 = "";
     var bool = false;
     for(var i = 0; i < str.length; i++){
       if(str[i] != " "){
         str2 += str[i];
       }
     }
     for(var i = 0; i < str2.length; i++){
       if(str2[i] == str2[str2.length - 1 - i]){
         bool = true;
       }else{
         bool = false;
         break;
       }
     }
     return bool;
  }

  function display(){
    if(Symmetric("Live not on evil")){
      console.log("True");
    }else{
      console.log("False");
    }
    
    if(Symmetric("Step on no pets")){
      console.log("True");
    }else{
      console.log("False");
    }
    
    if(Symmetric("Too bad I hid a boot")){
      console.log("True");
    }else{
      console.log("False");
    }
    
    if(Symmetric("Evil olive")){
      console.log("True");
    }else{
      console.log("False");
    }
    
    if(Symmetric("Borrow or rob")){
      console.log("True");
    }else{
      console.log("False");
    }
    
    if(Symmetric("Hello world")){
      console.log("True");
    }else{
      console.log("False");
    }
    
  }
  
  display(); 
});
