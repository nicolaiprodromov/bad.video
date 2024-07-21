

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

    async glitchTransition(res){
        res = 8;
        await this.textTransition(res);
        var ctx      = this.context
        var rr_tw    = this.img.naturalWidth / ctx.width ;
        var rr_th    = this.img.naturalHeight / ctx.height;
        await this.forEach(
            res,
            (instance, data, pixel_data) => {
                setTimeout(() => {
                    ctx.drawImage(this.img,   data.x*rr_tw, data.y*rr_th, data.sx*rr_tw*((Math.random() + .5) * .75), data.sy*rr_th*((Math.random() + .5) * .75),   data.x, data.y, data.sx, data.sy)
                }, 100 + (data.index*30)/4)
                setTimeout(() => {
                    ctx.drawImage(this.img,   data.x*rr_tw, data.y*rr_th, data.sx*rr_tw*((Math.random() + .5) * .75), data.sy*rr_th*((Math.random() + .5) * .75),   data.x, data.y, data.sx, data.sy)
                }, 200 + (data.index*30)/4)
                setTimeout(() => {
                    ctx.drawImage(this.img,   data.x*rr_tw, data.y*rr_th, data.sx*rr_tw*((Math.random() + .5) * .75), data.sy*rr_th*((Math.random() + .5) * .75),   data.x, data.y, data.sx, data.sy)
                }, 300 + (data.index*30)/4)

                setTimeout(() => {
                    ctx.clearRect(data.x, data.y, data.sx, data.sy)
                }, 600 + (data.index*40)/4)
                setTimeout(() => {
                    ctx.drawImage(this.img,   data.x*rr_tw, data.y*rr_th, data.sx*rr_tw, data.sy*rr_th,   data.x, data.y, data.sx, data.sy)
                }, 700 + (data.index*50)/4)
            },
            false,
            [255,255,255,1],
            9999
        ).then(() => {
            setTimeout(() => {
                ctx.clearRect(0, 0, ctx.width, ctx.height)
                ctx.drawImage(this.img, 0, 0, ctx.width, ctx.height)
            }, 1000)
        });
    }

    async textTransition(res){
        await this.checkpoints(
            res,
            (instance, data, pixel_data) => {
                var cell_div = document.createElement('div');
                cell_div.innerHTML             = "mockup";
                cell_div.style.color           = "white"
                cell_div.style.fontSize        = "1.5dvw"
                cell_div.style.fontFamily      = "Neue Montreal Regular"
                cell_div.style.position        = 'absolute';
                cell_div.style.backgroundColor = "red"
                cell_div.style.width           = data.sx + "px";
                cell_div.style.height          = data.sy + "px";
                cell_div.style.left            = data.x + "px";
                cell_div.style.top             = data.y + "px";

                instance.element.appendChild(cell_div);

                anime({
                    targets : cell_div,
                    opacity : [1,0],
                    duration: 5000,
                    delay   : 800,
                    complete: () => {
                        cell_div.remove();
                    }
                })

            },
            [{x: 0, y: 0},{x: this.canvas.width/2, y: this.canvas.height/2},{x: this.canvas.width, y: this.canvas.height}],
            200,
            false,
            [255,255,255,255],
            9999
        );
    }
}
