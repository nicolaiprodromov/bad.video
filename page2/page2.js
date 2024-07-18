
const PAGE2_BUILDER = new Page(2);
PAGE2_BUILDER.pd             = {
    holder_up: document.querySelector("#i2"),
    holder   : document.querySelector("#i3"),
    includer : document.querySelector("#page2include"),
    project_title: document.querySelector("#p1_title"),
    p1_title_anim: null,
    p1_svg       : document.querySelector("#p1_svg"),
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
const buttons_page_2         = (p2d) => {
    // BUTTONS
    if (PAGE2_BUILDER.device > 1){
        return null
    }
    if (p2d.buttons_built){
        return null;
    }
    p2d.buttons_built = true
    // =======================================================================================================
    p2d.p1_paper      = new Paper(p2d.p1_svg);
    var buttons = []
    p2d.p1_svg_width  = p2d.p1_svg.getBoundingClientRect().width;
    p2d.arrow_scale = p2d.p1_svg_width/3
    // MAKE PATHS
    p2d.p1_paper.makePath(0, asset15); p2d.p1_paper.makePath(1, asset13); p2d.p1_paper.makePath(2, asset13);
    p2d.p1_paper.forEach((p, id) => {
        p.attr('class', p2d.pth1_class)
        p2d.p1_paper.pop(id)
        p.svg_parent.setAttribute('width', p2d.arrow_scale)
        p.svg_parent.setAttribute('height', p2d.arrow_scale)
        p2d.p1_paper.moveParent1(id, {x:p2d.arrow_scale*id, y:0})
    });
    p2d.p1_paper.paths[2].rotate(90)

    for (var key = 0; key < 3; key++) {
        buttons.push(p2d.p1_paper.paper.rect(p2d.arrow_scale*key, 0, p2d.arrow_scale, p2d.arrow_scale));
        buttons[key].attr('class', p2d.buttons_class)
    }
    // BUTTONS INTERACTION
    buttons[0].click(
        () => {
            p2d.button1_clicked =! p2d.button1_clicked
            if (p2d.button1_clicked) {
                p2d.p1_paper.paths[0].animate({path:p2d.p1_paper.rparse_coords(asset16)}, 200)
            } else {
                p2d.p1_paper.paths[0].animate({path:p2d.p1_paper.rparse_coords(asset15)}, 200)
            }
            setTimeout(() => {
                PAGE2_BUILDER.toggleFullScreen(document.documentElement)
            }, 200)
        }
    )
    buttons[1].click(
        () => {
            p2d.button2_clicked =! p2d.button2_clicked
            p2d.p1_paper.paths[1].animate({path:p2d.p1_paper.rparse_coords(asset14)}, 200)
            setTimeout(() => {
                p2d.p1_paper.paths[1].animate({path:p2d.p1_paper.rparse_coords(asset13)}, 100)
            }, 120)
            setTimeout(() => {
                var e_e = {type : 'wheel', deltaY: 1}
                scroll_to(e_e)
            }, 200)
        }
    )
    buttons[2].click(
        () => {
            p2d.button3_clicked =! p2d.button3_clicked
            p2d.p1_paper.paths[2].animate({path:p2d.p1_paper.rparse_coords(asset14)}, 200)
            setTimeout(() => {
                p2d.p1_paper.paths[2].animate({path:p2d.p1_paper.rparse_coords(asset13)}, 100)
            }, 120)
            setTimeout(() => {
                scroll_amount = 2
                page2_scroll_amount = 4
                var e_e = {type : 'wheel', deltaY: 1}
                scroll_to(e_e)
                page2_scroll_amount = 0
            }, 200)

            
        }
    )
}
const buttons_resize_page2   = (p2d) => {
    if (PAGE2_BUILDER.device > 1){
        if (p2d.buttons_built){
            while (p2d.p1_paper.parent.firstChild) {
                p2d.p1_paper.parent.removeChild(p2d.p1_paper.parent.lastChild);
            }
            p2d.p1_paper = null;
            p2d.buttons_built = false
        }
        return null
    }
    if (p2d.buttons_built == false){
        return null;
    }
    p2d.p1_svg_width  = p2d.p1_svg.getBoundingClientRect().width;
    p2d.p1_paper.paper.setSize(p2d.p1_svg.getBoundingClientRect().width, p2d.p1_svg.getBoundingClientRect().height)
    p2d.arrow_scale = p2d.p1_svg_width/3
    p2d.p1_paper.forEach((p, id) => {
        p.svg_parent.setAttribute('width', p2d.arrow_scale)
        p.svg_parent.setAttribute('height', p2d.arrow_scale)
        p2d.p1_paper.moveParent1(id, {x:p2d.arrow_scale*id, y:0})
    });
}
PAGE2_BUILDER.load_handler   = (p2d) => {
    console.log(PAGE2_BUILDER.base_url, PAGE2_BUILDER.local_url)
    // PROJECT TITLE
    p2d.p1_title_anim = new TextAnim(p2d.project_title, 0)
    buttons_page_2(p2d);
    
}
PAGE2_BUILDER.scroll_handler = (p2d, ss, delta_ss) => {
    var scroll_amount_st        = ss[0];
    var page2_scroll_amount_st  = ss[1];
    // PAGE TRIGGER
    if (scroll_amount_st == 2 && page2_scroll_amount_st == 0){
        p2d.p1_title_anim.nr_vo_out(400, 'easeInOutCirc', 15)
        p2d.p1_title_anim.cycle_random(300, 53)
    }
}
PAGE2_BUILDER.resize_handler = (p2d) => {

    buttons_page_2(p2d);
    buttons_resize_page2(p2d);
}

