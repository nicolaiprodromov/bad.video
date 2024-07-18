

const PAGE9_BUILDER = new Page(9);
PAGE9_BUILDER.pd = {
    holder    : document.querySelector('#i10'),
    p1_images2: document.querySelectorAll('.p_image3'),
    p1_img_obj: [],

    p1_img_src : `${PAGE9_BUILDER.local_url}Asset`,

    p1_img_map : {
        0:`${PAGE9_BUILDER.local_url}landscape_big/Asset`,
        1:`${PAGE9_BUILDER.local_url}portrait_big/Asset`,
        2:`${PAGE9_BUILDER.local_url}landscape_big/Asset`,
        3:`${PAGE9_BUILDER.local_url}portrait_big/Asset`,
    },

    p1_img_ext : ".png"
}

PAGE9_BUILDER.load_handler = async (p9d) => {
    for (var bgobj of p9d.p1_images2){

        var testeere = await PAGE9_BUILDER.checkImage(p9d.p1_img_map[PAGE9_BUILDER.device] + " " + (bgobj.parentNode.dataset.id) + p9d.p1_img_ext)
        console.log("WABALALALALABADUBUDUB", testeere)
        
        var bg_img_obj11 = new ImageObject(
            element  = bgobj,
            img      = await PAGE9_BUILDER.checkImage(p9d.p1_img_map[PAGE9_BUILDER.device] + " " + (bgobj.parentNode.dataset.id) + p9d.p1_img_ext),
            id       = 0,
        );
        bg_img_obj11.draw();
        p9d.p1_img_obj.push(bg_img_obj11);
    }

}
PAGE9_BUILDER.scroll_handler = (p9d, ss, delta_ss) => {
    var scroll_amount_st        = ss[0];
    var page7_scroll_amount_st  = ss[2];
    if (scroll_amount_st == 3 && page7_scroll_amount_st == 2){
        for (var bgobj of p9d.p1_img_obj){
            bgobj.fade([0,1], 300)
            bgobj.scale_y(["0%","100%"], 300, 'easeInOutCirc')
        }
    }

}
PAGE9_BUILDER.resize_handler = async (p9d) => {
    for (var bgobj of p9d.p1_img_obj){
        bgobj.clear();
        bgobj.img = await PAGE9_BUILDER.checkImage(p9d.p1_img_map[PAGE9_BUILDER.device] + " " + (bgobj.element.parentNode.dataset.id) + p9d.p1_img_ext)
        bgobj.draw();
    }

}