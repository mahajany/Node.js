var circle = {
    perimeter:(r) => 2 * Math.PI*r,
    area: (r) => Math.PI*Math.pow(r,2)
};

function solveCircle(r){
    console.log("- - - Solving for a Circle with radius = " + r);
    if(r<=0){
        console.log("Well...radius should be greater than 0!")
        return;
    } else{
        console.log("The area of the circle is " + circle.area(r));
        console.log("The perimeter of the circle is" , circle.perimeter(r));
    }
}

solveCircle(2);
solveCircle(2.3);
solveCircle(0.1);
solveCircle(0);
solveCircle(-3);
