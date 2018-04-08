class LinearSystemSolver
{
  constructor(data)
  {
    this.size = data['n'][0];
    this.matrix = this.transform2D(data['A'], this.size);;
    this.vector = data['B'];
    this.nDecimal = 2;
  }

  //start the solving process
  solve()
  {
    let hasSucceed = false;
    let rotationRow = 0;
    let rotationColumn = 0;
    let attempt = 0;

    //will rotate row and after column and try to triangularize the matrix until it works,
    //if it doesn't work, the matrix is unsolvable
    while(rotationRow < this.size - 1 && rotationColumn < this.size - 1)
    {
      if(attempt > 0 && rotationRow < this.size - 1)
      {
        this.rotateRow();
        rotationRow++;
      }

      if(this.rotationRow >= this.size - 1)
      {
        this.rotateColumn();
        rotationColumn++;
      }

      hasSucceed = this.transformTriangular();

      // if it worked exit the loop
      if(hasSucceed)
      {
        break;
      }

      attempt++;
    }


    if(hasSucceed)
    {
      return this.substitute();
    }
    else
    {
      return undefined;
    }
  }

  //transform an array 1D in 2D
  transform2D(arr, size)
  {
    //only square matrix
    if(arr.length !== size*size)
    {
      //error
      return undefined;
    }

    let matrix = [];

    for(let i = 0; i < size; i++)
    {
      let row = [];

      for(let j = i*size; j < i*size+size; j++)
      {
        row.push(arr[j]);
      }

      matrix.push(row);
    }

    return matrix;
  }

  //display a matrix in idDivContainer
  //displayed with html table
  displayMatrix(matrix, idDivContainer)
  {
    let text;

    if(matrix.length > 50)
    {
      text = "<p>La matrice est trop grande pour &ecirc;tre affich&eacute;e</p>"
    }
    else
    {
      text = '<table>';

      for(let i = 0; i < matrix.length; i++)
      {
        text += "<tr>";
        for(let j = 0; j < matrix.length; j++)
        {
          if(i == j)
          {
            text += '<td style="background-color: coral;">';
          }
          else
          {
            text +="<td>"
          }

          text += matrix[i][j].toFixed(this.nDecimal);
          text += "</td>";
        }
        text += "</tr>";
      }

      text += "</table>"
    }
    document.getElementById(idDivContainer).innerHTML = text;
  }

  // Permet d'afficher les résultats
  displayVector(vect, idDivContainer)
  {
	  let text;

	  text = "<table>";
	  for(let i = 0;i < vect.length; i++)
	  {
		  text += "<tr>";
		  text += "<td>X<sub>" + (i+1) + "</sub></td>";
		  text += "<td>" + vect[i].toFixed(this.nDecimal) + "</td>"
		  text += "</tr>";
	  }
	  text += "</table>";

	  document.getElementById(idDivContainer).innerHTML = text;
  }

  // display a matrix and it's vector
  display(divMatrix, divVector)
  {
    this.displayMatrix(this.matrix, divMatrix);
    this.displayVector(this.vector, divVector);
  }

  //transform a matrix in a triangular matrix as seen in the course
  //elimination de Gauss
  transformTriangular()
  {
    let matrix = this.copyMatrix(this.matrix);
    let vector = this.vector

    for(let i = 0; i < matrix.length; i++)
    {
      for(let j = i+1; j < matrix.length; j++)
      {
        for(let k = i+1; k < matrix.length; k++)
        {
          matrix[j][k] = matrix[j][k] - (matrix[j][i]/matrix[i][i])*matrix[i][k];

          if(j === k && matrix[j][k] === 0 || matrix[i][i] === 0)
          {
            return false;
          }
        }

        vector[j] = vector[j] - (matrix[j][i]/matrix[i][i]*vector[i]);
        matrix[j][i] = 0;
      }
    }

    this.matrix = matrix;
    return true;
  }

  // Permet d'effectuer la substitution
  // Calcule vérifier avec cet outil : http://www.bluebit.gr/matrix-calculator/linear_equations.aspx
  substitute()
  {
  	let xResults = [];	// Tous les résultats de X

  	for(let row = this.size-1;row >= 0; row--)
  	{
  		let x = this.vector[row];

  		let column = this.size-1;
  		let indexResult = xResults.length - 1;

  		// Effectue la substitution si des résultats ont été trouvés auparavant
  		while(indexResult >= 0)
  		{
  			x -= xResults[indexResult] * this.matrix[row][column];
  			indexResult--;
  			column--;
  		}

  		// Trouve le résultat de X
  		x = x / this.matrix[row][column];
  		xResults.unshift(x);
  	}

    return xResults;
  }

  //rotate this.matrix and this.vector
  rotateRow()
  {
    this.rotateArray(this.matrix);
    this.rotateArray(this.vector);
  }

  // rotate an array
  // the last element will become the first
  rotateArray(array)
  {
    let lastRow = array[array.length-1];
    for(let i = 1; i < array.length; i++)
    {
      array[this.size-i] = array[array.length-i-1];
    }

    array[0] = lastRow;
  }

  //rotate the column of a matrix
  rotateColumn()
  {

  }

  //copy a matrix (only square matrix)
  copyMatrix(matrix)
  {
    let newMatrix = [];

    for(let i = 0; i < matrix.length; i++)
    {
      let newRow = [];
      for(let j = 0; j < matrix.length; j++)
      {
        newRow.push(matrix[i][j]);
      }
      newMatrix.push(newRow);
    }

    return newMatrix;
  }
}
