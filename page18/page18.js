
const PAGE18_BUILDER = new Page(18);
PAGE18_BUILDER.pd             = {
    holder    : document.querySelector('#i19'),
    includer  : document.querySelector('#page18include'),
    
    p1_image1 : document.querySelector('#p4_image1'),
    p1_img_obj: null,

    p1_img_map : {
        0 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669a3d53d6a2a3e16ba34fb3_mock-up.webp`,
        1 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669a3d531369544e5cc05c9e_mock-up-mobile.webp`,
        2 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669a3d53d6a2a3e16ba34fb3_mock-up.webp`,
        3 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669a3d531369544e5cc05c9e_mock-up-mobile.webp`,
    },

    paper1 : null,
    image_path_div : document.querySelector("#p4_image_path"),
    p1_description3 : document.querySelector("#p4_description3"),
    p1_path_class : "rails_1",

    pathy1 : null,
    pathy2 : null,

    ip_div_bb : null,
}
PAGE18_BUILDER.load_handler   = async (p18d) => {
    
    p18d.p1_img_obj = new ImageObject(
        element  = p18d.p1_image1,
        img      = await PAGE18_BUILDER.checkImage(p18d.p1_img_map[PAGE18_BUILDER.device]),
        id       = 0,
    );

    p18d.p1_img_obj.draw();

    p18d.paper1 = new Paper(p18d.image_path_div);
    p18d.ip_div_bb = p18d.image_path_div.getBoundingClientRect()
    p18d.pathy1 = {
        0 : [
            {cmd:"Move",x:p18d.ip_div_bb.width/8,y:p18d.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:p18d.ip_div_bb.width - p18d.ip_div_bb.width/4,y:p18d.ip_div_bb.height/2,
                c1x:p18d.ip_div_bb.width/2, c1y:p18d.ip_div_bb.height/2,
                c2x:p18d.ip_div_bb.width/16, c2y:p18d.ip_div_bb.height/1.1,
            }
        ],
        1 : [
            {cmd:"Move",x:p18d.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:p18d.ip_div_bb.width/2,y:p18d.ip_div_bb.height/2 + p18d.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:p18d.ip_div_bb.width, c2y:p18d.ip_div_bb.height/2,
            }
        ],
        2 : [
            {cmd:"Move",x:p18d.ip_div_bb.width/8,y:p18d.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:p18d.ip_div_bb.width - p18d.ip_div_bb.width/4,y:p18d.ip_div_bb.height/2,
                c1x:p18d.ip_div_bb.width/2, c1y:p18d.ip_div_bb.height,
                c2x:p18d.ip_div_bb.width/8, c2y:p18d.ip_div_bb.height/2,
            }
        ],
        3 : [
            {cmd:"Move",x:p18d.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:p18d.ip_div_bb.width/2,y:p18d.ip_div_bb.height/2 + p18d.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:p18d.ip_div_bb.width, c2y:p18d.ip_div_bb.height/2,
            }
        ],
    }
    p18d.paper1.makePath(0, p18d.pathy1[PAGE18_BUILDER.device])
    p18d.paper1.paths[0].attr('class', p18d.p1_path_class);

    

}
PAGE18_BUILDER.scroll_handler = (p18d, ss, delta_ss) => {
    var scroll_amount_st        = ss[0];
    var page17_scroll_amount_st  = ss[4];
    if (scroll_amount_st == 5 && page17_scroll_amount_st == 1){
        p18d.p1_img_obj.fade([0,1], 300)
        p18d.p1_img_obj.scale_y(["0%","100%"], 300, 'easeInOutCirc')
        setTimeout(() => {
            p18d.p1_img_obj.blockTransition(
                duration   = 1500,
                resolution = 5,
                easing     = 'easeInOutSine',
                delay      = 200,
                reverse    = false,
                filter     = [15, 45, 45, 255],
                epsilon    = 150
            )
        },200)
        p18d.p1_img_obj.checkpoints(
            resolution = 5,
            callback = (instance, data, pixel_data) => {
                var cell_div                   = document.createElement('div')
                if (data.index < 12){
                    cell_div.innerHTML = "//zoidberg"
                } else {
                    cell_div.innerHTML = "mockup"
                }
                cell_div.style.color = "red"
                cell_div.style.fontSize = "40px"
                cell_div.style.fontFamily = "Neue Machina Ultrabold"
                cell_div.style.position        = 'absolute';
                cell_div.style.backgroundColor = "transparent"
                cell_div.style.width           = data.sx + "px";
                cell_div.style.height          = data.sy + "px";
                cell_div.style.left            = data.x + "px";
                cell_div.style.top             = data.y + "px"
                instance.element.appendChild(cell_div)
                setTimeout(() => {
                    cell_div.remove()
                }, 100 + (data.index)*300)
            },
            ckp = "all", //[{x: 100, y: 100},{x: 600, y: 600},{x: 300, y: 600}],
            epsilon = 0,
            reverse = false,
            filter = [55,55,55,255],
            filter_epsilon = 120
        );

        
        p18d.ip_div_bb = p18d.image_path_div.getBoundingClientRect()
        p18d.pathy2 = {
            0 : [
                {cmd:"Move",x:p18d.ip_div_bb.width/8,y:p18d.ip_div_bb.height/2},
                {cmd:"CubicBezier",
                    x:p18d.ip_div_bb.width - p18d.ip_div_bb.width/4,y:p18d.ip_div_bb.height/2,
                    c1x:p18d.ip_div_bb.width/2, c1y:p18d.ip_div_bb.height,
                    c2x:p18d.ip_div_bb.width/2, c2y:p18d.ip_div_bb.height/2,
                }
            ],
            1 : [
                {cmd:"Move",x:p18d.ip_div_bb.width/2,y:5},
                {cmd:"CubicBezier",
                    x:p18d.ip_div_bb.width/2,y:p18d.ip_div_bb.height/2 + p18d.ip_div_bb.height/4,
                    c1x:0, c1y:0,
                    c2x:p18d.ip_div_bb.width, c2y:p18d.ip_div_bb.height/2,
                }
            ],
            2 : [
                {cmd:"Move",x:p18d.ip_div_bb.width/8,y:p18d.ip_div_bb.height/2},
                {cmd:"CubicBezier",
                    x:p18d.ip_div_bb.width - p18d.ip_div_bb.width/4,y:p18d.ip_div_bb.height/2,
                    c1x:p18d.ip_div_bb.width/2, c1y:p18d.ip_div_bb.height,
                    c2x:p18d.ip_div_bb.width/2, c2y:p18d.ip_div_bb.height/2,
                }
            ],
            3 : [
                {cmd:"Move",x:p18d.ip_div_bb.width/2,y:5},
                {cmd:"CubicBezier",
                    x:p18d.ip_div_bb.width/2,y:p18d.ip_div_bb.height/2 + p18d.ip_div_bb.height/4,
                    c1x:0, c1y:0,
                    c2x:p18d.ip_div_bb.width, c2y:p18d.ip_div_bb.height/2,
                }
            ],
        }

        var testy = p18d.paper1.paths[0].animate({path : p18d.paper1.rparse_coords(p18d.pathy2[PAGE18_BUILDER.device])}, 800, 'cubic-bezier(.65,.34,.2,.99)')
        p18d.paper1.elementFollowPath(testy.attr('path'), p18d.p1_description3, [0,1], 800, easing = 'cubicBezier(.65,.34,.2,.99)', loop = false, delay = 0, autoplay = true);
    }
}
PAGE18_BUILDER.resize_handler = async (p18d) => {

    p18d.p1_img_obj.clear();
    p18d.p1_img_obj._img = await PAGE18_BUILDER.checkImage(p18d.p1_img_map[PAGE18_BUILDER.device])
    p18d.p1_img_obj.draw();

    p18d.ip_div_bb = p18d.image_path_div.getBoundingClientRect()
    p18d.paper1.paper.setSize(p18d.ip_div_bb.width, p18d.ip_div_bb.height)
    p18d.pathy1 = {
        0 : [
            {cmd:"Move",x:p18d.ip_div_bb.width/8,y:p18d.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:p18d.ip_div_bb.width - p18d.ip_div_bb.width/4,y:p18d.ip_div_bb.height/2,
                c1x:p18d.ip_div_bb.width/2, c1y:p18d.ip_div_bb.height/2,
                c2x:p18d.ip_div_bb.width/16, c2y:p18d.ip_div_bb.height/1.1,
            }
        ],
        1 : [
            {cmd:"Move",x:p18d.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:p18d.ip_div_bb.width/2,y:p18d.ip_div_bb.height/2 + p18d.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:p18d.ip_div_bb.width, c2y:p18d.ip_div_bb.height/2,
            }
        ],
        2 : [
            {cmd:"Move",x:p18d.ip_div_bb.width/8,y:p18d.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:p18d.ip_div_bb.width - p18d.ip_div_bb.width/4,y:p18d.ip_div_bb.height/2,
                c1x:p18d.ip_div_bb.width/2, c1y:p18d.ip_div_bb.height,
                c2x:p18d.ip_div_bb.width/8, c2y:p18d.ip_div_bb.height/2,
            }
        ],
        3 : [
            {cmd:"Move",x:p18d.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:p18d.ip_div_bb.width/2,y:p18d.ip_div_bb.height/2 + p18d.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:p18d.ip_div_bb.width, c2y:p18d.ip_div_bb.height/2,
            }
        ],
    }
    p18d.paper1.updatePath(0, p18d.pathy1[PAGE18_BUILDER.device])
}