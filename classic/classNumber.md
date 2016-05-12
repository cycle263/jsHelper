```
//生成随机码, 转换成2-36进制，然后截取8位
Math.random().toString(36).substring(2, 10);

//小数转换成百分数
function tranPercent(num, digit){
	var v = Math.pow(10, parseInt(digit));
	return Math.floor(num * (100 * v))/v;   //多加一个小括号（100 * v），避免精度丢失
}

//用0补全位数，并返回字符串
function prefixInteger(num, length) {
    try{
        if (num.toFixed().toString().length > length) {  //数值位数不能少于要求总位数
            throw 'illegal number!';
        }
        return (num / Math.pow(10, length)).toFixed(length).substr(2);
    }catch(err){
        console.log(err);
    }
}

//是否是素数函数
function isPrime(num) {
    var start = 2;
    while (start <= Math.sqrt(num)) {
        if (num % start++ < 1) return false;
    }
    return (num > 1);
}


/*随机颜色函数
 *Method 1
 *易于理解
 */
function getRandomColor(){
	var strArr = '0123456789ABCDEF'.split(''), resultStr = '#';
	for(var i = 0; i < 6; i++){
		resultStr += strArr[Math.floor(Math.random()*16)];	
	}
	return resultStr;
}
/*随机颜色函数
 *Method 2
 *简单实用
 */
'#'+((255*255*255)*Math.random()|0).toString(16);	//缺点：不一定够六位十六进制数字
'#'+(0xFFFFFF*Math.random()|0).toString(16);	//缺点：不一定够六位十六进制数字
'#' + (((0xFFFFFF-0x100000)*Math.random()+0x100000)|0).toString(16);
/*比较完美的方案*/
function getRandomColor(){
	var result = '#';
	for(var i = 0; i < 3; i++){
		var temp = (0xFF * Math.random() | 0).toString(16);
		temp = temp.length === 1 ? '0' + temp : temp;
		result += temp;
		temp = null;
	}
	return result;
}
```
