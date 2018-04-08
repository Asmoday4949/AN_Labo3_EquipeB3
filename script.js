//https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
function loadMatrix(path, callback)
{
  let xobj = new XMLHttpRequest();
  xobj.overrideMimeType('application/json');
  xobj.open('GET', path, true);
  xobj.onreadystatechange = function ()
  {
    if (xobj.readyState == 4 && xobj.status == '200')
    {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function solveMatrix()
{
  let input = document.getElementById('matrix')
  let matrixPath = `matrix/${ input.options[input.selectedIndex].value }.json`;

  //reset the div
  document.getElementById("divOriginalMatrix").innerHTML = "";
  document.getElementById("divOriginalVector").innerHTML = "";
  document.getElementById("divTransformMatrix").innerHTML = "";
  document.getElementById("divTransformVector").innerHTML = "";
  document.getElementById("divResultsLinSys").innerHTML = "";

  loadMatrix(matrixPath, function(response)
  {
    let jsonMatrix = JSON.parse(response); //parse the json from the file
    let solver = new LinearSystemSolver(jsonMatrix); //create a class made to solve linear system
    solver.display("divOriginalMatrix", "divOriginalVector");
    let startTime = performance.now(); //start timer
    let results = solver.solve();
    let solveTime = performance.now() - startTime; // register the end of the timer

    if(results !== undefined)
    {
      solver.display("divTransformMatrix", "divTransformVector"); //display the triangular matrix and its vector
      solver.displayVector(results, "divResultsLinSys"); //display the result
    }
    else
    {
        alert('La matrice ne peut pas être résolu');
    }

	document.getElementById("divTime").innerHTML = "<p>Temps de résolution : " + solveTime + " ms</p>";
  });
}
