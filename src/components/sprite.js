import { norm, lerp } from './cfg.js';
import $ from 'jquery';


//树
export default function Sprite() {
	this.cfg = {
		minX: 460,
		maxX: 580,
		// minY: 160,
		minY: 210,
		maxY: 740,
		minScale: 0.45,
		center: [ 520, 140 ],
		collision: {
			width: 100,
			height: 50
		}
	}

	this.types = ['cookie', 'down', 'cake', 'theme'];
};

Sprite.prototype = {
	/**
	 * 初始化位置
	 */
	initPosition: function() {
		var cfg = this.cfg,
				sprite = this.sprite;

		var x,y,scale;

		//随机生成的位置
		// x = 0;
		x = cfg.center[0] + Math.random() * ( cfg.maxX - cfg.minX ) - ( cfg.maxX - cfg.minX ) / 2 ;
		y = cfg.minY;
		scale = lerp(norm(y, cfg.minY, cfg.maxY), cfg.minScale, 1.7);

		this.initX = x;

		sprite.anchor = {
			x: 0.5,
			y: 0.5
		}

		sprite.scale.x = scale;
		sprite.scale.y = scale;

		sprite.position.x = x;
		sprite.position.y = y;
	},

	init: function (stage, type) {
		var types = this.types;

		this.type = type;

		this.sprite = new PIXI.Sprite.fromImage(require(`./img/${type}.png`) );
		this.sprite.position.x = -1000;
		this.sprite.position.y = -1000;
		stage.addChild(this.sprite);
	},

	animate: function (index) {
		var sprite = this.sprite,
				cfg = this.cfg;

		var scale = lerp(norm(sprite.position.y, cfg.minY, cfg.maxY), cfg.minScale, 1.7);

		sprite.position.y += 1 * scale * scale * scale + 0.6;

		//中心点距X距离
		var distanceX = cfg.center[0] - this.initX;
		var distanceY = cfg.minY - cfg.center[1];

		sprite.position.x = cfg.center[0] - ( sprite.position.y - cfg.center[1] ) * distanceX / distanceY;

		//碰撞检测
		this.collisionTest(sprite.position.x, sprite.position.y, index);

		if(sprite.position.y >= cfg.maxY) {
			sprite.position.y = 2000;
		}

		sprite.scale.x = scale;
		sprite.scale.y = scale;
	},

	collisionTest(x, y, index){
		var pos = window.position,
				cfg = this.cfg,
				collision = cfg.collision;

		var sprite = this.sprite,
				type = this.type;

		if(type == 'down') {
			var aDom = window.aDown;
		} else if (type == 'theme') {
			var aDom = window.aTheme;
		}

		//加上物体的宽
		// if(x < cfg.center[0]) {
		// 	x -= 40;
		// } else{
		// 	x += 40;
		// }

		if( y <= pos.y + collision.height && y >= pos.y - collision.height ) {
			if( x <= pos.x + collision.width / 2 && x >= pos.x - collision.width / 2) {
				// $('#bg-music')[0].pause();
				$('#hei-music').trigger('click');

				window.score.drawUnitScore(this.type);

				sprite.position.y = 2000;

				if(aDom){
					var target = aDom[0],
							hasClick = false;
					$(target).fadeIn();
					_hmt.push(['_trackPageview', '/yearend/' + type + '/show']);
					aDom.splice(0, 1);

					//主题，暂停，点击继续
					window.start = false;
					clearInterval(window.timer);

					$(target).click(function() {
						start()
						$(target).fadeOut();
						hasClick = true;
					});

					setTimeout(function () {
						if(hasClick) {
							return;
						}
						
						$(target).fadeOut();
						start();
					}, 5000);
				}
			}
		}
	}
}



function start () {
	window.start = true;

	clearTimeout(window.timer);
	window.timer = setInterval(()=>{
		if(!!aSprite.length) {
			var elem = window.aSprite.pop();

			setTimeout(function () {
				elem.initPosition();
				window.sprites.push(elem);
			}, Math.random() * 2000)
		} else{
			//结束了
			clearTimeout(window.stopTimer)

			window.stopTimer = setTimeout(function () {
				_hmt.push(['_trackPageview', '/yearend/pageend/show']);
				$('#page-end').fadeIn();
				$('canvas').hide();
				window.start = false;
				
				clearTimeout(window.timer);
				clearTimeout(window.stopTimer)
			}, 8000);

			clearInterval(window.timer);
		}
	}, 2000);
}