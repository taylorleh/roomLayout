
var nameSpace = "http://www.w3.org/2000/svg";
var imageNS = 'http://www.w3.org/1999/xlink';

function makeCircle ( ) {
	var svg = document.createElementNS( nameSpace, 'svg' );
	var circle = document.createElementNS( nameSpace, 'circle' );
	var div = document.createElement('div');
	div.className = 'item';
	circle.setAttributeNS(null, 'r', 20);
	circle.setAttributeNS(null, 'cx', 20);
	circle.setAttributeNS(null, 'cy', 20);
	circle.setAttributeNS(null, 'fill', 'green');
	svg.appendChild(circle);
	div.appendChild(svg);
	return div;

}

function makeSquare ( ) {
	var svg = document.createElementNS( nameSpace, 'svg' );
	var square = document.createElementNS( nameSpace, 'rect' );
	var div = document.createElement('div');
	div.className = 'item';
	div.setAttribute('draggable', true);
	square.setAttributeNS(null, 'width', 100);
	square.setAttributeNS(null, 'height', 50);
	svg.style.height = 50 + 'px';
	svg.style.width = 100 + 'px';
	// square.setAttributeNS(null, 'cy', 20);
	square.setAttributeNS(null, 'fill', 'yellow');
	svg.appendChild(square);
	div.appendChild(svg);
	return div;

}

function makeChair ( ) {
	var div = document.createElement('div');
	var svg = document.createElementNS(nameSpace, 'svg');
	svg.setAttribute( 'xmlns:link:', imageNS);

	var img = document.createElementNS(imageNS, 'image');
	img.setAttributeNS(imageNS, 'xmlns:href', 'studio8.svg');
	debugger;
}


function ItemList ( ) {
	this.itemList = [];
}

ItemList.prototype.addItem = function( item ) {
	if (!item) {
		return;
	}
	this.itemList.push( item );
};


var RoomModule = ( function () {
	var _instance;

	function RoomLayout () {
		// private properties
		var can = document.getElementById('can');
		var items = new ItemList();
		var isPlacingItem = false;
		var isResizeMode = false;
		var tempItem = {};

		// private methods
		function handleResize ( ) {
			this.firstChild.style.width = this.clientWidth + 'px';
			this.firstChild.style.height = this.clientHeight + 'px';
			this.firstChild.firstChild.attributes.getNamedItem('width').value = this.clientWidth;
			this.firstChild.firstChild.attributes.getNamedItem('height').value = this.clientHeight;
		}

		function initializeResizeEvents ( obj ) {
			// obj.addEventListener('mousemove',handleResize,false );
			obj.onmousedown = function  (event ) {
				if (isResizeMode) {
					obj.addEventListener('mousemove', handleResize, false);
				}
				obj.ondragstart = function  ( event ) {
					console.log(event);
					event.dataTransfer.setData('text/plain',obj.className);
					event.dataTransfer.effectAllowed = 'move';
				}
			}
			obj.ondblclick = function  ( event ) {
				if (isResizeMode) {
					obj.style.resize = 'none';
					return isResizeMode = false;
				}
				obj.style.resize = 'both';
				isResizeMode = true;
			}
			obj.onmouseup = function  ( ) {
				console.log('mouse up, object not resizing');
				obj.removeEventListener('mousemove', handleResize, false);
			}

			obj.ondragstart = function  ( ) {
				console.log(this);
			}
		}

		can.onmouseup = function  ( event ) {
			if (!isPlacingItem) {
				return;
			}
			tempItem.style.left = event.clientX - 20 + 'px';
			tempItem.style.top = event.clientY - 20 + 'px';
			document.body.appendChild(tempItem);
			isPlacingItem = false;
			initializeResizeEvents( tempItem );
			tempItem = {};
		}
		can.ondragenter = function  ( event ) {
			event.preventDefault();
			event.dataTransfer.effectAllowed = 'move';
			event.dataTransfer.dropEffect = 'move';
		}
		can.ondragover = function  (event ) {
			event.preventDefault();
		}
		can.ondrop = function  ( event ) {
			event.preventDefault();
			event.dataTransfer.dropEffect = 'move';
			// var ref = event.dataTransfer.getData('text/plain');
			var ref = document.getElementsByClassName(event.dataTransfer.getData('text/plain'));
			ref[0].style.top = event.clientY - (ref[0].clientHeight / 2) + 'px';
			ref[0].style.left = event.clientX - (ref[0].clientWidth / 2) + 'px';
			// console.log(ref, event);
		}

		function handDragStart( item ) {
			isPlacingItem = true;
			switch ( item.target.id ) {
				case 'Table' || 'table':
					tempItem = makeCircle();
					break;
				case 'Desk' || 'desk':
					console.log('desk item chosen');
					tempItem = makeSquare();
					break;
				case 'Chair' || 'chair':
					console.log('chair chosen');
					tempItem = makeChair();
				default:
					console.log('default case statement');
					break;
			}
		}

		return {
			initialize: function ( item ) {
				items.addItem( item );
				item.addEventListener('dragstart', handDragStart.bind(item), false);

			}
		}

	}

	return _instance == undefined ? _instance = new RoomLayout() : _instance;

}())


function init ( ) {
	var _items = document.querySelectorAll('ul li');
	for (var i = _items.length - 1; i >= 0; i--) {
		RoomModule.initialize(_items[i]);
	};
}


document.onload = init();





