

class ImageObject {
    constructor(element, img, id = 0,){
        this.element  = element;
        this.id       = id;
        this._img     = img;
        this._opacity = 1;
        this.img_pos  = {x: 0, y: 0}
        console.log(`[👁‍🗨IMG] : ${this.id} | ${this.element.id} | ${this._img}`)
    }

    randInt(min, max) {
        return Math.random() * (max - min) + min;
    }

    draw(){
        this.img = new Image();
        this.img.crossOrigin = "Anonymous";
        this.img.src = this._img;

        this.img.onload = () => {
            
            var ra = this.img.naturalWidth / this.img.naturalHeight
            var bb = this.element.getBoundingClientRect()
            var w = bb.height*ra
            var h = bb.height

            this.canvas = document.createElement("canvas");
            this.canvas.willReadFrequently = true;
            this.canvas.width = w;
            this.canvas.height = h;

            this.context = this.canvas.getContext('2d', { willReadFrequently: true });
            this.context.imageSmoothingEnabled= true;
            this.context.width = this.canvas.width;
            this.context.height = this.canvas.height;

            this.context.drawImage(this.img, 0, 0, this.img.naturalWidth, this.img.naturalHeight, 0, 0, this.context.width, this.context.height);
            this.element.appendChild(this.canvas)
        }
    }

    clear(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.remove();
        this.img.remove();
    }

    imageLoad(callback){
        this.img.addEventListener('load', () => {
            callback(this.img);
        });

    }

    async forEach(resolution = 10, callback = () => {}, reverse = false, filter = [0,0,0,255], epsilon = 255){
        var read_length = {x:1, y:1}
        var indexy = 0;
        var indexyx = 0;
        if (reverse === true){
            indexy = resolution*resolution;
            indexyx = resolution*resolution;
        }
        var cell_sizex = this.context.width/resolution
        var cell_sizey = this.context.height/resolution
        var max_w = this.context.width; var max_h = this.context.height
        for (var x = 0; x < max_w; x+= cell_sizex){
            for (var y = 0; y < max_h; y+= cell_sizey){
                var pixel = this.context.getImageData(x, y, read_length.x, read_length.y);
                var data = pixel.data
                if (data[0] > filter[0] - epsilon && data[0] < filter[0] + epsilon){
                    if (data[1] > filter[1] - epsilon && data[1] < filter[1] + epsilon){
                        if (data[2] > filter[2] - epsilon && data[2] < filter[2] + epsilon){
                            if (data[3] > filter[3] - epsilon && data[3] < filter[3] + epsilon){
                                await callback(
                                    this,
                                    {
                                        sx: cell_sizex,
                                        sy: cell_sizey,
                                        x : x,
                                        y : y,
                                        index: indexy,
                                        indexX: indexyx,
                                    },
                                    data
                                );
                            }
                        }
                    }
                }
                if (reverse === true){
                    indexy--;
                } else {
                    indexy++;
                }
            }
            if (reverse === true){
                indexyx--;
            } else {
                indexyx++;
            }
        }
    }
    fade(range, duration, easing = "easeInOutSine"){
        anime({
            targets : this.element,
            opacity : range,
            duration: duration,
            easing  : easing,
            complete   : () => {
                if (range[range.length-1] > 0){
                    this.element.style.display = 'flex'
                }else if (range[range.length-1] == 0){
                    this.element.style.display = 'none'
                }
            },
            begin : () => {
                if (range[range.length-1] > 0){
                    this.element.style.display = 'flex'
                }
            },
        })

    }
    scale_y(range, duration, easing = "easeInOutSine"){
        anime({
            targets : this.element,
            scaleY : range,
            duration: duration,
            easing  : easing,
        })
    }
    scale_x(range, duration, easing = "easeInOutSine"){
        anime({
            targets : this.element,
            scaleX : range,
            duration: duration,
            easing  : easing,
        })
    }
    async overlay(time){
        var effect_div = document.createElement("div");
        this.element.appendChild(effect_div);
        var noise1 = "https://i.gifer.com/M2gP.gif"
        var noise2 = "https://media0.giphy.com/media/wdfxqCQVGHDlC/giphy.gif?cid=6c09b952srid4z1dlnv8q7w1r01sktsdkl0sh5nvavgzmav4&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g"
        var noise3 = "https://25.media.tumblr.com/836b01de4f85dcb69df47ba4d9ae653f/tumblr_n3bh7cFowy1r3nqtvo1_400.gif"
        var noise4 = "https://i.pinimg.com/originals/5b/1c/66/5b1c66cafb7be38ec0bc4f580a397d1d.gif"
        effect_div.style.position         = "absolute";
        effect_div.style.width            = this.canvas.width + "px";
        effect_div.style.height           = this.canvas.height + "px";
        effect_div.style.zIndex           = 99;
        effect_div.style.backgroundImage  = `url("${noise2}")`
        effect_div.style.backgroundSize   = "40%"
        effect_div.style.backgroundRepeat = "repeat"
        effect_div.style.mask             = `url("${this._img}")`
        effect_div.style.mixBlendMode     = "lighten"
        //effect_div.style.backdropFilter = "saturate(0%)"
        anime({
            targets : effect_div,
            //backgroundColor: ["rgba(225,225,225,1)", "rgba(225,225,225,0)"],
            opacity: [.8,0],
            duration: time,
            easing: "easeInCirc"
        })     
    }

    blockTransition(duration = 125, resolution = 10, easing = 'linear', delay = 0, reverse = false, filter = [0,0,0,0], epsilon = 255){
        this.forEach(resolution, (instance, data, pixel_data) => {
            var cell_div                   = document.createElement('div')
            cell_div.style.position        = 'absolute';
            cell_div.style.backgroundColor = "rgb(" + pixel_data[0] +',' + pixel_data[1] +','+ pixel_data[2] + ',' + pixel_data[3]+ ")"
            cell_div.style.width           = data.sx + "px";
            cell_div.style.height          = data.sy + "px";
            cell_div.style.left            = data.x + "px";
            cell_div.style.top             = data.y + "px"
            cell_div.innerHTML             = pixel_data[1]
            cell_div.style.fontSize        = "10px";
            cell_div.style.color           = "rgb(" + pixel_data[2] + ',' + 1 + ")"
            cell_div.style.overflow        = "hidden"
            cell_div.style.fontFamily      = "Neue Machina Light"
            cell_div.style.borderTop       = "solid 1px black"
            cell_div.style.borderLeft      = "solid 1px black"
            cell_div.classList.add("test_cell")
            instance.element.appendChild(cell_div)
            anime({
                targets: cell_div,
                keyframes: [
                    {
                        opacity: 1,
                        duration: duration/2 * ((data.index+1)/1000),
                        easing: easing,
                    },
                    {
                        opacity: 0,
                        duration: duration * ((data.index+1)/1000),
                        easing: easing,
                    },
                ],
                delay : delay,
                complete : () => {
                    cell_div.remove()
                }
            })
        }, reverse, filter, epsilon);
    }
    
    async checkpoints(resolution = 20, callback = () => {}, ckp = [], epsilon = 25, reverse = false, filter = [0,0,0,255], filter_epsilon = 255){
        await this.forEach(resolution, (instance, data, pixel_data) => {
            if (ckp == 'all'){
                callback(instance, data, pixel_data);
            } else {
                for (var point of ckp){
                    if (data.x > point.x - epsilon && data.x < point.x + epsilon){
                        if (data.y > point.y - epsilon && data.y < point.y + epsilon){
                            callback(instance, data, pixel_data);
                        }
                    }
                }
            }
        }, reverse, filter, filter_epsilon);
    }
    
    async glitchTransition(res, bg = "red"){
        res = 8;
        this.overlay(800)
        await this.textTransition(res, bg);
        var ctx      = this.context
        var rr_tw    = this.img.naturalWidth / ctx.width ;
        var rr_th    = this.img.naturalHeight / ctx.height;
        var coef = 1.5
        var coef1 = .5
        await this.forEach(
            res,
            (instance, data, pixel_data) => {
                setTimeout(() => {
                    ctx.drawImage(this.img,   data.x*rr_tw, data.y*rr_th, data.sx*rr_tw*((Math.random() + coef1) * coef), data.sy*rr_th*((Math.random() + coef1) * coef),   data.x, data.y, data.sx, data.sy)
                }, 50 + (data.index*3)/2)
                setTimeout(() => {
                    ctx.drawImage(this.img,   data.x*rr_tw, data.y*rr_th, data.sx*rr_tw*((Math.random() + coef1) * coef), data.sy*rr_th*((Math.random() + coef1) * coef),   data.x, data.y, data.sx, data.sy)
                }, 200 + (data.index*3)/2)

                setTimeout(() => {
                    ctx.clearRect(data.x, data.y, data.sx, data.sy)
                }, 700 + (data.index*3)/4)
                setTimeout(() => {
                    ctx.drawImage(this.img,   data.x*rr_tw, data.y*rr_th, data.sx*rr_tw, data.sy*rr_th,   data.x, data.y, data.sx, data.sy)
                }, 800 + (data.index*3)/4)
            },
            false,
            [255,255,255,1],
            9999
        ).then(() => {
            setTimeout(() => {
                ctx.clearRect(0, 0, ctx.width, ctx.height)
                ctx.drawImage(this.img, 0, 0, ctx.width, ctx.height)
            }, 2000)
        });
    }

    async textTransition(res, bg = "red"){
        res = 6;
        await this.checkpoints(
            res,
            (instance, data, pixel_data) => {
                var cell_div = document.createElement('div');
                instance.element.appendChild(cell_div);
                cell_div.innerHTML            = "mockup";
                cell_div.style.color          = "red"
                cell_div.style.fontSize       = "1.5dvw"
                cell_div.style.fontFamily     = "Neue Montreal Regular"
                cell_div.style.position       = 'absolute';
                cell_div.style.zIndex         = 100;
                cell_div.style.backdropFilter = "hue-rotate(0deg)"
                cell_div.style.width          = data.sx + "px";
                cell_div.style.height         = data.sy + "px";
                cell_div.style.left           = data.x + "px";
                cell_div.style.top            = data.y + "px";
                cell_div.style.display        = "flex"
                cell_div.style.alignItems     = "center"
                cell_div.style.justifyContent = "center"


                anime({
                    targets       : cell_div,
                    backdropFilter: ["hue-rotate(360deg)", "hue-rotate(0deg)"],
                    duration      : 1000,
                    delay         : 100 + (data.index*50)/2,
                    easing        : "easeInOutCirc",
                    complete: () => {
                        cell_div.style.backgroundColor = bg
                        cell_div.style.color          = "white"
                    }

                })

                anime({
                    targets : cell_div,
                    opacity : [1,0],
                    duration: 2500,
                    delay   : 600 + (data.index*50)/4,
                    easing : "easeInOutCirc",
                    complete: () => {
                        cell_div.remove();
                    }
                })

            },
            //[{x: 0, y: 0},{x: this.canvas.width/2, y: this.canvas.height/2},{x: this.canvas.width, y: this.canvas.height}],
            [{x: this.randInt(0, this.canvas.width),y: this.randInt(0, this.canvas.height)},{x: this.randInt(0, this.canvas.width),y: this.randInt(0, this.canvas.height)},{x: this.randInt(0, this.canvas.width),y: this.randInt(0, this.canvas.height)},{x: this.randInt(0, this.canvas.width),y: this.randInt(0, this.canvas.height)}],
            95,
            false,
            [255,255,255,255],
            9999
        );
    }
}
