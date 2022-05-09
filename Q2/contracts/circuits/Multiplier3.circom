 pragma circom 2.0.0;

// [assignment] Modify the circuit below to perform a multiplication of three signals

template Multiplier () {
   signal input in1;
   signal input in2;
   signal output out <== in1 * in2;

}

template Multiplier3 () {  

   // Declaration of signals.  
   signal input a;  
   signal input b;
   signal input c;
   signal output out;
   component linear1 = Multiplier();
   component linear2 =  Multiplier();

   linear1.in1 <== a;
   linear1.in2 <== b;
   linear2.in1 <== linear1.out;
   linear2.in2 <== c;

   out <== linear2.out;
}

component main = Multiplier3();