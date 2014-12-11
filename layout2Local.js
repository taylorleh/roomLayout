
var svgns = "http://www.w3.org/2000/svg";
var imageNS = "http://www.w3.org/1999/xlink";
var roomScale;

function RoomItemsList ( ) {
	this.roomItemsList = [];
}

function PrototypePiecesList() {
	this.prototypePiecesList = [];
}

PrototypePiecesList.prototype = {
	addPrototypePiece: function( item ) {
		this.prototypePiecesList.push( item );
	}
}


RoomItemsList.prototype = {
	indexOf: function ( element, startIndex ) {
		var i = startIndex;
		while ( i < this.roomItemsList.length ) {
			if ( this.roomItemsList[ i ] === element ) {
				return i;
			}
			i++;
		}
		return -1;
	},
	addItemToList: function ( item ) {
		if ( !item ) {
			return;
		}
		this.roomItemsList.push( item );
	}
}



function makeCircle ( location ) {
	var svg = document.createElementNS( svgns, 'svg' );
	var circle = document.createElementNS( svgns, 'circle');
	var div = document.createElement('div');
	div.className = 'item';
	circle.setAttributeNS(null, 'r', 20 );
	circle.setAttributeNS(null, 'cy', 20 );
	circle.setAttributeNS(null, 'cx', 20 );
	circle.setAttributeNS(null, 'fill', 'green');
	svg.appendChild(circle);
	div.appendChild(svg);
	return div;

}
function makeChair ( ) {
	var div = document.createElement('div');
	var chair = document.createElementNS(svgns, 'image');
	var svg = document.createElementNS(svgns, 'svg');
	div.className = 'item';
	div.setAttribute('draggable', true );
	div.style.position = 'fixed';

	svg.setAttributeNS(imageNS, 'xlink', imageNS );
	svg.style.width = 50 + 'px';
	svg.style.height = 50 + 'px';

	chair.setAttributeNS(imageNS, 'xlink:href', 'chair8.svg' );
	chair.setAttribute('width', '50px');
	chair.setAttribute('height', '50px');

	svg.appendChild(chair);
	div.appendChild(svg);
	return div;


}

function makeCabinet ( ) {
	var div = document.createElement('div');
	var cabinet = document.createElementNS(svgns, 'image');
	var svg = document.createElementNS(svgns, 'svg');
	div.className = 'item';
	div.setAttribute('draggable', true );
	div.style.position = 'fixed';

	svg.setAttributeNS(imageNS, 'xlink', imageNS );
	svg.setAttribute('style', 'width: 50px; height: 75px;');

	cabinet.setAttributeNS(imageNS, 'xlink:href', 'cabinet7.svg' );
	cabinet.setAttribute('width', '50px');
	cabinet.setAttribute('height', '75px');

	svg.appendChild(cabinet);
	div.appendChild(svg);
	return div;
	
}
function makeDesk ( ) {
	var div = document.createElement('div');
	var desk = document.createElementNS(svgns, 'image');
	var svg = document.createElementNS(svgns, 'svg');
	var deskWidth = 85 * 96;
	div.className = 'item';
	div.setAttribute('draggable', true );
	div.style.position = 'absolute';

	svg.setAttributeNS(imageNS, 'xlink', imageNS );
	svg.style.width =  '75px';
	svg.style.height = 75 + 'px';
	console.log( svg.style.width);

	desk.setAttributeNS(imageNS, 'xlink:href', 'desk1.svg' );
	desk.setAttribute('width',  '75px');
	desk.setAttribute('height', '75px');

	svg.appendChild(desk);
	div.appendChild(svg);
	return div;
	
}
// function makeDesk ( ) {
// 	var div = document.createElement('div');
// 	var desk = document.createElementNS(svgns, 'rect');
// 	var svg = document.createElementNS(svgns, 'svg');
// 	var deskWidth = 85 * 96;
// 	div.className = 'item';
// 	div.setAttribute('draggable', true );
// 	div.style.position = 'absolute';
// 	div.style.border = '1px solid black';

// 	svg.setAttributeNS(imageNS, 'xlink', imageNS );
// 	svg.style.width = (deskWidth * roomScale) + 'px';
// 	svg.style.height = 75 + 'px';
// 	console.log( svg.style.width);

// 	desk.setAttribute('width',(deskWidth * roomScale ) + 'px');
// 	desk.setAttribute('height', '75px');

// 	svg.appendChild(desk);
// 	div.appendChild(svg);
// 	return div;
	
// }

// workkkkkk
function makeTable ( ) {
	var div = document.createElement('div');
	var svg = document.createElementNS(svgns, 'svg');
	svg.setAttributeNS(imageNS ,'xlink', imageNS);
	div.className = 'item';
	// svg.setAttribute('height', '100px');
	// svg.setAttribute('width', '100px');
	svg.style.width = 100 + 'px';
	svg.style.height = 100 + 'px';


	var table = document.createElementNS( svgns, 'image');
	table.setAttributeNS( imageNS,'xlink:href','studio1.svg');
	table.setAttribute('width', '100px');
	table.setAttribute('height', '100px');

	div.style.position = 'fixed';
	// table.setAttributeNS(svgns,'width',100);
	// table.setAttributeNS(svgns,'height',100);
	svg.appendChild(table);
	div.appendChild(svg);
	return div;

}
var RoomModule = ( function  ( ) {
	var _instance;


	function RoomLayout ( ) {
		// private properties
		var can = document.getElementById('can');
		var roomItems = new RoomItemsList();
		var prototypePieces = new PrototypePiecesList();
		var isPlacingItem = false;
		var isInResizeMode = false;
		var isDraggingProtoPiece = false;
		var tempItem = {};
		

		// private methods
		can.onmouseup = function  ( event ) {
			if ( !tempItem || !isPlacingItem ) {
				return;
			}
			tempItem.style.left = event.clientX - (parseInt(tempItem.firstChild.style.width) / 2);
			tempItem.style.top = event.clientY - (parseInt(tempItem.firstChild.style.height) / 2);
			isPlacingItem = false;
			document.body.appendChild(tempItem);
			console.log(event);
		}
		can.ondragenter = function  ( event ) {
			event.preventDefault();
			event.dataTransfer.dropEffect = 'move';
			if ( isDraggingProtoPiece ) {
				switch ( event.dataTransfer.getData('text/plain')) {
					case 'Desk' || 'desk':
						tempItem = makeDesk();
						break;
					case 'Cabinet' || 'cabinet':
						console.log('prototype piece of type', event.dataTransfer.getData('text/plain'), ' is being created');
						tempItem = makeCabinet();
						break;
					case 'Table' || 'table':
						tempItem = makeTable();
						break;
					case 'Chair' || 'chair':
						tempItem = makeChair();
						break;
					default:
						console.warn('Default case reached');
						break;
				}
			}
		}
		can.ondragover = function  ( event ) {
			event.preventDefault();
		}
		can.ondrop = function  ( event ) {
			event.preventDefault();
			var ref = document.getElementById(event.dataTransfer.getData('text/plain'));
			if ( isDraggingProtoPiece ) {
				tempItem.style.left = event.clientX;
				tempItem.style.top = event.clientY;
				document.body.appendChild( tempItem );
				isDraggingProtoPiece = false;
				return;
			}

			ref.style.left = event.clientX - (ref.clientWidth / 2);
			ref.style.top = event.clientY - (ref.clientHeight / 2);
		}
		function resizeObject ( item ) {
			this.firstChild.style.width = item.currentTarget.clientWidth;
			this.firstChild.style.height = item.currentTarget.clientHeight;
			this.firstChild.firstChild.attributes.getNamedItem('width').value = item.currentTarget.clientWidth;
			this.firstChild.firstChild.attributes.getNamedItem('height').value = item.currentTarget.clientHeight;

		}
		function bindObjectEvents ( item ) {
			item.ondragstart = function  ( event ) {
				var ind = roomItems.indexOf(item,0);
				console.log('index of item:', ind);
				event.dataTransfer.effectAllowed = 'move';
				event.dataTransfer.setData('text/plain', item.id );
				// console.log('DATA:', event.dataTransfer.getData('text/plain'));
			}
			item.onmousedown = function  ( event ) {
				if( isInResizeMode ) {
					return;
				}
				item.addEventListener('mousemove', resizeObject, false );
			}
		}
		function bindPrototypePieceEvents ( item ) {
			item.ondragstart = function( e ) {
				isDraggingProtoPiece = true;
				console.log("prototype item: ", item, "is being dragged");
				e.dataTransfer.effectAllowed = 'copy';
				e.dataTransfer.setData('text/plain', item.id );
			}

		}
		function createObject ( item ) {
			isPlacingItem = true;
			switch( this.id ) {
				case 'Chair':
					tempItem = makeChair();
					// bindObjectEvents( tempItem );
					break;
				case 'Table' || 'table':
					tempItem = makeTable();
					// bindObjectEvents( tempItem );
					break;
				case 'Desk'  || 'desk':					
					tempItem = makeDesk();
					// bindObjectEvents( tempItem );
					break;
				case 'Cabinet' || 'cabinet':
					tempItem = makeCabinet();
					// bindObjectEvents( tempItem );
					break;
				default:
					console.log('default case block');
			}
		}
		return {
			initializeRoomObject: function ( item ) {
				roomItems.addItemToList(item);
				item.addEventListener('dragstart', createObject.bind(item), false );
				// bindObjectEvents( item );
			},
			initializePrototypePieces: function ( protoPiece ) {
				prototypePieces.addPrototypePiece( protoPiece );
				bindPrototypePieceEvents( protoPiece );
			},
			dev: function ( ) {
				console.log('tempItem:', tempItem);
			}
		}
	}

	return ( _instance === undefined ? _instance = new RoomLayout() : _instance );
}())

function formHan ( ) {
	var reader = new FileReader();
	var img = new Image();
	var item = document.getElementById('plans').files[0];
	var numberImg = 0;
	var ctx = document.getElementById('can').getContext('2d');
	
	reader.onload = function ( file ) {
		if ( file.currentTarget.readyState !== 2 ) {
			return;	
		}
			img.src = file.target.result;
			img.style.width = 500 + 'px';
			ctx.drawImage(img, 0 ,0 );
	}

	reader.readAsDataURL(item);
}

document.getElementById('upload').addEventListener('mouseup', formHan,false);

function init ( ) {
	var _items = document.querySelectorAll('ul li');
	var _form = document.forms[0];
	var _formContent = document.getElementById('plans');
	console.log(_formContent);
	// document.getElementById('width').value = '';
	// document.getElementById('height').value = '';
	for (var i = _items.length - 1; i >= 0; i--) {
		RoomModule.initializeRoomObject( _items[i] );
		RoomModule.initializePrototypePieces( _items[i] );
	};
}


function setScale ( roomWidth ) {
	roomScale =  500 / (roomWidth * 96 );
	console.log( roomScale );
}


document.getElementById('calculate').onclick = function  ( event ) {
	var wfeet = document.getElementById('feet').value;
	var winch = document.getElementById('inch').value;
	var height = document.getElementById('height').value;
	var totalWidth;
	if ( wfeet ) {
		if ( winch ) {
			totalWidth = parseInt( (wfeet * 12));
			totalWidth += parseInt( winch );
		} else {
			totalWidth = wfeet * 12;
		}
		console.log('total width in inches:', totalWidth);
		setScale( totalWidth );
	}

}


document.onload = init();



