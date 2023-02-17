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
  addTotalPrice(result);
  document.getElementById("inputPrice").value = "";
  // document.getElementById("result").innerHTML = result;
}

//結果表示：priceElementの生成と削除
function addPriceElement(price) {
  var priceView = document.getElementById("priceDataView");
  var priceElement = document.createElement("div");
  priceView.appendChild(priceElement);
  priceElement.appendChild(document.createTextNode(price));
  console.log(price);

  //deleteボタン
  let deletePrice = document.createElement("button");
  deletePrice.setAttribute("id", "deleteBtn");
  deletePrice.innerText = "削除";
  deletePrice.addEventListener("click", function (event) {
    if (event.target.id == "deleteBtn") {
      let parent = this.parentElement;
      addTotalPrice(-parseInt(parent.innerText));
      parent.remove();
      //削除ボタンを押した時に更新処理
    }
  });
  priceElement.appendChild(deletePrice);
  if (price === 0) {
    alert("ero");
  }
}

//合計結果表示と更新：priceElementの合計とremove処理の時値の差額処理
function addTotalPrice(price) {
  var totalPriceView = document.getElementById("totalPriceView");

  totalPriceView.innerHTML = parseInt(totalPriceView.innerHTML) + price;
}
