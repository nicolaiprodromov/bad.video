
const PAGE12_BUILDER = new Page(12);
PAGE12_BUILDER.pd             = {
    holder_up: document.querySelector("#i12"),
    holder   : document.querySelector("#i13"),
    includer : document.querySelector("#page12include"),
    project_title: document.querySelector("#p3_title"),
    p1_title_anim: null,
    p1_svg       : document.querySelector("#p3_svg"),
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
const buttons_page_12         = (p12d) => {
    // BUTTONS
    if (PAGE12_BUILDER.device > 1){
        return null
    }
    if (p12d.buttons_built){
        return null;
    }
    p12d.buttons_built = true
    // =======================================================================================================
    p12d.p1_paper      = new Paper(p12d.p1_svg);
    var buttons = []
    p12d.p1_svg_width  = p12d.p1_svg.getBoundingClientRect().width;
    p12d.arrow_scale = p12d.p1_svg_width/3
    // MAKE PATHS
    p12d.p1_paper.makePath(0, asset15); p12d.p1_paper.makePath(1, asset13); p12d.p1_paper.makePath(2, asset13);
    p12d.p1_paper.forEach((p, id) => {
        p.attr('class', p12d.pth1_class)
        p12d.p1_paper.pop(id)
        p.svg_parent.setAttribute('width', p12d.arrow_scale)
        p.svg_parent.setAttribute('height', p12d.arrow_scale)
        p12d.p1_paper.moveParent1(id, {x:p12d.arrow_scale*id, y:0})
    });
    p12d.p1_paper.paths[2].rotate(90)

    for (var key = 0; key < 3; key++) {
        buttons.push(p12d.p1_paper.paper.rect(p12d.arrow_scale*key, 0, p12d.arrow_scale, p12d.arrow_scale));
        buttons[key].attr('class', p12d.buttons_class)
    }
    // BUTTONS INTERACTION
    buttons[0].click(
        () => {
            p12d.button1_clicked =! p12d.button1_clicked
            if (p12d.button1_clicked) {
                p12d.p1_paper.paths[0].animate({path:p12d.p1_paper.rparse_coords(asset16)}, 200)
            } else {
                p12d.p1_paper.paths[0].animate({path:p12d.p1_paper.rparse_coords(asset15)}, 200)
            }
            setTimeout(() => {
                PAGE12_BUILDER.toggleFullScreen(document.documentElement)
            }, 200)
        }
    )
    buttons[1].click(
        () => {
            p12d.button2_clicked =! p12d.button2_clicked
            p12d.p1_paper.paths[1].animate({path:p12d.p1_paper.rparse_coords(asset14)}, 200)
            setTimeout(() => {
                p12d.p1_paper.paths[1].animate({path:p12d.p1_paper.rparse_coords(asset13)}, 100)
            }, 120)
            setTimeout(() => {
                var e_e = {type : 'wheel', deltaY: 1}
                scroll_to(e_e)
            }, 200)
        }
    )
    buttons[2].click(
        () => {
            p12d.button3_clicked =! p12d.button3_clicked
            p12d.p1_paper.paths[2].animate({path:p12d.p1_paper.rparse_coords(asset14)}, 200)
            setTimeout(() => {
                p12d.p1_paper.paths[2].animate({path:p12d.p1_paper.rparse_coords(asset13)}, 100)
            }, 120)
            setTimeout(() => {
                scroll_amount = 4
                page12_scroll_amount = 4
                var e_e = {type : 'wheel', deltaY: 1}
                scroll_to(e_e)
                page12_scroll_amount = 0
            }, 200)

            
        }
    )
}
const buttons_resize_page12   = (p12d) => {
    if (PAGE12_BUILDER.device > 1){
        if (p12d.buttons_built){
            while (p12d.p1_paper.parent.firstChild) {
                p12d.p1_paper.parent.removeChild(p12d.p1_paper.parent.lastChild);
            }
            p12d.p1_paper = null;
            p12d.buttons_built = false
        }
        return null
    }
    if (p12d.buttons_built == false){
        return null;
    }
    p12d.p1_svg_width  = p12d.p1_svg.getBoundingClientRect().width;
    p12d.p1_paper.paper.setSize(p12d.p1_svg.getBoundingClientRect().width, p12d.p1_svg.getBoundingClientRect().height)
    p12d.arrow_scale = p12d.p1_svg_width/3
    p12d.p1_paper.forEach((p, id) => {
        p.svg_parent.setAttribute('width', p12d.arrow_scale)
        p.svg_parent.setAttribute('height', p12d.arrow_scale)
        p12d.p1_paper.moveParent1(id, {x:p12d.arrow_scale*id, y:0})
    });
}
PAGE12_BUILDER.load_handler   = (p12d) => {
    console.log(PAGE12_BUILDER.base_url, PAGE12_BUILDER.local_url)
    // PROJECT TITLE
    p12d.p1_title_anim = new TextAnim(p12d.project_title, 0)
    buttons_page_12(p12d);
    
}
PAGE12_BUILDER.scroll_handler = (p12d, ss, delta_ss) => {
    var scroll_amount_st        = ss[0];
    var page12_scroll_amount_st  = ss[3];
    // PAGE TRIGGER
    if (scroll_amount_st == 4 && page12_scroll_amount_st == 0){

        var znn_anim = document.querySelector("#znn_anim");
        znn_anim.play();
        console.log(znn_anim)
        anime({
            targets : znn_anim,
            opacity : [1,0],
            duration: 2000,
            delay   : 500,
            easing  : 'linear'
        })
        setTimeout(() => znn_anim.stop(), 2500);

        p12d.p1_title_anim.nr_vo_out(400, 'easeInOutCirc', 15)
        p12d.p1_title_anim.cycle_random(300, 53)
    }
}
PAGE12_BUILDER.resize_handler = (p12d) => {
    
    buttons_page_12(p12d);
    buttons_resize_page12(p12d);
}



