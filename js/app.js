//(function() {
"using strict"
window.Puzzle = {

	oldOffset: {left:10, top:10},

	init: function() {

		var that = this;

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
		    that.oldOffset.top = ui.offset.top;
	  	    that.oldOffset.left = ui.offset.left;
		    $(this).draggable( 'option', 'revert', true );
		}

		function onDrop( event, ui ) {
			if ( that.validMove( ui.draggable ) ) {
			    ui.draggable.draggable( 'option', 'revert', false );
			    that.swapTiles(ui.draggable, $(this));
		  	}else{
		  		//console.log("NOPE");
		  	}

			that.checkGameState();
		}
	},
	
  	validMove: function( tile ) {
		var ydisplacement = Math.abs(this.oldOffset.top - tile.offsetTop),
			xdisplacement = Math.abs(this.oldOffset.left - tile.offsetLeft);

		/* valid move conditions */
		//only moving 1 tile
		var a = ydisplacement===99 || xdisplacement===99,
		//vertical xor horizontal move
			b = ydisplacement===0  || xdisplacement===0,
		//moving onto the blank tile
			c = tile.context.id === "tile9";

		return (a&&b&&c)?true:false;
	},

	swapTiles: function( dropper, droppee ){
		dropper.offset( droppee.offset() );
		droppee.offset( this.oldOffset );
	},

	checkGameState: function(){
		var padding = 10;
		var width  = $('#tile1').width(),
			height = $('#tile1').height();


		for(var i=0;i<9;i++){
			var a = this.about($('#tile'+i).offset().left - padding, 
				(i%3)*width),
				b = this.about($('#tile'+i).offset().top - padding, 
					i<4?0:i<7?height:2*height);
		
			if(!(a&&b)){
				return false;	
			}
		}
		console.log("YOU WIN!!");
		return true;

	},

	about: function( currentPos,origPos ){
		return Math.abs(currentPos-origPos)<10;
	}

};
 // Puzzle.init();
//})();