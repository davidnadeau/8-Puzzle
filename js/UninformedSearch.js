window.UninformedSearch = (function(){
    "using strict"
    
    return {
        breadthFirst: function( start, goal ) {
            var rootNode = new Tree,solution=[];
            var solved;
            var prevMoves = [];
            return {

                init: function( ) {

                    rootNode.board = start;rootNode.parent=rootNode;rootNode.id="root";
                    solved=false;
                    solution.length=0;
                    console.log("From:",start,"To",goal);
                    if((Puzzle.detectInversions(start)%2 )=== 1){
                        console.log("Can't be solved",Puzzle.detectInversions(start),Puzzle.detectInversions(goal));
                        solved=true;
                    }
                    if(Puzzle.tilesIdentical(start,goal)){
                        console.log("Already Solved");
                        solved = true;
                    }
                    return this;                

                },
                buildQueue: function( ) {
                    var j=0,newMoves, treeNode, siblings = [];
                    dfs(rootNode);
                    //while(!solved) {
                    function dfs(currentMove){
                        if(solved)return this;
                        var siblings = [];

                        newMoves = Puzzle.getValidMoves( currentMove.board );

                        for(var i =0;i<newMoves.length;i++) {
                            treeNode=new Tree;
                            treeNode.parent=currentMove;treeNode.board=newMoves[i];treeNode.siblings=siblings;
                            treeNode.id="move number: "+j++;

                            if( Puzzle.tilesIdentical(newMoves[i],goal) ) {
                                solved=true;
                                console.log("SOLUTION FOUND");
                                currentMove.children = treeNode;
                                siblings.push(treeNode);
                                treeNode.parent.children = siblings;
                                var solution = [];
                                while(true){
                                    if(treeNode.parent !== treeNode){
                                        solution.unshift(treeNode);
                                        treeNode = treeNode.parent;
                                    }else break;
                                }
                                console.log(solution);
                                return this;
                            }else if(Puzzle.tilesIdentical(newMoves[i],start)){
                            }else{
                                siblings.push(treeNode);
                                treeNode.parent.children=siblings;
                                dfs(treeNode);
                            }
                        }
                    }
                    function seenBefore(node){
                        for(var i =0;i<prevMoves.length;i++){
                            if(Puzzle.tilesIdentical(node,prevMoves[i]))return true;
                        }return false;
                    }
                    return this;                 
                },
                copy: function( arr ){
                        for(var j in arr) {
                            if(arr.hasOwnProperty(j)){
                                 var a = [];
                                 a.length=[arr[j].length];
                    for(var i =0;i<arr[j].length;i++){
                                a[i]=arr[j][i]
                            }
                        }
                    }
                    return a;
                },
                search: function( ) {
                    // var preOrder = [];
                    // DepthFirst( rootNode );
                    // function DepthFirst( root ){
                    //     // Pre-order
                    //     preOrder[ preOrder.length ] = root.board;
                    //     //console.log(rootNode);
                    //     for( var i = 0; i<root.children.length;i++ ){
                    //         child = root.children[i];
                    //         if( Puzzle.tilesIdentical(child.board,goal) ) {
                    //             console.log("preOrder");
                    //             console.log(preOrder);
                    //             console.log(rootNode);
                    //             return;
                    //         }
                    //         DepthFirst( child );
                    //     }
                    // }
                }
            }
        }
    };
})();