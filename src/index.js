import {
    loadImg,
    getImageXYColor,
    getLineSum,
    LineFilter,
    getLineFilterColor,
} from "./utils";

var startx = 0;
var starty = 0;
var width = 0;
var height = 0;
var viewWidth = 1000;
var viewHeight = 2000;

var main = document.querySelector(".main");
var canvas = document.querySelector("#canvas");
canvas.width = viewWidth;
canvas.height = viewHeight;

var cc = canvas.getContext("2d");

console.log(cc);

function startLoadImg() {
    return new Promise((resolve, reject) => {
        var url2 = "http://127.0.0.1:5500/pages/img/t01.png";
        loadImg(url2)
            .then((img) => {
                console.log(img);
                width = img.width;
                height = img.height;
                cc.drawImage(img, startx, starty, width, height);

                resolve();
            })
            .catch((err) => {
                reject(err);
            });
    });
}

function anyImg() {
    return new Promise((resolve, reject) => {
        var imgdata = cc.getImageData(startx, starty, width, height);

        console.log(imgdata);

        var pixel = getImageXYColor(imgdata, 250, 390);

        cc.fillStyle = "rgba(255,0,0,0.3)";
        var fw = startx + width;

        console.time("time1");
        var arr = [];
        for (let i = 0; i < height; i++) {
            var line = getLineFilterColor(imgdata, i).toString();
            arr.push(line);
        }
        console.log(arr);
        console.timeEnd("time1");

        var arr2 = [];
        var start = 0;
        var h = 0;
        var perv = null;
        for (let i = 0; i < arr.length; i++) {
            var item = arr[i];
            if (item != perv) {
                if (perv && h) {
                    arr2.push({
                        start: start,
                        h: h,
                    });
                }
                start = i;
                h = 0;
                perv = item;
            } else {
                h++;
            }
            if (i == arr.length - 1) {
                arr2.push({
                    start: start,
                    h: h,
                });
            }
        }

        console.log(arr2);

        var rectx = fw + 10;
        var rectw = 10;
        var colors = ["rgba(255,0,0,0.3), rgba(0,255,0,0.3)"];
        var endy = 0;
        for (let i = 0; i < arr2.length; i++) {
            var area = arr2[i];
            cc.fillRect(0, area.start, fw, area.h);
            cc.fillText(area.h, fw + 30, area.start + area.h / 2);
        }

        resolve();
    });
}

function addEvent() {
    var posi = {
        sx: -1, // start
        sy: -1,
        mx: -1, // move
        my: -1,
        ex: -1, // end
        ey: -1,
    };

    main.addEventListener("mousedown", function (e) {
        // console.log(e)
        posi.sx = e.offsetX;
        posi.sy = e.offsetY;
        console.log(posi);
    });
    main.addEventListener("mousemove", function (e) {
        if (posi.sx > -1 && posi.sy > -1) {
            posi.mx = e.offsetX;
            posi.my = e.offsetY;
            console.log(posi);
        }
    });
    document.addEventListener("mouseup", function (e) {
        // console.log(e);
        posi.ex = e.offsetX;
        posi.ey = e.offsetY;
        posi.sx = -1;
        posi.sy = -1;
    });
}

startLoadImg()
    .then(() => {
        anyImg();
    })
    .then(() => {
        addEvent();
    });
