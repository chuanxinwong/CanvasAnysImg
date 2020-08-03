export function loadImg(url) {
    return new Promise((resolve, reject) => {
        var img = new Image();

        img.onload = function () {
            console.log(img);
            resolve(img);
        };
        img.onerror = function (err) {
            console.log(arguments);
            console.log(err);
        };
        img.src = url;
    });
}

// 获取图片的指定坐标信息
export function getImageXYColor(imageData, x, y) {
    var width = imageData.width;
    var data = imageData.data;

    var R = (width * y + x) * 4;
    var G = (width * y + x) * 4 + 1;
    var B = (width * y + x) * 4 + 2;
    var A = (width * y + x) * 4 + 3;

    var pr = data[R];
    var pg = data[G];
    var pb = data[B];
    var pa = data[A];

    var sum = pr + pg + pb + pa;

    return sum;

    var rgba = {
        r: pr,
        g: pg,
        b: pb,
        a: pa,
    };

    var hex = pr.toString(16) + pg.toString(16) + pb.toString(16);

    return hex;
}

export function getLineSum(imageData, lineNum) {
    var width = imageData.width;
    var data = imageData.data;

    var y = lineNum;

    var arr = [];

    for(var i = 0 ; i < width; i++) {
        var R = (width * y + i) * 4;
        var G = (width * y + i) * 4 + 1;
        var B = (width * y + i) * 4 + 2;
        var A = (width * y + i) * 4 + 3;
    
        var pr = data[R];
        var pg = data[G];
        var pb = data[B];
        var pa = data[A];
    
        var sum = pr + pg + pb + pa;

        arr.push(sum)
    }

    return arr;
}

// 判断是否 一致
export function LineFilter(imageData, lineNum, diff){
    diff = Math.abs(diff || 3);

    var line = getLineSum(imageData, lineNum);

    var flag = true;
    for (let i = 0, len = line.length - 1; i < len; i++) {
        var item = line[i];
        var next = line[i+1];
        var d = item - next;
        
        if (d > diff || d < -diff) {
            flag = false;
        }
    }

    return flag;
}

// 判断一行是否一致， 如果一致返回颜色， 否则返回空
export function getLineFilterColor(imageData, lineNum, diff){
    diff = Math.abs(diff || 0);

    var line = getLineSum(imageData, lineNum);

    var flag = true;

    for (let i = 0, len = line.length - 1; i < len; i++) {
        var item = line[i];
        var next = line[i+1];
        var d = item - next;
        
        if (d > diff || d < -diff) {
            flag = false;
        }
    }

    if (flag) {
        return line[0];
    } else {
        return ""
    }

}
