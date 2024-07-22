
const PAGE5_BUILDER = new Page(5);
PAGE5_BUILDER.pd             = {
    holder    : document.querySelector('#i6'),
    includer  : document.querySelector('#page5include'),
    
    p1_image1 : document.querySelector('#p1_image13'),
    p1_img_obj: null,
    p1_img_src: "http://127.0.0.1:5500/page5/mock-up.png",

    p1_img_map : {
        0 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/6699448fbb33a1d331a70d70_mock-up.webp`,
        1 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/6699448cd5a49414a82e827b_mock-up-mobile.webp`,
        2 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/6699448fbb33a1d331a70d70_mock-up.webp`,
        3 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/6699448cd5a49414a82e827b_mock-up-mobile.webp`,
    },

    paper1 : null,
    image_path_div : document.querySelector("#p1_image_path1"),
    p1_description3 : document.querySelector("#p1_description4"),
    p1_path_class : "rails_1",

    pathy1 : null,
    pathy2 : null,

    ip_div_bb : null,
}
PAGE5_BUILDER.load_handler   = async (p5d) => {

    p5d.p1_img_obj = new ImageObject(
        element  = p5d.p1_image1,
        img      = await PAGE5_BUILDER.checkImage(p5d.p1_img_map[PAGE5_BUILDER.device]),
        id       = 0,
    );
    p5d.p1_img_obj.draw();

    p5d.paper1 = new Paper(p5d.image_path_div);
    p5d.ip_div_bb = p5d.image_path_div.getBoundingClientRect()
    p5d.pathy1 = {
        0 : [
            {cmd:"Move",x:p5d.ip_div_bb.width/8,y:p5d.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:p5d.ip_div_bb.width - p5d.ip_div_bb.width/4,y:p5d.ip_div_bb.height/2,
                c1x:p5d.ip_div_bb.width/2, c1y:p5d.ip_div_bb.height/2,
                c2x:p5d.ip_div_bb.width/16, c2y:p5d.ip_div_bb.height/1.1,
            }
        ],
        1 : [
            {cmd:"Move",x:p5d.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:p5d.ip_div_bb.width/2,y:p5d.ip_div_bb.height/2 + p5d.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:p5d.ip_div_bb.width, c2y:p5d.ip_div_bb.height/2,
            }
        ],
        2 : [
            {cmd:"Move",x:p5d.ip_div_bb.width/8,y:p5d.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:p5d.ip_div_bb.width - p5d.ip_div_bb.width/4,y:p5d.ip_div_bb.height/2,
                c1x:p5d.ip_div_bb.width/2, c1y:p5d.ip_div_bb.height,
                c2x:p5d.ip_div_bb.width/8, c2y:p5d.ip_div_bb.height/2,
            }
        ],
        3 : [
            {cmd:"Move",x:p5d.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:p5d.ip_div_bb.width/2,y:p5d.ip_div_bb.height/2 + p5d.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:p5d.ip_div_bb.width, c2y:p5d.ip_div_bb.height/2,
            }
        ],
    }
    p5d.paper1.makePath(0, p5d.pathy1[PAGE5_BUILDER.device])
    p5d.paper1.paths[0].attr('class', p5d.p1_path_class);

    

}
PAGE5_BUILDER.scroll_handler = async (p5d, ss, delta_ss) => {
    var scroll_amount_st        = ss[0];
    var page2_scroll_amount_st  = ss[1];
    if (scroll_amount_st == 2 && page2_scroll_amount_st == 3){
        anime({
            targets: p5d.p1_image1,
            left : ["-150px","0px"],
            duration : 400,
            easing: "easeInOutQuad"
        })


        p5d.p1_img_obj.fade([0,1], 300)
        p5d.p1_img_obj.scale_x(["0%","100%"], 300, 'easeInOutCirc')

        
        p5d.ip_div_bb = p5d.image_path_div.getBoundingClientRect()
        p5d.pathy2 = {
            0 : [
                {cmd:"Move",x:p5d.ip_div_bb.width/8,y:p5d.ip_div_bb.height/2},
                {cmd:"CubicBezier",
                    x:p5d.ip_div_bb.width - p5d.ip_div_bb.width/4,y:p5d.ip_div_bb.height/2,
                    c1x:p5d.ip_div_bb.width/2, c1y:p5d.ip_div_bb.height,
                    c2x:p5d.ip_div_bb.width/2, c2y:p5d.ip_div_bb.height/2,
                }
            ],
            1 : [
                {cmd:"Move",x:p5d.ip_div_bb.width/2,y:5},
                {cmd:"CubicBezier",
                    x:p5d.ip_div_bb.width/2,y:p5d.ip_div_bb.height/2 + p5d.ip_div_bb.height/4,
                    c1x:0, c1y:0,
                    c2x:p5d.ip_div_bb.width, c2y:p5d.ip_div_bb.height/2,
                }
            ],
            2 : [
                {cmd:"Move",x:p5d.ip_div_bb.width/8,y:p5d.ip_div_bb.height/2},
                {cmd:"CubicBezier",
                    x:p5d.ip_div_bb.width - p5d.ip_div_bb.width/4,y:p5d.ip_div_bb.height/2,
                    c1x:p5d.ip_div_bb.width/2, c1y:p5d.ip_div_bb.height,
                    c2x:p5d.ip_div_bb.width/2, c2y:p5d.ip_div_bb.height/2,
                }
            ],
            3 : [
                {cmd:"Move",x:p5d.ip_div_bb.width/2,y:5},
                {cmd:"CubicBezier",
                    x:p5d.ip_div_bb.width/2,y:p5d.ip_div_bb.height/2 + p5d.ip_div_bb.height/4,
                    c1x:0, c1y:0,
                    c2x:p5d.ip_div_bb.width, c2y:p5d.ip_div_bb.height/2,
                }
            ],
        }

        var testy = p5d.paper1.paths[0].animate({path : p5d.paper1.rparse_coords(p5d.pathy2[PAGE5_BUILDER.device])}, 800, 'cubic-bezier(.65,.34,.2,.99)')
        p5d.paper1.elementFollowPath(testy.attr('path'), p5d.p1_description3, [0,1], 800, easing = 'cubicBezier(.65,.34,.2,.99)', loop = false, delay = 0, autoplay = true);
    }
}
PAGE5_BUILDER.resize_handler = async (p5d) => {

    p5d.p1_img_obj.clear();
    p5d.p1_img_obj._img = await PAGE5_BUILDER.checkImage(p5d.p1_img_map[PAGE5_BUILDER.device])
    p5d.p1_img_obj.draw();

    p5d.ip_div_bb = p5d.image_path_div.getBoundingClientRect()
    p5d.paper1.paper.setSize(p5d.ip_div_bb.width, p5d.ip_div_bb.height)
    p5d.pathy1 = {
        0 : [
            {cmd:"Move",x:p5d.ip_div_bb.width/8,y:p5d.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:p5d.ip_div_bb.width - p5d.ip_div_bb.width/4,y:p5d.ip_div_bb.height/2,
                c1x:p5d.ip_div_bb.width/2, c1y:p5d.ip_div_bb.height/2,
                c2x:p5d.ip_div_bb.width/16, c2y:p5d.ip_div_bb.height/1.1,
            }
        ],
        1 : [
            {cmd:"Move",x:p5d.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:p5d.ip_div_bb.width/2,y:p5d.ip_div_bb.height/2 + p5d.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:p5d.ip_div_bb.width, c2y:p5d.ip_div_bb.height/2,
            }
        ],
        2 : [
            {cmd:"Move",x:p5d.ip_div_bb.width/8,y:p5d.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:p5d.ip_div_bb.width - p5d.ip_div_bb.width/4,y:p5d.ip_div_bb.height/2,
                c1x:p5d.ip_div_bb.width/2, c1y:p5d.ip_div_bb.height,
                c2x:p5d.ip_div_bb.width/8, c2y:p5d.ip_div_bb.height/2,
            }
        ],
        3 : [
            {cmd:"Move",x:p5d.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:p5d.ip_div_bb.width/2,y:p5d.ip_div_bb.height/2 + p5d.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:p5d.ip_div_bb.width, c2y:p5d.ip_div_bb.height/2,
            }
        ],
    }
    p5d.paper1.updatePath(0, p5d.pathy1[PAGE5_BUILDER.device])
}


