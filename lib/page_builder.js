
var PAGES_NPXYZ = []
class Page{
    constructor(id, builder = () => {}){
        this.build_time     = new Date().toLocaleString();
        this.id             = id;
        this.base_url       = "https://bad.video/"
        this.local_url      = `https://bad.video/page${this.id}/`
        this.img_fallback   = "https://wdrv.com/wp-content/uploads/2022/03/M_RickAstleyWheneverYouNeedSomebody630_032422.jpg"
        this._builder       = builder;
        this.local_data     = {}
        this.resize_handler = (pd) => {}
        this.scroll_handler = (pd, ss, delta_ss) => {}
        this.load_handler   = (pd) => {}
        this.deviceMap      = {
            0: "LANDSCAPE_DESKTOP",
            1: "PORTRAIT_DESKTOP",
            2: "LANDSCAPE_MOBILE",
            3: "PORTRAIT_MOBILE",
        }
        this.ratio_map = {
            0: {0:16, 1:9,  0:1.777,  1: 0.5625},
            1: {0:9 , 1:16, 0:0.5625, 1: 1.777},
            2: {0:16, 1:9,  0:1.777,  1: 0.5625},
            3: {0:9 , 1:16, 0:0.5625, 1: 1.777},
        }
        
        this.device_min = 320;
        this.device_max = 1280;
        PAGES_NPXYZ.push(this);
        //console.log(`Page: [${this.id}] [${this.build_time}]`);

        setTimeout(() => {
            this.element  = document.querySelector(`#npxyz_pc${this.id}`);
            console.log(`Page: [${this.id}]`, this.element);
        }, 500)

        this.load_count = 0;
        this.first_scroll_handler = (pd) => {}
    }
    toggleFullScreen(elem) {
        // ## The below if statement seems to work better ## if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.msfullscreenElement && document.msfullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
            if (elem.requestFullScreen) {
                elem.requestFullScreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullScreen) {
                elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }
    async checkImage(url){
        url = encodeURI(url)
        var image = new Image();
        var img_load = "";
        image.src = url;
        
        var imgw = new Promise((resolve) => {
            image.onload = () => resolve(image.width < 0 ? 0 : 1);
            image.onerror = () => resolve(0);
        })

        await imgw.then((imgw1) => {
            if (imgw1 == 0) {
                img_load = this.img_fallback;
                console.log("❌💔 NOT FOUND ->", url, "PAGE:", this.id, "💔💔💔💔💔💔💔💔💔💔❌")
                image.remove()
            } else {
                img_load = url;
                //console.log("FOUND ->", url, "PAGE:", this.id)
                image.remove()
            }
        })

        return img_load
    }
    deviceCheck(){
        if (window.innerWidth >= this.device_max){
            this.device = 0 // LANDSCAPE DESKTOP/TABLET
            if (window.innerHeight > window.innerWidth){
                this.device = 1 // PORTRAIT DESKTOP/TABLET
            }
        }
        else if (window.innerWidth < this.device_max && window.innerHeight <= window.innerWidth){
            this.device = 2 // PORTRAIT MOBILE
        }
        else if (window.innerWidth < this.device_max && window.innerHeight > window.innerWidth){
            this.device = 3 // LANDSCAPE MOBILE
        }
    }
    debounce(func){
        var timer;
        return function(event){
          if(timer) clearTimeout(timer);
          timer = setTimeout(func,100,event);
        };
    }
    build(){
        console.log(`Building Page: [${this.id}]`);
        this.deviceCheck();
        this._builder();
    }
    async buildPage(){
        
        var pd = this.pd
        this.deviceCheck();
        //console.log("DEVICE CHECK", this.id, this.device, this.deviceMap[this.device])

        SCROLL_TRACKER.addHandler('set', (ss, delta_ss) => {
            if (this.scroll_handler === null){
                return null
            }

            var _scroll_delay = this.id;

            this.page_audio_load.play();

            this.load_count ++;
            if (this.load_count == 1){
                setTimeout(() => {
                    this.first_scroll_handler(pd);
                    _scroll_delay += 50;
                }, 10);
            }

            setTimeout(() => {
                if (this.scroll_handler instanceof Function){
                    this.scroll_handler(pd, ss, delta_ss);
                } else if (this.scroll_handler instanceof Array){
                    for (var handler_ of this.scroll_handler){
                        handler_(pd, ss, delta_ss);
                    }
                }
            }, _scroll_delay);
        })

        window.addEventListener('resize', this.debounce(() => {
            this.deviceCheck();
            if (this.resize_handler === null){
                return null
            }
            setTimeout(() => {
                if (this.resize_handler instanceof Function){
                    this.resize_handler(pd);
                } else if (this.resize_handler instanceof Array){
                    for (var handler_ of this.resize_handler){
                        handler_(pd);
                    }
                }
            }, this.id)
        }));

        window.addEventListener('load', () => {
            if (this.load_handler === null){
                return null
            }
            setTimeout(() => {
                console.log(`--💥 ⚠ Building Page: [${this.id}] ⚠ 💥--`);
                this.page_audio_load = document.querySelector("#click_page");
                this.page_audio_load.volume = .5;
                this.page_vhs_play = document.querySelector("#vhs_sound");
                this.page_vhs_play.volume = .5;

                if (this.load_handler instanceof Function){
                    this.load_handler(pd);
                } else if (this.load_handler instanceof Array){
                    for (var handler_ of this.load_handler){
                        handler_(pd);
                    }
                }


            }, this.id)
        })
    }
}

