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
		'</table>'
    	);
  });

  afterEach(function () {

  });

	describe("when starting the game", function() {

		it("should set the draggable property of each tile to true", function() {
			$('.draggable').draggable();
			expect($('.draggable').draggable( "option", "disabled" )).toEqual( false );
		});

		it("should set the droppable property on each tile", function() {
			$('.draggable').droppable();
			expect($('.draggable').droppable( "option", "disabled" )).toEqual( false );
		});
		
	});

	describe("when checking a move", function() {

		it("should store the start position of the tile being dragged", function() {
			var displacement = 109;

			Puzzle.init();

			expect(Puzzle.oldOffset.top).toEqual( 10 );
			expect(Puzzle.oldOffset.left).toEqual( 10 );

			var el = $("#tile4");
			el.draggable();
			el.simulate( "drag", {
				dx: displacement,
				dy: displacement
			});

			expect(Puzzle.oldOffset.top - displacement).toEqual( 0 );
			expect(Puzzle.oldOffset.left - displacement).toEqual( 0 );
		});

		it("should check if the displacement is at most one tile", function() {
			//onClick, move, onDrop, check distance.
		});
		
		it("should check if the displacement is at most one tile", function() {
			//onClick, move, onDrop, check that direction is !diagonal
		});
		
		it("should check if the displacement is at most one tile", function() {
			//onDrop check if blank tile.
		});

	});

	describe("when checking order of a tile it", function() {

		it("should return true if within 10 pixels of correct position", function() {
			expect(Puzzle.about(0, 9)).toEqual( true );
			expect(Puzzle.about(9, 0)).toEqual( true );
			expect(Puzzle.about(0, 10)).toEqual( false );
			expect(Puzzle.about(10, 0)).toEqual( false );
		});

	});

});