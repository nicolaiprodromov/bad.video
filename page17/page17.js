
const PAGE17_BUILDER = new Page(17);
PAGE17_BUILDER.pd             = {
    holder_up: document.querySelector("#i17"),
    holder   : document.querySelector("#i18"),
    includer : document.querySelector("#page17include"),
    project_title: document.querySelector("#p4_title"),
    p1_title_anim: null,
    p1_svg       : document.querySelector("#p4_svg"),
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
const buttons_page_17         = (p17d) => {
    // BUTTONS
    if (PAGE17_BUILDER.device > 1){
        return null
    }
    if (p17d.buttons_built){
        return null;
    }
    p17d.buttons_built = true
    // =======================================================================================================
    p17d.p1_paper      = new Paper(p17d.p1_svg);
    var buttons = []
    p17d.p1_svg_width  = p17d.p1_svg.getBoundingClientRect().width;
    p17d.arrow_scale = p17d.p1_svg_width/3
    // MAKE PATHS
    p17d.p1_paper.makePath(0, asset15); p17d.p1_paper.makePath(1, asset13); p17d.p1_paper.makePath(2, asset13);
    p17d.p1_paper.forEach((p, id) => {
        p.attr('class', p17d.pth1_class)
        p17d.p1_paper.pop(id)
        p.svg_parent.setAttribute('width', p17d.arrow_scale)
        p.svg_parent.setAttribute('height', p17d.arrow_scale)
        p17d.p1_paper.moveParent1(id, {x:p17d.arrow_scale*id, y:0})
    });
    p17d.p1_paper.paths[2].rotate(90)

    for (var key = 0; key < 3; key++) {
        buttons.push(p17d.p1_paper.paper.rect(p17d.arrow_scale*key, 0, p17d.arrow_scale, p17d.arrow_scale));
        buttons[key].attr('class', p17d.buttons_class)
    }
    // BUTTONS INTERACTION
    buttons[0].click(
        () => {
            p17d.button1_clicked =! p17d.button1_clicked
            if (p17d.button1_clicked) {
                p17d.p1_paper.paths[0].animate({path:p17d.p1_paper.rparse_coords(asset16)}, 200)
            } else {
                p17d.p1_paper.paths[0].animate({path:p17d.p1_paper.rparse_coords(asset15)}, 200)
            }
            setTimeout(() => {
                PAGE17_BUILDER.toggleFullScreen(document.documentElement)
            }, 200)
        }
    )
    buttons[1].click(
        () => {
            p17d.button2_clicked =! p17d.button2_clicked
            p17d.p1_paper.paths[1].animate({path:p17d.p1_paper.rparse_coords(asset14)}, 200)
            setTimeout(() => {
                p17d.p1_paper.paths[1].animate({path:p17d.p1_paper.rparse_coords(asset13)}, 100)
            }, 120)
            setTimeout(() => {
                var e_e = {type : 'wheel', deltaY: 1}
                scroll_to(e_e)
            }, 200)
        }
    )
    buttons[2].click(
        () => {
            p17d.button3_clicked =! p17d.button3_clicked
            p17d.p1_paper.paths[2].animate({path:p17d.p1_paper.rparse_coords(asset14)}, 200)
            setTimeout(() => {
                p17d.p1_paper.paths[2].animate({path:p17d.p1_paper.rparse_coords(asset13)}, 100)
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
const buttons_resize_page17   = (p17d) => {
    if (PAGE17_BUILDER.device > 1){
        if (p17d.buttons_built){
            while (p17d.p1_paper.parent.firstChild) {
                p17d.p1_paper.parent.removeChild(p17d.p1_paper.parent.lastChild);
            }
            p17d.p1_paper = null;
            p17d.buttons_built = false
        }
        return null
    }
    if (p17d.buttons_built == false){
        return null;
    }
    p17d.p1_svg_width  = p17d.p1_svg.getBoundingClientRect().width;
    p17d.p1_paper.paper.setSize(p17d.p1_svg.getBoundingClientRect().width, p17d.p1_svg.getBoundingClientRect().height)
    p17d.arrow_scale = p17d.p1_svg_width/3
    p17d.p1_paper.forEach((p, id) => {
        p.svg_parent.setAttribute('width', p17d.arrow_scale)
        p.svg_parent.setAttribute('height', p17d.arrow_scale)
        p17d.p1_paper.moveParent1(id, {x:p17d.arrow_scale*id, y:0})
    });
}
PAGE17_BUILDER.load_handler   = (p17d) => {
    console.log(PAGE17_BUILDER.base_url, PAGE17_BUILDER.local_url)
    // PROJECT TITLE
    p17d.p1_title_anim = new TextAnim(p17d.project_title, 0)
    buttons_page_17(p17d);
    
}
PAGE17_BUILDER.scroll_handler = (p17d, ss, delta_ss) => {
    var scroll_amount_st        = ss[0];
    var page17_scroll_amount_st  = ss[4];
    // PAGE TRIGGER
    if (scroll_amount_st == 5 && page17_scroll_amount_st == 0){

        p17d.p1_title_anim.nr_vo_out(400, 'easeInOutCirc', 15)
        p17d.p1_title_anim.cycle_random(300, 53)
    }
}
PAGE17_BUILDER.resize_handler = (p17d) => {
    
    buttons_page_17(p17d);
    buttons_resize_page17(p17d);
}



