module.exports = (r, h, callback) => {
    if(r <= 0 || h<=0){
        setTimeout(()=>
            callback(new Error( "MESSAGE-FROM-CALLBACK: Radius " + r + 
                            " and height " + h + " should be greater than 0"),   //Try ',' in place of '+' here!
                    null)          //The Second parameter of callback - null because of error
            ,2000);  //Timeout is set to 2 seconds
    } else {
        console.log("OK...calculating now!");
        setTimeout(()=>
                callback(null, //NOT error, but a valid function this time
                {
                    perimeter :(r)    => ( 2 * Math.PI*r ),
                    curvedArea:(r,h)  => ( 2 * Math.PI * r * h ), 
                    surfaceArea:(r,h) => ( (2*Math.PI*r*h)+(2*Math.PI*Math.pow(r,2)*h) ),
                    area      :(r,h)  => ( Math.PI*Math.pow(r,2) ),
                    volume    :()  => (  Math.PI * Math.pow(r,2)*h )
                })          //The Second parameter of callback - null because of error
        ,1000);  //Timeout is set to 1 seconds - just to simulattttttte a delay, say for a database call...
    }
} /*End of Export*/
    

//The X versions of functions - notice a ';' at the end!!
Xperimeter:(r) => 2 * Math.PI*r;
XcurvedArea:(r,h) => 2*Math.PI*r*h;
XsurfceArea:(r,h)=> curvedArea(r,h) + area (r);
Xarea:(r) => Math.PI*Math.pow(r,2);
