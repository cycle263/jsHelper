```
//string unique —— regexp
//返回连续重复最多的字符及其个数
function strUnique(str){    //example: '111222333334555777888' -- 有序
  if(typeof str !== 'string'){return false;}
	var arr = str.match(/(\w)\1*/g), len = 0, char = '';
	for(var i = 0, l = arr.length; i < l; i++){
		var leng = arr[i].length;
		if(len < leng) {
			len = leng;
			char = arr[i][0];
		}
	}
	return {length: len, char: char};
}
备注：/(\w)\1*/g ，其中\1表示上一个匹配值。
```
