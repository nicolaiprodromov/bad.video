
const PAGE16_BUILDER = new Page(16);
PAGE16_BUILDER.pd             = {
    holder    : document.querySelector('#i16-1'),
    includer  : document.querySelector('#page16include'),
    
    p1_image1 : document.querySelector('#p3_image14'),
    p1_img_obj: null,
    p1_img_src: "http://127.0.0.1:5500/page6/Asset 4.png",

    p1_img_map : {
        0 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669a3272f56a1703bb06af28_thumbnail.webp`,
        1 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669a327069918beb0df81362_thumbnail-mobile.webp`,
        2 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669a3272f56a1703bb06af28_thumbnail.webp`,
        3 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669a327069918beb0df81362_thumbnail-mobile.webp`,
    },
    paper1 : null,
    image_path_div : document.querySelector("#p3_image_path2"),
    p1_description5 : document.querySelector("#p3_description5"),
    p1_path_class : "rails_1",

    pathy1 : null,
    pathy2 : null,

    ip_div_bb : null,
}
PAGE16_BUILDER.load_handler   = async (p16d) => {

    p16d.p1_img_obj = new ImageObject(
        element  = p16d.p1_image1,
        img      = await PAGE16_BUILDER.checkImage(p16d.p1_img_map[PAGE16_BUILDER.device]),
        id       = 0,
    );
    p16d.p1_img_obj.draw();

    p16d.paper1 = new Paper(p16d.image_path_div);
    p16d.ip_div_bb = p16d.image_path_div.getBoundingClientRect()
    p16d.pathy1 = {
        0 : [
            {cmd:"Move",x:p16d.ip_div_bb.width/8,y:p16d.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:p16d.ip_div_bb.width - p16d.ip_div_bb.width/4,y:p16d.ip_div_bb.height/2,
                c1x:p16d.ip_div_bb.width/2, c1y:p16d.ip_div_bb.height/2,
                c2x:p16d.ip_div_bb.width/16, c2y:p16d.ip_div_bb.height/1.1,
            }
        ],
        1 : [
            {cmd:"Move",x:p16d.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:p16d.ip_div_bb.width/2,y:p16d.ip_div_bb.height/2 + p16d.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:p16d.ip_div_bb.width, c2y:p16d.ip_div_bb.height/2,
            }
        ],
        2 : [
            {cmd:"Move",x:p16d.ip_div_bb.width/8,y:p16d.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:p16d.ip_div_bb.width - p16d.ip_div_bb.width/4,y:p16d.ip_div_bb.height/2,
                c1x:p16d.ip_div_bb.width/2, c1y:p16d.ip_div_bb.height,
                c2x:p16d.ip_div_bb.width/8, c2y:p16d.ip_div_bb.height/2,
            }
        ],
        3 : [
            {cmd:"Move",x:p16d.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:p16d.ip_div_bb.width/2,y:p16d.ip_div_bb.height/2 + p16d.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:p16d.ip_div_bb.width, c2y:p16d.ip_div_bb.height/2,
            }
        ],
    }
    p16d.paper1.makePath(0, p16d.pathy1[PAGE16_BUILDER.device])
    p16d.paper1.paths[0].attr('class', p16d.p1_path_class);

    

}
PAGE16_BUILDER.scroll_handler = async (p16d, ss, delta_ss) => {
    var scroll_amount_st        = ss[0];
    var page12_scroll_amount_st  = ss[3];
    if (scroll_amount_st == 4 && page12_scroll_amount_st == 4){

        document.body.style.backgroundColor = "var(--bg)"

        p16d.p1_img_obj.fade([0,1], 300)
        // IMAGE GLITCH TRANSITION
        await p16d.p1_img_obj.glitchTransition(5);

        
        p16d.ip_div_bb = p16d.image_path_div.getBoundingClientRect()
        p16d.pathy2 = {
            0 : [
                {cmd:"Move",x:p16d.ip_div_bb.width/8,y:p16d.ip_div_bb.height/2},
                {cmd:"CubicBezier",
                    x:p16d.ip_div_bb.width - p16d.ip_div_bb.width/4,y:p16d.ip_div_bb.height/2,
                    c1x:p16d.ip_div_bb.width/2, c1y:p16d.ip_div_bb.height,
                    c2x:p16d.ip_div_bb.width/2, c2y:p16d.ip_div_bb.height/2,
                }
            ],
            1 : [
                {cmd:"Move",x:p16d.ip_div_bb.width/2,y:5},
                {cmd:"CubicBezier",
                    x:p16d.ip_div_bb.width/2,y:p16d.ip_div_bb.height/2 + p16d.ip_div_bb.height/4,
                    c1x:0, c1y:0,
                    c2x:p16d.ip_div_bb.width, c2y:p16d.ip_div_bb.height/2,
                }
            ],
            2 : [
                {cmd:"Move",x:p16d.ip_div_bb.width/8,y:p16d.ip_div_bb.height/2},
                {cmd:"CubicBezier",
                    x:p16d.ip_div_bb.width - p16d.ip_div_bb.width/4,y:p16d.ip_div_bb.height/2,
                    c1x:p16d.ip_div_bb.width/2, c1y:p16d.ip_div_bb.height,
                    c2x:p16d.ip_div_bb.width/2, c2y:p16d.ip_div_bb.height/2,
                }
            ],
            3 : [
                {cmd:"Move",x:p16d.ip_div_bb.width/2,y:5},
                {cmd:"CubicBezier",
                    x:p16d.ip_div_bb.width/2,y:p16d.ip_div_bb.height/2 + p16d.ip_div_bb.height/4,
                    c1x:0, c1y:0,
                    c2x:p16d.ip_div_bb.width, c2y:p16d.ip_div_bb.height/2,
                }
            ],
        }

        var testy = p16d.paper1.paths[0].animate({path : p16d.paper1.rparse_coords(p16d.pathy2[PAGE16_BUILDER.device])}, 800, 'cubic-bezier(.65,.34,.2,.99)')
        p16d.paper1.elementFollowPath(testy.attr('path'), p16d.p1_description5, [0,1], 800, easing = 'cubicBezier(.65,.34,.2,.99)', loop = false, delay = 0, autoplay = true);
    }
}
PAGE16_BUILDER.resize_handler = async (p16d) => {

    p16d.p1_img_obj.clear();
    p16d.p1_img_obj._img = await PAGE16_BUILDER.checkImage(p16d.p1_img_map[PAGE16_BUILDER.device])
    p16d.p1_img_obj.draw();

    p16d.ip_div_bb = p16d.image_path_div.getBoundingClientRect()
    p16d.paper1.paper.setSize(p16d.ip_div_bb.width, p16d.ip_div_bb.height)
    p16d.pathy1 = {
        0 : [
            {cmd:"Move",x:p16d.ip_div_bb.width/8,y:p16d.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:p16d.ip_div_bb.width - p16d.ip_div_bb.width/4,y:p16d.ip_div_bb.height/2,
                c1x:p16d.ip_div_bb.width/2, c1y:p16d.ip_div_bb.height/2,
                c2x:p16d.ip_div_bb.width/16, c2y:p16d.ip_div_bb.height/1.1,
            }
        ],
        1 : [
            {cmd:"Move",x:p16d.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:p16d.ip_div_bb.width/2,y:p16d.ip_div_bb.height/2 + p16d.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:p16d.ip_div_bb.width, c2y:p16d.ip_div_bb.height/2,
            }
        ],
        2 : [
            {cmd:"Move",x:p16d.ip_div_bb.width/8,y:p16d.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:p16d.ip_div_bb.width - p16d.ip_div_bb.width/4,y:p16d.ip_div_bb.height/2,
                c1x:p16d.ip_div_bb.width/2, c1y:p16d.ip_div_bb.height,
                c2x:p16d.ip_div_bb.width/8, c2y:p16d.ip_div_bb.height/2,
            }
        ],
        3 : [
            {cmd:"Move",x:p16d.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:p16d.ip_div_bb.width/2,y:p16d.ip_div_bb.height/2 + p16d.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:p16d.ip_div_bb.width, c2y:p16d.ip_div_bb.height/2,
            }
        ],
    }
    p16d.paper1.updatePath(0, p16d.pathy1[PAGE16_BUILDER.device])
}