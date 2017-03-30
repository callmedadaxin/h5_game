import $ from 'jquery';

export default function Score (stage) {
	this.stage = new PIXI.Container();
	this.score = {
		theme: 0,
		cookie: 0,
		down: 0,
		cake: 0
	}
	
	stage.addChild(this.stage);
}

Score.prototype = {
	init: function () {
		var img = PIXI.Texture.fromImage(require('./img/score.png'));
		var bg = new PIXI.Sprite(img);

		bg.anchor = {
			x: 0.5,
			y: 0.5,
		};

		bg.height = 88;
		bg.width = 450;
		bg.position.x = 225;
		bg.position.y = 88;

		this.stage.addChild(bg);
		this.drawScore();

		Object.keys(this.score).forEach( function(element) {
			$('#' + element).text('x0');
		});
	},

	drawScore: function () {
		var cookie = PIXI.Sprite.fromImage(require('./img/cookie-icon.png'));
		var cake = PIXI.Sprite.fromImage(require('./img/down-icon.png'));
		var theme = PIXI.Sprite.fromImage(require('./img/theme-icon.png'));
		var icecream = PIXI.Sprite.fromImage(require('./img/cake-icon.png'));

		theme.width = cookie.width = cake.width = icecream.width = 40;
		theme.height = cookie.height = cake.height =  40;
		icecream.height = 50;
		theme.position.y = cookie.position.y = cake.position.y = 63;
		icecream.position.y = 55;

		theme.position.x = 20;
		cake.position.x = 120;
		cookie.position.x = 220;
		icecream.position.x = 320;

		this.stage.addChild(cookie);
		this.stage.addChild(cake);
		this.stage.addChild(icecream);
		this.stage.addChild(theme);

		var cookieNum = new PIXI.Text('x 0');
		var cakeNum = new PIXI.Text('x 0');
		var iceCreamNum = new PIXI.Text('x 0');
		var themeNum = new PIXI.Text('x 0');

		themeNum.style = cookieNum.style = cakeNum.style = iceCreamNum.style = {
			fontSize: '28px',
			fill: '#fff',
			fontWeight: 'bold'
		}

		themeNum.y = cookieNum.y = cakeNum.y = iceCreamNum.y = 70;

		themeNum.x = 65;
		cakeNum.x = 165;
		cookieNum.x = 265;
		iceCreamNum.x = 365;

		this.stage.addChild(cookieNum);
		this.stage.addChild(cakeNum);
		this.stage.addChild(iceCreamNum);
		this.stage.addChild(themeNum);

		this.cookie = cookieNum;
		this.down = cakeNum;
		this.cake = iceCreamNum;
		this.theme = themeNum;
	},

	drawUnitScore: function(type) {
		this.score[type] += 1; 
		this[type].text = 'x ' + this.score[type];
		$('#'+type).text('x' + this.score[type]);

		var add = $('<p id="add-one">+1</p>');
		$('#main').append(add);

		setTimeout(function () {
			add.remove();
		}, 1000);
	}
}