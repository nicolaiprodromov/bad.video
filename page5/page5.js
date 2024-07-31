

import { Page }        from '/lib/page_builder.js';
import { Paper }       from '/lib/svg.js'
import { ImageObject } from '/lib/images_obj.js';

const PAGE5_BUILDER = new Page(5);
PAGE5_BUILDER.pd = {
    holder    : document.querySelector('#i6'),
    includer  : document.querySelector('#page5include'),
    p1_image1 : document.querySelector('#p2_image13'),
    p1_img_obj: null,
    p1_img_map : {
        0 : "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669a2ae878dec09da15984a9_mock-up.webp",
        1 : "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669a2ae7d42524ab7771dcc2_mock-up-mobile.webp",
        2 : "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669a2ae878dec09da15984a9_mock-up.webp",
        3 : "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669a2ae7d42524ab7771dcc2_mock-up-mobile.webp",
    },
    paper1 : null,
    image_path_div : document.querySelector("#p2_image_path1"),
    p1_description3 : document.querySelector("#p2_description4"),
    p1_path_class : "rails_1",
    pathy1 : null,
    pathy2 : null,
    ip_div_bb : null,
}
PAGE5_BUILDER.load_handler = async (pd) => {
}
PAGE5_BUILDER.scroll_handler = async (pd, ss, delta_ss) => {
    document.querySelector("#particle_intro0").innerHTML="rci x jazzahead"
    document.querySelector("#particle_intro2").innerHTML="4/5"
    anime({
        targets: pd.p1_image1,
        left : ["-150px","0px"],
        duration : 400,
        easing: "easeInOutQuad"
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
    var testy = pd.paper1.paths[0].animate({path : pd.paper1.rparse_coords(pd.pathy2[PAGE5_BUILDER.device])}, 800, 'cubic-bezier(.65,.34,.2,.99)')
    pd.paper1.elementFollowPath(testy.attr('path'), pd.p1_description3, [0,1], 800, 'cubicBezier(.65,.34,.2,.99)', false, 0, true);
}
PAGE5_BUILDER.resize_handler = async (pd) => {
    pd.p1_img_obj.clear();
    pd.p1_img_obj._img = pd.p1_img_map[PAGE5_BUILDER.device]
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
    pd.paper1.updatePath(0, pd.pathy1[PAGE5_BUILDER.device])
}
PAGE5_BUILDER.first_scroll_handler = async (pd) => {

    pd.p1_img_obj = new ImageObject(
        pd.p1_image1,
        pd.p1_img_map[PAGE5_BUILDER.device],
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
    pd.paper1.makePath(0, pd.pathy1[PAGE5_BUILDER.device])
    pd.paper1.paths[0].attr('class', pd.p1_path_class);
}