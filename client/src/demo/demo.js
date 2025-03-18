function demo() {
    const arr = [
        ["Swiggy", 123],
        ["Swiggy", 227],
        ["Zomato", 103],
        ["Zomato", 171],
        ["Dunzo", 300],
        ["Zomato", 122],
        ["Swiggy", 181]
    ];

    console.log(arr.length)
    let sum = 0;
    let avg = 0;
    for(let i of arr) {
            sum += i[1];
        avg = sum/arr.length;
    }

    console.log("Avg = " + avg)
    console.log("Sum = " + sum)

    let str = "";
    for(let i of arr) {
        if(i[1] > avg) {
            str += i[0] + " ";
        }
    }
    console.log("Service with amount  greater than Avg = "+ str.trim());
}
demo();