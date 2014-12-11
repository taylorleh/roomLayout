
var nameSpace = "http://www.w3.org/2000/svg";
var theDiv = document.getElementsByClassName('layout')[0];

function ItemsList() {
	this.items = [];


}



ItemsList.prototype.addItem = function( it) {
	this.items.push(it);

	it.onclick = function ( event ) {
		console.log('prototype items clicked');
	}
};




function Canvas ( ) {
	var can = document.getElementById('can');

	can.onmouseup = function ( e ) {
		console.log( e );
		Module.notify(e,can);
	}

}


var Module = ( function() {

	var _instance;
	var allItems = new ItemsList();
	var canvas = new Canvas();
	var dragging = false;
	var concreteCanvas = document.getElementById('can');

	// store every other x,y value for handleResize function
	var bSize = true;
	var aCords = []

	function makeSVG ( ) {
		var svg = document.createElementNS(nameSpace,'svg');
		svg.id = 'svgELEM';
		svg.setAttribute('xmlns',nameSpace);
		return svg;

	}

	
	function handleSVGResize ( element ) {
		
		if ( bSize ) {
			aCords[0] = element.pageX;
			aCords[1] = element.pageY;
			bSize = false;
		} else {
			
		}

		var _cor = [element.pageX, element.pageY ];
		for ( var c in _cor ) {
			console.log( _cor[c]);
		}

	}

	function drawObject (event ) {
		var newSvg = makeSVG();
		var element = document.createElementNS(nameSpace,'circle');
		var container = createContainer(event);
		var isResizing = false;
		container.appendChild(newSvg);

		container.onmousedown = function( event ) {
			console.log("Container click event");
			container.addEventListener('mousemove', handleSVGResize, false );
		}

		container.onmousemove = function( event ) {
			if (!isResizing) {
				return;
			}
			console.log(event);

		}


		element.setAttributeNS(null,'r',20);
		element.setAttributeNS(null,'cy',20);
		element.setAttributeNS(null,'cx',20);
		element.setAttributeNS(null,'fill','green');

		newSvg.appendChild(element);
		
		theDiv.appendChild(container);
		dragging = false;
		

	}

	function createContainer ( event) {
		
		var _div = document.createElement('div');
		_div.style.width = 40 + 'px';
		_div.style.height = 40 + 'px';
		_div.style.position = 'fixed';
		_div.style.resize = "both";
		_div.style.overflow = "auto";
		_div.style.left = event.clientX  - 20 + 'px';
		_div.style.top = event.clientY - 20 + 'px';
		_div.contentEditable = true;
		return _div;
	}
	function getDrag() {
		return dragging;
	}
	function setDrag() {
		dragging = true;
	}

	function Mediator() {

		return {
			createNewItem: function( item ) {
				setDrag();
				allItems.addItem(item.id);

			},
			notify: function(evt, can) {
				if (!getDrag()) {
					return;
				}
				console.log('mediator notified');
				drawObject(evt);

			}
		}

	}



	return (_instance == undefined ?  _instance = new Mediator() : _instance );

}())




function handleMouse ( event ) {
	
}


function bindObject ( obj ) {
	
	var can = document.getElementById('can');

	obj.ondragstart = function( e ) {
		// console.log(obj,e);
		Module.createNewItem(obj);
		can.addEventListener('mouseup', handleMouse,false);

	}
}


function init ( ) {

	var items = document.querySelectorAll('ul li');

	for (var i = 0; i < items.length; i++ ) {
		bindObject(items[i]);

	}
	
}




document.onload = init();





