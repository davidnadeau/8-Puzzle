window.UninformedSearch = (function(){
    "using strict"
    
    return {
        breadthFirst: function( start, goal ) {
            var rootNode = new Tree,solution=[];
            var solved;
            var prevMoves = [];
            return {

                init: function( ) {

                    rootNode.board = start;rootNode.parent=rootNode;rootNode.siblings=[rootNode];rootNode.id="root";
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
                    var num=0,newMoves, treeNode, siblings = [], seen = [];
                    var lastindex;
                    var a=0;
                    // seen[0]=rootNode.board;
                    dfs([rootNode]);
                    function dfs(currentMove){
                        siblings = [];
                        siblings.length = 0;
                        for(var q=0;q<currentMove.length;q++){
                            a++;
                            if(a>150000){console.log(currentMove[q]);solved=true}
                            newMoves = Puzzle.getValidMoves( currentMove[q].board );
                            //console.log("move list",newMoves);
                            for(var i =0;i<newMoves.length;i++) {
                                if(solved){
                                    return this;
                                }

                                treeNode=new Tree;
                                treeNode.parent=currentMove[q];
                                treeNode.board=newMoves[i];
                                treeNode.id="board number: "+num++;
                                treeNode.siblings = siblings;

                                currentMove[q].children.push(treeNode);
                                lastindex = currentMove[q].children.length-1;
                                siblings.push(currentMove[q].children[lastindex]);
                                if(Puzzle.tilesIdentical(newMoves[i],goal)){
                                    console.log("SOLUTION FOUND");                            
                                    solved=true;
                                }else if(Puzzle.tilesIdentical(newMoves[i],start)){
                                    siblings.pop();
                                }else if(seenBefore(newMoves[i])){
                                    siblings.pop();
                                }else{
                                    seen.push(newMoves[i]);
                                }
                            }
                        }
                        console.log(siblings.length);
                        if(siblings.length>0){
                            dfs(siblings);
                        }
                        console.log(rootNode);
                        // for(var i = 0; i<currentMove.parent.siblings.length;i++){
                        //     for(var j =0;j<currentMove.children.length;j++){
                        //         //if(j>100){console.log(currentMove);return;}
                        //         siblings.push(currentMove.parent.siblings[i].children[j]);
                        //         currentMove.children[j].siblings = siblings;
                        //     }
                        // }
                        // console.log(currentMove);
                        // if(a>2)return;
                        // for(var i = 0; i<currentMove.children[0].siblings.length;i++){
                        //     var newMove = currentMove.children[0].siblings[i];
                        //     dfs(newMove);
                        // }
                    }
                    //console.log(rootNode);
                        // for(var i =0;i<newMoves.length;i++) {
                        //     treeNode=new Tree;
                        //     treeNode.parent=currentMove;treeNode.board=newMoves[i];
                        //     treeNode.id="move number: "+j++;
                            
                        //     if( Puzzle.tilesIdentical(newMoves[i],goal) ) {
                                //solved=true;
                                //console.log("SOLUTION FOUND");
                                // currentMove.children = treeNode;
                                // siblings.push(treeNode);
                                // treeNode.parent.children.push(treeNode);
                                // var solution = [];
                                // while(true){
                                //     if(treeNode.parent !== treeNode){
                                //         solution.unshift(treeNode);
                                //         treeNode = treeNode.parent;
                                //     }else break;
                                // }
                                // return this;
                            // }
                            // else if(Puzzle.tilesIdentical(newMoves[i],start)){}
                            // else if (seenBefore(newMoves[i])){}
                            // else {
                            //     seen.push(newMoves[i]);
                            //     siblings.push(treeNode);
                            //     treeNode.parent.children.push(treeNode);
                            //     //console.log(treeNode.parent);
                            //     setSiblings(treeNode);
                            //     dfs(treeNode);
                            // }
                       // }
                    function seenBefore(node){
                        for(var i =0;i<seen.length;i++){
                            if(Puzzle.tilesIdentical(node,seen[i]))return true;
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