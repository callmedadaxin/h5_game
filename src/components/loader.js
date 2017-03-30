/**
 * 加载完全部才执行
 */
import $ from 'jquery';

var pics = [
	require('../assets/img/bg-start.png'),
	require('../assets/img/btn-start.png'),
	require('../assets/img/left.png'),
	require('../assets/img/right.png'),
	require('../assets/img/people.png'),
	require('../assets/img/bg.jpg'),
	require('../assets/img/cake.png'),
	require('../assets/img/cookie.png'),
	require('../assets/img/down.png'),
	require('../assets/img/theme.png'),
	require('../assets/img/theme-icon.png'),
	require('../assets/img/down-icon.png'),
	require('../assets/img/cake-icon.png'),
	require('../assets/img/cookie-icon.png'),
	require('../assets/img/left-mountain.png'),
	require('../assets/img/right-mountain.png'),
];

function loadImages(pics, callback) {
	if (pics.length) {
		var img = new Image(),
			pic = pics.shift();

		img.onload = callback;
		img.src = pic;
		loadImages(pics, callback);
	} else {
		return;
	}
}

$(function() {
	loadImages(pics, function() {
		if (!pics.length) {
			$('.loading').hide();
		};
	})
})