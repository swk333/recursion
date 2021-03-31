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

BinaryTree* getMaximum(BinaryTree* root){

    while(root->right != NULL){
        root = root->right;
    }
    return root;
};

BinaryTree* getMinimum(BinaryTree* root){

    while(root->left != NULL){
        root = root->left;
    }
    return root;
};

BinaryTree* predecessor(BinaryTree* root,int key){
    BinaryTree* predecessor = NULL;
    BinaryTree* current = root;

    if(!root) return NULL;

    while(current != NULL && current->data != key){
        if(current->data > key){
            current = current->left;
        } else {
            predecessor = current;
            current = current->right;
        }
    }
    
    if(current->left){
        predecessor = getMaximum(current->left);
    }
    
    return predecessor;
}

//https://www.youtube.com/watch?v=rukYFD8cYBY
//http://www.algorithmsandme.com/inorder-predecessor-in-binary-search-tree/

//異なる整数値で構成される二分探索木（BST）の根ノード root と BST 内に存在する整数 key が与えられるので、根ノードが先行ノードである部分木を返す、predecessor という関数を作成してください。もし、そのようなノードが存在しない場合は null を返してください。ノード N の値を x とした時、先行ノードとは木の中に存在する x よりも小さい最大の値を持つノードのことを指します。後続ノードと先行ノードの操作は対称的です。


