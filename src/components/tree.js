import { norm, lerp } from './cfg.js';

//树
export default function Tree (row, col, direction) {
	this.cfg = {
		direction: direction, //方向
		col: col, //第几列
		row: row, //第几行
		MaxX: 440,
		minY: 210,
		maxY: 500,
		minScale: 0.45,
		range: 10, //坐标浮动范围
	}
};

Tree.prototype = {
	/**
	 * 初始化位置
	 * @param  {[type]} line [当前树为第几行]
	 * @return {[type]}      [description]
	 */
	initPosition: function() {
		var cfg = this.cfg;

		var x,y;

		var unitY = ( cfg.maxY - cfg.minY ) / 6;
		var unitX = cfg.MaxX / 10;

		y = cfg.minY + unitY * cfg.row * cfg.row / 8 + Math.random() * cfg.range;

		if(cfg.direction == 'left') {
			x = ( cfg.MaxX - unitX * cfg.col - y ) / 0.587 + Math.random() * cfg.range;
		} else{
			x = ( y + 440 - unitX * cfg.col ) / 0.587 + Math.random() * cfg.range;
		}

		var scale = lerp(norm(y, cfg.minY, cfg.maxY), cfg.minScale, 1.7);

		return {
			x: x,
			y: y,
			scale: scale
		}
	},

	init: function (stage) {
		var tree = new PIXI.Sprite.fromImage(require('./img/tree2.png') );
		var cfg = this.initPosition();

		tree.width = 50;
		tree.height = 50;
		tree.position.x = cfg.x;
		tree.position.y = cfg.y;
		tree.scale.x = cfg.scale;
		tree.scale.y = cfg.scale;

		stage.addChild(tree);

		this.tree = tree;
	},

	animate: function () {
		var tree = this.tree,
				cfg = this.cfg;

		var unitY = ( cfg.maxY - cfg.minY ) / 6;
		var unitX = cfg.MaxX / 10;

		var scale = lerp(norm(tree.position.y, cfg.minY, cfg.maxY), cfg.minScale, 1.7);

		if(cfg.direction == 'left') {
			tree.position.x = ( cfg.MaxX - unitX * cfg.col * scale * 1.7 - tree.position.y ) / 0.587;
		} else{
			tree.position.x = ( tree.position.y + 150 + unitX * cfg.col * scale * 1.7 ) / 0.587;
		}

		if(tree.position.y >= cfg.maxY) {
			tree.position.y = cfg.minY;
		} else{
			tree.position.y += 1 * scale * scale * scale + 0.6;
		}

		var scale = lerp(norm(tree.position.y, cfg.minY, cfg.maxY), cfg.minScale, 1.7);
		tree.scale.x = scale;
		tree.scale.y = scale;
	}
}