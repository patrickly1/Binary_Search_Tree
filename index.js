class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Stack {
    constructor() {
        this.items = [];
    }

    queue(item) {
        this.items.push(item);
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

class Tree {
    constructor(array) {
        array = removeDuplicates(array);
        array = MergeSort(array)
        this.root = this.buildTree(array, 0, array.length - 1);
    }

    //build the binary tree given an array 
    buildTree(array, start, end) {
        if (start > end) {
            return null;
        }
        
        //find mid point to assign the root of the tree
        let mid = Math.floor((start + end) / 2);
    
        let node = new Node(array[mid]);
        
        //data less than the root go on the left
        node.left = this.buildTree(array, start, mid -1);

        //data greater than the root go on the right
        node.right = this.buildTree(array, mid + 1, end);
    
        return node;
    }

    insert(data) {
        let newNode = new Node(data);

        if (this.root === null) {
            this.root = newNode;
            return;
        }

        let current = this.root;
        
        //loop through the node to see if our node is greater, equal, or less than the current node
        while (true) {
            if (data < current.data) {
                if (current.left === null) {
                    current.left = newNode;
                    break;
                } else {
                    current = current.left;
                }
            } else if (data > current.data) {
                if (current.right === null) {
                    current.right = newNode;
                    break;
                } else {
                    current = current.right;
                }
            } else {
                //Duplicate value
                break;
            }
        }
    }

    deleteItem(data) {
        this.root = this.deleteNode(this.root, data);
    }

    deleteNode(node, data) {
        if (node === null) {
            return null;
        }

        if (data < node.data) {
            node.left = this.deleteNode(node.left, data);
        } else if (data > node.data) {
            node.right = this.deleteNode(node.right, data);
        } else {
            if (node.left === null) {
                return node.right;
            } else if (node.right === null) {
                return node.left;
            }

            //If there are two children, find the next successor
            node.data = this.minValue(node.right);

            node.right = this.deleteNode(node.right, node.data);
        }

        return node;
    }

    minValue(node) {
        let current = node;

        while (current.left !== null) {
            current = current.left;
        }

        return current.data;
    }

    find(value) {
        return this.findNode(this.root, value);
    }

    findNode(node, value) {
        if (node === null) {
            return null;
        }

        //recursively find the value by comparing if the curernt node is less or 
        //greater than our current node
        if (node.data === value) {
            return node;
        } else if (value < node.data) {
            return this.findNode(node.left, value);
        } else if (value > node.data) {
            return this.findNode(node.right, value);
        } else {
            return node;
        }
    }

    levelOrder(callback) {
        //Use the stack class to save the current node to traverse the tree in a DFS
        let myStack = new Stack();
        let levelOrderArray = [];

        if (this.root === null) {
            return null;
        } 

        myStack.queue(this.root);

        //append each child into the stack so we can traverse the tree in a DFS approach
        while (!myStack.isEmpty()) {
            let first = myStack.items[0];

            if (callback) {
                callback(first);
            }

            if (first.left !== null) {
                myStack.queue(first.left);
            }
            if (first.right !== null) {
                myStack.queue(first.right);
            }

            levelOrderArray.push(first.data);
            myStack.dequeue();
        }
        if (!callback) {
            return levelOrderArray;
        }
    }

    inOrder(callback) {
        const result = [];
        this.traverseInOrder(this.root, result, callback);        
        return result;
    }

    //left child -> node -> right child
    traverseInOrder(node, result, callback) {
        if (node === null) {
            return;
        }

        this.traverseInOrder(node.left, result, callback);

        if (callback) {
            callback(node);
        }

        result.push(node.data);

        this.traverseInOrder(node.right, result, callback);
    }

    preOrder(callback) {
        const result = [];
        this.traversePreOrder(this.root, result, callback);        
        return result;
    }

    //node -> left child -> right child
    traversePreOrder(node, result, callback) {
        if (node === null) {
            return;
        }

        if (callback) {
            callback(node);
        }

        result.push(node.data);

        this.traversePreOrder(node.left, result, callback);
        this.traversePreOrder(node.right, result, callback);
    }

    postOrder(callback) {
        const result = [];
        this.traversePostOrder(this.root, result, callback);        
        return result;
    }
    
    //left child -> right child -> node
    traversePostOrder(node, result, callback) {
        if (node === null) {
            return;
        }

        this.traversePostOrder(node.left, result, callback);
        this.traversePostOrder(node.right, result, callback);

        if (callback) {
            callback(node);
        }

        result.push(node.data);
    }

    height(node) {
        return this.traverseHeight(node);
    }

    //Find the height of each child, then return the max value plus 1 to account for leaf node
    traverseHeight(node) {
        if (node === null) {
            return -1;
        } else {
            let leftHeight = this.traverseHeight(node.left);
            let rightHeight = this.traverseHeight(node.right);
            return Math.max(leftHeight, rightHeight) + 1;
        }
    }

    //Start at the root and go to the given depth
    depth(node) {
        let current = this.root;
        let depth = 0;

        if (node === null) {
            return -1;
        }

        while (current !== null) {
            if (node.data < current.data) {
                depth++;
                current = current.left;
            } else if (node.data > current.data) {
                depth++;
                current = current.right;
            } else {
                return depth;           
            }
        }

        if (current === null) {
            return -1;
        }

    }

    isBalanced() {
        return this.checkBalance(this.root);
    }

    //Balanced if the difference between any node's height is not more than 1
    checkBalance(node) {
        if (node === null) {
            return true;
        }

        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);

        if (Math.abs(leftHeight - rightHeight) > 1) {
            return false;
        }

        return this.checkBalance(node.left) && this.checkBalance(node.right);
    }

    //If tree is not balanced, traverse through the curernt tree to return an array to
    //buildTree() again
    rebalance() {
        let currentNodes = this.inOrder();

        this.root = this.buildTree(currentNodes, 0, currentNodes.length - 1);
    }
}

//Merge any two arrays to perform MergeSort()
function Merge(Arr1, Arr2) {
    let mergedArr = [];
    let Arr1Index = 0;
    let Arr2Index = 0;
    
    while (Arr1Index < Arr1.length && Arr2Index < Arr2.length) {
        if (Arr1[Arr1Index] >= Arr2[Arr2Index]) {
            mergedArr.push(Arr2[Arr2Index]);
            Arr2Index++;
        } else if (Arr1[Arr1Index] < Arr2[Arr2Index]) {
            mergedArr.push(Arr1[Arr1Index]);
            Arr1Index++;
        }
    }

    while (Arr1Index < Arr1.length) {
        mergedArr.push(Arr1[Arr1Index]);
        Arr1Index++;
    }

    while (Arr2Index < Arr2.length) {
        mergedArr.push(Arr2[Arr2Index]);
        Arr2Index++;
    }

    return mergedArr;
}

//Sort any array
function MergeSort(Arr) {
    if (Arr.length <= 1) {
        return Arr;
    }

    let index = Math.floor(Arr.length / 2);
    
    let Arr1 = Arr.slice(0, index);
    let Arr2 = Arr.slice(index);

    let sortedArr1 = MergeSort(Arr1);
    let sortedArr2 = MergeSort(Arr2);

    return Merge(sortedArr1, sortedArr2);
}

function removeDuplicates(array) {
    return [...new Set(array)];
}

//Visualize tree
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

let tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

//tree.insert(2);
//tree.insert(28);
//tree.deleteItem(8);
//console.log(tree.find(9));
//console.log("levelOrder", tree.levelOrder());
//console.log("inOrder", tree.inOrder());
//console.log("preOrder", tree.preOrder());
//console.log("postOrder", tree.postOrder());
//console.log("Height", tree.height(tree.root));
//console.log("Depth", tree.depth(tree.root.left.left.right))
//console.log("Depth", tree.depth(tree.find(9)));
//console.log("isBalanced", tree.isBalanced());
//tree.insert(7000);
//tree.insert(8000);
//console.log("isBalanced", tree.isBalanced());
//console.log("checkBalance", tree.checkBalance(tree.find(67)));
//console.log("Height", tree.height(tree.root));
//tree.rebalance();
//prettyPrint(tree.root);
