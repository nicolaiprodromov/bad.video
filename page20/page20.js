
const PAGE20_BUILDER = new Page(20);
PAGE20_BUILDER.pd             = {
    holder    : document.querySelector('#i21'),
    includer  : document.querySelector('#page20include'),
    
    p1_image1 : document.querySelector('#p4_image13'),
    p1_img_obj: null,
    p1_img_src: "http://127.0.0.1:5500/page5/mock-up.png",

    p1_img_map : {
        0 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669a3d87cba8630cdb74a88b_mock-up.webp`,
        1 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669a3d879857e3e5202458f8_mock-up-mobile.webp`,
        2 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669a3d87cba8630cdb74a88b_mock-up.webp`,
        3 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669a3d879857e3e5202458f8_mock-up-mobile.webp`,
    },

    paper1 : null,
    image_path_div : document.querySelector("#p4_image_path1"),
    p1_description3 : document.querySelector("#p4_description4"),
    p1_path_class : "rails_1",

    pathy1 : null,
    pathy2 : null,

    ip_div_bb : null,
}
PAGE20_BUILDER.load_handler   = async (p20d) => {

    p20d.p1_img_obj = new ImageObject(
        element  = p20d.p1_image1,
        img      = await PAGE20_BUILDER.checkImage(p20d.p1_img_map[PAGE20_BUILDER.device]),
        id       = 0,
    );
    p20d.p1_img_obj.draw();

    p20d.paper1 = new Paper(p20d.image_path_div);
    p20d.ip_div_bb = p20d.image_path_div.getBoundingClientRect()
    p20d.pathy1 = {
        0 : [
            {cmd:"Move",x:p20d.ip_div_bb.width/8,y:p20d.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:p20d.ip_div_bb.width - p20d.ip_div_bb.width/4,y:p20d.ip_div_bb.height/2,
                c1x:p20d.ip_div_bb.width/2, c1y:p20d.ip_div_bb.height/2,
                c2x:p20d.ip_div_bb.width/16, c2y:p20d.ip_div_bb.height/1.1,
            }
        ],
        1 : [
            {cmd:"Move",x:p20d.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:p20d.ip_div_bb.width/2,y:p20d.ip_div_bb.height/2 + p20d.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:p20d.ip_div_bb.width, c2y:p20d.ip_div_bb.height/2,
            }
        ],
        2 : [
            {cmd:"Move",x:p20d.ip_div_bb.width/8,y:p20d.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:p20d.ip_div_bb.width - p20d.ip_div_bb.width/4,y:p20d.ip_div_bb.height/2,
                c1x:p20d.ip_div_bb.width/2, c1y:p20d.ip_div_bb.height,
                c2x:p20d.ip_div_bb.width/8, c2y:p20d.ip_div_bb.height/2,
            }
        ],
        3 : [
            {cmd:"Move",x:p20d.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:p20d.ip_div_bb.width/2,y:p20d.ip_div_bb.height/2 + p20d.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:p20d.ip_div_bb.width, c2y:p20d.ip_div_bb.height/2,
            }
        ],
    }
    p20d.paper1.makePath(0, p20d.pathy1[PAGE20_BUILDER.device])
    p20d.paper1.paths[0].attr('class', p20d.p1_path_class);

    

}
PAGE20_BUILDER.scroll_handler = (p20d, ss, delta_ss) => {
    var scroll_amount_st        = ss[0];
    var page17_scroll_amount_st  = ss[4];
    if (scroll_amount_st == 5 && page17_scroll_amount_st == 3){
        p20d.p1_img_obj.fade([0,1], 300)
        p20d.p1_img_obj.scale_x(["0%","100%"], 300, 'easeInOutCirc')
        
        
        p20d.ip_div_bb = p20d.image_path_div.getBoundingClientRect()
        p20d.pathy2 = {
            0 : [
                {cmd:"Move",x:p20d.ip_div_bb.width/8,y:p20d.ip_div_bb.height/2},
                {cmd:"CubicBezier",
                    x:p20d.ip_div_bb.width - p20d.ip_div_bb.width/4,y:p20d.ip_div_bb.height/2,
                    c1x:p20d.ip_div_bb.width/2, c1y:p20d.ip_div_bb.height,
                    c2x:p20d.ip_div_bb.width/2, c2y:p20d.ip_div_bb.height/2,
                }
            ],
            1 : [
                {cmd:"Move",x:p20d.ip_div_bb.width/2,y:5},
                {cmd:"CubicBezier",
                    x:p20d.ip_div_bb.width/2,y:p20d.ip_div_bb.height/2 + p20d.ip_div_bb.height/4,
                    c1x:0, c1y:0,
                    c2x:p20d.ip_div_bb.width, c2y:p20d.ip_div_bb.height/2,
                }
            ],
            2 : [
                {cmd:"Move",x:p20d.ip_div_bb.width/8,y:p20d.ip_div_bb.height/2},
                {cmd:"CubicBezier",
                    x:p20d.ip_div_bb.width - p20d.ip_div_bb.width/4,y:p20d.ip_div_bb.height/2,
                    c1x:p20d.ip_div_bb.width/2, c1y:p20d.ip_div_bb.height,
                    c2x:p20d.ip_div_bb.width/2, c2y:p20d.ip_div_bb.height/2,
                }
            ],
            3 : [
                {cmd:"Move",x:p20d.ip_div_bb.width/2,y:5},
                {cmd:"CubicBezier",
                    x:p20d.ip_div_bb.width/2,y:p20d.ip_div_bb.height/2 + p20d.ip_div_bb.height/4,
                    c1x:0, c1y:0,
                    c2x:p20d.ip_div_bb.width, c2y:p20d.ip_div_bb.height/2,
                }
            ],
        }

        var testy = p20d.paper1.paths[0].animate({path : p20d.paper1.rparse_coords(p20d.pathy2[PAGE20_BUILDER.device])}, 800, 'cubic-bezier(.65,.34,.2,.99)')
        p20d.paper1.elementFollowPath(testy.attr('path'), p20d.p1_description3, [0,1], 800, easing = 'cubicBezier(.65,.34,.2,.99)', loop = false, delay = 0, autoplay = true);
    }
}
PAGE20_BUILDER.resize_handler = async (p20d) => {

    p20d.p1_img_obj.clear();
    p20d.p1_img_obj._img = await PAGE20_BUILDER.checkImage(p20d.p1_img_map[PAGE20_BUILDER.device])
    p20d.p1_img_obj.draw();

    p20d.ip_div_bb = p20d.image_path_div.getBoundingClientRect()
    p20d.paper1.paper.setSize(p20d.ip_div_bb.width, p20d.ip_div_bb.height)
    p20d.pathy1 = {
        0 : [
            {cmd:"Move",x:p20d.ip_div_bb.width/8,y:p20d.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:p20d.ip_div_bb.width - p20d.ip_div_bb.width/4,y:p20d.ip_div_bb.height/2,
                c1x:p20d.ip_div_bb.width/2, c1y:p20d.ip_div_bb.height/2,
                c2x:p20d.ip_div_bb.width/16, c2y:p20d.ip_div_bb.height/1.1,
            }
        ],
        1 : [
            {cmd:"Move",x:p20d.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:p20d.ip_div_bb.width/2,y:p20d.ip_div_bb.height/2 + p20d.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:p20d.ip_div_bb.width, c2y:p20d.ip_div_bb.height/2,
            }
        ],
        2 : [
            {cmd:"Move",x:p20d.ip_div_bb.width/8,y:p20d.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:p20d.ip_div_bb.width - p20d.ip_div_bb.width/4,y:p20d.ip_div_bb.height/2,
                c1x:p20d.ip_div_bb.width/2, c1y:p20d.ip_div_bb.height,
                c2x:p20d.ip_div_bb.width/8, c2y:p20d.ip_div_bb.height/2,
            }
        ],
        3 : [
            {cmd:"Move",x:p20d.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:p20d.ip_div_bb.width/2,y:p20d.ip_div_bb.height/2 + p20d.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:p20d.ip_div_bb.width, c2y:p20d.ip_div_bb.height/2,
            }
        ],
    }
    p20d.paper1.updatePath(0, p20d.pathy1[PAGE20_BUILDER.device])
}


