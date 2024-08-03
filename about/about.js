import { Page } from '/lib/page_builder.js'

const PAGE_ABOUT_BUILDER = new Page(22);
PAGE_ABOUT_BUILDER.pd = {
    about_button : document.querySelector(".about_cv_button"),
}
PAGE_ABOUT_BUILDER.scroll_handler = async (pd) => {
    
}
PAGE_ABOUT_BUILDER.first_scroll_handler = async (pd) => {
    pd.about_button.addEventListener('click', () => {
        setTimeout(() => {
            const url = "https://raw.githubusercontent.com/nicolaiprodromov/bad.video/master/Nicolaie%20Prodromou[CV][d].pdf"
            const a = document.createElement('a')
            a.href = url
            a.target = "blank"
            a.download = url.split('/').pop()
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
        }, 100);
        setTimeout(() => {
            const url = "https://raw.githubusercontent.com/nicolaiprodromov/bad.video/master/Nicolaie%20Prodromou[CV][l].pdf"
            const a = document.createElement('a')
            a.href = url
            a.target = "blank"
            a.download = url.split('/').pop()
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
        }, 200);

    }, false)
}