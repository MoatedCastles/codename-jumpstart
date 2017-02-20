var getCookieByKey = function(key){
	var cookie = document.cookie;
	if(!cookie.includes(key)){
		return '';
	} else {
		var startIndex = cookie.indexOf(`${key}=`)+key.length+1;
		var endIndex = cookie.slice(startIndex).indexOf('&') === -1 ? cookie.length : cookie.indexOf('&');
		var val = cookie.slice(startIndex,endIndex);
		return val;
	}
};

export { getCookieByKey };