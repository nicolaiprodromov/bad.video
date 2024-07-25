import { Page }        from '/lib/page_builder.js';
import { Paper }       from '/lib/svg.js'
import { ImageObject } from '/lib/images_obj.js';

const PAGE15_BUILDER = new Page(15);
PAGE15_BUILDER.pd             = {
    holder    : document.querySelector('#i16'),
    includer  : document.querySelector('#page15include'),
    
    p1_image1 : document.querySelector('#p3_image13'),
    p1_img_obj: null,
    p1_img_src: "/page5/mock-up.png",

    p1_img_map : {
        0 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669a32451c56ac6a51d6f9f5_mock-up.webp`,
        1 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669a324569918beb0df7d3a0_mock-up-mobile.webp`,
        2 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669a32451c56ac6a51d6f9f5_mock-up.webp`,
        3 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669a324569918beb0df7d3a0_mock-up-mobile.webp`,
    },

    paper1 : null,
    image_path_div : document.querySelector("#p3_image_path1"),
    p1_description3 : document.querySelector("#p3_description4"),
    p1_path_class : "rails_1",

    pathy1 : null,
    pathy2 : null,

    ip_div_bb : null,

    watch_znn_vid : document.querySelector("#watch_znn_vid"),
    znn_video : document.querySelector("#znn_video"),
}
PAGE15_BUILDER.load_handler   = async (pd) => {
}
PAGE15_BUILDER.scroll_handler = (pd, ss, delta_ss) => {
    var scroll_amount_st        = ss[0];
    var page12_scroll_amount_st  = ss[3];
    if (scroll_amount_st == 4 && page12_scroll_amount_st == 3){
        pd.znn_video.style.display = "none"
        pd.p1_description3.style.opacity = 1;
        pd.image_path_div.style.opacity = 1;

        anime({
            targets        : document.body,
            backgroundColor: ["rgb(225,225,225)","rgb(0,0,0)"],
            duration       : 10,
            easing         : "easeInCirc"
        })

        pd.p1_img_obj.fade([0,1], 300)
        pd.p1_img_obj.scale_x(["0%","100%"], 300, 'easeInOutCirc')
        
        
        pd.ip_div_bb = pd.image_path_div.getBoundingClientRect()
        pd.pathy2 = {
            0 : [
                {cmd:"Move",x:pd.ip_div_bb.width/8,y:pd.ip_div_bb.height/2},
                {cmd:"CubicBezier",
                    x:pd.ip_div_bb.width - pd.ip_div_bb.width/4,y:pd.ip_div_bb.height/2,
                    c1x:pd.ip_div_bb.width/2, c1y:pd.ip_div_bb.height,
                    c2x:pd.ip_div_bb.width/2, c2y:pd.ip_div_bb.height/2,
                }
            ],
            1 : [
                {cmd:"Move",x:pd.ip_div_bb.width/2,y:5},
                {cmd:"CubicBezier",
                    x:pd.ip_div_bb.width/2,y:pd.ip_div_bb.height/2 + pd.ip_div_bb.height/4,
                    c1x:0, c1y:0,
                    c2x:pd.ip_div_bb.width, c2y:pd.ip_div_bb.height/2,
                }
            ],
            2 : [
                {cmd:"Move",x:pd.ip_div_bb.width/8,y:pd.ip_div_bb.height/2},
                {cmd:"CubicBezier",
                    x:pd.ip_div_bb.width - pd.ip_div_bb.width/4,y:pd.ip_div_bb.height/2,
                    c1x:pd.ip_div_bb.width/2, c1y:pd.ip_div_bb.height,
                    c2x:pd.ip_div_bb.width/2, c2y:pd.ip_div_bb.height/2,
                }
            ],
            3 : [
                {cmd:"Move",x:pd.ip_div_bb.width/2,y:5},
                {cmd:"CubicBezier",
                    x:pd.ip_div_bb.width/2,y:pd.ip_div_bb.height/2 + pd.ip_div_bb.height/4,
                    c1x:0, c1y:0,
                    c2x:pd.ip_div_bb.width, c2y:pd.ip_div_bb.height/2,
                }
            ],
        }

        var testy = pd.paper1.paths[0].animate({path : pd.paper1.rparse_coords(pd.pathy2[PAGE15_BUILDER.device])}, 800, 'cubic-bezier(.65,.34,.2,.99)')
        pd.paper1.elementFollowPath(testy.attr('path'), pd.p1_description3, [0,1], 800, 'cubicBezier(.65,.34,.2,.99)', false, 0, true);
    }
}
PAGE15_BUILDER.resize_handler = async (pd) => {

    pd.p1_img_obj.clear();
    pd.p1_img_obj._img = await PAGE15_BUILDER.checkImage(pd.p1_img_map[PAGE15_BUILDER.device])
    pd.p1_img_obj.draw();

    pd.ip_div_bb = pd.image_path_div.getBoundingClientRect()
    pd.paper1.paper.setSize(pd.ip_div_bb.width, pd.ip_div_bb.height)
    pd.pathy1 = {
        0 : [
            {cmd:"Move",x:pd.ip_div_bb.width/8,y:pd.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:pd.ip_div_bb.width - pd.ip_div_bb.width/4,y:pd.ip_div_bb.height/2,
                c1x:pd.ip_div_bb.width/2, c1y:pd.ip_div_bb.height/2,
                c2x:pd.ip_div_bb.width/16, c2y:pd.ip_div_bb.height/1.1,
            }
        ],
        1 : [
            {cmd:"Move",x:pd.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:pd.ip_div_bb.width/2,y:pd.ip_div_bb.height/2 + pd.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:pd.ip_div_bb.width, c2y:pd.ip_div_bb.height/2,
            }
        ],
        2 : [
            {cmd:"Move",x:pd.ip_div_bb.width/8,y:pd.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:pd.ip_div_bb.width - pd.ip_div_bb.width/4,y:pd.ip_div_bb.height/2,
                c1x:pd.ip_div_bb.width/2, c1y:pd.ip_div_bb.height,
                c2x:pd.ip_div_bb.width/8, c2y:pd.ip_div_bb.height/2,
            }
        ],
        3 : [
            {cmd:"Move",x:pd.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:pd.ip_div_bb.width/2,y:pd.ip_div_bb.height/2 + pd.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:pd.ip_div_bb.width, c2y:pd.ip_div_bb.height/2,
            }
        ],
    }
    pd.paper1.updatePath(0, pd.pathy1[PAGE15_BUILDER.device])
}
PAGE15_BUILDER.first_scroll_handler = async (pd) => {
    

    pd.watch_znn_vid.addEventListener('click', () => {
        PAGE15_BUILDER.page_vhs_play.play();
        //pd.p1_img_obj.glitchTransition(5);
        setTimeout(() => {
            pd.image_path_div.style.opacity = 0;
        }, 300)
        setTimeout(() => {
            pd.p1_image1.style.opacity = 0;
            pd.p1_description3.style.opacity = 0;
        }, 1000)
        setTimeout(() => {
            pd.znn_video.style.display = "block"
        }, 1100)
    })

    pd.p1_img_obj = new ImageObject(
        pd.p1_image1,
        await PAGE15_BUILDER.checkImage(pd.p1_img_map[PAGE15_BUILDER.device]),
        0,
    );
    pd.p1_img_obj.draw();

    pd.paper1 = new Paper(pd.image_path_div);
    pd.ip_div_bb = pd.image_path_div.getBoundingClientRect()
    pd.pathy1 = {
        0 : [
            {cmd:"Move",x:pd.ip_div_bb.width/8,y:pd.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:pd.ip_div_bb.width - pd.ip_div_bb.width/4,y:pd.ip_div_bb.height/2,
                c1x:pd.ip_div_bb.width/2, c1y:pd.ip_div_bb.height/2,
                c2x:pd.ip_div_bb.width/16, c2y:pd.ip_div_bb.height/1.1,
            }
        ],
        1 : [
            {cmd:"Move",x:pd.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:pd.ip_div_bb.width/2,y:pd.ip_div_bb.height/2 + pd.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:pd.ip_div_bb.width, c2y:pd.ip_div_bb.height/2,
            }
        ],
        2 : [
            {cmd:"Move",x:pd.ip_div_bb.width/8,y:pd.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:pd.ip_div_bb.width - pd.ip_div_bb.width/4,y:pd.ip_div_bb.height/2,
                c1x:pd.ip_div_bb.width/2, c1y:pd.ip_div_bb.height,
                c2x:pd.ip_div_bb.width/8, c2y:pd.ip_div_bb.height/2,
            }
        ],
        3 : [
            {cmd:"Move",x:pd.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:pd.ip_div_bb.width/2,y:pd.ip_div_bb.height/2 + pd.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:pd.ip_div_bb.width, c2y:pd.ip_div_bb.height/2,
            }
        ],
    }
    pd.paper1.makePath(0, pd.pathy1[PAGE15_BUILDER.device])
    pd.paper1.paths[0].attr('class', pd.p1_path_class);

}

