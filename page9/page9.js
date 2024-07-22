

const PAGE9_BUILDER = new Page(9);
PAGE9_BUILDER.pd = {
    holder    : document.querySelector('#i10'),
    p1_images2: document.querySelectorAll('.p_image3'),
    p1_img_obj: [],

    p1_img_src : `${PAGE9_BUILDER.local_url}Asset`,

    p1_img_map : {
        0:[
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944f8d62f3e1ab1c8b68f_Asset%200.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944f744733d8223d5bf99_Asset%205.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944f76dc2d1ff1536eeb0_Asset%203.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944f733d8a793b6a3448b_Asset%202.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944f7c2fa3d467b188a3f_Asset%204.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944f7016de2a724f86d4e_Asset%201.webp"
        ],
        1:[
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669945003e73701e9e48601d_Asset%201.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/66994500d62f3e1ab1c8be00_Asset%205.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944ff9859c08c6099ba36_Asset%202.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944ff948ca370b164c0da_Asset%203.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944ffe0f340663c6c6991_Asset%204.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944ff2885ae3fb0271ec6_Asset%200.webp"
        ],
        2:[
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944f8d62f3e1ab1c8b68f_Asset%200.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944f744733d8223d5bf99_Asset%205.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944f76dc2d1ff1536eeb0_Asset%203.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944f733d8a793b6a3448b_Asset%202.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944f7c2fa3d467b188a3f_Asset%204.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944f7016de2a724f86d4e_Asset%201.webp"
        ],
        3:[
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669945003e73701e9e48601d_Asset%201.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/66994500d62f3e1ab1c8be00_Asset%205.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944ff9859c08c6099ba36_Asset%202.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944ff948ca370b164c0da_Asset%203.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944ffe0f340663c6c6991_Asset%204.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944ff2885ae3fb0271ec6_Asset%200.webp"
        ],
    },

    p1_img_ext : ".png"
}

PAGE9_BUILDER.load_handler = async (p9d) => {
    for (var bgobj of p9d.p1_images2){
        
        var bg_img_obj11 = new ImageObject(
            element  = bgobj,
            img      = p9d.p1_img_map[PAGE9_BUILDER.device][parseInt(bgobj.parentNode.dataset.id)],
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