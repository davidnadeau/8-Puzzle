describe("Puzzle Game ... ", function() {

  beforeEach(function(){
    jasmine.getFixtures().set(
    '<table id="puzzle" style="height:300px;width:300px;">	'+
			'<tr id="row" style="height:33%">'+
				'<td id = "tile0" style = "width:33%" class = "draggable"></td>'+
				'<td id = "tile1" style = "width:33%" class = "draggable">1</td>'+
				'<td id = "tile2" style = "width:33%" class = "draggable">2</td>'+
			'</tr>'+
			'<tr id="row" style="height:33%">'+
				'<td id = "tile3" style = "width:33%" class = "draggable">3</td>'+
				'<td id = "tile4" style = "width:33%" class = "draggable">4</td>'+
				'<td id = "tile5" style = "width:33%" class = "draggable">5</td>'+
			'</tr>'+
			'<tr id="row" style="height:33%">'+
				'<td id = "tile6" style = "width:33%" class = "draggable">6</td>'+
				'<td id = "tile7" style = "width:33%" class = "draggable">7</td>'+
				'<td id = "tile8" style = "width:33%" class = "draggable">8</td>'+
			'</tr>'+
		'</table>' );

    Puzzle.init();
  });

	describe("when starting the game", function() {

		it("should set each tile to be draggable", function() {
			expect($('.draggable').draggable( "option", "disabled" )).toEqual( false );
		});

		it("should set each tile to be droppable", function() {
			expect($('.draggable').droppable( "option", "disabled" )).toEqual( false );
		});
		
	});

	describe("when checking a move", function() {

		it("should store the start position of the tile being dragged", function() {
			var 
				oldOffset = Puzzle.oldOffset,
				el = $("#tile3");
			
			el.draggable();

			el.simulate( "drag", {
				dx: 0,
				dy: 0
			});
			expect(Puzzle.oldOffset.top).toEqual( 109 );
			expect(Puzzle.oldOffset.left).toEqual( 10 );
		});
		
		it("should ensure that the displacement is at most one tile on drop", function() {
			expect(Puzzle.validDisplacement( 100, 100 )).toEqual( false );
			expect(Puzzle.validDisplacement( 99, 100 )).toEqual( true );
			expect(Puzzle.validDisplacement( 100, 99 )).toEqual( true);
			expect(Puzzle.validDisplacement( 99, 99 )).toEqual( true);
		});

		it("should ensure that the tile can only move up or down", function() {
			expect(Puzzle.validDirection( 1, 1 )).toEqual( false );
			expect(Puzzle.validDirection( 1, 0 )).toEqual( true );
			expect(Puzzle.validDirection( 0, 1 )).toEqual( true);
			expect(Puzzle.validDirection( 0, 0 )).toEqual( true)		});
		
		it("should ensure that the droppee is the blank tile", function() {
			expect(Puzzle.isBlank( "tile3" )).toEqual( false );
			expect(Puzzle.isBlank( "tile0" )).toEqual( true );
		});

	});
	describe("when checking the position of a tile it", function() {

		it("should return true if within 10 pixels of correct position", function() {
			expect(Puzzle.approximately(0, 9)).toEqual( true );
			expect(Puzzle.approximately(9, 0)).toEqual( true );
			expect(Puzzle.approximately(0, 10)).toEqual( false );
			expect(Puzzle.approximately(10, 0)).toEqual( false );
		});

		it("should get the absolute difference between two numbers", function() {
			expect(Puzzle.getDifference(10, -10)).toEqual( 20 );
			expect(Puzzle.getDifference(-123, 100)).toEqual( 223 );
			expect(Puzzle.getDifference(109, 10)).toEqual( 99 );
		});

	});

	describe("on a valid move", function() {

		var draggable, droppable, droppableOffset, draggableOffset;

		beforeEach(function() {
		  draggable = $( "#tile3" ).draggable();
			droppable = $( "#tile0" ).droppable();

			droppableOffset = droppable.offset();
			draggableOffset = draggable.offset();

			var
				dx = droppableOffset.left - draggableOffset.left,
				dy = droppableOffset.top - draggableOffset.top;

			draggable.simulate( "drag", {
				dx: dx,
				dy: dy
			});
		});

		it("the draggable and droppable tiles should switch offsets", function() {
			expect(draggable.offset().top).toEqual( droppableOffset.top );
		  expect(draggable.offset().left).toEqual( droppableOffset.left );
		  expect(droppable.offset().top).toEqual( draggableOffset.top );
		  expect(droppable.offset().left).toEqual( draggableOffset.left );
		});

		it("check the order of the tiles", function() {

			//0 and 3 are out of order
			expect(Puzzle.checkGameState()).toEqual( false );

			//swap offsets,
			//before swap store old draggable position 
			//winning state --> losing state ( tile swap )
			draggable.simulate( "drag", {
				dx: 0,
				dy: 0
			});

			draggable.offset( droppable.offset() );
		  droppable.offset( Puzzle.oldOffset );

		  //0 and 3 have been correct
			expect(Puzzle.checkGameState()).toEqual( true );

		});

	});

});