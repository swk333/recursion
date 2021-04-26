#include <iostream>
#include <string>
#include <cmath>
#include <deque>
#include <vector>
#include <iterator>
#include <algorithm>

using namespace std;
class Heap{
public:

    static void maxHeapify(vector<int>& array, int index){
        int leftIndex = 2 * index + 1;
        int rightIndex = 2 * index + 2;
        int arraySize = array.size();
        int largest = index;
        
        if(leftIndex < arraySize && array[largest] < array[leftIndex]){
            largest = leftIndex;
        }
        if(rightIndex < arraySize && array[largest] < array[rightIndex]){
            largest = rightIndex;
        }
        if(largest != index){
            swap(array[index], array[largest]);
            maxHeapify(array, largest);
        }

    }
    
    static void buildMaxHeap(vector<int>& array){
        int middle = array.size() / 2;
        for(int i = middle; i >= 0; i--){
            Heap::maxHeapify(array, i);
        }
    }
    
    static void heapSort(vector<int>& array){
        Heap::buildMaxHeap(array);
        int heapEnd = array.size() - 1;
        while(heapEnd > 0){
            int temp = array[h  eapEnd];
            array[heapEnd] = array[0];
            array[0] = temp;
            heapEnd--;
            Heap::maxHeapify(array, heapEnd);
        }
        
    }
    
    static void printHeap(vector<int> array){
        for(int i = 0; i < array.size(); i++){
            cout << array[i] << " ";
        }
                                        
    }
    		
};



int main(int argc, const char * argv[]) {

    vector<int>heap1 = {2,42,11,30,10,7,6,5,9};
    Heap::maxHeapify(heap1, 0);
    Heap::printHeap(heap1);
    cout << endl;
    vector<int>heap2 = {56,4,51,10,12,5,12,4,6,5};
    Heap::maxHeapify(heap2, 1);
    Heap::printHeap(heap2);
    cout << endl;

    vector<int>heap3 = {1,2,3,4,5,6};
    Heap::buildMaxHeap(heap3);
    Heap::printHeap(heap3);
    cout << endl;

    vector<int>heap4 = {1,2,3,4,5,6};
    Heap::heapSort(heap4);
    Heap::printHeap(heap4);
    
    return 0;
}

