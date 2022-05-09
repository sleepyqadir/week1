pragma circom 2.0.0;

include "../../node_modules/circomlib/circuits/comparators.circom";
// hint: you can use more than one templates in circomlib-matrix to help you
include "../../node_modules/circomlib-matrix/circuits/matMul.circom"; 

template SystemOfEquations(n) { // n is the number of variables in the system of equations
    signal input x[n]; // this is the solution to the system of equations
    signal input A[n][n]; // this is the coefficient matrix
    signal input b[n]; // this are the constants in the system of equations
    signal output out; // 1 for correct solution, 0 for incorrect solution

    // [bonus] insert your code here

    var total_sum = 0;

    // create 2 matrix with dimension n*n and n*1
    component mul_matrix = matMul(n,n,1);
    component isz = IsZero();

    // input coefficient matrix in mul_matrix
    for (var i=0; i<n; i++) {
      for (var j=0; j<n; j++) {
        mul_matrix.a[i][j] <== A[i][j];
      }
    }

    // input coefficient matrix in mul_matrix
    for (var k=0; k<n; k++) {
       mul_matrix.b[k][0] <== b[k];
    }

    for (var l=0; l<n; l++) {
        total_sum = total_sum + mul_matrix.out[l][0] - x[l];
    }

    isz.in <== total_sum;
    out <== isz.out;

}

component main {public [A, b]} = SystemOfEquations(3);