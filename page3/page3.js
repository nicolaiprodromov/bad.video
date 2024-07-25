
const PAGE3_BUILDER = new Page(3);
PAGE3_BUILDER.pd             = {
    holder    : document.querySelector('#i4'),
    includer  : document.querySelector('#page3include'),
    p1_image1 : document.querySelector('#p1_image1'),
    p1_img_obj: null,
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
PAGE3_BUILDER.load_handler   = async (pd) => {
    


}
PAGE3_BUILDER.scroll_handler = async (pd, ss, delta_ss) => {
    var scroll_amount_st        = ss[0];
    var page2_scroll_amount_st  = ss[1];
    if (scroll_amount_st == 2 && page2_scroll_amount_st == 1){

        anime({
            targets: pd.p1_image1,
            left : ["150px","0px"],
            duration : 400,
            easing: "easeInOutQuad"
        })

        pd.p1_img_obj.fade([0,1], 300)
        // IMAGE GLITCH TRANSITION
        await pd.p1_img_obj.glitchTransition(5);
        
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

        var testy = pd.paper1.paths[0].animate({path : pd.paper1.rparse_coords(pd.pathy2[PAGE3_BUILDER.device])}, 800, 'cubic-bezier(.65,.34,.2,.99)')
        pd.paper1.elementFollowPath(testy.attr('path'), pd.p1_description3, [0,1], 800, easing = 'cubicBezier(.65,.34,.2,.99)', loop = false, delay = 0, autoplay = true);
    }
}
PAGE3_BUILDER.resize_handler = async (pd) => {

    pd.p1_img_obj.clear();
    pd.p1_img_obj._img = await PAGE3_BUILDER.checkImage(pd.p1_img_map[PAGE3_BUILDER.device])
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
    pd.paper1.updatePath(0, pd.pathy1[PAGE3_BUILDER.device])
}

PAGE3_BUILDER.first_scroll_handler = async (pd) => {
    pd.p1_img_obj = new ImageObject(
        element  = pd.p1_image1,
        img      = await PAGE3_BUILDER.checkImage(pd.p1_img_map[PAGE3_BUILDER.device]),
        id       = 0
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
    pd.paper1.makePath(0, pd.pathy1[PAGE3_BUILDER.device])
    pd.paper1.paths[0].attr('class', pd.p1_path_class);
}
