
import { Page }        from '/lib/page_builder.js';
import { ImageObject }   from '/lib/images_obj.js';

const PAGE14_BUILDER = new Page(14);
PAGE14_BUILDER.pd = {
    holder    : document.querySelector('#i15'),
    p1_images2: document.querySelectorAll('.p_image2'),
    p1_img_obj: [],
    p1_img_map : {
        0 : [
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669d741682a4499b76ef330f_Asset%200.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669d7416035dd5477d7cf69f_Asset%203.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669d7416d172591e58877251_Asset%204.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669d7416789c614295cada38_Asset%201.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669d7416c60e78a8edf61e65_Asset%206.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669d7416035dd5477d7cf669_Asset%207.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669d7416bcaef6bbef6fe0a5_Asset%202.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669d7415154d80eaa633d2a5_Asset%205.webp"
        ],
        1 : [
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669e27037748ccd8134e143e_Asset%204.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669e2703d6f965b276c431fe_Asset%205.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669e27037b41605824225664_Asset%203.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669e2703629d1bec15c636d8_Asset%200.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669e27039ee33e23fd8f96fb_Asset%201.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669e2703d5e5161f3e0ca6eb_Asset%202.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669e27033ea59fb906dcb253_Asset%207.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669e270314b06f1c6ede0934_Asset%206.webp"
        ],
        2 : [
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669d741682a4499b76ef330f_Asset%200.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669d7416035dd5477d7cf69f_Asset%203.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669d7416d172591e58877251_Asset%204.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669d7416789c614295cada38_Asset%201.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669d7416c60e78a8edf61e65_Asset%206.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669d7416035dd5477d7cf669_Asset%207.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669d7416bcaef6bbef6fe0a5_Asset%202.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669d7415154d80eaa633d2a5_Asset%205.webp"
        ],
        3 : [
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669e27037748ccd8134e143e_Asset%204.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669e2703d6f965b276c431fe_Asset%205.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669e27037b41605824225664_Asset%203.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669e2703629d1bec15c636d8_Asset%200.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669e27039ee33e23fd8f96fb_Asset%201.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669e2703d5e5161f3e0ca6eb_Asset%202.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669e27033ea59fb906dcb253_Asset%207.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669e270314b06f1c6ede0934_Asset%206.webp"
        ],
    },
    prev_device : -1,
}
PAGE14_BUILDER.load_handler = (pd) => {
    
}
PAGE14_BUILDER.scroll_handler = (pd, ss, delta_ss) => {
    document.querySelector("#particle_intro0").innerHTML="gf 2019"
    document.querySelector("#particle_intro2").innerHTML="3/5"
    for (var bgobj of pd.p1_img_obj){
        bgobj.fade([0,1], 300);
        bgobj.scale_x(["0%","100%"], 300, 'easeInOutCirc');
    }
}
PAGE14_BUILDER.resize_handler = (pd, ss) => {
    if (pd.prev_device != PAGE14_BUILDER.device){
        for (var bgobj of pd.p1_img_obj){
            bgobj.clear();
            bgobj._img = pd.p1_img_map[PAGE14_BUILDER.device][bgobj.id];
            bgobj.draw();
        }
        pd.prev_device = PAGE14_BUILDER.device
    }
}
PAGE14_BUILDER.first_scroll_handler = async (pd) => {
    for (var bgobj of pd.p1_images2){
        var bg_img_obj11 = new ImageObject(
            bgobj,
            pd.p1_img_map[PAGE14_BUILDER.device][parseInt(bgobj.parentNode.dataset.id)],
            parseInt(bgobj.parentNode.dataset.id),
        );
        bg_img_obj11.draw();
        pd.p1_img_obj.push(bg_img_obj11);
    }
    
}