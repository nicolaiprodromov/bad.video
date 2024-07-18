
const PAGE7_BUILDER = new Page(7);
PAGE7_BUILDER.pd             = {
    holder_up: document.querySelector("#i7"),
    holder   : document.querySelector("#i8"),
    includer : document.querySelector("#page7include"),
    project_title: document.querySelector("#p2_title"),
    p1_title_anim: null,
    p1_svg       : document.querySelector("#p2_svg"),
    p1_paper     : null,
    pth1_class   : "bg1_pth0",
    arrow_scale  : null,
    p1_svg_width : null,
    buttons_class : 'p_buttons',

    button1_clicked : false,
    button2_clicked : false,
    button3_clicked : false,
    buttons_built : false,

}
const buttons_page_7         = (p7d) => {
    // BUTTONS
    if (PAGE7_BUILDER.device > 1){
        return null
    }
    if (p7d.buttons_built){
        return null;
    }
    p7d.buttons_built = true
    // =======================================================================================================
    p7d.p1_paper      = new Paper(p7d.p1_svg);
    var buttons = []
    p7d.p1_svg_width  = p7d.p1_svg.getBoundingClientRect().width;
    p7d.arrow_scale = p7d.p1_svg_width/3
    // MAKE PATHS
    p7d.p1_paper.makePath(0, asset15); p7d.p1_paper.makePath(1, asset13); p7d.p1_paper.makePath(2, asset13);
    p7d.p1_paper.forEach((p, id) => {
        p.attr('class', p7d.pth1_class)
        p7d.p1_paper.pop(id)
        p.svg_parent.setAttribute('width', p7d.arrow_scale)
        p.svg_parent.setAttribute('height', p7d.arrow_scale)
        p7d.p1_paper.moveParent1(id, {x:p7d.arrow_scale*id, y:0})
    });
    p7d.p1_paper.paths[2].rotate(90)

    for (var key = 0; key < 3; key++) {
        buttons.push(p7d.p1_paper.paper.rect(p7d.arrow_scale*key, 0, p7d.arrow_scale, p7d.arrow_scale));
        buttons[key].attr('class', p7d.buttons_class)
    }
    // BUTTONS INTERACTION
    buttons[0].click(
        () => {
            p7d.button1_clicked =! p7d.button1_clicked
            if (p7d.button1_clicked) {
                p7d.p1_paper.paths[0].animate({path:p7d.p1_paper.rparse_coords(asset16)}, 200)
            } else {
                p7d.p1_paper.paths[0].animate({path:p7d.p1_paper.rparse_coords(asset15)}, 200)
            }
            setTimeout(() => {
                PAGE7_BUILDER.toggleFullScreen(document.documentElement)
            }, 200)
        }
    )
    buttons[1].click(
        () => {
            p7d.button2_clicked =! p7d.button2_clicked
            p7d.p1_paper.paths[1].animate({path:p7d.p1_paper.rparse_coords(asset14)}, 200)
            setTimeout(() => {
                p7d.p1_paper.paths[1].animate({path:p7d.p1_paper.rparse_coords(asset13)}, 100)
            }, 120)
            setTimeout(() => {
                var e_e = {type : 'wheel', deltaY: 1}
                scroll_to(e_e)
            }, 200)
        }
    )
    buttons[2].click(
        () => {
            p7d.button3_clicked =! p7d.button3_clicked
            p7d.p1_paper.paths[2].animate({path:p7d.p1_paper.rparse_coords(asset14)}, 200)
            setTimeout(() => {
                p7d.p1_paper.paths[2].animate({path:p7d.p1_paper.rparse_coords(asset13)}, 100)
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
const buttons_resize_page7   = (p7d) => {
    if (PAGE7_BUILDER.device > 1){
        if (p7d.buttons_built){
            while (p7d.p1_paper.parent.firstChild) {
                p7d.p1_paper.parent.removeChild(p7d.p1_paper.parent.lastChild);
            }
            p7d.p1_paper = null;
            p7d.buttons_built = false
        }
        return null
    }
    if (p7d.buttons_built == false){
        return null;
    }
    p7d.p1_svg_width  = p7d.p1_svg.getBoundingClientRect().width;
    p7d.p1_paper.paper.setSize(p7d.p1_svg.getBoundingClientRect().width, p7d.p1_svg.getBoundingClientRect().height)
    p7d.arrow_scale = p7d.p1_svg_width/3
    p7d.p1_paper.forEach((p, id) => {
        p.svg_parent.setAttribute('width', p7d.arrow_scale)
        p.svg_parent.setAttribute('height', p7d.arrow_scale)
        p7d.p1_paper.moveParent1(id, {x:p7d.arrow_scale*id, y:0})
    });
}
PAGE7_BUILDER.load_handler   = (p7d) => {
    console.log(PAGE7_BUILDER.base_url, PAGE7_BUILDER.local_url)
    // PROJECT TITLE
    p7d.p1_title_anim = new TextAnim(p7d.project_title, 0)
    buttons_page_7(p7d);
    
}
PAGE7_BUILDER.scroll_handler = (p7d, ss, delta_ss) => {
    var scroll_amount_st        = ss[0];
    var page7_scroll_amount_st  = ss[2];
    // PAGE TRIGGER
    if (scroll_amount_st == 3 && page7_scroll_amount_st == 0){
        p7d.p1_title_anim.nr_vo_out(400, 'easeInOutCirc', 15)
        p7d.p1_title_anim.cycle_random(300, 53)
    }
}
PAGE7_BUILDER.resize_handler = (p7d) => {
    
    buttons_page_7(p7d);
    buttons_resize_page7(p7d);
}

