
import { Page }        from '/lib/page_builder.js';
import { Paper }       from '/lib/svg.js'
import { ImageObject } from '/lib/images_obj.js';

const PAGE15_BUILDER = new Page(15);
PAGE15_BUILDER.pd             = {
    holder  : document.querySelector('#i16'),
    includer: document.querySelector('#page15include'),
    p1_image1 : document.querySelector('#p1_image13'),
    p1_img_obj: null,
    p1_img_map : {
        0: `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/6699448fbb33a1d331a70d70_mock-up.webp`,
        1: `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/6699448cd5a49414a82e827b_mock-up-mobile.webp`,
        2: `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/6699448fbb33a1d331a70d70_mock-up.webp`,
        3: `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/6699448cd5a49414a82e827b_mock-up-mobile.webp`,
    },
    paper1         : null,
    image_path_div : document.querySelector("#p1_image_path1"),
    p1_description3: document.querySelector("#p1_description4"),
    p1_path_class  : "rails_1",
    pathy1: null,
    pathy2: null,
    ip_div_bb  : null,
    prev_device: -1,
}
PAGE15_BUILDER.load_handler   = async (pd) => {

}
PAGE15_BUILDER.scroll_handler =  (pd, ss, delta_ss) => {
    document.querySelector("#particle_intro0").innerHTML="swipe the pin"
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

    var testy = pd.paper1.paths[0].animate({path : pd.paper1.rparse_coords(pd.pathy2[PAGE15_BUILDER.device])}, 800, 'cubic-bezier(.65,.34,.2,.99)')
    pd.paper1.elementFollowPath(testy.attr('path'), pd.p1_description3, [0,1], 800, 'cubicBezier(.65,.34,.2,.99)', false, 0, true);

}
PAGE15_BUILDER.resize_handler = async (pd, ss) => {
    
    if (pd.prev_device != PAGE15_BUILDER.device){
        pd.p1_img_obj.clear();
        pd.p1_img_obj._img = await PAGE15_BUILDER.checkImage(pd.p1_img_map[PAGE15_BUILDER.device])
        pd.p1_img_obj.draw();
    }

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
    pd.prev_device = PAGE15_BUILDER.device
}
PAGE15_BUILDER.first_scroll_handler = async (pd) => {
    
    // const goethe_pin_div = document.querySelector("#goethe_pin");
    // const goethe_pin_canvas = document.querySelector("#goethe_pin_canvas");
    // const goethe_pin_model = "https://raw.githubusercontent.com/nicolaiprodromov/bad.video/master/models/goethe_pin1.glb"
    // OBJ_DISPLAY(goethe_pin_div, goethe_pin_canvas, goethe_pin_model)
    
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