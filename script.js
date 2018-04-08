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

  loadMatrix(matrixPath, function(response)
  {
    let jsonMatrix = JSON.parse(response);
    let solver = new LinearSystemSolver(jsonMatrix);
    solver.display("divOriginalMatrix", "divOriginalVector");
    let results = solver.solve();

    if(results !== undefined)
    {
      solver.display("divTransformMatrix", "divTransformVector");
      solver.displayVector(results, "divResultsLinSys")
    }
    else
    {
        alert('La matrice ne peut pas être résolu');
    }
  });
}
