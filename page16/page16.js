
import { Page }        from '/lib/page_builder.js';
import { Paper }       from '/lib/svg.js'
import { ImageObject } from '/lib/images_obj.js';

const PAGE16_BUILDER = new Page(16);
PAGE16_BUILDER.pd             = {
    holder    : document.querySelector('#i6-1'),
    includer  : document.querySelector('#page6include'),
    p1_image1 : document.querySelector('#p1_image14'),
    p1_img_obj: null,
    p1_img_src: "/page6/Asset 4.png",
    p1_img_map: {
        0: `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944abfb978d4b45c7d402_landscape_big.webp`,
        1: `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944abe69cec151cb2e39a_portrait_big.webp`,
        2: `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944abfb978d4b45c7d402_landscape_big.webp`,
        3: `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944abe69cec151cb2e39a_portrait_big.webp`,
    },
    paper1         : null,
    image_path_div : document.querySelector("#p1_image_path2"),
    p1_description5: document.querySelector("#p1_description5"),
    p1_path_class  : "rails_1",
    pathy1         : null,
    pathy2         : null,
    ip_div_bb      : null,
    project_button : document.querySelector("#goethe_fest_button"),
    project_url    : "https://www.youtube.com/watch?v=YZG4eEtXZaA",
    prev_device    : -1,
}
PAGE16_BUILDER.load_handler   = async (pd) => {

}
PAGE16_BUILDER.scroll_handler = async (pd, ss, delta_ss) => {
    document.querySelector("#particle_intro0").innerHTML="explore"
    document.querySelector("#particle_intro2").innerHTML="5/5"

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
PAGE16_BUILDER.resize_handler = async (pd) => {
    if (pd.prev_device != PAGE16_BUILDER.device){
        pd.p1_img_obj.clear();
        pd.p1_img_obj._img = await PAGE16_BUILDER.checkImage(pd.p1_img_map[PAGE16_BUILDER.device])
        pd.p1_img_obj.draw();
    }

    pd.ip_div_bb = pd.p1_image1.getBoundingClientRect()
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
    pd.paper1.updatePath(0, pd.pathy1[PAGE16_BUILDER.device])
    pd.prev_device = PAGE16_BUILDER.device
}
PAGE16_BUILDER.first_scroll_handler = async (pd) => {

    pd.p1_img_obj = new ImageObject(
        pd.p1_image1,
        await PAGE16_BUILDER.checkImage(pd.p1_img_map[PAGE16_BUILDER.device]),
        0,
    );
    pd.p1_img_obj.draw();

    pd.paper1 = new Paper(pd.image_path_div);
    pd.ip_div_bb = pd.p1_image1.getBoundingClientRect()
    pd.pathy1 = {
        0 : [
            {cmd:"Move",x:pd.p1_image1.offsetLeft, y:pd.p1_image1.offsetTop + pd.p1_image1.offsetHeight/2},
            {cmd:"Line",
                x:pd.p1_image1.offsetLeft + pd.p1_image1.offsetWidth/2, y:pd.p1_image1.offsetTop,
            },
            {cmd:"Line",
                x:pd.p1_image1.offsetLeft + pd.p1_image1.offsetWidth, y:pd.p1_image1.offsetTop + pd.p1_image1.offsetHeight/2,
            },
            {cmd:"Line",
                x:pd.p1_image1.offsetLeft + pd.p1_image1.offsetWidth/2, y:pd.p1_image1.offsetTop + pd.p1_image1.offsetHeight,
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
    pd.paper1.makePath(0, pd.pathy1[PAGE16_BUILDER.device])
    pd.paper1.paths[0].attr('class', pd.p1_path_class);

    pd.project_button.addEventListener("click", () => {
        pd.paper1.elementFollowPath(pd.paper1.paths[0].attr('path'), pd.p1_description5, [1,0.5,1], 2000, 'cubicBezier(.65,.34,.2,.99)', false, 0, true);
        setTimeout(() => {
            window.open(pd.project_url, '_blank').focus();
        }, 1000)
    })
}