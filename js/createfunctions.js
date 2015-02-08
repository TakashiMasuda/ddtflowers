/**
 * 体験レッスンページのコンテンツ作成用JavaScript関数 + 汎用テキスト作成JavaScript関数ファイル。
 */

/* 
 * 関数名:createText()
 * 概要  :テキストを指定した要素に挿入する。
 * 引数  :Array properties, Element elem
 * 返却値  :なし
 * 作成者:T.M
 * 作成日:2015.02.06
 */
//function createText(properties, elem){
//	// 処理の分岐ポイントとなるpropertiesの要素数を取得し、arrayLengthに格納する。
//	var arrayLength = properties.length;
//	// 処理対象となる要素を格納する変数textElemを宣言する。
//	var textElem = '';
//	
//	// propertiesが絶対座標まで指定されたデータであれば
//	if(arrayLength > 5){
//		// 新たな要素を生成してtextElemに格納する。
//		textElem = document.createElement('p');
//	// 単にテキストを挿入してスタイルを整えるだけであれば
//	} else{
//		// elemをtextElemに格納する。
//		textElem = elem;
//	}
//	
//	// textElemのjQueryオブジェクトを生成し変数に格納する。毎回生成する手間を省く。
//	var $textElem = $(textElem);
//	
//	// for文でtextElemにスタイルを順次指定していく。
//	for(var i = 0; i < arrayLength; i++){
//		// 現在指す配列の要素がnullではなければ
//		if(properties[i] != null){
//			// ループ回数で処理を分岐する。
//			switch(i){
//				// i = 0ならテキストを追加する。
//				case 0:	$textElem.text(properties[i]);
//						// switch文を抜ける。
//						break;
//				// i = 1ならフォントサイズを指定する。
//				case 1:	$textElem.css('font-size', properties[i] + 'px');
//						// switch文を抜ける。
//						break;
//				// i = 2ならテキストの色を指定する。
//				case 2:	$textElem.css('color', properties[i]);
//						// switch文を抜ける。
//						break;
//				// i = 3ならフォントの種類を変える。
//				case 3:	$textElem.css('font-family', properties[i]);
//						// switch文を抜ける。
//						break;
//				// i = 4ならX座標を指定する。
//				case 4:	$textElem.css('left', properties[i] + 'px');
//						// switch文を抜ける。
//						break;
//				// i = 5ならY座標と絶対位置指定の設定をする。
//				case 5:	$textElem.css({
//							// Y座標を指定する。
//							top: properties[i] + 'px',
//							// 絶対位置指定の要素にする。
//							position: 'absolute'
//						});
//						// switch文を抜ける。
//						break;
//				// 余分な要素はスキップする。
//				default:break;
//			}
//		}
//	}
//	
//	// 絶対位置指定の要素であれば
//	if(arrayLength > 5){
//		// 引数となった要素に作成した要素を追加する。
//		$(elem).css('margin', 0).append(textElem);
//	}
//}

/*
 {root:
 	{
 		a:
 			[1,2,3],
 			[2,3,4],
 			[3,4,5]
 		b:
 			[1],
 			[2],
 			[3]
 	}
 }
  */
/* 
 * 関数名:createText()
 * 概要  :テキストを取得してしかるべき場所に流し込む。
 * 引数  :String contentName
 * 返却値  :なし
 * 作成者:T.M
 * 作成日:2015.02.06
 */
function createText(contentName){
	// Ajaxでサーバ上からJSONを持ってくる。
	$.ajax({
		// コンテンツ名からJSONファイルを特定して取得する。
		url: contentName + '.json',
		// JSONデータを取得してパースする。
		dataType: 'JSON',
		// ページ読み込み時の処理なので同期通信を行う。
		async: false,
		// 通信成功時のコールバック関数。
		success: function(json){
			$.each(json, function(key, value){
				// 処理対象が子要素を持つパーツであれば
				if($('.' + key).children().length > 0){
					for(var count = 0; count < $('.' + key).length; count++){
						// ループごとに走査する要素を入れ替える。
						var $this = $('.' + key).eq(count);
						// 子を持たない子孫の要素を走査する
						$('*:empty', $this).each(function(i){
							//  JSONから該当する値を取り出し要素に格納する。
							$(this).text(value[count][i]);
						});
					}
				// 子要素を持たないパーツであれば
				} else {
					// 1つのキーに登録されている複数の配列を走査していく
					for(var i = 0; i < value.length; i++){
						// 順次テキストを該当する要素に追加していく。
						$('.' + key).eq(i).text(value[i][0]);
					}
				}
				// キーと合うクラスを取得する。
				$('.' + key + ':empty, .'+ key +' *:empty').each(function(i){
					// 現在指しているHTMLタグの要素を変数に格納してjQueryオブジェクトの無駄な生成を抑制する。
					var $this = $(this);
					// valueの配列の要素数だけループしてテキストを流し込むべき要素を処理する。
					for(var j = 0; j < value[i].length; j++){
						// jsonのキーに紐づく配列からテキストを取り出し要素に流し込む。
						$this.text(value[i][j]);
					}
				});
			});
		},
		error:function(){
			alert('error');
		}
	});
}