import { Page }          from '/lib/page_builder.js';
import { Paper }         from '/lib/svg.js';
import { TextAnim }      from '/lib/text_anim.js';

const PAGE17_BUILDER = new Page(17);
PAGE17_BUILDER.pd = {
    holder_up      : document.querySelector("#i17"),
    holder         : document.querySelector("#i18"),
    includer       : document.querySelector("#page17include"),
    project_title  : document.querySelector("#p4_title"),
    p1_svg         : document.querySelector("#p4_svg"),
    image          : document.querySelector("#p4_intro_image"),
    pth1_class     : "bg1_pth0",
    buttons_class  : 'p_buttons',
    p1_title_anim  : null,
    p1_paper       : null,
    arrow_scale    : null,
    p1_svg_width   : null,
    button1_clicked: false,
    button2_clicked: false,
    button3_clicked: false,
    buttons_built  : false,
    image_map      : {
        0: "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/66a3eac5ff6a5f900fbe29bf_thumbnail.avif",
        1: "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/66a3f182679b3b46c225df0e_thumbnail_mobile.avif",
        2: "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/66a3eac5ff6a5f900fbe29bf_thumbnail.avif",
        3: "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/66a3f182679b3b46c225df0e_thumbnail_mobile.avif"
    },
}
PAGE17_BUILDER.buttons_page_17 = (pd) => {
    // BUTTONS
    if (PAGE17_BUILDER.device > 1){
        return null
    }
    if (pd.buttons_built){
        return null;
    }
    pd.buttons_built = true
    // =======================================================================================================
    pd.p1_paper      = new Paper(pd.p1_svg);
    var buttons = []
    pd.p1_svg_width  = pd.p1_svg.getBoundingClientRect().width;
    pd.arrow_scale = pd.p1_svg_width/3
    // MAKE PATHS
    pd.p1_paper.makePath(0, asset15); pd.p1_paper.makePath(1, asset13); pd.p1_paper.makePath(2, asset13);
    pd.p1_paper.forEach((p, id) => {
        p.attr('class', pd.pth1_class)
        pd.p1_paper.pop(id)
        p.svg_parent.setAttribute('width', pd.arrow_scale)
        p.svg_parent.setAttribute('height', pd.arrow_scale)
        pd.p1_paper.moveParent1(id, {x:pd.arrow_scale*id, y:0})
    });
    pd.p1_paper.paths[2].rotate(90)

    for (var key = 0; key < 3; key++) {
        buttons.push(pd.p1_paper.paper.rect(pd.arrow_scale*key, 0, pd.arrow_scale, pd.arrow_scale));
        buttons[key].attr('class', pd.buttons_class)
    }
    // BUTTONS INTERACTION
    buttons[0].click(
        () => {
            pd.button1_clicked =! pd.button1_clicked
            if (pd.button1_clicked) {
                pd.p1_paper.paths[0].animate({path:pd.p1_paper.rparse_coords(asset16)}, 200)
            } else {
                pd.p1_paper.paths[0].animate({path:pd.p1_paper.rparse_coords(asset15)}, 200)
            }
            setTimeout(() => {
                PAGE17_BUILDER.toggleFullScreen(document.documentElement)
            }, 200)
        }
    )
    buttons[1].click(
        () => {
            pd.button2_clicked =! pd.button2_clicked
            pd.p1_paper.paths[1].animate({path:pd.p1_paper.rparse_coords(asset14)}, 200)
            setTimeout(() => {
                pd.p1_paper.paths[1].animate({path:pd.p1_paper.rparse_coords(asset13)}, 100)
            }, 120)
            setTimeout(() => {
                var e_e = {type : 'wheel', deltaY: 1}
                scroll_to(e_e)
            }, 200)
        }
    )
    buttons[2].click(
        () => {
            pd.button3_clicked =! pd.button3_clicked
            pd.p1_paper.paths[2].animate({path:pd.p1_paper.rparse_coords(asset14)}, 200)
            setTimeout(() => {
                pd.p1_paper.paths[2].animate({path:pd.p1_paper.rparse_coords(asset13)}, 100)
            }, 120)
            setTimeout(() => {
                scroll_amount = 5
                page17_scroll_amount = 4
                var e_e = {type : 'wheel', deltaY: 1}
                scroll_to(e_e)
                page17_scroll_amount = 0
            }, 200)

            
        }
    )
}
PAGE17_BUILDER.buttons_resize_page17 = (pd) => {
    if (PAGE17_BUILDER.device > 1){
        if (pd.buttons_built){
            while (pd.p1_paper.parent.firstChild) {
                pd.p1_paper.parent.removeChild(pd.p1_paper.parent.lastChild);
            }
            pd.p1_paper = null;
            pd.buttons_built = false
        }
        return null
    }
    if (pd.buttons_built == false){
        return null;
    }
    pd.p1_svg_width  = pd.p1_svg.getBoundingClientRect().width;
    pd.p1_paper.paper.setSize(pd.p1_svg.getBoundingClientRect().width, pd.p1_svg.getBoundingClientRect().height)
    pd.arrow_scale = pd.p1_svg_width/3
    pd.p1_paper.forEach((p, id) => {
        p.svg_parent.setAttribute('width', pd.arrow_scale)
        p.svg_parent.setAttribute('height', pd.arrow_scale)
        pd.p1_paper.moveParent1(id, {x:pd.arrow_scale*id, y:0})
    });
}
PAGE17_BUILDER.load_handler = (pd) => {
    
}
PAGE17_BUILDER.scroll_handler = (pd, ss, delta_ss) => {
    pd.p1_title_anim.nr_vo_out(400, 'easeInOutCirc', 15)
    pd.p1_title_anim.cycle_random(300, 53)
    document.querySelector("#particle_intro0").innerHTML="sah.showcase"
    document.querySelector("#particle_intro1").innerHTML=">"
    document.querySelector("#particle_intro2").innerHTML="1/5"
}
PAGE17_BUILDER.resize_handler = (pd) => {
    pd.image.style.backgroundImage = `url(${pd.image_map[PAGE17_BUILDER.device]})`
    PAGE17_BUILDER.buttons_page_17(pd);
    PAGE17_BUILDER.buttons_resize_page17(pd);
}
PAGE17_BUILDER.first_scroll_handler = (pd) => {
    pd.image.style.backgroundImage = `url(${pd.image_map[PAGE17_BUILDER.device]})`
    pd.p1_title_anim = new TextAnim(pd.project_title, 0)
    PAGE17_BUILDER.buttons_page_17(pd);
}