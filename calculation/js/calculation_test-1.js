function inputBtn(resultPrice) {
  var price = document.getElementById("inputPrice").value;
  var result = 0

  switch(resultPrice) {
    case '0' : result = price ; break;
    case '8' : result = price + (price % 8); break;
    case '10' : result = price + (price % 10); break;
  }
  
  document.getElementById("result").innerHTML = result;
    console.log(price);
    console.log(result)
}

