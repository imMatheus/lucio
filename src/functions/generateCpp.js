export default function generateCpp(name, args) {
    const val = `
#include <bits/stdc++.h>

using namespace std;

vector<string> split_string(string);

// Complete the ${name} function below.
void ${name}(vector<int> arr) {


}
    `
    return val
}
