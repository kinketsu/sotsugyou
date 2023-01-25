//税率設定機能
function inputBtn(taxRate) {
  var price = parseInt(document.getElementById("inputPrice").value);

  var result = 0;

  switch (taxRate) {
    case 0:
      result = price;
      break;
    case 8:
      result = price + (price / 100) * 8;
      break;
    case 10:
      result = price + (price / 100) * 10;
      break;
  }

  addPriceElement(result);
  document.getElementById("inputPrice").value = "";
  // document.getElementById("result").innerHTML = result;
}

//結果表示
function addPriceElement(price) {
  var priceView = document.getElementById("priceDataView");
  var priceElement = document.createElement("div");
  priceView.appendChild(priceElement);
  priceElement.appendChild(document.createTextNode(price));
  console.log(price);

  let deletePrice = document.createElement("button");
  deletePrice.setAttribute("id", "deleteBtn");
  deletePrice.innerText = "削除";
  deletePrice.addEventListener("click", function (event) {
    if (event.target.id == "deleteBtn") {
      let parent = this.parentElement;
      parent.remove();
    }
  });
  priceElement.appendChild(deletePrice);
}

//合計結果表示
function totalPriceView(priceElement) {}
