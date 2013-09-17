(function(){
"using strict";

$(document).ready(function(){
	$( init );
	for(var i = Math.random()*100;i>0;i--){
		//swapTiles();
	}
})

function init() {

	var oldOffset = {x:0,y:0};

	$('.draggable').draggable( {
		containment: 	'#puzzle',
		cursor: 	 'move',
		snap: 		 '#row td',
		stack: 		 '#row td',
		revert:    	 true, 
		start: 		 onClick

 	});
	
	$('.draggable').droppable( {
	  	accept: 	'#row td',
	  	hoverClass: 	'hovered',
	  	drop: 		onDrop
	});
	
	function onDrop( event, ui ) {
		//js bug in ecmascript, this points to global object (window) for inner functions
		var that = this;

		if ( validMove() ) {
		    ui.draggable.draggable( 'option', 'revert', false );
		    ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
	  	    $(this).offset({ top: oldOffset.y, left: oldOffset.x});
	  	}

	  	function validMove(){
			var ydisplacement = Math.abs(oldOffset.y - $(that).context.offsetTop),
				xdisplacement = Math.abs(oldOffset.x - $(that).context.offsetLeft);

			/* valid move conditions */
			//only moving 1 tile
			var a = ydisplacement===99 || xdisplacement===99,
			//vertical xor horizontal move
				b = ydisplacement===0  || xdisplacement===0,
			//moving onto the blank tile
				c = $(that).context.id === "tile9";

			return (a&&b&&c)?true:false;
		}

		if(checkGameState()){
			console.log("YOU WIN!!");
		}
	}

	function onClick( event ) {
	    oldOffset.y = $(this).context.offsetTop;
  	    oldOffset.x = $(this).context.offsetLeft;
	    $(this).draggable( 'option', 'revert', true );

	}
}

function swapTiles(){

	var firstTile = getRandomInt(1,9),
		secondTile = getRandomInt(1,9);

	var pOne = $('#tile'+ firstTile),
		pTwo = $('#tile'+ secondTile);

	//swap
	var oldOffset = pOne.offset();
	pOne.offset( pTwo.offset() );
	pTwo.offset( oldOffset );

	function getRandomInt (min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}

function checkGameState(){
	var padding = 10;
	var width  = $('#tile1').width(),
		height = $('#tile1').height();


	for(var i=1;i<10;i++){
		var a = about($('#tile'+i).offset().left - padding, 
			((i-1)%3)*width),
			b = about($('#tile'+i).offset().top - padding, 
				i<4?0:i<7?height:2*height);
	
		if(!(a&&b)){
			return false;	
		}
	}
	return true;

}

function about(currentPos,origPos){
	return Math.abs(currentPos-origPos)<10;
}

})();