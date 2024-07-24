
const PAGE11_BUILDER = new Page(11);
PAGE11_BUILDER.pd             = {
    holder    : document.querySelector('#i11-1'),
    includer  : document.querySelector('#page11include'),
    
    p1_image1 : document.querySelector('#p2_image14'),
    p1_img_obj: null,
    p1_img_src: "http://127.0.0.1:5500/page6/Asset 4.png",

    p1_img_map : {
        0 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669a2be2101b5db48e0294de_landscape_big.webp`,
        1 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669a2be2f091a4c18b5672a5_portrait_big.webp`,
        2 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669a2be2101b5db48e0294de_landscape_big.webp`,
        3 : `https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669a2be2f091a4c18b5672a5_portrait_big.webp`,
    },
    paper1 : null,
    image_path_div : document.querySelector("#p2_image_path2"),
    p1_description5 : document.querySelector("#p2_description5"),
    p1_path_class : "rails_1",

    pathy1 : null,
    pathy2 : null,

    ip_div_bb : null,

    project_button1 : document.querySelector("#rci_button1"),
    project_button2 : document.querySelector("#rci_button2"),

    project_url1 : "https://www.icr.ro/madrid/romania-din-nou-la-jazzahead-bremen-cu-un-stand-organizat-de-institutul-cultural-roman/es",
    project_url2 : "https://www.youtube.com/watch?v=7nXvfnQV4Ao&t=12s",
}
PAGE11_BUILDER.load_handler   = async (p11d) => {

    p11d.project_button1.addEventListener('click', () => {
        setTimeout(() => {
            window.open(p11d.project_url1, '_blank').focus();
        },200)
    })
    p11d.project_button2.addEventListener('click', () => {
        setTimeout(() => {
            window.open(p11d.project_url2, '_blank').focus();
        },200)
    })

    p11d.p1_img_obj = new ImageObject(
        element  = p11d.p1_image1,
        img      = await PAGE11_BUILDER.checkImage(p11d.p1_img_map[PAGE11_BUILDER.device]),
        id       = 0,
    );
    p11d.p1_img_obj.draw();

    p11d.paper1 = new Paper(p11d.image_path_div);
    p11d.ip_div_bb = p11d.image_path_div.getBoundingClientRect()
    p11d.pathy1 = {
        0 : [
            {cmd:"Move",x:p11d.ip_div_bb.width/8,y:p11d.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:p11d.ip_div_bb.width - p11d.ip_div_bb.width/4,y:p11d.ip_div_bb.height/2,
                c1x:p11d.ip_div_bb.width/2, c1y:p11d.ip_div_bb.height/2,
                c2x:p11d.ip_div_bb.width/16, c2y:p11d.ip_div_bb.height/1.1,
            }
        ],
        1 : [
            {cmd:"Move",x:p11d.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:p11d.ip_div_bb.width/2,y:p11d.ip_div_bb.height/2 + p11d.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:p11d.ip_div_bb.width, c2y:p11d.ip_div_bb.height/2,
            }
        ],
        2 : [
            {cmd:"Move",x:p11d.ip_div_bb.width/8,y:p11d.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:p11d.ip_div_bb.width - p11d.ip_div_bb.width/4,y:p11d.ip_div_bb.height/2,
                c1x:p11d.ip_div_bb.width/2, c1y:p11d.ip_div_bb.height,
                c2x:p11d.ip_div_bb.width/8, c2y:p11d.ip_div_bb.height/2,
            }
        ],
        3 : [
            {cmd:"Move",x:p11d.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:p11d.ip_div_bb.width/2,y:p11d.ip_div_bb.height/2 + p11d.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:p11d.ip_div_bb.width, c2y:p11d.ip_div_bb.height/2,
            }
        ],
    }
    p11d.paper1.makePath(0, p11d.pathy1[PAGE11_BUILDER.device])
    p11d.paper1.paths[0].attr('class', p11d.p1_path_class);

    

}
PAGE11_BUILDER.scroll_handler = async (p11d, ss, delta_ss) => {
    var scroll_amount_st        = ss[0];
    var page7_scroll_amount_st  = ss[2];
    if (scroll_amount_st == 3 && page7_scroll_amount_st == 4){
        
        p11d.p1_img_obj.fade([0,1], 300)
        // IMAGE GLITCH TRANSITION
        await p11d.p1_img_obj.glitchTransition(5);

        
        p11d.ip_div_bb = p11d.image_path_div.getBoundingClientRect()
        p11d.pathy2 = {
            0 : [
                {cmd:"Move",x:p11d.ip_div_bb.width/8,y:p11d.ip_div_bb.height/2},
                {cmd:"CubicBezier",
                    x:p11d.ip_div_bb.width - p11d.ip_div_bb.width/4,y:p11d.ip_div_bb.height/2,
                    c1x:p11d.ip_div_bb.width/2, c1y:p11d.ip_div_bb.height,
                    c2x:p11d.ip_div_bb.width/2, c2y:p11d.ip_div_bb.height/2,
                }
            ],
            1 : [
                {cmd:"Move",x:p11d.ip_div_bb.width/2,y:5},
                {cmd:"CubicBezier",
                    x:p11d.ip_div_bb.width/2,y:p11d.ip_div_bb.height/2 + p11d.ip_div_bb.height/4,
                    c1x:0, c1y:0,
                    c2x:p11d.ip_div_bb.width, c2y:p11d.ip_div_bb.height/2,
                }
            ],
            2 : [
                {cmd:"Move",x:p11d.ip_div_bb.width/8,y:p11d.ip_div_bb.height/2},
                {cmd:"CubicBezier",
                    x:p11d.ip_div_bb.width - p11d.ip_div_bb.width/4,y:p11d.ip_div_bb.height/2,
                    c1x:p11d.ip_div_bb.width/2, c1y:p11d.ip_div_bb.height,
                    c2x:p11d.ip_div_bb.width/2, c2y:p11d.ip_div_bb.height/2,
                }
            ],
            3 : [
                {cmd:"Move",x:p11d.ip_div_bb.width/2,y:5},
                {cmd:"CubicBezier",
                    x:p11d.ip_div_bb.width/2,y:p11d.ip_div_bb.height/2 + p11d.ip_div_bb.height/4,
                    c1x:0, c1y:0,
                    c2x:p11d.ip_div_bb.width, c2y:p11d.ip_div_bb.height/2,
                }
            ],
        }

        var testy = p11d.paper1.paths[0].animate({path : p11d.paper1.rparse_coords(p11d.pathy2[PAGE11_BUILDER.device])}, 800, 'cubic-bezier(.65,.34,.2,.99)')
        p11d.paper1.elementFollowPath(testy.attr('path'), p11d.p1_description5, [0,1], 800, easing = 'cubicBezier(.65,.34,.2,.99)', loop = false, delay = 0, autoplay = true);
    }
}
PAGE11_BUILDER.resize_handler = async (p11d) => {

    p11d.p1_img_obj.clear();
    p11d.p1_img_obj._img = await PAGE11_BUILDER.checkImage(p11d.p1_img_map[PAGE11_BUILDER.device])
    p11d.p1_img_obj.draw();

    p11d.ip_div_bb = p11d.image_path_div.getBoundingClientRect()
    p11d.paper1.paper.setSize(p11d.ip_div_bb.width, p11d.ip_div_bb.height)
    p11d.pathy1 = {
        0 : [
            {cmd:"Move",x:p11d.ip_div_bb.width/8,y:p11d.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:p11d.ip_div_bb.width - p11d.ip_div_bb.width/4,y:p11d.ip_div_bb.height/2,
                c1x:p11d.ip_div_bb.width/2, c1y:p11d.ip_div_bb.height/2,
                c2x:p11d.ip_div_bb.width/16, c2y:p11d.ip_div_bb.height/1.1,
            }
        ],
        1 : [
            {cmd:"Move",x:p11d.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:p11d.ip_div_bb.width/2,y:p11d.ip_div_bb.height/2 + p11d.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:p11d.ip_div_bb.width, c2y:p11d.ip_div_bb.height/2,
            }
        ],
        2 : [
            {cmd:"Move",x:p11d.ip_div_bb.width/8,y:p11d.ip_div_bb.height/2},
            {cmd:"CubicBezier",
                x:p11d.ip_div_bb.width - p11d.ip_div_bb.width/4,y:p11d.ip_div_bb.height/2,
                c1x:p11d.ip_div_bb.width/2, c1y:p11d.ip_div_bb.height,
                c2x:p11d.ip_div_bb.width/8, c2y:p11d.ip_div_bb.height/2,
            }
        ],
        3 : [
            {cmd:"Move",x:p11d.ip_div_bb.width/2,y:5},
            {cmd:"CubicBezier",
                x:p11d.ip_div_bb.width/2,y:p11d.ip_div_bb.height/2 + p11d.ip_div_bb.height/4,
                c1x:0, c1y:0,
                c2x:p11d.ip_div_bb.width, c2y:p11d.ip_div_bb.height/2,
            }
        ],
    }
    p11d.paper1.updatePath(0, p11d.pathy1[PAGE11_BUILDER.device])
}