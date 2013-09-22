window.Puzzle = (function(){
    "using strict"
    var oldOffset =  { left:10, top:10 },
        goalState =  [0,1,2,3,4,5,6,7,8];

    return {
        init: function() {

            $('.draggable').draggable( {
                containment:  '#puzzle',  //keep tile within puzzle
                cursor:       'move',     //change cursor on drag
                snap:         '#row td',  //snap tile to puzzle grid
                stack:        '#row td',  //display active tile above puzzle
                revert:       true,       //revert drag by default
                distance:     0,
                start:        onDrag
            });

            $('.draggable').droppable( {
                accept:     '#row td',
                cursor:       'arrow',     //change cursor back to default on drop
                hoverClass: 'hovered',
                drop:       onDrop
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
                    // console.log("WINNER");
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
            return ydisplacement<150 && xdisplacement<150;
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
        checkGameState: function() {
            var 
                padding = 15,
                tileSideLength  = $('#tile0').width()+padding;

            for(var i=0;i<9;i++){
                var
                    dx = Puzzle.approximately( $('#tile'+goalState[i]).offset().left, ( i%3 )*tileSideLength ),
                    dy = Puzzle.approximately( $('#tile'+goalState[i]).offset().top, i<3?0:i<6?tileSideLength:2*tileSideLength );
               
                if(!(dx&&dy)){
                    return false; 
                }
            }
            return true;
        },
        scrambleTiles: function() {
            function getRandomInt (min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            var firstTile, secondTile;
            for(var i = Math.random()*100;i>0;i--){
                firstTile = getRandomInt(0,8);
                secondTile = getRandomInt(0,8);
                Puzzle.swapTiles( firstTile, secondTile );
            }
        },
        //test swap tiles
        swapTiles: function( firstTile, secondTile ){
            var pOne = $('#tile'+ firstTile),
                pTwo = $('#tile'+ secondTile),
                oldOffset = pOne.offset();

            //swap
            pOne.offset( pTwo.offset() );
            pTwo.offset( oldOffset );
        },
        approximately: function( currentPos,origPos ){
            return Math.abs(currentPos-origPos)<20;
        },
        getOldOffset: function(){
            return oldOffset;
        },
        getGoalState: function(){
            return goalState;
        },
        setGoalState: function( newGoalState ){
            goalState = newGoalState;
        },
        getTilePositions: function(){
            var y = 0,
                x = 0;
                originalTilePositions = [];         
            for(var i = 0; i < 9; i++) {
                if((i%3)===0) {y++;}
                
                var el = $( document.elementFromPoint(80*(x%3+1), 80*(y)) ),
                    val = el.context.innerHTML || 0;
                originalTilePositions.push(+val);
                x++;
                
            }
            return originalTilePositions;
        },
        tilesIdentical: function(a, b) {
            var i = a.length;

            while (i--) {
                if (a[i] !== b[i]) return false;
            }
            return true;
        }
        //,
        // formatMoveList: function( movelist ) {
        //     var list = "<h1>Move List</h1><p>";
        //     for(var i = 0; i < movelist.length; i++){
        //         if(i!==0 && i%3 === 0){list += "<br />";}
        //         list += movelist[i];
        //     }
        //     return list + "</p>";
        // }

    }
})();