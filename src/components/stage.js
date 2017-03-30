import People from './people.js';
import Score from './score.js';
import Tree from './tree.js';
import Sprite from './sprite.js';
import $ from 'jquery';

let winStage = null;
var cfg = window.cfg;

//舞台
const Stage = function (stage) {
	this.stage = new PIXI.Container();
	stage.addChild(this.stage);

	winStage = stage;
};

Stage.prototype = {
	init: function () {
		var that = this;

		this.drawSnow();
		this.drawMountain();
		this.drawTree();
		this.drawScore();
		this.drawSprites();
		this.drawPeople();

		animate();

		function animate () {
			window.frame = requestAnimationFrame(animate);

			if(!window.start) {
				return;
			}
			
			that.leftTree.map(function(elem) {
				elem.animate();
			})

			that.rightTree.map(function(elem) {
				elem.animate();
			})

			window.sprites.map(function(elem,index) {
				elem.animate(index);
			})

			that.people.animate();

    		window.renderer.render(winStage);
		}
	},

	drawSprites: function () {
		window.sprites = [];
		window.aSprite = [];

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

		cfg.gift.forEach((element, ) => {
			var sprite = new Sprite();
			var type = cfg.gifts[element];
			sprite.init(winStage, type);
			window.aSprite.push(sprite);
		});
	},

	drawPeople: function () {
		var people = new People(winStage);

		people.init();

		this.people = people;
	},

	drawScore: function () {
		var score = new Score(winStage);
		score.init();

		window.score = score;
	},

	drawMountain: function () {
		var leftMountain = PIXI.Texture.fromImage(require('./img/left-mountain.png'));
		var rightMountain = PIXI.Texture.fromImage(require('./img/right-mountain.png'));
		var left = new PIXI.Sprite(leftMountain);
		var right = new PIXI.Sprite(rightMountain);

		left.anchor = right.anchor = {
			x: 0.5,
			y: 0.5,
		};

		left.height = 100;
		left.width = 430;
		left.position.x = 215;
		left.position.y = 205;

		right.width = 312;
		right.height = 140;
		right.position.x = 765 + 157;
		right.position.y = 168;

		this.stage.addChild(left);
		this.stage.addChild(right);
	},

	drawTree: function() {
		this.leftTree = [];
		this.rightTree = [];
		
		for( var i = 1; i < 9; i++ ) {

			for( var j = 0; j < 8; j++ ) {
				var leftTree = new Tree(i, j, 'left');
				var rightTree = new Tree(i, j, 'right');

				leftTree.init(winStage);
				rightTree.init(winStage);

				this.leftTree.push(leftTree);
				this.rightTree.push(rightTree);
			}
		}
	},

	drawSnow: function () {
		var container = PIXI.Sprite.fromImage(require('./img/bg.jpg'));

		container.width = cfg.width;
		container.height = 540;
		container.position.x = 0;
		container.position.y = 240;

		this.stage.addChild(container);
	}
}

export default Stage;