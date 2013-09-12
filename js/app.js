$(document).ready(function(){
	$( init );
	for(var i = Math.random()*100;i>0;i--){
		swapTiles();
	}
})

function init() {

	var oldOffset = {x:0,y:0};

	$('.draggable').draggable( {
		containment: '#puzzle',
		cursor: 	 'move',
		snap: 		 '#row td',
		stack: 		 '#row td',
		revert:    	 true, 
		start: 		 onClick

 	});
	
	$('.draggable').droppable( {
	  	accept: 	'#row td',
	  	hoverClass: 'hovered',
	  	drop: 		onDrop
	});
	
	function onDrop( event, ui ) {
		//js bug in ecmascript, this points to global object (window) for inner functions
		var that = this;

		function validMove(){
			var ydisplacement = Math.abs(oldOffset.y - $(that).context.offsetTop);
			var xdisplacement = Math.abs(oldOffset.x - $(that).context.offsetLeft);

			//only moving 1 tile
			var a = ydisplacement===99 || xdisplacement===99;
			//vertical xor horizontal move
			var b = ydisplacement===0  || xdisplacement===0;
			//moving onto the blank tile
			var c = $(that).context.id === "tile9";

			return (a&&b&&c)?true:false;
		}

		if ( validMove() ) {
		    ui.draggable.draggable( 'option', 'revert', false );
		    ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
	  	    $(this).offset({ top: oldOffset.y, left: oldOffset.x});
	  	}
	}

	function onClick( event ) {
	    oldOffset.y = $(this).context.offsetTop;
  	    oldOffset.x = $(this).context.offsetLeft;
	    $(this).draggable( 'option', 'revert', true );

	}
}

function swapTiles(){
	function getRandomInt (min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	var firstTile = getRandomInt(1,9);

	var secondTile = getRandomInt(1,9);

	var pOne = $('#tile'+ firstTile);
	var pTwo = $('#tile'+ secondTile);

	//swap
	var oldOffset = pOne.offset();
	pOne.offset( pTwo.offset() );
	pTwo.offset( oldOffset );


}
