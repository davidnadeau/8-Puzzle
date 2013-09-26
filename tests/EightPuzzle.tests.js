describe("Puzzle Game ... ", function() {
    beforeEach(function(){
        jasmine.getFixtures().set(
            '<table id="puzzle" style="height:300px;width:300px;">  '+
              '<tr id="row" style="height:33.33333333333333%%">'+
                '<td id = "tile0" style = "width:33.33333333333333%%" class = "draggable"></td>'+
                '<td id = "tile1" style = "width:33.33333333333333%%" class = "draggable">1</td>'+
                '<td id = "tile2" style = "width:33.33333333333333%%" class = "draggable">2</td>'+
              '</tr>'+
              '<tr id="row" style="height:33.33333333333333%%">'+
                '<td id = "tile3" style = "width:33.33333333333333%%" class = "draggable">3</td>'+
                '<td id = "tile4" style = "width:33.33333333333333%%" class = "draggable">4</td>'+
                '<td id = "tile5" style = "width:33.33333333333333%%" class = "draggable">5</td>'+
              '</tr>'+
              '<tr id="row" style="height:33.33333333333333%%">'+
                '<td id = "tile6" style = "width:33.33333333333333%%" class = "draggable">6</td>'+
                '<td id = "tile7" style = "width:33.33333333333333%%" class = "draggable">7</td>'+
                '<td id = "tile8" style = "width:33.33333333333333%%" class = "draggable">8</td>'+
              '</tr>'+
            '</table>' 
        );

        Puzzle.init();
    });

    describe("when starting the game", function() {
        it("should set each tile to be draggable", function() {
            expect($('.draggable').draggable( "option", "disabled" )).toEqual( false );
        });

        it("should set each tile to be droppable", function() {
            expect($('.draggable').droppable( "option", "disabled" )).toEqual( false );
        });

        it("should scramble the tiles", function() {
            var originalPosition, newPositions;

            originalPositions = Puzzle.getTilePositions();
            Puzzle.scrambleTiles();
            newPositions = Puzzle.getTilePositions();
            expect(Puzzle.tilesIdentical(originalPositions, newPositions)).toBe( false );
        });
        it("should compare two boards",function(){
            expect(Puzzle.tilesIdentical([],[])).toBe( true );
            expect(Puzzle.tilesIdentical([0,1,2,3,4,5,6,7,8],[])).toBe( false );
            expect(Puzzle.tilesIdentical([],[0,1,2,3,4,5,6,7,8])).toBe( false );
            expect(Puzzle.tilesIdentical([0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8])).toBe( true );
            expect(Puzzle.tilesIdentical([0,2,1,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8])).toBe( false );
            expect(Puzzle.tilesIdentical([0,1,2,3,4,5,6,7,8],[0,2,1,3,4,5,6,7,8])).toBe( false );
        });
        it("should swap two tiles", function() {
            var firstTile = $("#tile3"),
                secondTile =  $("#tile8"),
                firstTileOffset = {top:firstTile.offset().top,left:firstTile.offset().left},
                secondTileOffset = {top:secondTile.offset().top,left:secondTile.offset().left};

            Puzzle.swapTiles(firstTile.selector.slice(-1), secondTile.selector.slice(-1));
            
            expect( firstTile.offset() ).toEqual( secondTileOffset );
            expect( secondTile.offset()).toEqual( firstTileOffset ); 
        });
    });

    describe("when checking a move", function() {
        it("should store the start position of the tile being dragged", function() {
            var 
                oldOffset = oldOffset,
                el = $("#tile3");
            
            el.draggable();
            el.simulate( "drag", {
                dx: 0,
                dy: 0
            });

            expect(Puzzle.getOldOffset().top).toEqual( 110 );
            expect(Puzzle.getOldOffset().left).toEqual( 10 );
        });
      
        it("should ensure that the displacement is at most one tile on drop", function() {
            expect(Puzzle.validDisplacement( 150, 150 )).toEqual( false );
            expect(Puzzle.validDisplacement( 150, 100 )).toEqual( false );
            expect(Puzzle.validDisplacement( 100, 150 )).toEqual( false);
            expect(Puzzle.validDisplacement( 100, 100 )).toEqual( true);
        });

        it("should ensure that the tile can only move up or down", function() {
            expect(Puzzle.validDirection( 1, 1 )).toEqual( false );
            expect(Puzzle.validDirection( 1, 0 )).toEqual( true );
            expect(Puzzle.validDirection( 0, 1 )).toEqual( true);
            expect(Puzzle.validDirection( 0, 0 )).toEqual( true)
        });
        
        it("should ensure that the droppee is the blank tile", function() {
            expect(Puzzle.isBlank( "tile3" )).toEqual( false );
            expect(Puzzle.isBlank( "tile0" )).toEqual( true );
        });
    });

    describe("when checking the position of a tile it", function() {
        it("should return true if within 15 pixels of correct position", function() {
            expect(Puzzle.approximately(0, 19)).toEqual( true );
            expect(Puzzle.approximately(19, 0)).toEqual( true );
            expect(Puzzle.approximately(0, 20)).toEqual( false );
            expect(Puzzle.approximately(20, 0)).toEqual( false );
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
            droppable.offset( Puzzle.getOldOffset() );

            //0 and 3 have been corrected
            expect(Puzzle.checkGameState()).toEqual( true );
        });
    });

    describe("when handling goal states", function() {
        beforeEach(function() {
            Puzzle.init();
            Puzzle.setGoalState([0,1,2,3,4,5,6,7,8]);
        });

        it("should set the goalState", function() {
            expect( Puzzle.getGoalState() ).toEqual( [0,1,2,3,4,5,6,7,8] );
        });

        it("should gather the position of all the tiles into an array", function(){
            expect(Puzzle.getTilePositions()).not.toEqual(  [1,4,2,3,5,8,6,7,0] );
            dragonDrop("#tile1","#tile0");
            dragonDrop("#tile4","#tile0");
            dragonDrop("#tile5","#tile0");
            dragonDrop("#tile8","#tile0");
            expect(Puzzle.getTilePositions()).toEqual(  [1,4,2,3,5,8,6,7,0] );
        });

        it("it should handle any legal goal state", function() {
            expect(Puzzle.checkGameState()).toEqual( true );

            Puzzle.setGoalState([1,4,2,3,5,8,6,7,0]);
            expect(Puzzle.checkGameState()).toEqual( false );

            dragonDrop("#tile1","#tile0");
            dragonDrop("#tile4","#tile0");
            dragonDrop("#tile5","#tile0");
            dragonDrop("#tile8","#tile0");
            expect(Puzzle.checkGameState()).toEqual( true );
        });

        it("it should calculate the number of inversions", function(){
            expect(Puzzle.detectInversions([0,1,2,3,4,5,6,7,8])).toEqual( 0 );
            expect(Puzzle.detectInversions([1,0,2,3,4,5,6,7,8])).toEqual( 0 );
            expect(Puzzle.detectInversions([0,1,2,6,4,5,3,7,8])).toEqual( 5 );
            expect(Puzzle.detectInversions([1,0,3,4,2,5,7,8,6])).toEqual( 4 );
            expect(Puzzle.detectInversions([7,0,2,8,5,3,6,4,1])).toEqual( 19 );
        });
        
        function dragonDrop(drag, drop){
            var draggable, droppable, droppableOffset, draggableOffset;

            draggable = $( drag ).draggable();
            droppable = $( drop ).droppable();
            droppableOffset = droppable.offset();
            draggableOffset = draggable.offset();
            
            var
                dx = droppableOffset.left - draggableOffset.left,
                dy = droppableOffset.top - draggableOffset.top;

            draggable.simulate( "drag", {
                dx: dx,
                dy: dy
            });
        }
    });
});