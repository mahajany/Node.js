var cyl = require('./cylinder')

function solveCylinder(r,h){
    console.log("- - - Solving for cylnder with r=" + r + " and h ="+h);
    cyl(r,h, (err, cylinder) =>{
          if(err){
                console.log("ERROR:", err.message);
            } else {
                console.log("Cylinder r:",r , ", h:",h,
                            "::Curved area:",  cylinder.curvedArea(r,h),
                            ", Surface area:", cylinder.surfaceArea(), //NaN - as r and h are explicitely exptected.
                            ", Volume:",cylinder.volume()//Closure: r,h are available and I don't even need to supply these here!!
                            );
            }
        }); 
        console.log("/*End of cyl*/");
}
solveCylinder(-1,4);
solveCylinder(-4,1);
solveCylinder(-4,-4);
solveCylinder(2,3);
solveCylinder(3, 999);
solveCylinder(0,0);
