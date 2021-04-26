
#include <iostream>
#include <vector>
#include <string>
using namespace std;

class Battery{
public:
    string manufacturer;
    string model;
    double voltage;
    double ampHours;
    double weightKg;
    vector<double> dimensionMm;
    
    Battery(string m_manufacturer, string m_model, double m_voltage, double m_ampHours, double m_weightKg, vector<double> m_dimensionMm){
        manufacturer = m_manufacturer;
        model = m_model;
        voltage = m_voltage;
        ampHours = m_ampHours;
        weightKg = m_weightKg;
        dimensionMm = m_dimensionMm;
    }
    
    void toString(){
        cout << this->manufacturer << " " << this->model << ": " << this->getPowerCapacity() << "Wh (" << this->voltage << "V/" << this->ampHours << "Ah) - " << this->dimensionMm[0] << "(W)x" << this->dimensionMm[1] << "(H)x" << this->dimensionMm[2] << "(D) " << this->weightKg << "kg .... Instance Reference:" << this << endl;
    }
    
    double getPowerCapacity(){
        return this->voltage * this->ampHours;
    }
    
    bool isEqual(Battery *battery){
        bool ans = false;
        if(this->manufacturer == battery->manufacturer && this->model == battery->model){
            ans = true;
        }
        return ans;
    }
    
    bool isBigger(Battery *battery){
        int size1 = this->dimensionMm[0] * this->dimensionMm[1] * this->dimensionMm[2];
        int size2 = battery->dimensionMm[0] * battery->dimensionMm[1] * battery->dimensionMm[2];
        if(size1 > size2){
            return true;
        } else {
            return false;
        }
    }
    bool isBiggerOrEqual(Battery *battery){
        if(isBigger(battery) || isEqual(battery)){
            return true;
        } else {
            return false;
        }
    }
};

int main(int argc, const char * argv[]) {
    Battery *battery1 = NULL;
    battery1 = new Battery("VTec", "MC96", 14.4, 6.6, 0.55, {72, 97, 51.5});
    battery1->toString();
    Battery *battery2 = battery1;
    battery2->toString();
    Battery *battery3 = new Battery("VTec", "MC96", 14.4, 6.6, 0.55, {72, 97, 51.5});
    battery3->toString();
    Battery *battery4 = new Battery("Atomic Units", "MD-LS95", 14.4, 6.6, 0.55, {72, 97, 51.5});
    battery4->toString();
    cout << endl;
    cout << (battery1 == battery2) << endl;
    cout << (battery1 == battery3) << endl;
    
    cout << battery3->isEqual(battery1) << endl;
    
    cout << battery1->isBiggerOrEqual(battery4) << endl;
    return 0;
}
