#include <iostream>

using namespace std;


class RGB24{
public:
    int red;
    int green;
    int blue;
    
//    RGB24(int red, int green, int blue): red(red), green(green), blue(blue) {}
    RGB24(int red0, int green0, int blue0){
        red = red0;
        green = green0;
        blue = blue0;
    }
    
    RGB24(string inputString){
        int l = inputString.size();
        if(l == 6) setColorsByHex(inputString);
        else setAsBlack();
    }
    
    void setColorsByHex(string hex){
        if(hex.size() != 6) setAsBlack();
        else{
            red = stoi(hex.substr(0, 2), nullptr, 16);
            green = stoi(hex.substr(2, 2), nullptr, 16);
            blue = stoi(hex.substr(4, 2), nullptr, 16);
        }
    }
    
    void setAsBlack(){
        red = 0;
        green = 0;
        blue = 0;
    }
    
    string toHex(unsigned int val, bool lower = true){
        if( !val )
            return std::string("0");
        string str;
        const char hc = lower ? 'a' : 'A';     // 小文字 or 大文字表記
        while( val != 0 ) {
            int d = val & 15;     // 16進数一桁を取得
            if( d < 10 )
                str.insert(str.begin(), d + '0');  //  10未満の場合
            else //  10以上の場合
                str.insert(str.begin(), d - 10 + hc);
            val >>= 4;
        }
        return str;
    }
    
    string getHex(){
        string Hex = "";
        Hex += toHex(this->red);
        Hex += toHex(this->green);
        Hex += toHex(this->blue);

        return Hex;
    }
    
    string getColorShade(){
        if(red == green && green == blue) return "grayscale";
        string greatestString = "red";
        int greatest = red;
if(greatest <= green){
            greatestString = "green";
            greatest = green;
        }
        if(greatest <= blue){
            greatestString = "blue";
            greatest = blue;
        }
        return greatestString;
    }
 
};


int main() {
    RGB24 *color1, *color2, *color3, *gray = NULL;
    color1 = new RGB24(0, 153, 255);
    color2 = new RGB24("ff99cc"); //rgb(255, 153, 204)
//    color3 = new RGB24("100110011111111100110011"); //rgb(153, 255, 51)
    gray = new RGB24("7b7b7b"); //rgb(123, 123, 123)
    
    
    cout << color1->getHex() << " " << color1->getColorShade() << endl;
    cout << color2->getHex() << " " << color2->getColorShade() << endl;
//    cout << color3->getHex() << " " << color3->getColorShade() << endl;
    cout << gray->getHex() << " " << gray->getColorShade() << endl;

};
