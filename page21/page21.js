import { Page }        from 'http://127.0.0.1:5500/lib/page_builder.js';
import { Paper }       from 'http://127.0.0.1:5500/lib/svg.js'
import { ImageObject } from 'http://127.0.0.1:5500/lib/images_obj.js';

const PAGE21_BUILDER = new Page(21);
PAGE21_BUILDER.pd             = {
    holder    : document.querySelector('#i21-1'),
    includer  : document.querySelector('#page21include'),
    
    p1_image1 : document.querySelector('#p4_image14'),
    p1_img_obj: null,
    p1_img_src: "http://127.0.0.1:5500/page6/Asset 4.png",

    p1_img_map : {
        0 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669a472e0e9760f2836b7c0b_thumbnail.webp`,
        1 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669a472e574e0a5fd999dc54_thumbnail-mobile.webp`,
        2 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669a472e0e9760f2836b7c0b_thumbnail.webp`,
        3 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669a472e574e0a5fd999dc54_thumbnail-mobile.webp`,
    },
    paper1 : null,
    image_path_div : document.querySelector("#p4_image_path2"),
    p1_description5 : document.querySelector("#p4_description5"),
    p1_path_class : "rails_1",

    pathy1 : null,
    pathy2 : null,

    ip_div_bb : null,

    project_button1 : document.querySelector("#sah_button1"),
    project_button2 : document.querySelector("#sah_button2"),
    project_button3 : document.querySelector("#sah_button3"),

    project_url1 : "https://www.acasalahundorf.ro/showcase-home/weird-times-and-improbable-encounters",
    project_url2 : "https://www.acasalahundorf.ro/sah-showcase-2022",
    project_url3 : "https://sah-2021-2022.webflow.io/sah-showcase",
}
PAGE21_BUILDER.load_handler   = async (pd) => {
}
PAGE21_BUILDER.scroll_handler = async (pd, ss, delta_ss) => {
    var scroll_amount_st        = ss[0];
    var page17_scroll_amount_st  = ss[4];
    if (scroll_amount_st == 5 && page17_scroll_amount_st == 4){
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

        var testy = pd.paper1.paths[0].animate({path : pd.paper1.rparse_coords(pd.pathy2[PAGE21_BUILDER.device])}, 800, 'cubic-bezier(.65,.34,.2,.99)')
        pd.paper1.elementFollowPath(testy.attr('path'), pd.p1_description5, [0,1], 800, 'cubicBezier(.65,.34,.2,.99)', false, 0, true);
    }
}
PAGE21_BUILDER.resize_handler = async (pd) => {

    pd.p1_img_obj.clear();
    pd.p1_img_obj._img = await PAGE21_BUILDER.checkImage(pd.p1_img_map[PAGE21_BUILDER.device])
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
    pd.paper1.updatePath(0, pd.pathy1[PAGE21_BUILDER.device])
}
PAGE21_BUILDER.first_scroll_handler = async (pd) => {
    pd.project_button1.addEventListener('click', () => {
        setTimeout(() => {
            window.open(pd.project_url1, '_blank').focus();
        },200)
    })
    pd.project_button2.addEventListener('click', () => {
        setTimeout(() => {
            window.open(pd.project_url2, '_blank').focus();
        },200)
    })
    pd.project_button3.addEventListener('click', () => {
        setTimeout(() => {
            window.open(pd.project_url3, '_blank').focus();
        },200)
    })


    pd.p1_img_obj = new ImageObject(
        pd.p1_image1,
        await PAGE21_BUILDER.checkImage(pd.p1_img_map[PAGE21_BUILDER.device]),
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
    pd.paper1.makePath(0, pd.pathy1[PAGE21_BUILDER.device])
    pd.paper1.paths[0].attr('class', pd.p1_path_class);
}