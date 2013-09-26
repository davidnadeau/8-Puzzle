window.UninformedSearch = (function(){
    "using strict"
    
    return {
        breadthFirst: function( start, goal ) {
            var rootNode = TreeNode(),solution=[];
            var solved;
            var prevMoves = [];
            return {

                init: function( ) {
                    rootNode.setBoard(start).setParent(rootNode);
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
                    newMoves = Puzzle.getValidMoves( rootNode.getBoard() );

                    for(var i =0;i<newMoves.length;i++) {
                        treeNode=TreeNode().setParent(rootNode).setBoard(newMoves[i]).setSiblings(siblings);
                        siblings.push(treeNode);
                    }
                    rootNode.setChildren(siblings);

                    currentMove = rootNode;
                    while(!solved) {
                        // prevMoves.push(currentMove);
                        // solution.push(currentMove);
                //newMoves = Puzzle.getValidMoves( currentMove.getBoard() );
                        //console.log(currentMove);
                        var childrenNodes = [];
                        for(var i =0;i<newMoves.length;i++) {
                            treeNode=TreeNode().setParent(currentMove).setBoard(newMoves[i]);
                            //console.log(treeNode);
                            // console.log(newMoves[i]);
                            //moves.push(newMoves[i]);
                            // console.log(moves);
                            if( Puzzle.tilesIdentical(newMoves[i],goal) ) {
                                // solution.push(newMoves[i]);
                                solved=true;
                                console.log("SOLUTION FOUND");
                                currentMove.setChildren(treeNode);
                                console.log(rootNode);
                                break;
                            }else if(Puzzle.tilesIdentical(newMoves[i],start)){

                                //moves.pop();
                            }else if(seenBefore(newMoves[i])){}
                            else{
                                childrenNodes.push(treeNode);
                            }
                        }
                        currentMove.setChildren(childrenNodes)
                        //console.log(currentMove);
                        j++
                        if(j>181400)return [1,1];
                        if(solved)break;

                        currentMove = moves.splice(0,1)[0];
                    }
                    function seenBefore(node){
                        for(var i =0;i<prevMoves.length;i++){
                            if(Puzzle.tilesIdentical(node,prevMoves[i]))return true;
                        }return false;
                    }                    
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
                    function recurse(){

                    }
                }
            }
        }
    };
})();