/*
The definition of the move direction.
*/
var Direction = {
    NONE: 0,
    LEFT: 1,
    UP: 2,
    RIGHT: 3,
    DOWN: 4
};

function NPuzzleNode(v, row_, col_) {
    this.row = row_;
    this.col = col_;
    this.g = 0;          // The distance from the beginning node to the current node
    this.h = 0;          // The distance from the current node to the goal node (heuristic)
    this.parent = null;  // Parent node pointer
    this.direc = null;   // Direction from parent node to this node

    (function(val_, node) {
        if (node.row < 2 || node.col < 2) {
            throw "NPuzzleNode.init(): dimension is at least 2*2";
        }
        if (val_.length != node.row * node.col) {
            throw "NPuzzleNode.init(): value size must equal to (row * col)";
        }
        node.emptyPos = -1;
        for (var i = 0; i < val_.length; ++i) {
            if (val_[i] == 0) {
                node.emptyPos = i;  // Record index of value 0
            }
        }
        if (node.emptyPos == -1) {
            throw "NPuzzleNode.init(): value 0 not found";
        }
        node.val = val_;
    })(v, this);

    /*
    Get the adjacent node at the direction

    @param direc the direction
    @return the adjacent node. If no adjacent node found, return null
    */

    this.getAdjNode = function(direc) {
        var n = new NPuzzleNode(this.val.slice(), this.row, this.col);
        n.move(direc);
        return n;
    }

    /*
    Move the empty grid toward the direction

    @param direc the direction
    */
    this.move = function(direc) {
        var displace;
        switch (direc) {
            case Direction.LEFT:
                displace = -1;
                break;
            case Direction.UP:
                displace = -this.col;
                break;
            case Direction.RIGHT:
                displace = 1;
                break;
            case Direction.DOWN:
                displace = this.col;
                break;
            case Direction.NONE:
            default:
                displace = 0;
                break;
        }
        var goalPos = this.emptyPos + displace;
        var tmp = this.val[this.emptyPos];
        this.val[this.emptyPos] = this.val[goalPos];
        this.val[goalPos] = tmp;
        this.emptyPos = goalPos;
    }

    /*
    Check whether the empty grid can move toward the direction

    @param direc the direction
    @return true if can move, false otherwise
    */
    this.canMove = function(direc) {
        switch (direc) {
            case Direction.LEFT:
                return this.getCol(this.emptyPos) != 0;
            case Direction.UP:
                return this.getRow(this.emptyPos) != 0;
            case Direction.RIGHT:
                return this.getCol(this.emptyPos) != this.col - 1;
            case Direction.DOWN:
                return this.getRow(this.emptyPos) != this.row - 1;
            case Direction.NONE:
                return true;
            default:
                return false;
        }
    }

    /*
    Check if two nodes equal.
    */
    this.equals = function(node) {
        return this.val.toString() == node.val.toString();
    }
    
    this.getRow = function(i) {
        return Math.floor(i / this.col);
    }

    this.getCol = function(i) {
        return Math.floor(i % this.col);
    }

    /*
    Get the f(g + h) value
    */
    this.getF = function() {
        return this.g + this.h;
    }
};

/*
N-Puzzle algorithm class.

@param src_ the start node
@param des_ the goal node
*/
function NPuzzle(src_, des_) {
    this.src = src_;
    this.des = des_;
    this.openList = new BinaryHeap();
    this.closeList = [];
    this.pathDirec = [];
    this.searchedCnt = 0;

    /*
    Calculate solution from node src to node des.
    */
    this.run = function() {
        this.searchedCnt = 0;
        this.openList.push(this.src);
        while (!this.openList.empty()) {

            // Loop until the open list is empty or finding
            // a node that is not in the close list.
            var cur = null;
            do {
                cur = this.openList.top();
                this.openList.pop();
            } while (!this.openList.empty() && this.closeList[cur.val.toString()]);

            // If all the nodes in the open list is in the
            // close list, then there is no available path
            // between the two nodes.
            if (this.openList.empty() && this.closeList[cur.val.toString()]) {
                return;
            }

            ++this.searchedCnt;
            this.closeList[cur.val.toString()] = true;
            // this.printSearchInfo(cur);

            if (cur.equals(this.des)) {  // Find goal
                this.constructPath(cur);
                return;
            }

            for (var direc = 1; direc <= 4; ++direc) {  // Traverse adj
                if (cur.canMove(direc)) {
                    var adj = cur.getAdjNode(direc);
                    if (!this.closeList[adj.val.toString()]) {
                        adj.parent = cur;
                        adj.direc = direc;
                        adj.g = cur.g + 1;
                        adj.h = this.getEstimate(adj);
                        this.openList.push(adj);
                    }
                }
            }
        }
    }

    /*
    Estimate the heuristic value
    from the node to the goal.

    @param n the current node
    @return heuristic value from node n to the goal.
    */
    this.getEstimate = function(n) {
        var val = n.val;
        var desVal = this.des;
        var size = val.length;

        // Number of nodes whose next node is in a wrong position
        var wrongNext = 0;
        for (var i = 0; i < size - 1; i++) {
            if (val[i] + 1 != val[i + 1]) {
                wrongNext++;
            }
        }

        // Number of nodes which are in a wrong position
        var wrong = 0;
        for (var i = 0; i < size; ++i) {
            if (val[i] != desVal[i]) {
                ++wrong;
            }
        }

        // Sum up the distance of each element
        var manhatten = 0, geometric = 0;
        for (var i = 0; i < size; ++i) {
            if (val[i]) {  // Escape value 0
                var curR = n.getRow(i);
                var curC = n.getCol(i);
                var desR = n.getRow(val[i] - 1);
                var desC = n.getCol(val[i] - 1);
                var dR = curR > desR ? curR - desR : desR - curR;
                var dC = curC > desC ? curC - desC : desC - curC;
                manhatten += dR + dC;
                geometric += Math.sqrt(dR * dR + dC * dC);
            }
        }

        return 5 * (1 * wrongNext + 0 * wrong + 2 * manhatten + 1 * geometric);
    }

    /*
    Print the information of the current searching node.
    */
    this.printSearchInfo = function(cur) {
        console.log("Searching: " + cur.val.toString()
         + " G:" + Math.round(cur.g) + " H:" +  Math.round(cur.h)
         + " F:" + Math.round(cur.getF()) + " Total nodes: "
         + this.searchedCnt + "\n");
    }

    /*
    Construct the path from src to the node n.
    */
    this.constructPath = function(n) {
        if (n.parent) {
            this.constructPath(n.parent);
        }
        this.pathDirec.push(n.direc);
    }
};
