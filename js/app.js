//(function() {
"using strict"
window.Puzzle = {

	oldOffset: {left:10, top:10},

	init: function() {

		$('.draggable').draggable( {
			containment: 	'#puzzle', 	//keep tile within puzzle
			cursor: 	 'move',	 	//change cursor on drag
			snap: 		 '#row td',		//snap tile to puzzle grid
			stack: 		 '#row td',		//display active tile above puzzle
			revert:    	 true,			//revert drag by default
			distance: 	 0,
			start: 		 onDrag

	 	});

		$('.draggable').droppable( {
		  	accept: 	'#row td',
		  	hoverClass: 	'hovered',
		  	drop: 		onDrop
		});
	
		function onDrag( event, ui ) {
	    Puzzle.oldOffset.top = ui.offset.top;
		  Puzzle.oldOffset.left = ui.offset.left;
		  $(this).draggable( 'option', 'revert', true );
		}

		function onDrop( event, ui ) {			

			if ( Puzzle.validMove( $(this) ) ) {
			    ui.draggable.draggable( 'option', 'revert', false );
			    $(this).offset(Puzzle.oldOffset);
		  	}else{
		  		//console.log("NOPE");
		  	}

			Puzzle.checkGameState();
		}
	},
	
  validMove: function( tile ) {
		var ydisplacement = Puzzle.getDifference(Puzzle.oldOffset.top, tile.offset().top),
				xdisplacement = Puzzle.getDifference(Puzzle.oldOffset.left,tile.offset().left);
		/* valid move conditions */
		var a = Puzzle.validDisplacement( ydisplacement, xdisplacement ),
		//vertical xor horizontal move
			b = Puzzle.validDirection( ydisplacement, xdisplacement),
		//moving onto the blank tile
			c = Puzzle.isBlank(tile.context.id);
		return (a&&b&&c)?true:false;
	},

	validDisplacement: function( ydisplacement, xdisplacement ) {
		return ydisplacement===99 || xdisplacement===99;
	},
	validDirection: function( ydisplacement, xdisplacement ) {
		return ydisplacement===0  || xdisplacement===0;
	},
	isBlank: function( tile ) {
		return tile === "tile0";
	},

	getDifference: function( x, y ) {
		return Math.abs(x - y);
	},
	
	checkGameState: function(){
		var padding = 10;
		var width  = $('#tile0').width(),
			height = $('#tile0').height();


		for(var i=0;i<9;i++){
			var a = Puzzle.approximately($('#tile'+i).offset().left - padding, 
				(i%3)*width),
				b = Puzzle.approximately($('#tile'+i).offset().top - padding, 
					i<4?0:i<7?height:2*height);
		
			if(!(a&&b)){
				return false;	
			}
		}
		console.log("YOU WIN!!");
		return true;

	},

	approximately: function( currentPos,origPos ){
		return Math.abs(currentPos-origPos)<10;
	}

};
 // Puzzle.init();
//})();