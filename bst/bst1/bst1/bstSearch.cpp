#include <iostream>
#include <string>
#include <cmath>
#include <deque>
#include <vector>
#include <iterator>

using namespace std;

class BinaryTree{
    public:
        int data;
        BinaryTree* left;
        BinaryTree* right;
        BinaryTree(int value){ this->data = value;};
        BinaryTree(int value, BinaryTree* left, BinaryTree* right){
            this->data = value;
            this->left = left;
            this->right = right;
        };
};

BinaryTree* bstSearch(BinaryTree* root,int key){
    //ここから書きましょう
    BinaryTree* iterator = root;
    while(iterator != NULL){
        cout << iterator->data << endl;
        if(iterator->data == key){
            return iterator;
        }
        if(key < iterator->data) {
            iterator = iterator->left;
        } else {
            iterator = iterator->right;
        }

    }

    // cout << root->data << endl;
    // cout << root->left->data << endl;
    // cout << root->right->data << endl;
    
    return NULL;
};

//二分探索木（BST）の根ノード root と整数 key が与えられるので、key と等しい部分木の根ノードを返す、bstSearch という関数を作成してください。そのようなノードが存在しない場合は、null を返してください。
