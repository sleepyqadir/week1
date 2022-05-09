pragma circom 2.0.0;

include "../../node_modules/circomlib/circuits/comparators.circom";

template LessThan10() {
    signal input in;
    signal output out;

    // 32 is the number of bits the input have.
    component lt = LessThan(32); 

    lt.in[0] <== in;
    lt.in[1] <== 10; // to compare with

    out <== lt.out;
}

component main = LessThan10();