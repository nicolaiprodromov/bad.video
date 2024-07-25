import { Page }        from '/lib/page_builder.js';
import { TextAnim }    from '/lib/text_anim.js';
import { Paper }    from '/lib/svg.js';

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
PAGE12_BUILDER.buttons_page_12         = (pd) => {
    // BUTTONS
    if (PAGE12_BUILDER.device > 1){
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
                PAGE12_BUILDER.toggleFullScreen(document.documentElement)
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
                scroll_amount = 4
                page12_scroll_amount = 4
                var e_e = {type : 'wheel', deltaY: 1}
                scroll_to(e_e)
                page12_scroll_amount = 0
            }, 200)

            
        }
    )
}
PAGE12_BUILDER.buttons_resize_page12   = (pd) => {
    if (PAGE12_BUILDER.device > 1){
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
PAGE12_BUILDER.load_handler   = (pd) => {
}
PAGE12_BUILDER.scroll_handler = (pd, ss, delta_ss) => {
    var scroll_amount_st        = ss[0];
    var page12_scroll_amount_st  = ss[3];
    // PAGE TRIGGER
    if (scroll_amount_st == 4 && page12_scroll_amount_st == 0){

        // var znn_anim = document.querySelector("#znn_anim");
        // znn_anim.play();
        // console.log(znn_anim)
        // anime({
        //     targets : znn_anim,
        //     opacity : [1,0],
        //     duration: 2000,
        //     delay   : 500,
        //     easing  : 'linear'
        // })
        // setTimeout(() => znn_anim.stop(), 2500);

        pd.p1_title_anim.nr_vo_out(400, 'easeInOutCirc', 15)
        pd.p1_title_anim.cycle_random(300, 53)
        document.querySelector("#particle_intro0").innerHTML="zenon.network"
        document.querySelector("#particle_intro1").innerHTML=">"
        document.querySelector("#particle_intro2").innerHTML="1/5"
    } else if(scroll_amount_st == 4 && page12_scroll_amount_st == 1){
        document.querySelector("#particle_intro0").innerHTML="zenon.network"
        document.querySelector("#particle_intro2").innerHTML="2/5"
    } else if(scroll_amount_st == 4 && page12_scroll_amount_st == 2){
        document.querySelector("#particle_intro0").innerHTML="zenon.network"
        document.querySelector("#particle_intro2").innerHTML="3/5"
    } else if(scroll_amount_st == 4 && page12_scroll_amount_st == 3){
        document.querySelector("#particle_intro0").innerHTML="zenon.network"
        document.querySelector("#particle_intro2").innerHTML="4/5"
    } else if(scroll_amount_st == 4 && page12_scroll_amount_st == 4){
        document.querySelector("#particle_intro0").innerHTML="explore"
        document.querySelector("#particle_intro2").innerHTML="5/5"
    }
}
PAGE12_BUILDER.resize_handler = (pd) => {
    PAGE12_BUILDER.buttons_page_12(pd);
    PAGE12_BUILDER.buttons_resize_page12(pd);
}
PAGE12_BUILDER.first_scroll_handler = (pd) => {
    pd.p1_title_anim = new TextAnim(pd.project_title, 0)
    PAGE12_BUILDER.buttons_page_12(pd);
}