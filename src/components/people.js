import $ from 'jquery';

var cfg = window.cfg;

//人物
export default function People (stage) {
	this.cfg = {
		img: require('./img/people.png'),
		anchor: {
			x: 0.5,
			y: 0.5,
		},
		position: {
			x: cfg.width / 2,
			y: 500
		},
		speed: 5,
	}

	this.direction = '';

	window.position = this.cfg.position;

	this.stage = new PIXI.Container();

	stage.addChild(this.stage);
}

People.prototype = {
	init: function () {
		var cfg = this.cfg;

		var texture = PIXI.Texture.fromImage(cfg.img);
		var bunny = new PIXI.Sprite(texture);

		bunny.anchor = cfg.anchor;
		bunny.position = cfg.position;
		bunny.zOrder = 100;

		this.stage.addChild(bunny);
		this.bunny = bunny;

		this.drawButton();
	},

	drawButton: function() {
		var that = this;

		$('#btn-left').on('touchstart', function () {
			that.direction = 'left';
		});

		$('#btn-right').on('touchstart', function () {
			that.direction = 'right';
		});

		function end () {
			that.direction = '';
		}

		$('#btn-left').on('touchend', end);
		$('#btn-right').on('touchend', end);
	},

	animate: function () {
		if(this.direction == 'left') {
			if(this.bunny.position.x > 150) {
				this.bunny.position.x -= this.cfg.speed;
			}

			if(this.bunny.rotation >= -0.1) {
				this.bunny.rotation -= 0.005;
			}
		} else if (this.direction == 'right') {
			if(this.bunny.position.x < 1000) {
				this.bunny.position.x += this.cfg.speed;
			}
			if(this.bunny.rotation <= 0.1) {
				this.bunny.rotation += 0.005;
			}
		} else{
			if(this.bunny.rotation > 0) {
				this.bunny.rotation -= 0.005;
			}else if (this.bunny.rotation < 0) {
				this.bunny.rotation += 0.005;
			}
		}

		window.position.x = this.bunny.position.x;
	}
}