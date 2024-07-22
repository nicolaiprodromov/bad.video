
const PAGE10_BUILDER = new Page(10);
PAGE10_BUILDER.pd             = {
    holder    : document.querySelector('#i11'),
    includer  : document.querySelector('#page10include'),
    
    p1_image1 : document.querySelector('#p2_image13'),
    p1_img_obj: null,
    p1_img_src: "http://127.0.0.1:5500/page5/mock-up.png",

    p1_img_map : {
        0 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669a2ae878dec09da15984a9_mock-up.webp`,
        1 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669a2ae7d42524ab7771dcc2_mock-up-mobile.webp`,
        2 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669a2ae878dec09da15984a9_mock-up.webp`,
        3 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669a2ae7d42524ab7771dcc2_mock-up-mobile.webp`,
    },

    paper1 : null,
    image_path_div : document.querySelector("#p2_image_path1"),
    p1_description3 : document.querySelector("#p2_description4"),
    p1_path_class : "rails_1",

    pathy1 : null,
    pathy2 : null,

    ip_div_bb : null,
}
PAGE10_BUILDER.load_handler   = async (p10d) => {

    anime({
        targets: p10d.p1_image1,
        left : ["-150px","0px"],
        duration : 400,
        easing: "easeInOutQuad"
    })

    p10d.p1_img_obj = new ImageObject(
        element  = p10d.p1_image1,
        img      = await PAGE10_BUILDER.checkImage(p10d.p1_img_map[PAGE10_BUILDER.device]),
        id       = 0,
    );
    p10d.p1_img_obj.draw();

    p10d.paper1 = new Paper(p10d.image_path_div);
    p10d.ip_div_bb = p10d.image_path_div.getBoundingClientRect()
    p10d.pathy1 = {
        0 : [
            {cmd:"Move",x:p10d.ip_div_bb.width/8,y:p10d.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:p10d.ip_div_bb.width - p10d.ip_div_bb.width/4,y:p10d.ip_div_bb.height/2,
                c1x:p10d.ip_div_bb.width/2, c1y:p10d.ip_div_bb.height/2,
                c2x:p10d.ip_div_bb.width/16, c2y:p10d.ip_div_bb.height/1.1,
            }
        ],
        1 : [
            {cmd:"Move",x:p10d.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:p10d.ip_div_bb.width/2,y:p10d.ip_div_bb.height/2 + p10d.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:p10d.ip_div_bb.width, c2y:p10d.ip_div_bb.height/2,
            }
        ],
        2 : [
            {cmd:"Move",x:p10d.ip_div_bb.width/8,y:p10d.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:p10d.ip_div_bb.width - p10d.ip_div_bb.width/4,y:p10d.ip_div_bb.height/2,
                c1x:p10d.ip_div_bb.width/2, c1y:p10d.ip_div_bb.height,
                c2x:p10d.ip_div_bb.width/8, c2y:p10d.ip_div_bb.height/2,
            }
        ],
        3 : [
            {cmd:"Move",x:p10d.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:p10d.ip_div_bb.width/2,y:p10d.ip_div_bb.height/2 + p10d.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:p10d.ip_div_bb.width, c2y:p10d.ip_div_bb.height/2,
            }
        ],
    }
    p10d.paper1.makePath(0, p10d.pathy1[PAGE10_BUILDER.device])
    p10d.paper1.paths[0].attr('class', p10d.p1_path_class);

    

}
PAGE10_BUILDER.scroll_handler = async (p10d, ss, delta_ss) => {
    var scroll_amount_st        = ss[0];
    var page7_scroll_amount_st  = ss[2];
    if (scroll_amount_st == 3 && page7_scroll_amount_st == 3){
        p10d.p1_img_obj.fade([0,1], 300)
        p10d.p1_img_obj.scale_x(["0%","100%"], 300, 'easeInOutCirc')

        
        p10d.ip_div_bb = p10d.image_path_div.getBoundingClientRect()
        p10d.pathy2 = {
            0 : [
                {cmd:"Move",x:p10d.ip_div_bb.width/8,y:p10d.ip_div_bb.height/2},
                {cmd:"CubicBezier",
                    x:p10d.ip_div_bb.width - p10d.ip_div_bb.width/4,y:p10d.ip_div_bb.height/2,
                    c1x:p10d.ip_div_bb.width/2, c1y:p10d.ip_div_bb.height,
                    c2x:p10d.ip_div_bb.width/2, c2y:p10d.ip_div_bb.height/2,
                }
            ],
            1 : [
                {cmd:"Move",x:p10d.ip_div_bb.width/2,y:5},
                {cmd:"CubicBezier",
                    x:p10d.ip_div_bb.width/2,y:p10d.ip_div_bb.height/2 + p10d.ip_div_bb.height/4,
                    c1x:0, c1y:0,
                    c2x:p10d.ip_div_bb.width, c2y:p10d.ip_div_bb.height/2,
                }
            ],
            2 : [
                {cmd:"Move",x:p10d.ip_div_bb.width/8,y:p10d.ip_div_bb.height/2},
                {cmd:"CubicBezier",
                    x:p10d.ip_div_bb.width - p10d.ip_div_bb.width/4,y:p10d.ip_div_bb.height/2,
                    c1x:p10d.ip_div_bb.width/2, c1y:p10d.ip_div_bb.height,
                    c2x:p10d.ip_div_bb.width/2, c2y:p10d.ip_div_bb.height/2,
                }
            ],
            3 : [
                {cmd:"Move",x:p10d.ip_div_bb.width/2,y:5},
                {cmd:"CubicBezier",
                    x:p10d.ip_div_bb.width/2,y:p10d.ip_div_bb.height/2 + p10d.ip_div_bb.height/4,
                    c1x:0, c1y:0,
                    c2x:p10d.ip_div_bb.width, c2y:p10d.ip_div_bb.height/2,
                }
            ],
        }

        var testy = p10d.paper1.paths[0].animate({path : p10d.paper1.rparse_coords(p10d.pathy2[PAGE10_BUILDER.device])}, 800, 'cubic-bezier(.65,.34,.2,.99)')
        p10d.paper1.elementFollowPath(testy.attr('path'), p10d.p1_description3, [0,1], 800, easing = 'cubicBezier(.65,.34,.2,.99)', loop = false, delay = 0, autoplay = true);
    }
}
PAGE10_BUILDER.resize_handler = async (p10d) => {

    p10d.p1_img_obj.clear();
    p10d.p1_img_obj._img = await PAGE10_BUILDER.checkImage(p10d.p1_img_map[PAGE10_BUILDER.device])
    p10d.p1_img_obj.draw();

    p10d.ip_div_bb = p10d.image_path_div.getBoundingClientRect()
    p10d.paper1.paper.setSize(p10d.ip_div_bb.width, p10d.ip_div_bb.height)
    p10d.pathy1 = {
        0 : [
            {cmd:"Move",x:p10d.ip_div_bb.width/8,y:p10d.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:p10d.ip_div_bb.width - p10d.ip_div_bb.width/4,y:p10d.ip_div_bb.height/2,
                c1x:p10d.ip_div_bb.width/2, c1y:p10d.ip_div_bb.height/2,
                c2x:p10d.ip_div_bb.width/16, c2y:p10d.ip_div_bb.height/1.1,
            }
        ],
        1 : [
            {cmd:"Move",x:p10d.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:p10d.ip_div_bb.width/2,y:p10d.ip_div_bb.height/2 + p10d.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:p10d.ip_div_bb.width, c2y:p10d.ip_div_bb.height/2,
            }
        ],
        2 : [
            {cmd:"Move",x:p10d.ip_div_bb.width/8,y:p10d.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:p10d.ip_div_bb.width - p10d.ip_div_bb.width/4,y:p10d.ip_div_bb.height/2,
                c1x:p10d.ip_div_bb.width/2, c1y:p10d.ip_div_bb.height,
                c2x:p10d.ip_div_bb.width/8, c2y:p10d.ip_div_bb.height/2,
            }
        ],
        3 : [
            {cmd:"Move",x:p10d.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:p10d.ip_div_bb.width/2,y:p10d.ip_div_bb.height/2 + p10d.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:p10d.ip_div_bb.width, c2y:p10d.ip_div_bb.height/2,
            }
        ],
    }
    p10d.paper1.updatePath(0, p10d.pathy1[PAGE10_BUILDER.device])
}


