// db.transaction(function (trns) {
//   trns.executeSql(
//     "create table if not exists icon_test_lee (id integer primary key autoincrement,iconName text not null,iconNum int not null,iconType text not null)"
//   );
// });
// function registSpending() {
//   // 入力データのチェック
//   if (chkRegistData("inputIconName", "icon-create")) {
//     db.transaction(function (trans) {
//       // INSERT文を実行
//       trans.executeSql(
//         "INSERT INTO icon_test_lee (iconName,iconType, ) VALUES (?,?,?);",
//         [getElmId("inputIconName").value, getElmId("icon-create").value],
//         function () {
//           // 表示データを更新
//           execDisplayDesignatedPeriodData();

//           //登録データ（内容・金額）の入力ボックスの値を初期化
//           getElmId("inputIconName").value = "";
//           getElmclass("icon-create").value = "";

//           alert("データを追加しました。");
//         },
//         // エラー処理
//         function () {
//           alert("データが追加できません。");
//         }
//       );
//     });
//   }
// }
function butotnClick() {
  let checkValue = "";

  for (let i = 0; i < len; i++) {
    if (iconRadio.item(i).checked) {
      checkValue = iconRadio.item(i).value;
    }
  }
  console.log("選択されているのは " + checkValue + " です");
}

let iconRadio = document.getElementsByName("iconImage");
let len = iconRadio.length;
iconRadio[0].checked = true;

let inputButton = document.getElementById("inputButton");
inputButton.addEventListener("click", butotnClick);
