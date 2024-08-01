import { Page }        from '/lib/page_builder.js';
import { TextAnim }    from '/lib/text_anim.js';
import { Paper }       from '/lib/svg.js';

const PAGE7_BUILDER = new Page(7);
PAGE7_BUILDER.pd             = {
    holder_up      : document.querySelector("#i7"),
    holder         : document.querySelector("#i8"),
    includer       : document.querySelector("#page7include"),
    project_title  : document.querySelector("#p3_title"),
    p1_svg         : document.querySelector("#p3_svg"),
    image          : document.querySelector("#p3_intro_image"),
    buttons_class  : 'p_buttons',
    pth1_class     : "bg1_pth0",
    p1_title_anim  : null,
    p1_paper       : null,
    arrow_scale    : null,
    p1_svg_width   : null,
    button1_clicked: false,
    button2_clicked: false,
    button3_clicked: false,
    buttons_built  : false,
    image_map      : {
        0: "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/66ab7837f73707dd4333e728_thumbnail.avif",
        1: "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/66ab783a0c5f8eca821be4be_thumbnail_mobile.avif",
        2: "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/66ab7837f73707dd4333e728_thumbnail.avif",
        3: "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/66ab783a0c5f8eca821be4be_thumbnail_mobile.avif"
    },
}
PAGE7_BUILDER.buttons_page_7         = (pd) => {
    // BUTTONS
    if (PAGE7_BUILDER.device > 1){
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
                PAGE7_BUILDER.toggleFullScreen(document.documentElement)
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
                scroll_amount = 3
                page7_scroll_amount = 4
                var e_e = {type : 'wheel', deltaY: 1}
                scroll_to(e_e)
                page7_scroll_amount = 0
            }, 200)

            
        }
    )
}
PAGE7_BUILDER.buttons_resize_page7   = (pd) => {
    if (PAGE7_BUILDER.device > 1){
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
PAGE7_BUILDER.load_handler   = (pd) => {
}
PAGE7_BUILDER.scroll_handler = (pd, ss, delta_ss) => {
    pd.p1_title_anim.nr_vo_out(400, 'easeInOutCirc', 15)
    pd.p1_title_anim.cycle_random(300, 53)
    document.querySelector("#particle_intro0").innerHTML="zenon.network"
    document.querySelector("#particle_intro1").innerHTML=">"
    document.querySelector("#particle_intro2").innerHTML="1/5"
}
PAGE7_BUILDER.resize_handler = (pd) => {
    pd.image.style.backgroundImage = `url(${pd.image_map[PAGE7_BUILDER.device]})`
    PAGE7_BUILDER.buttons_page_7(pd);
    PAGE7_BUILDER.buttons_resize_page7(pd);
}
PAGE7_BUILDER.first_scroll_handler = (pd) => {
    pd.image.style.backgroundImage = `url(${pd.image_map[PAGE7_BUILDER.device]})`
    pd.p1_title_anim = new TextAnim(pd.project_title, 0)
    PAGE7_BUILDER.buttons_page_7(pd);
}