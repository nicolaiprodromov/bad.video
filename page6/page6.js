
import { Page }        from '/lib/page_builder.js';
import { Paper }       from '/lib/svg.js'
import { ImageObject } from '/lib/images_obj.js';

const PAGE6_BUILDER = new Page(6);
PAGE6_BUILDER.pd             = {
    holder    : document.querySelector('#i6-1'),
    includer  : document.querySelector('#page6include'),
    
    p1_image1 : document.querySelector('#p1_image14'),
    p1_img_obj: null,
    p1_img_src: "/page6/Asset 4.png",

    p1_img_map : {
        0 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944abfb978d4b45c7d402_landscape_big.webp`,
        1 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944abe69cec151cb2e39a_portrait_big.webp`,
        2 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944abfb978d4b45c7d402_landscape_big.webp`,
        3 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944abe69cec151cb2e39a_portrait_big.webp`,
    },
    paper1 : null,
    image_path_div : document.querySelector("#p1_image_path2"),
    p1_description5 : document.querySelector("#p1_description5"),
    p1_path_class : "rails_1",

    pathy1 : null,
    pathy2 : null,

    ip_div_bb : null,

    project_button : document.querySelector("#goethe_fest_button"),
    project_url    : "https://www.youtube.com/watch?v=YZG4eEtXZaA",
}
PAGE6_BUILDER.load_handler   = async (pd) => {

}
PAGE6_BUILDER.scroll_handler = async (pd, ss, delta_ss) => {
    var scroll_amount_st        = ss[0];
    var page2_scroll_amount_st  = ss[1];
    if (scroll_amount_st == 2 && page2_scroll_amount_st == 4){

        anime({
            targets: pd.p1_image1,
            left : ["-150px","0px"],
            duration : 400,
            easing: "easeInOutQuad"
        })

        pd.p1_img_obj.fade([0,1], 300)
        pd.p1_img_obj.scale_y(["0%","100%"], 300, 'easeInOutCirc')
        // pd.p1_img_obj.glitchTransition(5);

        pd.paper1.elementFollowPath(pd.paper1.paths[0].attr('path'), pd.p1_description5, [0,1], 800, 'cubicBezier(.65,.34,.2,.99)', false, 0, true);
    }
}
PAGE6_BUILDER.resize_handler = async (pd) => {

    pd.p1_img_obj.clear();
    pd.p1_img_obj._img = await PAGE6_BUILDER.checkImage(pd.p1_img_map[PAGE6_BUILDER.device])
    pd.p1_img_obj.draw();

    pd.ip_div_bb = pd.image_path_div.getBoundingClientRect()
    pd.paper1.paper.setSize(pd.ip_div_bb.width, pd.ip_div_bb.height)
    pd.pathy1 = {
        0 : [
            {cmd:"Move",x:0, y:pd.ip_div_bb.height/2},
            {cmd:"Line",
                x:pd.ip_div_bb.width/2, y:0,
            },
            {cmd:"Line",
                x:pd.ip_div_bb.width, y:pd.ip_div_bb.height/2,
            },
            {cmd:"Line",
                x:pd.ip_div_bb.width/2, y:pd.ip_div_bb.height + 20,
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
            {cmd:"Move",x:0, y:pd.ip_div_bb.height/2},
            {cmd:"Line",
                x:pd.ip_div_bb.width/2, y:0,
            },
            {cmd:"Line",
                x:pd.ip_div_bb.width, y:pd.ip_div_bb.height/2,
            },
            {cmd:"Line",
                x:pd.ip_div_bb.width/2, y:pd.ip_div_bb.height,
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
    pd.paper1.updatePath(0, pd.pathy1[PAGE6_BUILDER.device])
}
PAGE6_BUILDER.first_scroll_handler = async (pd) => {

    pd.p1_img_obj = new ImageObject(
        pd.p1_image1,
        await PAGE6_BUILDER.checkImage(pd.p1_img_map[PAGE6_BUILDER.device]),
        0,
    );
    pd.p1_img_obj.draw();

    pd.paper1 = new Paper(pd.image_path_div);
    pd.ip_div_bb = pd.image_path_div.getBoundingClientRect()
    pd.pathy1 = {
        0 : [
            {cmd:"Move",x:0, y:pd.ip_div_bb.height/2},
            {cmd:"Line",
                x:pd.ip_div_bb.width/2, y:0,
            },
            {cmd:"Line",
                x:pd.ip_div_bb.width, y:pd.ip_div_bb.height/2,
            },
            {cmd:"Line",
                x:pd.ip_div_bb.width/2, y:pd.ip_div_bb.height + 20,
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
            {cmd:"Move",x:0, y:pd.ip_div_bb.height/2},
            {cmd:"Line",
                x:pd.ip_div_bb.width/2, y:0,
            },
            {cmd:"Line",
                x:pd.ip_div_bb.width, y:pd.ip_div_bb.height/2,
            },
            {cmd:"Line",
                x:pd.ip_div_bb.width/2, y:pd.ip_div_bb.height,
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
    pd.paper1.makePath(0, pd.pathy1[PAGE6_BUILDER.device])
    pd.paper1.paths[0].attr('class', pd.p1_path_class);

    pd.project_button.addEventListener("click", () => {
        pd.paper1.elementFollowPath(pd.paper1.paths[0].attr('path'), pd.p1_description5, [1,0.5,1], 2000, easing = 'cubicBezier(.65,.34,.2,.99)', loop = false, delay = 0, autoplay = true);
        setTimeout(() => {
            window.open(pd.project_url, '_blank').focus();
        }, 1000)
    })
}