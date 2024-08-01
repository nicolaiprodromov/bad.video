
import { Page }        from '/lib/page_builder.js';
import { ImageObject } from '/lib/images_obj.js';



const PAGE4_BUILDER = new Page(4);
PAGE4_BUILDER.pd = {
    holder    : document.querySelector('#i5'),
    p1_images2: document.querySelectorAll('.p_image3'),
    p1_img_obj: [],

    p1_img_src : `${PAGE4_BUILDER.local_url}Asset`,

    p1_img_map : {
        0:[
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944f8d62f3e1ab1c8b68f_Asset%200.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944f744733d8223d5bf99_Asset%205.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944f76dc2d1ff1536eeb0_Asset%203.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944f733d8a793b6a3448b_Asset%202.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944f7c2fa3d467b188a3f_Asset%204.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944f7016de2a724f86d4e_Asset%201.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/66abda40514e811b6675bd8e_Asset%206.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/66abda40d86ebf1d5cb41f5c_Asset%207.webp",
        ],
        1:[
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669945003e73701e9e48601d_Asset%201.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/66994500d62f3e1ab1c8be00_Asset%205.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944ff9859c08c6099ba36_Asset%202.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944ff948ca370b164c0da_Asset%203.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944ffe0f340663c6c6991_Asset%204.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944ff2885ae3fb0271ec6_Asset%200.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/66abdaa9aabfadf945e53c25_Asset%206.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/66abdaa95f934fe4ec159b1a_Asset%207.webp",
        ],
        2:[
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944f8d62f3e1ab1c8b68f_Asset%200.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944f744733d8223d5bf99_Asset%205.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944f76dc2d1ff1536eeb0_Asset%203.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944f733d8a793b6a3448b_Asset%202.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944f7c2fa3d467b188a3f_Asset%204.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944f7016de2a724f86d4e_Asset%201.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/66abda40514e811b6675bd8e_Asset%206.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/66abda40d86ebf1d5cb41f5c_Asset%207.webp",
        ],
        3:[
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669945003e73701e9e48601d_Asset%201.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/66994500d62f3e1ab1c8be00_Asset%205.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944ff9859c08c6099ba36_Asset%202.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944ff948ca370b164c0da_Asset%203.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944ffe0f340663c6c6991_Asset%204.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944ff2885ae3fb0271ec6_Asset%200.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/66abdaa9aabfadf945e53c25_Asset%206.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/66abdaa95f934fe4ec159b1a_Asset%207.webp",
        ],
    },

    p1_img_ext : ".png"
}
PAGE4_BUILDER.load_handler = async (pd) => {
}
PAGE4_BUILDER.scroll_handler = (pd, ss, delta_ss) => {
    document.querySelector("#particle_intro0").innerHTML="rci x jazzahead"
    document.querySelector("#particle_intro2").innerHTML="3/5"
    for (var bgobj of pd.p1_img_obj){
        bgobj.fade([0,1], 300)
        bgobj.scale_y(["0%","100%"], 300, 'easeInOutCirc')
    }
}
PAGE4_BUILDER.resize_handler = async (pd) => {
    for (var bgobj of pd.p1_img_obj){
        bgobj.clear();
        bgobj.img = pd.p1_img_map[PAGE4_BUILDER.device][bgobj.id];
        bgobj.draw();
    }
}
PAGE4_BUILDER.first_scroll_handler = async(pd) => {
    for (var bgobj of pd.p1_images2){
        
        var bg_img_obj11 = new ImageObject(
            bgobj,
            pd.p1_img_map[PAGE4_BUILDER.device][parseInt(bgobj.parentNode.dataset.id)],
            parseInt(bgobj.parentNode.dataset.id),
        );
        bg_img_obj11.draw();
        pd.p1_img_obj.push(bg_img_obj11);
    }
}