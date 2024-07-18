

const PAGE4_BUILDER = new Page(4);
PAGE4_BUILDER.pd = {
    holder    : document.querySelector('#i5'),
    p1_images2: document.querySelectorAll('.p_image2'),
    p1_img_obj: [],

    p1_img_src : `${PAGE4_BUILDER.local_url}Asset`,

    p1_img_map : {
        0 : `${PAGE4_BUILDER.local_url}Asset`,
        1 : `${PAGE4_BUILDER.local_url}Asset`,
        2 : `${PAGE4_BUILDER.local_url}Asset`,
        3 : `${PAGE4_BUILDER.local_url}Asset`,
    },

    p1_img_ext : ".png"
}

PAGE4_BUILDER.load_handler = (p4d) => {

    for (var bgobj of p4d.p1_images2){
        var bg_img_obj11 = new ImageObject(
            element  = bgobj,
            img      = p4d.p1_img_map[PAGE4_BUILDER.device] + " " + (bgobj.parentNode.dataset.id) + p4d.p1_img_ext,
            id       = 0,
        );
        bg_img_obj11.draw();
        p4d.p1_img_obj.push(bg_img_obj11);
    }

}
PAGE4_BUILDER.scroll_handler = (p4d, ss, delta_ss) => {

    var scroll_amount_st        = ss[0];
        var page2_scroll_amount_st  = ss[1];
        if (scroll_amount_st == 2 && page2_scroll_amount_st == 2){
            for (var bgobj of p4d.p1_img_obj){
                bgobj.fade([0,1], 300)
                bgobj.scale_y(["0%","100%"], 300, 'easeInOutCirc')
            }
            
        }

}
PAGE4_BUILDER.resize_handler = (p4d) => {

    for (var bgobj of p4d.p1_img_obj){
        bgobj.clear();
        bgobj.img = p4d.p1_img_map[PAGE4_BUILDER.device] + " " + (bgobj.element.parentNode.dataset.id) + p4d.p1_img_ext
        bgobj.draw();
    }

}