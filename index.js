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

    buildTree(array, start, end) {
        if (start > end) {
            return null;
        }
    
        let mid = Math.floor((start + end) / 2);
    
        let node = new Node(array[mid]);
    
        node.left = this.buildTree(array, start, mid -1);
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
        let myStack = new Stack();
        let levelOrderArray = [];

        if (this.root === null) {
            return null;
        } 

        myStack.queue(this.root);

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

    traverseHeight(node) {
        if (node === null) {
            return -1;
        } else {
            let leftHeight = this.traverseHeight(node.left);
            let rightHeight = this.traverseHeight(node.right);
            return Math.max(leftHeight, rightHeight) + 1;
        }
    }

    depth(node) {
        return this.depthTraverse(node);
    }

    traverseDepth(node) {
        return;
    }
}

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
console.log(tree.find(9));
console.log("levelOrder", tree.levelOrder());
console.log("inOrder", tree.inOrder());
console.log("preOrder", tree.preOrder());
console.log("postOrder", tree.postOrder());
console.log("Height", tree.height(tree.root));
prettyPrint(tree.root);
