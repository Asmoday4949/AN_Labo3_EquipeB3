class LinearSystemSolver
{
  constructor(data)
  {
    this.size = data['n'][0];
    this.matrix = this.transform2D(data['A'], this.size);;
    this.vector = data['B'];
  }

  solve()
  {
    this.transformTriangular();
  }

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

          text += matrix[i][j];
          text += "</td>";
        }
        text += "</tr>";
      }

      text += "</table>"
    }
    document.getElementById(idDivContainer).innerHTML = text;
  }

  // Permet de convertir les index 2D en index 1D
  convertIndex(row, column)
  {
    let n = this.size;
    return row * n + column;
  }

  // Permet d'échanger deux valeurs dans la matrice
  swapValues(indexA, indexB)
  {
    let t = this.matrix[indexA];
    this.matrix[indexA] = this.matrix[indexB];
    this.matrix[indexB] = t;
  }

  // Permet d'échanger deux lignes de la matrice
  swapRows(rowIndexA, rowIndexB)
  {
    for(let i = 0; i < this.size; i++)
    {
      this.swapValues(this.convertIndex(rowIndexA, i), this.convertIndex(rowIndexB, i));
    }
  }

  // Recherche la valeur absolue maximum dans une colonne de la matrice
  // Retourne la ligne où se trouve cette valeur maximum
  searchMax(column)
  {
    let max = this.matrix[this.convertIndex(0, column)];
    let maxIndex = 0;

    for(let i = 0;i < this.size; i++)
    {
      let currentValue = Math.abs(this.matrix[this.convertIndex(i, column)]);

      if(max < currentValue)
      {
        maxIndex = i;
        max = currentValue;
      }
    }

    return maxIndex;
  }

  // Permet d'effectuer une division sur toute une ligne de la matrice
  divideRow(row, divisor)
  {
    for(let i = 0;i < this.size; i++)
    {
      this.matrix[this.convertIndex(row, i)] /= divisor;
    }
  }

  // Permet d'effectuer l'étape de soustraction
  substractRows(currentRow, pivotRow, factor)
  {
    for(let i = 0;i < this.size; i++)
    {
      this.matrix[this.convertIndex(currentRow, i)] -= (this.matrix[this.convertIndex(pivotRow, i)] * factor);
    }
  }

  // Permet d'afficher la matrice
  printMatrix()
  {
    console.log("-MATRIX----------------------");
    for(let i = 0;i < this.size;i++)
    {
      let resultRow = "";
      for(let j = 0;j < this.size; j++)
      {
        resultRow += this.matrix[this.convertIndex(i, j)] + " ";
      }
      console.log(resultRow);
    }
  }

  // Permet de transformer en matrice triangulaire
  // transformTriangular()
  // {
  //   // Algorithme du pivot de Gauss
  //   // Source : https://fr.wikipedia.org/wiki/Élimination_de_Gauss-Jordan
  //   let pivot = 0;
  //   let nColumns = this.size;
  //
  //   for(let j = 0;j < nColumns; j++)
  //   {
  //     let k = this.searchMax(j);
  //
  //     let value = this.matrix[this.convertIndex(k, j)];
  //     if(value != 0)
  //     {
  //       this.divideRow(k, value);
  //       this.swapRows(k, pivot);
  //
  //       for(let i = 0; i < this.size; i++)
  //       {
  //         if(i != pivot)
  //         {
  //           this.substractRows(i, pivot, this.matrix[this.convertIndex(i,j)]);
  //         }
  //       }
  //       pivot += 1;
  //     }
  //   }
  // }

  transformTriangular()
  {
    let matrix = this.matrix;
    let vector = this.vector

    this.displayMatrix(matrix, "divOriginalMatrix");
    let i = 0;

    for(let j = 1; j < matrix.length; j++)
    {
      for(let k = 1; k < matrix.length; k++)
      {
        matrix[j][k] = matrix[j][k] - (matrix[j][0]/matrix[0][0])*matrix[0][k];
      }

      vector[j] = vector[j] - (matrix[j][0]/matrix[0][0]*vector[0]);

      matrix[j][0] = 0;
    }
    this.displayMatrix(matrix, "divTransformMatrix");
  }

  substitute()
  {

  }
}

/*data = {'n':[3],
'A':[2,-1,0,-1,2,-1,0,-1,2],
'B':[1,2,3]};

sysLin = new LinearSystemSolver(data);

console.log(sysLin.size);
console.log(sysLin.matrix);
console.log(sysLin.vector);
sysLin.showHTML("divOriginalMatrix");
console.log("---------------------");
console.log("Operations ...");
sysLin.transformTriangular();
console.log("---------------------");
console.log("Results ...");
sysLin.printMatrix();
sysLin.showHTML("divTransformMatrix");*/
