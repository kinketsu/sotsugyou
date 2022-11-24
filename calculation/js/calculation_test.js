function inputBtn(e) {
  console.log(e);
  var price = Number(document.getElementById("inputPrice").value);
  var result = 0;

  switch(e) {
    case '0' : result = price ; break;
    case '8' : result = price + (price % 8); break;
    case '10' : result = price + (price % 10); break;
  }
  
  document.getElementById("result").innerHTML = result;
}
