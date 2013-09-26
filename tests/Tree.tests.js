describe("Testing tree data structure", function() {
    it("should create a node",function(){
        var rootNode = TreeNode();
        rootNode
            .setParent(rootNode)
            .setBoard([6,7,5,2,0,4,8,3,1]);
        expect(rootNode.getParent()).toEqual( rootNode );
        expect(rootNode.getChildren()).not.toBeDefined();
        expect(rootNode.getBoard()).toEqual( [6,7,5,2,0,4,8,3,1] );
    });
    it("should create siblings that know their parent",function(){
        var rootNode = TreeNode();
        rootNode
            .setParent(rootNode)
            .setBoard([6,7,5,2,0,4,8,3,1]);
        var node1 = TreeNode().setParent(rootNode).setBoard([6,0,5,2,7,4,8,3,1]),
            node2 = TreeNode().setParent(rootNode).setBoard([6,7,5,0,2,4,8,3,1]),
            node3 = TreeNode().setParent(rootNode).setBoard([6,7,5,2,4,0,8,3,1]),
            node4 = TreeNode().setParent(rootNode).setBoard([6,7,5,2,3,4,8,0,1]);

        rootNode.setChildren([node1,node2,node3,node4]);
        expect(rootNode.getChildren()[0].getBoard()).toEqual([6,0,5,2,7,4,8,3,1]);
        expect(rootNode.getChildren()[1].getBoard()).toEqual([6,7,5,0,2,4,8,3,1]);
        expect(rootNode.getChildren()[2].getBoard()).toEqual([6,7,5,2,4,0,8,3,1]);
        expect(rootNode.getChildren()[3].getBoard()).toEqual([6,7,5,2,3,4,8,0,1]);
        
        expect(node1.getParent()).toEqual( rootNode );
        expect(node2.getParent()).toEqual( rootNode );
        expect(node3.getParent()).toEqual( rootNode );
        expect(node4.getParent()).toEqual( rootNode );

    });
});
