function inputBtn() {
  const inputPrice = document.getElementById("inputPrice");
  document.getElementById("viewPrice").textContent = inputPrice.value;
  data.push(inputPrice.value)

  
}
var data = new Array();

