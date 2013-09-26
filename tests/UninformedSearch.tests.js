describe("Uninformed Search ... ", function() {
    beforeEach(function() {
      Puzzle.init();
    });
    describe("when using breadth first search", function() {
        it("it should slide the tiles into the goal state", function() {});
        it("it should solve the puzzle", function() {
            // expect(UninformedSearch.breadthFirst([1,0,2,3,4,5,6,7,8], 
            //     [0,1,2,3,4,5,6,7,8]).buildQueue()).toEqual([0,1,2,3,4,5,6,7,8]);
            // expect(UninformedSearch.breadthFirst([1,2,0,3,4,5,6,7,8], 
            //     [0,1,2,3,4,5,6,7,8]).init().buildQueue()).toEqual([0,1,2,3,4,5,6,7,8]);
            // expect(UninformedSearch.breadthFirst([1,4,2,6,5,8,7,3,0], 
            //     [0,1,2,3,4,5,6,7,8]).init().buildQueue()).toEqual([0,1,2,3,4,5,6,7,8]);

            // expect(UninformedSearch.breadthFirst([1,4,5,7,6,3,0,2,8], 
            //     [0,1,2,3,4,5,6,7,8]).init().buildQueue()).toEqual([0,1,2,3,4,5,6,7,8]);
            // expect(UninformedSearch.breadthFirst([3,5,2,6,8,1,0,7,4], 
            //     [0,1,2,3,4,5,6,7,8]).init().buildQueue()).toEqual([0,1,2,3,4,5,6,7,8]);
        });
    });
});