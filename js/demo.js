let HistoryData = [];

function getHistoryData(select, text, price) {
  return {
    id: String(Date.now()),
    select: select,
    text: text,
    price: price,
  };
}

function saveHistory(history) { //オブジェクトを配列に追加
  HistoryData(history);
}

function saveList() { //ローカルストレージに保存
  localStorage.setItem("history", JSON.stringify(HistoryData));
}

function loadList() {
  HistoryData = JSON.parse(localStorage.getItem("history")) || [];
}

function restoreState() {
  HistoryData.forEach(function (item){
    paintHistory(item);
  });
} 

function submitBtnClick() {
  const selectedValue = select.options[select.selectedIndex].text;
  const textValue = inputText.value;
  let priceValue = inputPrice.value;

  if (priceValue.trim() === "") {
    alert("金額を入力してください。");
  }
  if (expenseBtn.checked === true) {
    if (priceValue > 0) {
      priceValue = priceValue * -1;
    }
  }

  inputText.value = "";
  inputPrice.value = "";

  const HistoryData = getHistoryData(selectedValue, textValue, priceValue);
  paintHistory(HistoryData);
  saveHistory(HistoryData);
  saveList();

  inputBox.classList.add("hide");
  addBtn.classList.remove("hide");
  inputBox.classList.remove("showingInputBox");

  updatePrice();
}

function paintHistory(history) {
  const addValueBox = document.createElement("div");
  const list = document.createElement("li");
  const deletBtnSpan = document.createElement("button");
  const selectSpan = document.createElement("span");
  const textSpan = document.createElement("text");
  const priceSpan = document.createElement("price");

  addValueBox.id = "addValueBox";
  textSpan.id = "text";
  priceSpan.id = "price";
  selectSpan.id = "select";
  deletBtnSpan.id = "delBtn";
  deletBtnSpan.innerHTML = `<i class="far fa-trash-alt"></i>`;
  deletBtnSpan.addEventListener("click", deleteHistory);

  list.id = history.id;

  addValueBox.appendChild(selectSpan);
  addValueBox.appendChild(textSpan);
  addValueBox.appendChild(priceSpan);
  addValueBox.appendChild(deletBtnSpan);
  list.appendChild(addValueBox);
  historyList.appendChild(list);

  if (history.price < 0) {
    priceSpan.classList.add("red");
    priceSpan.innerText = `${history.price}円`;
  } else {
    priceSpan.classList.add("green");
    priceSpan.innerText = `+${history.price}円`;
  }

  selectSpan.innerText = `${history.select}`;
  textSpan.innerText = `${history.text}`;
}

function deleteHistory(e) {
  const btn = e.target.parentNode;
  const div = btn.parentNode;
  const list = div.parentNode;
  historyList.removeChild(list);

  HistoryData = HistoryData.filter(function (item) {
    return item.id !== list.id;
  });

  saveList();
  updatePrice();
}

function displayExpense() {
  //支出のみ表示
  const expenseData = HistoryData.filter((item) => item.price < 0);
  historyList.innerHTML = "";

  for (let i = 0; i < expenseData.length; i++) {
    const list  = document.createElement("list");
    const valueBoxHTML = `
    <div id="addValueBox">
        <span id="select">${expenseArr[i].select}</span>
        <span id="text">${expenseArr[i].text}</span>
        <span id="price" style="color:red">${expenseArr[i].price}円</span>
    </div>
    `;
    list.innerHTML = valueBoxHTML;
    historyList.appendChild(list);
  }
}

function displayIncome() {
  // 収入のみ表示
  const incomeArr = HistoryData.filter((item) => item.price > 0);
  historyList.innerHTML = "";

  for (let i = 0; i < incomeArr.length; i++) {
    const list = document.createElement("list");
    const valueBoxHTML = `
    <div id="addValueBox">
        <span id="select">${incomeArr[i].select}</span>
        <span id="text">${incomeArr[i].text}</span>
        <span id="price" style="color:green">+${incomeArr[i].price}円</span>
        
    </div>
    `;
 
    list.innerHTML = valueBoxHTML;
    historyList.appendChild(list);
  }
}

function clearHistory() {
  // 記録全削除
  historyList.innerHTML = "";
  localStorage.clear();
  incomeText.innerText = `0`;
  expenseText.innerText = `0`;
  totalPriceText.innerText = `0`;
  HistoryData = [];
}

function showAllHistory() {
  // 一覧表示
  location.reload(true);
}