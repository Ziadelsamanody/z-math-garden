var model; //make model as global scope

async function loadModel() {
       //create a tensor
    model = await tf.loadGraphModel("TFJS/model.json")


}

function predictImage() {
    // console.log("processing....");

    let image = cv.imread(canvas);  //read the  canvas photo 
    cv.cvtColor(image, image, cv.COLOR_RGBA2GRAY, 0)//converrt this photo to grey 
    // make contsrt 
    cv.threshold(image, image, 175, 255, cv.THRESH_BINARY);

    //make contors
    let contours = new cv.MatVector();
    let hierarchy = new cv.Mat();
    // try more different paramters
    cv.findContours(image, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);


    // calculte bounding rectangle , use it to crop image
    let cnt = contours.get(0); //get contour values 
    let rect = cv.boundingRect(cnt); // create abound rect
    image = image.roi(rect); // update image  after crop using bound rect

    // resize the image
    
    var height = image.rows;
    var width = image.cols;

    if (height > width) {
        height = 20;
        const scaleFactor = image.rows / height;
        width = Math.round(image.cols / scaleFactor);
    } else {
        width = 20;
        const scaleFactor = image.cols / width;
        height = Math.round(image.rows / scaleFactor);
    }

    let newSize = new cv.Size(width, height);
    cv.resize(image, image, newSize, 0, 0, cv.INTER_AREA)

    // add pading 
    const LEFT = Math.ceil((4 +(20 - width)/2));
    const RIGHT = Math.floor((4 + (20 - width) / 2));
    const TOP = Math.ceil((4 + (20 - height) / 2));
    const BOTTOM = Math.floor((4 + (20 - height) / 2));

    // console.log(`top: ${TOP}, bottom: ${BOTTOM}, left: ${LEFT}, right: ${RIGHT}`);
    // confirm badding with open cv
    const BLACK = new cv.Scalar(0, 0, 0 , 0)

    cv.copyMakeBorder(image, image, TOP, BOTTOM, LEFT, RIGHT, cv.BORDER_CONSTANT, BLACK)
    // center the image using center of mass 

    cv.findContours(image, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
    cnt = contours.get(0);
    const MOMENTS = cv.moments(cnt, false)  // (contours, have binry image?)
    const cx = MOMENTS.m10 / MOMENTS.m00;
    const cy = MOMENTS.m01 / MOMENTS.m00;
    // console.log(`M00: ${MOMENTS.m00}, cx: ${cx}, cy: ${cy}`);
    
    const X_SHIFT = Math.round(image.cols / 2.0 - cx);
    const Y_SHIFT = Math.round(image.rows / 2.0 - cy);

    newSize = new cv.Size(image.cols, image.rows);
    const M = cv.matFromArray(2, 3, cv.CV_64FC1, [1, 0, X_SHIFT, 0, 1, Y_SHIFT]); // transformation matrix
    
    cv.warpAffine(image, image, M, newSize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, BLACK);

    let pixelValues = image.data;
    // console.log(`pixel values: ${pixelValues}`);

    pixelValues = Float32Array.from(pixelValues); // transform intger matrix pixels to float  

    pixelValues = pixelValues.map(function(item){
        return item /255.0;
    });

    // console.log(`scale array : ${pixelValues}`);
    
    // create a tensor 
    const X = tf.tensor([pixelValues]);
    // console.log(`Shape of tensor: ${X.shape}`);
    // console.log(`dtype of Tensor: ${X.dtype}`);
    const result = model.predict(X);
    result.print();

    const output = result.dataSync()[0]; // provide  us an array of value using [0] to get the number actual valte
    // console.log(tf.memory());

    // // testing  only
    // const outputCanvas = document.createElement("CANVAS");
    // cv.imshow(outputCanvas, image);

    // document.body.appendChild(outputCanvas);


    //Cleanup
    image.delete();
    contours.delete();
    cnt.delete();
    hierarchy.delete();
    M.delete();
    X.dispose();
    result.dispose();

    return output;
}
