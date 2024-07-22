
const PAGE21_BUILDER = new Page(21);
PAGE21_BUILDER.pd             = {
    holder    : document.querySelector('#i21-1'),
    includer  : document.querySelector('#page21include'),
    
    p1_image1 : document.querySelector('#p4_image14'),
    p1_img_obj: null,
    p1_img_src: "http://127.0.0.1:5500/page6/Asset 4.png",

    p1_img_map : {
        0 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669a472e0e9760f2836b7c0b_thumbnail.webp`,
        1 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669a472e574e0a5fd999dc54_thumbnail-mobile.webp`,
        2 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669a472e0e9760f2836b7c0b_thumbnail.webp`,
        3 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669a472e574e0a5fd999dc54_thumbnail-mobile.webp`,
    },
    paper1 : null,
    image_path_div : document.querySelector("#p4_image_path2"),
    p1_description5 : document.querySelector("#p4_description5"),
    p1_path_class : "rails_1",

    pathy1 : null,
    pathy2 : null,

    ip_div_bb : null,
}
PAGE21_BUILDER.load_handler   = async (p21d) => {


    p21d.p1_img_obj = new ImageObject(
        element  = p21d.p1_image1,
        img      = await PAGE21_BUILDER.checkImage(p21d.p1_img_map[PAGE21_BUILDER.device]),
        id       = 0,
    );
    p21d.p1_img_obj.draw();

    p21d.paper1 = new Paper(p21d.image_path_div);
    p21d.ip_div_bb = p21d.image_path_div.getBoundingClientRect()
    p21d.pathy1 = {
        0 : [
            {cmd:"Move",x:p21d.ip_div_bb.width/8,y:p21d.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:p21d.ip_div_bb.width - p21d.ip_div_bb.width/4,y:p21d.ip_div_bb.height/2,
                c1x:p21d.ip_div_bb.width/2, c1y:p21d.ip_div_bb.height/2,
                c2x:p21d.ip_div_bb.width/16, c2y:p21d.ip_div_bb.height/1.1,
            }
        ],
        1 : [
            {cmd:"Move",x:p21d.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:p21d.ip_div_bb.width/2,y:p21d.ip_div_bb.height/2 + p21d.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:p21d.ip_div_bb.width, c2y:p21d.ip_div_bb.height/2,
            }
        ],
        2 : [
            {cmd:"Move",x:p21d.ip_div_bb.width/8,y:p21d.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:p21d.ip_div_bb.width - p21d.ip_div_bb.width/4,y:p21d.ip_div_bb.height/2,
                c1x:p21d.ip_div_bb.width/2, c1y:p21d.ip_div_bb.height,
                c2x:p21d.ip_div_bb.width/8, c2y:p21d.ip_div_bb.height/2,
            }
        ],
        3 : [
            {cmd:"Move",x:p21d.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:p21d.ip_div_bb.width/2,y:p21d.ip_div_bb.height/2 + p21d.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:p21d.ip_div_bb.width, c2y:p21d.ip_div_bb.height/2,
            }
        ],
    }
    p21d.paper1.makePath(0, p21d.pathy1[PAGE21_BUILDER.device])
    p21d.paper1.paths[0].attr('class', p21d.p1_path_class);

    

}
PAGE21_BUILDER.scroll_handler = async (p21d, ss, delta_ss) => {
    var scroll_amount_st        = ss[0];
    var page17_scroll_amount_st  = ss[4];
    if (scroll_amount_st == 5 && page17_scroll_amount_st == 4){
        p21d.p1_img_obj.fade([0,1], 300)
        // IMAGE GLITCH TRANSITION
        await p21d.p1_img_obj.glitchTransition(5);

        
        p21d.ip_div_bb = p21d.image_path_div.getBoundingClientRect()
        p21d.pathy2 = {
            0 : [
                {cmd:"Move",x:p21d.ip_div_bb.width/8,y:p21d.ip_div_bb.height/2},
                {cmd:"CubicBezier",
                    x:p21d.ip_div_bb.width - p21d.ip_div_bb.width/4,y:p21d.ip_div_bb.height/2,
                    c1x:p21d.ip_div_bb.width/2, c1y:p21d.ip_div_bb.height,
                    c2x:p21d.ip_div_bb.width/2, c2y:p21d.ip_div_bb.height/2,
                }
            ],
            1 : [
                {cmd:"Move",x:p21d.ip_div_bb.width/2,y:5},
                {cmd:"CubicBezier",
                    x:p21d.ip_div_bb.width/2,y:p21d.ip_div_bb.height/2 + p21d.ip_div_bb.height/4,
                    c1x:0, c1y:0,
                    c2x:p21d.ip_div_bb.width, c2y:p21d.ip_div_bb.height/2,
                }
            ],
            2 : [
                {cmd:"Move",x:p21d.ip_div_bb.width/8,y:p21d.ip_div_bb.height/2},
                {cmd:"CubicBezier",
                    x:p21d.ip_div_bb.width - p21d.ip_div_bb.width/4,y:p21d.ip_div_bb.height/2,
                    c1x:p21d.ip_div_bb.width/2, c1y:p21d.ip_div_bb.height,
                    c2x:p21d.ip_div_bb.width/2, c2y:p21d.ip_div_bb.height/2,
                }
            ],
            3 : [
                {cmd:"Move",x:p21d.ip_div_bb.width/2,y:5},
                {cmd:"CubicBezier",
                    x:p21d.ip_div_bb.width/2,y:p21d.ip_div_bb.height/2 + p21d.ip_div_bb.height/4,
                    c1x:0, c1y:0,
                    c2x:p21d.ip_div_bb.width, c2y:p21d.ip_div_bb.height/2,
                }
            ],
        }

        var testy = p21d.paper1.paths[0].animate({path : p21d.paper1.rparse_coords(p21d.pathy2[PAGE21_BUILDER.device])}, 800, 'cubic-bezier(.65,.34,.2,.99)')
        p21d.paper1.elementFollowPath(testy.attr('path'), p21d.p1_description5, [0,1], 800, easing = 'cubicBezier(.65,.34,.2,.99)', loop = false, delay = 0, autoplay = true);
    }
}
PAGE21_BUILDER.resize_handler = async (p21d) => {

    p21d.p1_img_obj.clear();
    p21d.p1_img_obj._img = await PAGE21_BUILDER.checkImage(p21d.p1_img_map[PAGE21_BUILDER.device])
    p21d.p1_img_obj.draw();

    p21d.ip_div_bb = p21d.image_path_div.getBoundingClientRect()
    p21d.paper1.paper.setSize(p21d.ip_div_bb.width, p21d.ip_div_bb.height)
    p21d.pathy1 = {
        0 : [
            {cmd:"Move",x:p21d.ip_div_bb.width/8,y:p21d.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:p21d.ip_div_bb.width - p21d.ip_div_bb.width/4,y:p21d.ip_div_bb.height/2,
                c1x:p21d.ip_div_bb.width/2, c1y:p21d.ip_div_bb.height/2,
                c2x:p21d.ip_div_bb.width/16, c2y:p21d.ip_div_bb.height/1.1,
            }
        ],
        1 : [
            {cmd:"Move",x:p21d.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:p21d.ip_div_bb.width/2,y:p21d.ip_div_bb.height/2 + p21d.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:p21d.ip_div_bb.width, c2y:p21d.ip_div_bb.height/2,
            }
        ],
        2 : [
            {cmd:"Move",x:p21d.ip_div_bb.width/8,y:p21d.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:p21d.ip_div_bb.width - p21d.ip_div_bb.width/4,y:p21d.ip_div_bb.height/2,
                c1x:p21d.ip_div_bb.width/2, c1y:p21d.ip_div_bb.height,
                c2x:p21d.ip_div_bb.width/8, c2y:p21d.ip_div_bb.height/2,
            }
        ],
        3 : [
            {cmd:"Move",x:p21d.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:p21d.ip_div_bb.width/2,y:p21d.ip_div_bb.height/2 + p21d.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:p21d.ip_div_bb.width, c2y:p21d.ip_div_bb.height/2,
            }
        ],
    }
    p21d.paper1.updatePath(0, p21d.pathy1[PAGE21_BUILDER.device])
}