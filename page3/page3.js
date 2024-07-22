
const PAGE3_BUILDER = new Page(3);
PAGE3_BUILDER.pd             = {
    holder    : document.querySelector('#i4'),
    includer  : document.querySelector('#page3include'),
    
    p1_image1 : document.querySelector('#p1_image1'),
    p1_img_obj: null,

    p1_img_src       : "http://127.0.0.1:5500/page3/mock-up.png",
    p1_img_src_mobile: "http://127.0.0.1:5500/page3/mock-up.png",

    p1_img_map : {
        0 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669934fd06edecbe7ce63744_mock-up.webp`,
        1 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669934fdbf6ad0ae92d90f38_mock-up-mobile.webp`,
        2 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669934fd06edecbe7ce63744_mock-up.webp`,
        3 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669934fdbf6ad0ae92d90f38_mock-up-mobile.webp`,
    },

    paper1 : null,
    image_path_div : document.querySelector("#p1_image_path"),
    p1_description3 : document.querySelector("#p1_description3"),
    p1_path_class : "rails_1",

    pathy1 : null,
    pathy2 : null,

    ip_div_bb : null,
}
PAGE3_BUILDER.load_handler   = async (p3d) => {
    
    p3d.p1_img_obj = new ImageObject(
        element  = p3d.p1_image1,
        img      = await PAGE3_BUILDER.checkImage(p3d.p1_img_map[PAGE3_BUILDER.device]),
        id       = 0
    );

    p3d.p1_img_obj.draw();

    p3d.paper1 = new Paper(p3d.image_path_div);
    p3d.ip_div_bb = p3d.image_path_div.getBoundingClientRect()
    p3d.pathy1 = {
        0 : [
            {cmd:"Move",x:p3d.ip_div_bb.width/8,y:p3d.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:p3d.ip_div_bb.width - p3d.ip_div_bb.width/4,y:p3d.ip_div_bb.height/2,
                c1x:p3d.ip_div_bb.width/2, c1y:p3d.ip_div_bb.height/2,
                c2x:p3d.ip_div_bb.width/16, c2y:p3d.ip_div_bb.height/1.1,
            }
        ],
        1 : [
            {cmd:"Move",x:p3d.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:p3d.ip_div_bb.width/2,y:p3d.ip_div_bb.height/2 + p3d.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:p3d.ip_div_bb.width, c2y:p3d.ip_div_bb.height/2,
            }
        ],
        2 : [
            {cmd:"Move",x:p3d.ip_div_bb.width/8,y:p3d.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:p3d.ip_div_bb.width - p3d.ip_div_bb.width/4,y:p3d.ip_div_bb.height/2,
                c1x:p3d.ip_div_bb.width/2, c1y:p3d.ip_div_bb.height,
                c2x:p3d.ip_div_bb.width/8, c2y:p3d.ip_div_bb.height/2,
            }
        ],
        3 : [
            {cmd:"Move",x:p3d.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:p3d.ip_div_bb.width/2,y:p3d.ip_div_bb.height/2 + p3d.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:p3d.ip_div_bb.width, c2y:p3d.ip_div_bb.height/2,
            }
        ],
    }
    p3d.paper1.makePath(0, p3d.pathy1[PAGE3_BUILDER.device])
    p3d.paper1.paths[0].attr('class', p3d.p1_path_class);

    

}
PAGE3_BUILDER.scroll_handler = async (p3d, ss, delta_ss) => {
    var scroll_amount_st        = ss[0];
    var page2_scroll_amount_st  = ss[1];
    if (scroll_amount_st == 2 && page2_scroll_amount_st == 1){

        anime({
            targets: p3d.p1_image1,
            left : ["150px","0px"],
            duration : 400,
            easing: "easeInOutQuad"
        })

        p3d.p1_img_obj.fade([0,1], 300)
        // IMAGE GLITCH TRANSITION
        await p3d.p1_img_obj.glitchTransition(5);
        
        p3d.ip_div_bb = p3d.image_path_div.getBoundingClientRect()
        p3d.pathy2 = {
            0 : [
                {cmd:"Move",x:p3d.ip_div_bb.width/8,y:p3d.ip_div_bb.height/2},
                {cmd:"CubicBezier",
                    x:p3d.ip_div_bb.width - p3d.ip_div_bb.width/4,y:p3d.ip_div_bb.height/2,
                    c1x:p3d.ip_div_bb.width/2, c1y:p3d.ip_div_bb.height,
                    c2x:p3d.ip_div_bb.width/2, c2y:p3d.ip_div_bb.height/2,
                }
            ],
            1 : [
                {cmd:"Move",x:p3d.ip_div_bb.width/2,y:5},
                {cmd:"CubicBezier",
                    x:p3d.ip_div_bb.width/2,y:p3d.ip_div_bb.height/2 + p3d.ip_div_bb.height/4,
                    c1x:0, c1y:0,
                    c2x:p3d.ip_div_bb.width, c2y:p3d.ip_div_bb.height/2,
                }
            ],
            2 : [
                {cmd:"Move",x:p3d.ip_div_bb.width/8,y:p3d.ip_div_bb.height/2},
                {cmd:"CubicBezier",
                    x:p3d.ip_div_bb.width - p3d.ip_div_bb.width/4,y:p3d.ip_div_bb.height/2,
                    c1x:p3d.ip_div_bb.width/2, c1y:p3d.ip_div_bb.height,
                    c2x:p3d.ip_div_bb.width/2, c2y:p3d.ip_div_bb.height/2,
                }
            ],
            3 : [
                {cmd:"Move",x:p3d.ip_div_bb.width/2,y:5},
                {cmd:"CubicBezier",
                    x:p3d.ip_div_bb.width/2,y:p3d.ip_div_bb.height/2 + p3d.ip_div_bb.height/4,
                    c1x:0, c1y:0,
                    c2x:p3d.ip_div_bb.width, c2y:p3d.ip_div_bb.height/2,
                }
            ],
        }

        var testy = p3d.paper1.paths[0].animate({path : p3d.paper1.rparse_coords(p3d.pathy2[PAGE3_BUILDER.device])}, 800, 'cubic-bezier(.65,.34,.2,.99)')
        p3d.paper1.elementFollowPath(testy.attr('path'), p3d.p1_description3, [0,1], 800, easing = 'cubicBezier(.65,.34,.2,.99)', loop = false, delay = 0, autoplay = true);
    }
}
PAGE3_BUILDER.resize_handler = async (p3d) => {

    p3d.p1_img_obj.clear();
    p3d.p1_img_obj._img = await PAGE3_BUILDER.checkImage(p3d.p1_img_map[PAGE3_BUILDER.device])
    p3d.p1_img_obj.draw();

    p3d.ip_div_bb = p3d.image_path_div.getBoundingClientRect()
    p3d.paper1.paper.setSize(p3d.ip_div_bb.width, p3d.ip_div_bb.height)
    p3d.pathy1 = {
        0 : [
            {cmd:"Move",x:p3d.ip_div_bb.width/8,y:p3d.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:p3d.ip_div_bb.width - p3d.ip_div_bb.width/4,y:p3d.ip_div_bb.height/2,
                c1x:p3d.ip_div_bb.width/2, c1y:p3d.ip_div_bb.height/2,
                c2x:p3d.ip_div_bb.width/16, c2y:p3d.ip_div_bb.height/1.1,
            }
        ],
        1 : [
            {cmd:"Move",x:p3d.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:p3d.ip_div_bb.width/2,y:p3d.ip_div_bb.height/2 + p3d.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:p3d.ip_div_bb.width, c2y:p3d.ip_div_bb.height/2,
            }
        ],
        2 : [
            {cmd:"Move",x:p3d.ip_div_bb.width/8,y:p3d.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:p3d.ip_div_bb.width - p3d.ip_div_bb.width/4,y:p3d.ip_div_bb.height/2,
                c1x:p3d.ip_div_bb.width/2, c1y:p3d.ip_div_bb.height,
                c2x:p3d.ip_div_bb.width/8, c2y:p3d.ip_div_bb.height/2,
            }
        ],
        3 : [
            {cmd:"Move",x:p3d.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:p3d.ip_div_bb.width/2,y:p3d.ip_div_bb.height/2 + p3d.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:p3d.ip_div_bb.width, c2y:p3d.ip_div_bb.height/2,
            }
        ],
    }
    p3d.paper1.updatePath(0, p3d.pathy1[PAGE3_BUILDER.device])
}