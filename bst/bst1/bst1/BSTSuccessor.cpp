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

BinaryTree* minimum(BinaryTree* root){
    while(root->left != NULL){
        root = root->left;
    }
    return root;
}

BinaryTree* successor(BinaryTree* root,int key){
    //ここから書きましょう
    BinaryTree* iterator = root;
    BinaryTree* parent = NULL;
    while(iterator != NULL){
        if(iterator->data == key){
            if(parent == NULL && iterator->right == NULL){
                return NULL;
            }
            else if(iterator->right == NULL && parent->data < iterator->data){
                return NULL;
            }
            else if(iterator->right == NULL && parent->data > iterator->data){
                return parent;
            } else {
                return minimum(iterator->right);
            }
            
        }
        else if(key < iterator->data){
            parent = iterator;
            iterator = iterator->left;
        } else {
            parent = iterator;
            iterator = iterator->right;
        }
    }

    return iterator;


}

//異なる整数値で構成される二分探索木（BST）の根ノード root と BST 内に存在する整数 key が与えられるので、根ノードが後続ノードである部分木を返す、successor という関数を作成してください。もし、そのようなノードが存在しない場合は null を返してください。ノード N の値を x とした時、後続ノードとは木の中に存在する x よりも大きい最小の値を持つノードのことを指します
