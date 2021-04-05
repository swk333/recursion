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
        BinaryTree(int value){ this->data = value; };
        BinaryTree(int value, BinaryTree* left, BinaryTree* right){
            this->data = value;
            this->left = left;
            this->right = right;
        };
    
    void inOrderWalk(BinaryTree* tRoot){
        if(tRoot != NULL){
            inOrderWalk(tRoot->left);
            cout << tRoot->data << ",";
            inOrderWalk(tRoot->right);
        }
    }

};



class BinarySearchTree{
    public:
        BinaryTree* root;

        BinarySearchTree(vector<int> arr){
            sort(arr.begin(), arr.end());
            this->root = arr.size() == 0 ? NULL : sortedArrayToBSTHelper(arr, 0, arr.size()-1);
        }

//        bool keyExist(int key){
//            BinaryTree *iterator = this->root;
//            while(iterator != NULL){
//                if(iterator->data == key) return true;
//                if(iterator->data > key) iterator = iterator->left;
//                else iterator = iterator->right;
//            }
//
//            return false;
//        }
//
//        BinaryTree* search(int key){
//            return BinarySearchTree::searchBST(key, this->root);
//        }
//
//        static BinaryTree* searchBST(int key, BinaryTree* bst){
//            if(bst == NULL) return NULL;
//            if(bst->data == key) return bst;
//
//            if(bst->data > key) return BinarySearchTree::searchBST(key, bst->left);
//            else return BinarySearchTree::searchBST(key, bst->right);
//        }

    static BinaryTree* sortedArrayToBSTHelper(vector<int> arr, int start, int end) {
        if(start == end) return new BinaryTree(arr[start], NULL,NULL);
        int mid = floor((start+end)/2);

        BinaryTree* left = NULL;
        if(mid-1 >= start) left = BinarySearchTree::sortedArrayToBSTHelper(arr, start, mid-1);

        BinaryTree* right = NULL;
        if(mid+1 <= end) right = BinarySearchTree::sortedArrayToBSTHelper(arr, mid+1, end);

        BinaryTree* root = new BinaryTree(arr[mid], left, right);
        return root;
    }


    static BinaryTree* insert(BinaryTree* root, int key){
        if(root == NULL){
            BinaryTree* newNode = new BinaryTree(key);
            newNode->left = NULL;
            newNode->right = NULL;
            root = newNode;

        } else if(key < root->data){
            root->left = insert(root->left, key);

        } else {
            root->right = insert(root->right, key);
        }
        return root;
    }
    
    static BinaryTree* FindMin(BinaryTree* root){
        while(root->left != NULL) root = root->left;
        return root;
    }
    
    static BinaryTree* deleteNode(BinaryTree* root, int key){
        if(root == NULL) return NULL;
        else if(key < root->data) {
            root->left = deleteNode(root->left, key);
        } else if(key > root->data){
            root->right = deleteNode(root->right, key);
        } else {
            if(root->left == NULL && root->right == NULL){
                delete root;
                root = NULL;
            } else if(root->left == NULL){
                BinaryTree* temp = root;
                root = root->right;
                delete temp;
            } else if(root->right == NULL){
                BinaryTree* temp = root;
                root = root->left;
                delete temp;
            } else {
                BinaryTree* temp = FindMin(root->right);
                root->data = temp->data;
                root->right = deleteNode(root->right, temp->data);
            }
        }
        
        return root;
    }
    
    
    static void printSorted(BinaryTree* root){
        root->inOrderWalk(root);
    }

};

int main(){
    BinarySearchTree* bst = new BinarySearchTree({4,43,36,46,32,7,97,95,34,8,96,35,85,1010,232});
    BinarySearchTree::printSorted(bst->root);
    cout << endl;
    BinarySearchTree::insert(bst->root, 5);
    BinarySearchTree::printSorted(bst->root);
    cout << endl;
    BinarySearchTree:: deleteNode(bst->root, 96);
    BinarySearchTree::insert(bst->root, 47);
    BinarySearchTree::printSorted(bst->root);
}
