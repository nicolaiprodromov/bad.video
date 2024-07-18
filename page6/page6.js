
const PAGE6_BUILDER = new Page(6);
PAGE6_BUILDER.pd             = {
    holder    : document.querySelector('#i6-1'),
    includer  : document.querySelector('#page6include'),
    
    p1_image1 : document.querySelector('#p1_image14'),
    p1_img_obj: null,
    p1_img_src: "http://127.0.0.1:5500/page6/Asset 4.png",

    p1_img_map : {
        0 : `${PAGE6_BUILDER.local_url}landscape_big.png`,
        1 : `${PAGE6_BUILDER.local_url}landscape_small 4.png`,
        2 : `${PAGE6_BUILDER.local_url}portrait_big.png`,
        3 : `${PAGE6_BUILDER.local_url}portrait_small.png`,
    },
    paper1 : null,
    image_path_div : document.querySelector("#p1_image_path2"),
    p1_description5 : document.querySelector("#p1_description5"),
    p1_path_class : "rails_1",

    pathy1 : null,
    pathy2 : null,

    ip_div_bb : null,
}
PAGE6_BUILDER.load_handler   = async (p6d) => {

    p6d.p1_img_obj = new ImageObject(
        element  = p6d.p1_image1,
        img      = await PAGE6_BUILDER.checkImage(p6d.p1_img_map[PAGE6_BUILDER.device]),
        id       = 0,
    );
    p6d.p1_img_obj.draw();

    p6d.paper1 = new Paper(p6d.image_path_div);
    p6d.ip_div_bb = p6d.image_path_div.getBoundingClientRect()
    p6d.pathy1 = {
        0 : [
            {cmd:"Move",x:p6d.ip_div_bb.width/8,y:p6d.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:p6d.ip_div_bb.width - p6d.ip_div_bb.width/4,y:p6d.ip_div_bb.height/2,
                c1x:p6d.ip_div_bb.width/2, c1y:p6d.ip_div_bb.height/2,
                c2x:p6d.ip_div_bb.width/16, c2y:p6d.ip_div_bb.height/1.1,
            }
        ],
        1 : [
            {cmd:"Move",x:p6d.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:p6d.ip_div_bb.width/2,y:p6d.ip_div_bb.height/2 + p6d.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:p6d.ip_div_bb.width, c2y:p6d.ip_div_bb.height/2,
            }
        ],
        2 : [
            {cmd:"Move",x:p6d.ip_div_bb.width/8,y:p6d.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:p6d.ip_div_bb.width - p6d.ip_div_bb.width/4,y:p6d.ip_div_bb.height/2,
                c1x:p6d.ip_div_bb.width/2, c1y:p6d.ip_div_bb.height,
                c2x:p6d.ip_div_bb.width/8, c2y:p6d.ip_div_bb.height/2,
            }
        ],
        3 : [
            {cmd:"Move",x:p6d.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:p6d.ip_div_bb.width/2,y:p6d.ip_div_bb.height/2 + p6d.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:p6d.ip_div_bb.width, c2y:p6d.ip_div_bb.height/2,
            }
        ],
    }
    p6d.paper1.makePath(0, p6d.pathy1[PAGE6_BUILDER.device])
    p6d.paper1.paths[0].attr('class', p6d.p1_path_class);

    

}
PAGE6_BUILDER.scroll_handler = async (p6d, ss, delta_ss) => {
    var scroll_amount_st        = ss[0];
    var page2_scroll_amount_st  = ss[1];
    if (scroll_amount_st == 2 && page2_scroll_amount_st == 4){
        anime({
            targets: p6d.p1_image1,
            left : ["-150px","0px"],
            duration : 400,
            easing: "easeInOutQuad"
        })
        p6d.p1_img_obj.fade([0,1], 300)
        p6d.p1_img_obj.scale_y(["0%","100%"], 300, 'easeInOutCirc')
        await p6d.p1_img_obj.glitchTransition(5);

        
        p6d.ip_div_bb = p6d.image_path_div.getBoundingClientRect()
        p6d.pathy2 = {
            0 : [
                {cmd:"Move",x:p6d.ip_div_bb.width/8,y:p6d.ip_div_bb.height/2},
                {cmd:"CubicBezier",
                    x:p6d.ip_div_bb.width - p6d.ip_div_bb.width/4,y:p6d.ip_div_bb.height/2,
                    c1x:p6d.ip_div_bb.width/2, c1y:p6d.ip_div_bb.height,
                    c2x:p6d.ip_div_bb.width/2, c2y:p6d.ip_div_bb.height/2,
                }
            ],
            1 : [
                {cmd:"Move",x:p6d.ip_div_bb.width/2,y:5},
                {cmd:"CubicBezier",
                    x:p6d.ip_div_bb.width/2,y:p6d.ip_div_bb.height/2 + p6d.ip_div_bb.height/4,
                    c1x:0, c1y:0,
                    c2x:p6d.ip_div_bb.width, c2y:p6d.ip_div_bb.height/2,
                }
            ],
            2 : [
                {cmd:"Move",x:p6d.ip_div_bb.width/8,y:p6d.ip_div_bb.height/2},
                {cmd:"CubicBezier",
                    x:p6d.ip_div_bb.width - p6d.ip_div_bb.width/4,y:p6d.ip_div_bb.height/2,
                    c1x:p6d.ip_div_bb.width/2, c1y:p6d.ip_div_bb.height,
                    c2x:p6d.ip_div_bb.width/2, c2y:p6d.ip_div_bb.height/2,
                }
            ],
            3 : [
                {cmd:"Move",x:p6d.ip_div_bb.width/2,y:5},
                {cmd:"CubicBezier",
                    x:p6d.ip_div_bb.width/2,y:p6d.ip_div_bb.height/2 + p6d.ip_div_bb.height/4,
                    c1x:0, c1y:0,
                    c2x:p6d.ip_div_bb.width, c2y:p6d.ip_div_bb.height/2,
                }
            ],
        }

        var testy = p6d.paper1.paths[0].animate({path : p6d.paper1.rparse_coords(p6d.pathy2[PAGE6_BUILDER.device])}, 800, 'cubic-bezier(.65,.34,.2,.99)')
        p6d.paper1.elementFollowPath(testy.attr('path'), p6d.p1_description5, [0,1], 800, easing = 'cubicBezier(.65,.34,.2,.99)', loop = false, delay = 0, autoplay = true);
    }
}
PAGE6_BUILDER.resize_handler = async (p6d) => {

    p6d.p1_img_obj.clear();
    p6d.p1_img_obj._img = await PAGE6_BUILDER.checkImage(p6d.p1_img_map[PAGE6_BUILDER.device])
    p6d.p1_img_obj.draw();

    p6d.ip_div_bb = p6d.image_path_div.getBoundingClientRect()
    p6d.paper1.paper.setSize(p6d.ip_div_bb.width, p6d.ip_div_bb.height)
    p6d.pathy1 = {
        0 : [
            {cmd:"Move",x:p6d.ip_div_bb.width/8,y:p6d.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:p6d.ip_div_bb.width - p6d.ip_div_bb.width/4,y:p6d.ip_div_bb.height/2,
                c1x:p6d.ip_div_bb.width/2, c1y:p6d.ip_div_bb.height/2,
                c2x:p6d.ip_div_bb.width/16, c2y:p6d.ip_div_bb.height/1.1,
            }
        ],
        1 : [
            {cmd:"Move",x:p6d.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:p6d.ip_div_bb.width/2,y:p6d.ip_div_bb.height/2 + p6d.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:p6d.ip_div_bb.width, c2y:p6d.ip_div_bb.height/2,
            }
        ],
        2 : [
            {cmd:"Move",x:p6d.ip_div_bb.width/8,y:p6d.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:p6d.ip_div_bb.width - p6d.ip_div_bb.width/4,y:p6d.ip_div_bb.height/2,
                c1x:p6d.ip_div_bb.width/2, c1y:p6d.ip_div_bb.height,
                c2x:p6d.ip_div_bb.width/8, c2y:p6d.ip_div_bb.height/2,
            }
        ],
        3 : [
            {cmd:"Move",x:p6d.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:p6d.ip_div_bb.width/2,y:p6d.ip_div_bb.height/2 + p6d.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:p6d.ip_div_bb.width, c2y:p6d.ip_div_bb.height/2,
            }
        ],
    }
    p6d.paper1.updatePath(0, p6d.pathy1[PAGE6_BUILDER.device])
}