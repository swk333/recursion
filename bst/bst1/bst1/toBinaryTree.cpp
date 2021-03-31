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

bool exists(BinaryTree* root,int key){
    //ここから書きましょう
    BinaryTree* iterator = root;
    bool ans = false;
    while(iterator != NULL){
        cout << iterator->data << endl;
        if(iterator->data == key){
            ans = true;
            return ans;
        } else if(key < iterator->data){
            iterator = iterator->left;
        } else {
            iterator = iterator->right;
        }

    }

    return ans;
}


//異なる整数値で構成される二分探索木（BST）の根ノード root と整数 key が与えられるので、key が BST の中に存在するかどうか判定する exist という関数を作成してください。key が BST の中に存在していれば true を、そうでなければ false を返してください。

