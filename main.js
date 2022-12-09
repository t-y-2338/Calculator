let result = document.getElementById("result");
let mode = "integerMode";
let status = "start";

function lastOpe() {
  return ["+","-","*","/"].includes(result.value.toString().slice(-1));
}

function reset() {
  result.value = "0";
  mode = "integerMode";
  status = "start";
}

function allClear() {
  reset();
}

function point(val) {
  if (mode == "decimalMode") {
    return;
  } else if (result.value == "0" || status == "finish") {
    result.value = "0.";
  } else {
    result.value += val;
  }
    
    mode = "decimalMode";
    status = "calcurate";
}

function num(val) {
  if (status == "finish") {
    reset();
  }
  
  if (result.value == "0" && val == ("0","00")) {
    result.value = "0";
  } else if (result.value == "0") {
    result.value = val;
  } else {
    result.value += val;
  }
  
  status = "calculate";
}

function ope(val) {
  if (lastOpe()) {
    result.value = result.value.slice(0,-1) + val;
  } else {
    result.value += val;
  }
  
  mode = "integerMode";
  status = "calculate";
}

function equal() {
  if (status == "start") {
     return;
  } 
  
  if (lastOpe()) {
    result.value = result.value.slice(0,-1);
  }
  
  let temp = new Function("return " + result.value)();
  
  if (temp == Infinity || Number.isNaN(temp)) {
    result.value = "Error";
  } else {
    temp = Math.round(temp * 1000) / 1000;
    result.value = temp;
  }
  
  mode = "integerMode";
  status = "finish";
}