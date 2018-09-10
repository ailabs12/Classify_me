function take_snapshot() {
    Webcam.snap( function(data_uri) {
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        let img = new Image();
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            let data = canvas.toDataURL();
            console.log(data);
            addDataUrlInInput(data);
        }
        img.src = data_uri;
    } );
}

function uploadFile(input) {
    if (input.files && input.files[0]) {
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        let reader = new FileReader();
        reader.onload = function(e) {
            let img = new Image();
            img.onload = function() {
                canvas.width = 640;
                canvas.height = 480;

                let imgWidth = img.width;
                let imgHeight = img.height;

                let sizer=scalePreserveAspectRatio(imgWidth,imgHeight,canvas.width,canvas.height);

                ctx.drawImage(img, 0, 0, 
                            imgWidth, imgHeight, 0 , 0 , 
                            imgWidth * sizer, imgHeight * sizer);
                
                addDataUrlInInput(canvas.toDataURL());
            }
            img.src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function uploadFileFromURL() {
    let url = document.getElementById("url_input").value;
    console.log(`URL: ${url}`);
    if (url) {
        // debugger;
        console.log(`Url: ${url}`);
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");

        let img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = function() {
            canvas.width = 640;
            canvas.height = 480;

            let imgWidth = img.width;
            let imgHeight = img.height;

            let sizer=scalePreserveAspectRatio(imgWidth,imgHeight,canvas.width,canvas.height);

            ctx.drawImage(img, 0, 0, 
                        imgWidth, imgHeight, 0 , 0 , 
                        imgWidth * sizer, imgHeight * sizer);
                
            addDataUrlInInput(canvas.toDataURL());
        }
        img.src = url;
    }

    return false;
}

function scalePreserveAspectRatio(imgW,imgH,maxW,maxH){
    return(Math.min((maxW/imgW),(maxH/imgH)));
}

function addDataUrlInInput(dataUrl) {
    document.getElementById("dataUrlInput").value = dataUrl;
}