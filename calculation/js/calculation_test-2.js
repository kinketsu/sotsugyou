function registSpending(){
  // 入力データのチェック
  if( chkRegistData('regist_date','regist_contents', 'regist_price') ){
      db.transaction(
          function(trans){
              // INSERT文を実行
              trans.executeSql('INSERT INTO hab (contents, price, registed_at) VALUES (?,?,?);', [getElmId('regist_contents').value, getElmId('regist_price').value, getElmId('regist_date').value + " 00:00:01"], 
                  function(){
                      // 表示データを更新
                      execDisplayDesignatedPeriodData();

                      //登録データ（内容・金額）の入力ボックスの値を初期化
                      getElmId('regist_contents').value = ""
                      getElmId('regist_price').value = "";

                      alert('データを追加しました。');
                  },
                  // エラー処理
                  function(){
                      alert('データが追加できません。');
                  }
              );
          }
      );
  }
}
function chkRegistData(date_id, contents_id, price_id){
  var correctFlg = true;

  // 日付の書式チェック
  if ( getElmId(date_id).value.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/g) === null){
      alert('登録日付が正しくありません。');
      correctFlg = false;
  }
  
  // 内容のチェック
  if ( getElmId(contents_id).value.length === 0 ){
      alert('内容を入力してください。');
      correctFlg = false;
  }
  
  // 価格のチェック
  if ( getElmId($).value.length === 0 ){
      alert('価格を入力してください。');
      correctFlg = false;
  } else {
      // 価格の書式チェック
      if ( getElmId(price_id).value.match(/^[0-9]*$/g) === null ){
          alert('価格が正しくありません。');
          correctFlg = false;
      }  
  }
  return correctFlg;
}
/*** ID名からDOMを取得 ***/
function getElmId(id){
  return document.getElementById(id);
}
