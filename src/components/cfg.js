window.cfg = {
	width: 1080,
	height: 720,
	backgroundColor: '0x31a0ff',
	gifts: ['cookie', 'cake', 'down', 'theme'],
	gift: [0,1,0,2,1,3,0,0,3,1,0,1,3,1,0,2,1,3,0,1,2,0,0,1]
}

export const norm = function (value, min, max) {
  return (value - min) / (max - min);
}

export const lerp = function (norm, min, max) {
  return (max - min) * norm + min;
}

export const preLoad = function(url, callback, onerror) {
  var img = new Image();

  img.src = url;

  img.onload = function () {
  	if(typeof callback == "function"){
  		callback(img);       		
  	}
  }

  img.onerror = function () {
    if(typeof onerror == "function"){
      onerror(img);               
    }
  }
};