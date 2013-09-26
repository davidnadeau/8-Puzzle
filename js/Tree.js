window.TreeNode = function(){
    "using strict"
    var parent,children,board,siblings;

    return {
        getParent: function(){return parent;},
        getChildren: function(){return children;},
        getChild: function(i){return children[i];},
        getSiblings: function(){return siblings;},
        getSibling: function(i){return siblings[i];},
        getBoard: function(){return board;},
        setParent: function(parentNode){parent=parentNode;return this;},
        setChildren: function(childrenList){children=childrenList;return this;},
        setSiblings: function(siblingList){siblings=siblingList;return this;},
        setBoard: function(gameBoard){board=gameBoard;return this;}
    }
};