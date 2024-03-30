<!doctype html>
<html>
  <head>
    <title>Survey Response</title>
    <script>
    const ANSWERS = <?php echo urldecode($_POST['answers']);?>;
    function buildResponseTable(){
      var result = "";
      
      result += "<table>\n";
      result += "<tr><th>Section</th><th>Questions</th><th>Response</th><th>Value</th></tr>\n";
      
      for(section in ANSWERS){
         for(questions in ANSWERS[section]){
           for(response in ANSWERS[section][questions]){
             result += "<tr><td>" + section + "</td>";
             result += "<td>" + questions + "</td>"; 
             result += "<td>" + response + "</td><td>";
             result += ANSWERS[section][questions][response];
             result += "</td></tr>\n";
           }
         }
      }
      result += "</table>";
      document.getElementById('responseTable').innerHTML = result;
    }
    window.addEventListener("load", buildResponseTable);
    </script>
  </head>
  <body>
    <h1>Thank you for completing the survey!</h1>
    <p>Here is a summary of your response:</p>
    <div id="responseTable"></div>
  </body>
</html>


