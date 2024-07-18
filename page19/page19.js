

const PAGE19_BUILDER = new Page(19);
PAGE19_BUILDER.pd = {
    holder    : document.querySelector('#i15'),

    
    p1_img_map : {
        0 : `${PAGE19_BUILDER.local_url}Asset`,
        1 : `${PAGE19_BUILDER.local_url}Asset`,
        2 : `${PAGE19_BUILDER.local_url}Asset`,
        3 : `${PAGE19_BUILDER.local_url}Asset`,
    },
    p1_img_ext : ".png"
}

PAGE19_BUILDER.load_handler = (p19d) => {

}
PAGE19_BUILDER.scroll_handler = (p19d, ss, delta_ss) => {
    var scroll_amount_st        = ss[0];
    var page17_scroll_amount_st  = ss[4];
    if (scroll_amount_st == 5 && page17_scroll_amount_st == 2){
        
    }

}
PAGE19_BUILDER.resize_handler = (p19d) => {
}