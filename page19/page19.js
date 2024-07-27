
import { Page }        from '/lib/page_builder.js';
import { ImageObject } from '/lib/images_obj.js';

const PAGE19_BUILDER = new Page(19);
PAGE19_BUILDER.pd = {
    holder    : document.querySelector('#i15'),
    embeds    : document.querySelectorAll(".instagram-media"),
}
PAGE19_BUILDER.load_handler = (pd) => {
}
PAGE19_BUILDER.scroll_handler = (pd, ss, delta_ss) => {
    document.querySelector("#particle_intro0").innerHTML="sah.showcase"
    document.querySelector("#particle_intro2").innerHTML="3/5"
}
PAGE19_BUILDER.resize_handler = (pd) => {
}
PAGE19_BUILDER.first_scroll_handler = async (pd) => {
    for(var embed of pd.embeds){
        embed.removeAttribute('style')
    }
}