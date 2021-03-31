#include <iostream>
#include <string>
#include <cmath>
#include <deque>
#include <vector>
#include <iterator>
#include <algorithm>

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

BinaryTree* sortedArrToBSTHelper(vector<int> numberList, int start, int end){

    int mid = start + (end - start) / 2;
    if(start>end){
        return NULL;
    }
    BinaryTree* root = new BinaryTree(numberList[mid]);
    root->left = sortedArrToBSTHelper(numberList, start, mid - 1);
    root->right = sortedArrToBSTHelper(numberList, mid + 1, end);
    return root;
  
}


BinaryTree* sortedArrToBST(vector<int> numberList){
    //ここから書きましょう
    BinaryTree* root = sortedArrToBSTHelper(numberList, 0, numberList.size()-1);
    return root;

    
}

//異なる整数値で構成されるソート済みのリスト numberList が与えられるので、平衡二分探索木を作成し、その根ノードを返す、sortedArrToBST という関数を作成してください。
