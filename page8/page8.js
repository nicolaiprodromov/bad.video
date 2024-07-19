
const PAGE8_BUILDER = new Page(8);
PAGE8_BUILDER.pd             = {
    holder    : document.querySelector('#i9'),
    includer  : document.querySelector('#page8include'),
    
    p1_image1 : document.querySelector('#p2_image1'),
    p1_img_obj: null,

    p1_img_src       : "http://127.0.0.1:5500/page3/mock-up.png",
    p1_img_src_mobile: "http://127.0.0.1:5500/page3/mock-up.png",

    p1_img_map : {
        0 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944d38b757faf9fe1d5b8_mock-up.webp`,
        1 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944d3ce70dcc6c06c0aea_mock-up-mobile.webp`,
        2 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944d38b757faf9fe1d5b8_mock-up.webp`,
        3 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944d3ce70dcc6c06c0aea_mock-up-mobile.webp`,
    },

    paper1 : null,
    image_path_div : document.querySelector("#p2_image_path"),
    p1_description3 : document.querySelector("#p2_description3"),
    p1_path_class : "rails_1",

    pathy1 : null,
    pathy2 : null,

    ip_div_bb : null,
}
PAGE8_BUILDER.load_handler   = async (p8d) => {
    
    p8d.p1_img_obj = new ImageObject(
        element  = p8d.p1_image1,
        img      = await PAGE8_BUILDER.checkImage(p8d.p1_img_map[PAGE8_BUILDER.device]),
        id       = 0,
    );

    p8d.p1_img_obj.draw();

    p8d.paper1 = new Paper(p8d.image_path_div);
    p8d.ip_div_bb = p8d.image_path_div.getBoundingClientRect()
    p8d.pathy1 = {
        0 : [
            {cmd:"Move",x:p8d.ip_div_bb.width/8,y:p8d.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:p8d.ip_div_bb.width - p8d.ip_div_bb.width/4,y:p8d.ip_div_bb.height/2,
                c1x:p8d.ip_div_bb.width/2, c1y:p8d.ip_div_bb.height/2,
                c2x:p8d.ip_div_bb.width/16, c2y:p8d.ip_div_bb.height/1.1,
            }
        ],
        1 : [
            {cmd:"Move",x:p8d.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:p8d.ip_div_bb.width/2,y:p8d.ip_div_bb.height/2 + p8d.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:p8d.ip_div_bb.width, c2y:p8d.ip_div_bb.height/2,
            }
        ],
        2 : [
            {cmd:"Move",x:p8d.ip_div_bb.width/8,y:p8d.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:p8d.ip_div_bb.width - p8d.ip_div_bb.width/4,y:p8d.ip_div_bb.height/2,
                c1x:p8d.ip_div_bb.width/2, c1y:p8d.ip_div_bb.height,
                c2x:p8d.ip_div_bb.width/8, c2y:p8d.ip_div_bb.height/2,
            }
        ],
        3 : [
            {cmd:"Move",x:p8d.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:p8d.ip_div_bb.width/2,y:p8d.ip_div_bb.height/2 + p8d.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:p8d.ip_div_bb.width, c2y:p8d.ip_div_bb.height/2,
            }
        ],
    }
    p8d.paper1.makePath(0, p8d.pathy1[PAGE8_BUILDER.device])
    p8d.paper1.paths[0].attr('class', p8d.p1_path_class);

    

}
PAGE8_BUILDER.scroll_handler = async (p8d, ss, delta_ss) => {
    var scroll_amount_st        = ss[0];
    var page7_scroll_amount_st  = ss[2];
    if (scroll_amount_st == 3 && page7_scroll_amount_st == 1){
        anime({
            targets: p8d.p1_image1,
            left : ["-150px","0px"],
            duration : 400,
            easing: "easeInOutQuad"
        })
        p8d.p1_img_obj.fade([0,1], 300)
        p8d.p1_img_obj.scale_y(["0%","100%"], 300, 'easeInOutCirc')
        await p8d.p1_img_obj.glitchTransition(5);

        
        p8d.ip_div_bb = p8d.image_path_div.getBoundingClientRect()
        p8d.pathy2 = {
            0 : [
                {cmd:"Move",x:p8d.ip_div_bb.width/8,y:p8d.ip_div_bb.height/2},
                {cmd:"CubicBezier",
                    x:p8d.ip_div_bb.width - p8d.ip_div_bb.width/4,y:p8d.ip_div_bb.height/2,
                    c1x:p8d.ip_div_bb.width/2, c1y:p8d.ip_div_bb.height,
                    c2x:p8d.ip_div_bb.width/2, c2y:p8d.ip_div_bb.height/2,
                }
            ],
            1 : [
                {cmd:"Move",x:p8d.ip_div_bb.width/2,y:5},
                {cmd:"CubicBezier",
                    x:p8d.ip_div_bb.width/2,y:p8d.ip_div_bb.height/2 + p8d.ip_div_bb.height/4,
                    c1x:0, c1y:0,
                    c2x:p8d.ip_div_bb.width, c2y:p8d.ip_div_bb.height/2,
                }
            ],
            2 : [
                {cmd:"Move",x:p8d.ip_div_bb.width/8,y:p8d.ip_div_bb.height/2},
                {cmd:"CubicBezier",
                    x:p8d.ip_div_bb.width - p8d.ip_div_bb.width/4,y:p8d.ip_div_bb.height/2,
                    c1x:p8d.ip_div_bb.width/2, c1y:p8d.ip_div_bb.height,
                    c2x:p8d.ip_div_bb.width/2, c2y:p8d.ip_div_bb.height/2,
                }
            ],
            3 : [
                {cmd:"Move",x:p8d.ip_div_bb.width/2,y:5},
                {cmd:"CubicBezier",
                    x:p8d.ip_div_bb.width/2,y:p8d.ip_div_bb.height/2 + p8d.ip_div_bb.height/4,
                    c1x:0, c1y:0,
                    c2x:p8d.ip_div_bb.width, c2y:p8d.ip_div_bb.height/2,
                }
            ],
        }

        var testy = p8d.paper1.paths[0].animate({path : p8d.paper1.rparse_coords(p8d.pathy2[PAGE8_BUILDER.device])}, 800, 'cubic-bezier(.65,.34,.2,.99)')
        p8d.paper1.elementFollowPath(testy.attr('path'), p8d.p1_description3, [0,1], 800, easing = 'cubicBezier(.65,.34,.2,.99)', loop = false, delay = 0, autoplay = true);
    }
}
PAGE8_BUILDER.resize_handler = async (p8d) => {

    p8d.p1_img_obj.clear();
    p8d.p1_img_obj._img = await PAGE8_BUILDER.checkImage(p8d.p1_img_map[PAGE8_BUILDER.device])
    p8d.p1_img_obj.draw();

    p8d.ip_div_bb = p8d.image_path_div.getBoundingClientRect()
    p8d.paper1.paper.setSize(p8d.ip_div_bb.width, p8d.ip_div_bb.height)
    p8d.pathy1 = {
        0 : [
            {cmd:"Move",x:p8d.ip_div_bb.width/8,y:p8d.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:p8d.ip_div_bb.width - p8d.ip_div_bb.width/4,y:p8d.ip_div_bb.height/2,
                c1x:p8d.ip_div_bb.width/2, c1y:p8d.ip_div_bb.height/2,
                c2x:p8d.ip_div_bb.width/16, c2y:p8d.ip_div_bb.height/1.1,
            }
        ],
        1 : [
            {cmd:"Move",x:p8d.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:p8d.ip_div_bb.width/2,y:p8d.ip_div_bb.height/2 + p8d.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:p8d.ip_div_bb.width, c2y:p8d.ip_div_bb.height/2,
            }
        ],
        2 : [
            {cmd:"Move",x:p8d.ip_div_bb.width/8,y:p8d.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:p8d.ip_div_bb.width - p8d.ip_div_bb.width/4,y:p8d.ip_div_bb.height/2,
                c1x:p8d.ip_div_bb.width/2, c1y:p8d.ip_div_bb.height,
                c2x:p8d.ip_div_bb.width/8, c2y:p8d.ip_div_bb.height/2,
            }
        ],
        3 : [
            {cmd:"Move",x:p8d.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:p8d.ip_div_bb.width/2,y:p8d.ip_div_bb.height/2 + p8d.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:p8d.ip_div_bb.width, c2y:p8d.ip_div_bb.height/2,
            }
        ],
    }
    p8d.paper1.updatePath(0, p8d.pathy1[PAGE8_BUILDER.device])
}