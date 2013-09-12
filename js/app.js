$( init );
 $(document).ready(function(){
 	for(var i = Math.random()*100;i>0;i--){
 		scramblePuzzle();
 	}
})
function init() {

	var oldOffset = {x:0,y:0};

	$('.draggable').draggable( {
		containment: '#puzzle',
    	cursor: 	'move',
    	snap: 		'#row td',
    	stack: 		'#row td',
    	revert:     true, 
    	start: 		onClick

 	});
	
	$('.draggable').droppable( {
	  	accept: '#row td',
	  	hoverClass: 'hovered',
	  	drop: onDrop
	});
	
	function onDrop( event, ui ) {
		var that = this;

		function validMove(){
			var ydisplacement = Math.abs(oldOffset.y - $(that).context.offsetTop);
			var xdisplacement = Math.abs(oldOffset.x - $(that).context.offsetLeft);

			if( (ydisplacement===99 || xdisplacement===99) && 
				ydisplacement !== xdisplacement  &&
				$(that).context.id === "tileB" ) 
					return true;
			
			else	return false;
		}
		if ( validMove() ) {
		    ui.draggable.draggable( 'option', 'revert', false );
		    ui.draggable.position( { of: $(that), my: 'left top', at: 'left top' } );
	  	    $(that).offset({ top: oldOffset.y, left: oldOffset.x});
	  	}
	}
	function onClick( event ) {
		oldOffset.y = $(this).context.offsetTop;
  	    oldOffset.x = $(this).context.offsetLeft;
	    $(this).draggable( 'option', 'revert', true );

	}
}

function scramblePuzzle(){
	function getRandomInt (min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	var firstTile = getRandomInt(1,9);

	var secondTile = getRandomInt(1,9);

	var pOne = $('#tile'+ firstTile);
	var pTwo = $('#tile'+ secondTile);

	var oldOffset = pOne.offset();
	
	// console.log( pOne[0].id,"- ",pOne.offset(),": ", pTwo[0].id,"- ",pTwo.offset());
	// console.log( oldOffset );

	pOne.offset( pTwo.offset() );
	// console.log( oldOffset );
	pTwo.offset( oldOffset );

	// console.log( pOne[0].id,"- ",pOne.offset(),": ", pTwo[0].id,"- ",pTwo.offset());

}