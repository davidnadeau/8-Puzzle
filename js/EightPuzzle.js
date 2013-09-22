window.Puzzle = (function(){
	"using strict"
	var oldOffset =  { left:10, top:10 };

	return {
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
		    oldOffset.top = ui.offset.top;
			  oldOffset.left = ui.offset.left;
			  $(this).draggable( 'option', 'revert', true );
			}

			function onDrop( event, ui ) {			
				if ( Puzzle.validMove($(this)) ) {
				    ui.draggable.draggable( 'option', 'revert', false );

				    //swap tiles
				    ui.draggable.offset($(this).offset());
				    $(this).offset(oldOffset);
			  }

				if( Puzzle.checkGameState() ){
					console.log("WINNER");
				}
			}
		},
	  validMove: function( tile ) {
			var 
				ydisplacement = Puzzle.getDifference(oldOffset.top, tile.offset().top),
				xdisplacement = Puzzle.getDifference(oldOffset.left,tile.offset().left),
				/* valid move conditions */ 
				a = Puzzle.validDisplacement( ydisplacement, xdisplacement ),
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
			var 
				padding = 10,
				tileSideLength  = $('#tile0').width();


			for(var i=0;i<9;i++){
				var
				  a = Puzzle.approximately( $('#tile'+i).offset().left - padding, ( i%3 )*tileSideLength ),
					b = Puzzle.approximately( $('#tile'+i).offset().top - padding, i<3?0:i<6?tileSideLength:2*tileSideLength );
			
				if(!(a&&b)){
					return false;	
				}
			}
			return true;
		},
		approximately: function( currentPos,origPos ){
			return Math.abs(currentPos-origPos)<10;
		},
		getOldOffset: function(){
			return oldOffset;
		}
	}
})();