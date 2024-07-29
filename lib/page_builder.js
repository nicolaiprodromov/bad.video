import { DotLottie, DotLottieWorker } from "https://esm.sh/@lottiefiles/dotlottie-web";

var dotLottie1;
var PAGES_NPXYZ = []
class Page{
    constructor(id, builder = () => {}){
        this.debug          = false;
        this.build_time     = new Date().toLocaleString();
        this.id             = id;
        this.base_url       = "https://bad.video/";
        this.local_url      = `https://bad.video/page${this.id}/`;
        this.img_fallback   = "https://wdrv.com/wp-content/uploads/2022/03/M_RickAstleyWheneverYouNeedSomebody630_032422.jpg";
        this._builder       = builder;
        this.local_data     = {};
        this.resize_handler = (pd) => {};
        this.scroll_handler = (pd, ss, delta_ss) => {};
        this.load_handler   = (pd) => {};
        this.deviceMap      = {
            0: "LANDSCAPE_DESKTOP",
            1: "PORTRAIT_DESKTOP",
            2: "LANDSCAPE_MOBILE",
            3: "PORTRAIT_MOBILE",
        };
        this.ratio_map = {
            0: {0:16, 1:9,  0:1.777,  1: 0.5625},
            1: {0:9 , 1:16, 0:0.5625, 1: 1.777},
            2: {0:16, 1:9,  0:1.777,  1: 0.5625},
            3: {0:9 , 1:16, 0:0.5625, 1: 1.777},
        };
        
        this.device_min = 320;
        this.device_max = 1280;
        PAGES_NPXYZ.push(this);

        setTimeout(() => {
            this.element  = document.querySelector(`#npxyz_pc${this.id}`);
            if (this.debug){
                console.log(`Page: [${this.id}]`, this.element);
                console.log(`[Page ${this.id}] - ${this.build_time}]`);
            }
        }, 500);

        this.load_count = 0;
        this.first_scroll_handler = (pd) => {};
        this.resized = false;
        this.built = false;

        
        if (this.id == 0){
            this.par_id = 0
            this.child_id = 0;
        } else if (this.id ==1){
            this.par_id = 1
            this.child_id = 0;
        } else if (this.id > 1 && this.id < 7){
            this.par_id = 2
            this.child_id = 0;
            if (this.id == 3){
                this.child_id = 1
            }else if (this.id == 4){
                this.child_id = 2
            }else if (this.id == 5){
                this.child_id = 3
            }else if (this.id == 6){
                this.child_id = 4
            }
        } else if (this.id > 6 && this.id < 12){
            this.par_id = 3
            this.child_id = 0;
            if (this.id == 8){
                this.child_id = 1
            }else if (this.id == 9){
                this.child_id = 2
            }else if (this.id == 10){
                this.child_id = 3
            }else if (this.id == 11){
                this.child_id = 4
            }
        } else if (this.id > 11 && this.id < 17){
            this.par_id = 4
            this.child_id = 0;
            if (this.id == 13){
                this.child_id = 1
            }else if (this.id == 14){
                this.child_id = 2
            }else if (this.id == 15){
                this.child_id = 3
            }else if (this.id == 16){
                this.child_id = 4
            }
        } else if (this.id > 16 && this.id < 22){
            this.par_id = 5
            this.child_id = 0;
            if (this.id == 18){
                this.child_id = 1
            }else if (this.id == 19){
                this.child_id = 2
            }else if (this.id == 20){
                this.child_id = 3
            }else if (this.id == 21){
                this.child_id = 4
            }
        }
        else if (this.id == 22){
            this.par_id = 6;
            this.child_id = 0;
        }
        else if (this.id == 23){
            this.par_id = 7;
            this.child_id = 0;
        }

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
        // this.device_min = 320;
        // this.device_max = 1280;
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
        console.log(`[${this.device}] - ${this.deviceMap[this.device]}`)
    }
    debounce(func){
        var timer;
        return function(event){
          if(timer) clearTimeout(timer);
          timer = setTimeout(func,100,event);
        };
    }
    build(){
        if (this.debug){
            console.log(`Building Page: [${this.id}]`);
        }
        this.deviceCheck();
        this._builder();
    }
    async buildPage(){
        
        var pd = this.pd
        this.deviceCheck();
        //console.log("DEVICE CHECK", this.id, this.device, this.deviceMap[this.device])

        SCROLL_TRACKER.addHandler('set', async (ss, delta_ss) => {

            if (this.scroll_handler === null){
                return null
            }


            this.ss_map = {
                0 : 0,
                1 : 0,
                2 : ss[1],
                3 : ss[2],
                4 : ss[3],
                5 : ss[4],
                6 : 0,
                7 : 0,
            }
            
            if (this.id == 2){
                if (ss[0] !== 0){
                    dotLottie1.play();
                } else {
                    dotLottie1.stop();
                    this.page_trans_anim_div.style.display = "none"
                }
            }
            
            if(ss[0] == this.par_id){
                //console.log("PARENT");
                if (this.resized == true && this.resize_handler != null && this.built == true){
                    console.log(`[Page ${this.id}] RESIZED`)
                    this.resize_handler(pd, ss);
                    this.resized = false;
                }
                this.load_count ++;
                if (this.load_count == 1){
                    console.log("BUILD")
                    this.debug ? console.log(`--💥 ⚠ Building Page: [${this.id}] ⚠ 💥--`) : null;
                    this.first_scroll_handler(pd);
                    this.built = true;
                }
                if (this.child_id == this.ss_map[this.par_id] && this.load_count > 1){
                    console.log("CHILD")
                    if (this.device < 2){
                        if(this.id == 0 || this.id == 1 || this.id == 2 || this.id == 7 || this.id == 12 || this.id == 17 || this.id == 22 || this.id == 23){
                            this.page_audio_load.play();
                        } else {
                            this.page_audio_load1.play();
                        }
                    }
                    this.scroll_handler(pd, ss, delta_ss);
                }
            }
        })

        window.addEventListener('resize', this.debounce(() => {
            this.deviceCheck();
            this.resized = true;
        }));

        window.addEventListener('load', () => {
            if (this.id == 2){
                var page_trans_anim_canvas = document.querySelector("#transition_anim_canvas");
                this.page_trans_anim_div   = document.querySelector("#transition_anim");
                var _page_trans_anim_div = document.querySelector("#transition_anim");
                var lottie_file1 = "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/66a43a62489be3dd73f149ba_logo_anim.json";
                dotLottie1 = new DotLottieWorker({
                    autoplay: false,
                    loop: false,
                    canvas : page_trans_anim_canvas,
                    src : lottie_file1,
                    workerId: 'worker-2'
                });
                dotLottie1.addEventListener('play', () => {
                    _page_trans_anim_div.style.display = "flex"
                    anime({
                        targets : _page_trans_anim_div,
                        bottom : ["-50%", "7%"],
                        duration: 300,
                        easing : "easeInOutQuad"
                    })
                })
                dotLottie1.addEventListener('complete', () => {
                    anime({
                        targets : _page_trans_anim_div,
                        bottom : ["7%", "-50%"],
                        duration: 300,
                        easing : "easeInOutQuad",
                        complete : () => {
                            _page_trans_anim_div.style.display = "none"
                        }
                    })
                })
            }

            if (this.load_handler === null){
                return null
            }
            setTimeout(() => {
                this.page_audio_load = document.querySelector("#click_page");
                this.page_audio_load.volume = .3;
                this.page_audio_load1 = document.querySelector("#click_page1");
                this.page_audio_load1.volume = .2;
                this.page_vhs_play = document.querySelector("#vhs_sound");
                this.page_vhs_play.volume = .5;

                this.load_handler(pd);


            }, this.id)
        })
    }
}


export {
    Page,
    PAGES_NPXYZ
}