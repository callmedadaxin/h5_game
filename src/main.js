import './components/loader.js';
import './components/cfg.js';
import './index.scss';
import $ from 'jquery';
import {
	preLoad
} from './components/cfg.js';
// import Stage from './components/stage.js';
import PlaceHolder from './assets/img/placeholder.jpg';

var cfg = window.cfg;
window.first = true;

function resize(e) {
	var winH = $(window).height();
	var winWidth = $(window).width();

	if (window.orientation == 180 || window.orientation == 0) {
		$('#main').height(winWidth);
		$('#main').width(winH);

		$('#wrap').css({
			'transform': 'rotate(90deg)',
		});
	} else {
		$('#wrap').css('transform', 'rotate(0)');
	}
}

resize();

window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", resize, false);

//背景音乐
// $('#bg-music').attr('src', require('./assets/audio/bg.mp3'));
// $('#hei-music').attr('src', require('./assets/audio/hei.mp3'));

$(document).click(function() {
	$('#bg-music')[0].play();
});

$('#hei-music').click(function() {
	$('#hei-music')[0].play();
});

function initPreview(data, name) {
	data.forEach(function(elem) {
		var $li = $('<li>');
		var $img = $('<img>');

		$img.attr('src', PlaceHolder).appendTo($li);

		preLoad(elem, function(img) {
			$img.attr('src', img.src);
		}, function() {
			preLoad(elem + '_ht', function(_img) {
				$img.attr('src', _img.src);
			})
		})

		$(name).append($li);
	});
}

window.start = false;

var renderer = PIXI.autoDetectRenderer(cfg.width, cfg.height, {
	backgroundColor: cfg.backgroundColor
});

window.renderer = renderer;

$('#main').append(renderer.view)

var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame;


$('#btn-start,.btn-restart').click(function() {
	$('#bg-music')[0].play();

	var type = $(this).data('type');

	_hmt.push(['_trackPageview', '/yearend/' + type]);
	clearInterval(window.timer);
	clearTimeout(window.stopTimer);
	cancelAnimationFrame && cancelAnimationFrame(window.frame);

	window.aDown = $('div.down')
	window.aTheme = $('div.theme')

	var stage = new PIXI.Container();
	// 初始化舞台
	new Stage(stage).init();

	$('.btn').fadeIn();
	$('#page-start').fadeOut();
	$('#page-end').fadeOut();
	$(renderer.view).fadeIn();
	window.start = true;

	return false;
});

$('.btn-close').click(function() {
	_hmt.push(['_trackPageview', '/yearend/close']);
	window.start = false;
	clearInterval(window.timer);
	clearTimeout(window.stopTimer);
	cancelAnimationFrame && cancelAnimationFrame(window.frame);

	$('#page-start').fadeIn();
	$('#page-end').fadeOut();
	$('.btn').fadeOut();

	return false;
});