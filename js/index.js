var date = new Date();

// 「年月日」を配列で取得 ( [0]:年, [1]:月, [2]:日 )
var dateArray = getTSDate(date);

// DB情報を設定
var dbName = "household_account_book"; // DB名
var dbVersion = "1.0"; // DBバージョン
var dbDescription = "household_account_book_database"; // DB説明文
var dbSize = 65536; // DBサイズ
var db = openDatabase(dbName, dbVersion, dbDescription, dbSize);

// テーブルが存在しない場合、テーブルを作成
db.transaction(function (trns) {
  trns.executeSql(
    "create table if not exists hab (id integer primary key autoincrement,contents text not null,price int not null,registed_at datetime)"
  );
});

// 登録日付に「本日の年月日」を設定
document.getElementById("regist_date").value =
  dateArray[0] + "-" + dateArray[1] + "-" + dateArray[2];

// 今月のデータを表示
displayThisMonthData();

/**
 *  今月のデータを表示
 */
function displayThisMonthData() {
  var date = new Date();

  // 今月の最終日の年月日を配列で取得
  var lastDateArray = getTSDate(
    new Date(getLastDay(date.getFullYear(), date.getMonth()))
  );

  var YM = lastDateArray[0] + "-" + lastDateArray[1];
  var startDate = YM + "-" + "01 00:00:00";
  var lastDate = YM + "-" + lastDateArray[2] + " 23:59:59";

  // 今月の「初日」と「最終日」をUIに表示
  getElmId("start_date").value = YM + "-01";
  getElmId("last_date").value = YM + "-" + lastDateArray[2];

  // 今月のデータを表示
  displaySpendingData(startDate, lastDate);
}

/**
 *  指定期間のデータを表示
 */

function displaySpendingData(startDate, lastDate) {
  db.transaction(function (tx) {
    // SELECT文を実行
    tx.executeSql(
      "select id, contents, price, registed_at from hab WHERE registed_at BETWEEN '" +
        startDate +
        "' AND '" +
        lastDate +
        "' order by registed_at ASC",
      [],
      function (tx, results) {
        // テーブルを取得
        var table = getElmId("hab_tb");

        // テーブルヘッダー生成
        table.innerHTML =
          "<tr><th>日付</th><th>内容</th><th colspan='3'>金額</th></tr>";

        for (i = 0; i < results.rows.length; i++) {
          var displayData = document.createElement("tr");

          // テーブル識別用id属性付加
          displayData.setAttribute("id", results.rows.item(i).id);

          // テーブルデータ生成
          displayData.innerHTML =
            "<td>" +
            results.rows.item(i).registed_at.split(" ")[0] +
            "</td><td>" +
            results.rows.item(i).contents +
            '</td><td class="price">' +
            results.rows.item(i).price +
            '</td><td><button class="delete_btn">削除</button></td><td><button class="edit_btn">編集</button></td>';

          // テーブルデータ追加
          table.appendChild(displayData);
        }

        //「削除」ボタンにイベントリスナーを設定
        var del_btns = getElmCls("delete_btn");
        for (let btn of del_btns) {
          btn.addEventListener("click", onClickDelBtn, false);
        }

        //「編集」ボタンにイベントリスナーを設定
        var edit_btns = getElmCls("edit_btn");
        for (let btn of edit_btns) {
          btn.addEventListener("click", onClickEditBtn, false);
        }
      },
      // エラー処理
      function (transaction, error) {
        alert("データが取得できません。");
      }
    );
  });
}

/**
 *  データ登録処理
 */
function registSpending() {
  // 入力データのチェック
  if (chkRegistData("regist_date", "regist_contents", "regist_price")) {
    db.transaction(function (trans) {
      // INSERT文を実行
      trans.executeSql(
        "INSERT INTO hab (contents, price, registed_at) VALUES (?,?,?);",
        [
          getElmId("regist_contents").value,
          getElmId("regist_price").value,
          getElmId("regist_date").value + " 00:00:01",
        ],
        function () {
          // 表示データを更新
          execDisplayDesignatedPeriodData();

          //登録データ（内容・金額）の入力ボックスの値を初期化
          getElmId("regist_contents").value = "";
          getElmId("regist_price").value = "";

          alert("データを追加しました。");
        },
        // エラー処理
        function () {
          alert("データが追加できません。");
        }
      );
    });
  }
}

/**
 *  登録データのチェック
 */
function chkRegistData(date_id, contents_id, price_id) {
  var correctFlg = true;

  // 日付の書式チェック
  if (getElmId(date_id).value.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/g) === null) {
    alert("登録日付が正しくありません。");
    correctFlg = false;
  }

  // 内容のチェック
  if (getElmId(contents_id).value.length === 0) {
    alert("内容を入力してください。");
    correctFlg = false;
  }

  // 価格のチェック
  if (getElmId(price_id).value.length === 0) {
    alert("価格を入力してください。");
    correctFlg = false;
  } else {
    // 価格の書式チェック
    if (getElmId(price_id).value.match(/^[0-9]*$/g) === null) {
      alert("価格が正しくありません。");
      correctFlg = false;
    }
  }
  return correctFlg;
}

/**
 *  「削除ボタン」クリック時の処理
 */
function onClickDelBtn(event) {
  // データ削除の確認ダイアログ表示
  if (confirm("データを削除しますか？")) {
    // データ識別用id属性の値を取得
    var del_id = event.target.parentNode.parentNode.getAttribute("id");

    db.transaction(function (tx) {
      // DELETE文を実行
      tx.executeSql(
        "delete from hab where id='" + del_id + "'",
        [],
        function () {
          //今月のデータを表示
          displayThisMonthData();
        },
        // エラー処理
        function () {
          alert("データ削除失敗");
        }
      );
    });
  }
}

/**
 *  「編集ボタン」クリック時の処理
 */
function onClickEditBtn(event) {
  // データ識別用id属性の値を取得
  var edit_id = event.target.parentNode.parentNode.getAttribute("id");

  // id値のtd要素を取得
  var td = getElmId(edit_id).children;

  // テーブル要素を取得
  var table = getElmId("hab_tb");

  // テーブルヘッダー作成
  table.innerHTML =
    "<tr><th>日付</th><th>内容</th><th colspan='3'>金額</th></tr>";

  // テーブル行を作成
  var displayData = document.createElement("tr");

  // データ識別用id属性を設定
  displayData.setAttribute("id", edit_id);

  // 編集用HTMLコード作成
  displayData.innerHTML =
    '<td><input type="date" id="edit_date" value="' +
    td[0].textContent.split(" ")[0] +
    '"></td><td><input type="text" id="edit_contents" value="' +
    td[1].textContent +
    '"></td><td class="price"><input type="number" id="edit_price" value="' +
    td[2].outerText +
    '"></td><td></td><td><button id="edit_exec_btn">編集実行</button></td>';

  //編集用HTMLコードをテーブルに設定
  table.appendChild(displayData);

  // 「編集実行」ボタンにイベントリスナーを設定
  getElmId("edit_exec_btn").addEventListener(
    "click",
    onClickEditExecBtn,
    false
  );
}

/**
 *  データ更新処理
 */
function onClickEditExecBtn(event) {
  if (chkRegistData("edit_date", "edit_contents", "edit_price")) {
    // データ識別用id属性の値を取得
    var edit_id = event.target.parentNode.parentNode.getAttribute("id");

    // 登録用「年月日」時間を作成
    var regist_date = getElmId("edit_date").value + " 00:00:01";

    db.transaction(function (tx) {
      // UPDATE文を実行
      tx.executeSql(
        "update hab set contents = '" +
          getElmId("edit_contents").value +
          "', price = '" +
          getElmId("edit_price").value +
          "', registed_at = '" +
          regist_date +
          "' where id='" +
          edit_id +
          "'",
        [],
        function () {
          //今月のデータを表示
          displayThisMonthData();
          alert("データを更新しました。");
        },
        // エラー処理
        function () {
          alert("データが更新できません。");
        }
      );
    });
  }
}

/**
 *  指定期間の「表示」ボタンクリック時の処理
 */
function onClickDisplayDesignatedPeriodDataBtn() {
  execDisplayDesignatedPeriodData();
}

/**
 *  指定期間のデータを表示
 */
function execDisplayDesignatedPeriodData() {
  // 表示開始時刻データ作成
  var startDate = getElmId("start_date").value + " 00:00:00";

  // 表示終了時刻データ作成
  var lastDate = getElmId("last_date").value + " 23:59:59";

  // 指定期間のチェック処理
  if (chkDesignatedPeriod(startDate, lastDate) === true) {
    displaySpendingData(startDate, lastDate);
  } else {
    alert("開始日付は終了日付より前の日付を選択してください。");
  }
}

/**
 *  「指定期間」の入力値チェック
 */
function chkDesignatedPeriod(startDate, lastDate) {
  var startYmd = getElmId("start_date").value.split("-");
  var lastYmd = getElmId("last_date").value.split("-");

  startTP = Number(
    new Date(startYmd[0], startYmd[1] - 1, startYmd[2], 0, 0, 0, 0)
  );
  lastTP = Number(
    new Date(lastYmd[0], lastYmd[1] - 1, lastYmd[2], 23, 59, 59, 0)
  );

  if (startTP < lastTP) {
    return true;
  } else {
    return false;
  }
}

/**
 *  指定月の最終日を取得
 */
function getLastDay(year, month) {
  var end_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // 閏年の確認
  if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)) {
    end_days[1] = 29;
  }

  return Number(new Date(year, month, end_days[month], 23, 59, 59));
}

/**
 *  タイムスタンプから年月日文字列を取得
 */
function getTSDate(date) {
  var dateArray = new Array();
  dateArray.push(zero_pad(date.getFullYear(), 4));
  dateArray.push(zero_pad(date.getMonth() + 1, 2));
  dateArray.push(zero_pad(date.getDate(), 2));
  return dateArray;
}

/**
 *  ID名からDOMを取得
 */
function getElmId(id) {
  return document.getElementById(id);
}

/**
 *  Class名からDOMを取得
 */
function getElmCls(contents) {
  return document.getElementsByClassName(contents);
}

/**
 *  ０詰処理
 */
function zero_pad(val, show_length) {
  var str_val = String(val);
  if (str_val.length < show_length) {
    var zero = "";
    for (var i = 0; i < show_length - str_val.length; i++) {
      zero += "0";
    }
    str_val = zero + str_val;
  }
  return str_val;
}

// 「登録」ボタンにイベントリスナーを設定
getElmId("regist_spending_btn").addEventListener(
  "click",
  registSpending,
  false
);

// 「指定期間表示」ボタンにイベントリスナーを設定
getElmId("display_btn").addEventListener(
  "click",
  onClickDisplayDesignatedPeriodDataBtn,
  false
);
