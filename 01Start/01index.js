var rect = require('./01rectangle');

function solveRect(l,b){
    console.log("- - -Solveing for a rectangle with l = " + l + " and b = " + b);

    if(l<= 0 || b <= 0){
        console.log("Rectangle dimensions should be > 0");
    } else {
        console.log("The area of rectangle is:"+ rect.area(l,b));
        console.log("The perimeter of rectanle is:" + rect.perimeter(l,b));
    }
}

solveRect(2,3);
solveRect(4,5);
solveRect(-1,2);
solveRect(0,8);