#include <iostream>

using namespace std;


class RGB24{
    public int red;
    public int green;
    public int blue;
    
    public RGB24(int red, int green, int blue){
        this.red = red;
        this.green = green;
        this.blue = blue;
    }
    
    public string getHex(unsigned int val, bool lower = true)
    {
        if( !val )
            return std::string("0");
        std::string str;
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
 
};


int main {
    RGB24 color1 = new RGB24(0, 153, 255);
    cout << color1.getHex() << endl;
    
};
