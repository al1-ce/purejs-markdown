const MD_TYPE = {
    REPLACE_ALL: 'REPLACE_ALL',
    ADD_TAG: 'ADD_TAG',
    WRAP_TAG: 'WRAP_TAG',
    CUSTOM_EDIT: 'CUSTOM_EDIT',
    IGNORE: 'IGNORE',
}

const STYLE_REG = '(?<!\\S)\\D([^ S\n\r][^S\n\r]+[\n\r]?[^S\n\r]+[^ S\n\r])\\D(?!\\S)';

const MD_REGEX = {
    wspace: {
        mode: MD_TYPE.REPLACE_ALL,
        html: '',
        regex: /^ +(?=[\n\r])/gm
    },
    h1: {
        mode: MD_TYPE.ADD_TAG,
        html: 'h1',
        regex: /^ *#{1}( .+)/gm
    },
    h2: {
        mode: MD_TYPE.ADD_TAG,
        html: 'h2',
        regex: /^ *#{2}( .+)/gm
    },
    h3: {
        mode: MD_TYPE.ADD_TAG,
        html: 'h3',
        regex: /^ *#{3}( .+)/gm
    },
    h4: {
        mode: MD_TYPE.ADD_TAG,
        html: 'h4',
        regex: /^ *#{4}( .+)/gm
    },
    h5: {
        mode: MD_TYPE.ADD_TAG,
        html: 'h5',
        regex: /^ *#{5}( .+)/gm
    },
    h6: {
        mode: MD_TYPE.ADD_TAG,
        html: 'h6',
        regex: /^ *#{6}( .+)/gm
    },
    h1_alt: {
        mode: MD_TYPE.ADD_TAG,
        html: 'h1',
        regex: /(\S+.*)\n *\=+[ \n\r](?=[^\S])/gm
    },
    h2_alt: {
        mode: MD_TYPE.ADD_TAG,
        html: 'h2',
        regex: /(\S+.*)\n *\-+[ \n\r](?=[^\S])/gm
    },
    hr1: {
        mode: MD_TYPE.REPLACE_ALL,
        html: '<hr>',
        regex: /^ *\*{3,} *[\n\r]+?/gm
    },
    hr2: {
        mode: MD_TYPE.REPLACE_ALL,
        html: '<hr>',
        regex: /^ *\_{3,} *[\n\r]+?/gm
    },
    hr3: {
        mode: MD_TYPE.REPLACE_ALL,
        html: '<hr>',
        regex: /^ *\-{3,} *[\n\r]+?/gm
    },
    cright1: {
        mode: MD_TYPE.REPLACE_ALL,
        html: '©',
        regex: /\(c\)/gm
    },
    cright2: {
        mode: MD_TYPE.REPLACE_ALL,
        html: '©',
        regex: /\(C\)/gm
    },
    rtmark1: {
        mode: MD_TYPE.REPLACE_ALL,
        html: '®',
        regex: /\(r\)/gm
    },
    rtmark2: {
        mode: MD_TYPE.REPLACE_ALL,
        html: '®',
        regex: /\(R\)/gm
    },
    tmark1: {
        mode: MD_TYPE.REPLACE_ALL,
        html: '™',
        regex: /\(tm\)/gm
    },
    tmark2: {
        mode: MD_TYPE.REPLACE_ALL,
        html: '™',
        regex: /\(TM\)/gm
    },
    paraph1: {
        mode: MD_TYPE.REPLACE_ALL,
        html: '§',
        regex: /\(p\)/gm
    },
    paraph1: {
        mode: MD_TYPE.REPLACE_ALL,
        html: '§',
        regex: /\(P\)/gm
    },
    plminus: {
        mode: MD_TYPE.REPLACE_ALL,
        html: '±',
        regex: /\+\-/gm
    },
    dots: {
        mode: MD_TYPE.REPLACE_ALL,
        html: '…',
        regex: /(?<=[a-zA-Z]{1})\.{2,}/gm
    },
    qdots: {
        mode: MD_TYPE.REPLACE_ALL,
        html: '?..',
        regex: /(?<=[a-zA-Z]{1}\?)\.{2,}/gm
    },
    edots: {
        mode: MD_TYPE.REPLACE_ALL,
        html: '!..',
        regex: /(?<=[a-zA-Z]{1}\!)\.{2,}/gm
    },
    trexclm: {
        mode: MD_TYPE.REPLACE_ALL,
        html: '!!!',
        regex: /\!{2,}/gm
    },
    trquest: {
        mode: MD_TYPE.REPLACE_ALL,
        html: '???',
        regex: /\?{2,}/gm
    },
    trquest: {
        mode: MD_TYPE.REPLACE_ALL,
        html: ',',
        regex: /\,{2,}/gm
    },
    dbdash: {
        mode: MD_TYPE.REPLACE_ALL,
        html: '–',
        regex: /(?<= )\-{2}(?=[ \n\r])/gm
    },
    trdash: {
        mode: MD_TYPE.REPLACE_ALL,
        html: '—',
        regex: /(?<= )\-{3}(?=[ \n\r])/gm
    },
    i: {
        mode: MD_TYPE.ADD_TAG,
        html: 'i',
        regex: new RegExp(STYLE_REG.replaceAll(/[SD]/g, '*'), 'gm')
    },
    i_alt: {
        mode: MD_TYPE.ADD_TAG,
        html: 'i',
        regex: new RegExp(STYLE_REG.replaceAll(/[SD]/g, '_'), 'gm')
    },
    b: {
        mode: MD_TYPE.ADD_TAG,
        html: 'b',
        regex: new RegExp(STYLE_REG.replaceAll('S', '*').replaceAll('D', '*\\*'), 'gm')
    },
    b_alt: {
        mode: MD_TYPE.ADD_TAG,
        html: 'b',
        regex: new RegExp(STYLE_REG.replaceAll('S', '_').replaceAll('D', '_\\_'), 'gm')
    },
    s: {
        mode: MD_TYPE.ADD_TAG,
        html: 's',
        regex: new RegExp(STYLE_REG.replaceAll('S', '~').replaceAll('D', '~\\~'), 'gm')
    },
    supsc: {
        mode: MD_TYPE.ADD_TAG,
        html: 'sup',
        regex: new RegExp(STYLE_REG.replaceAll(/[SD]/g, '^'), 'gm')
    },
    subsc: {
        mode: MD_TYPE.ADD_TAG,
        html: 'sub',
        regex: new RegExp(STYLE_REG.replaceAll(/[SD]/g, '~'), 'gm')
    },
    u: {
        mode: MD_TYPE.ADD_TAG,
        html: 'u',
        regex: new RegExp(STYLE_REG.replaceAll('S', '+').replaceAll('D', '+\\+'), 'gm')
    },
    mark: {
        mode: MD_TYPE.ADD_TAG,
        html: 'mark',
        regex: new RegExp(STYLE_REG.replaceAll('S', '=').replaceAll('D', '=\\='), 'gm')
    },
    ulist_wrap: {
        mode: MD_TYPE.WRAP_TAG,
        html: 'ul',
        regex: /(^ *[-*+]+ ([\w\S]{1}.*) *?[\n\r][\n\r]*)+/gm
    },
    ul: {
        mode: MD_TYPE.CUSTOM_EDIT,
        html: 'li',
        regex: /^ *[-*+]+ ([\w\S]{1}.*)/gm
    },
    olist_wrap: {
        mode: MD_TYPE.WRAP_TAG,
        html: 'ol',
        regex: /(^ *[\w\d]+\. ([\w\S]{1}.*) *?[\n\r][\n\r]*)+/gm
    },
    ol: {
        mode: MD_TYPE.ADD_TAG,
        html: 'li',
        regex: /^ *[\w\d]+\. ([\w\S]{1}.*)/gm
    },
    code_inl: {
        mode: MD_TYPE.ADD_TAG,
        html: 'code',
        regex: /`([^`\n\r]+)`/gm
    },
    code_ind: {
        mode: MD_TYPE.CUSTOM_EDIT,
        html: 'code',
        regex: /\`{3}((.*)[\S\s]+?(.*))\`{3}/gm
    },
    tb: {
        mode: MD_TYPE.CUSTOM_EDIT,
        html: '',
        regex: /((\|.+\|)\n? *\|([: ]?-{3,}[: ]?\|)+\n? *((\|.+\|)\n? *)*)/gm
    },
    a: {
        mode: MD_TYPE.CUSTOM_EDIT,
        html: '',
        regex: /(?<=[^!])\[(.*?)\]\((.*?)( "(.*)")?\)/gm
    },
    img: {
        mode: MD_TYPE.CUSTOM_EDIT,
        html: '',
        regex: /!\[(.*?)\]\((.*?)( "(.*)")?\)/gm
    },
    img_foot_def: {
        mode: MD_TYPE.CUSTOM_EDIT,
        html: '',
        regex: /^ *\[([^\^\]]+)\]: +(\S*) +(?<q>[\"\'])(.*)(\k<q>)/gm
    },
    img_foot: {
        mode: MD_TYPE.CUSTOM_EDIT,
        html: '',
        regex: /!\[(.*?)\]\[(.*?)\]/gm
    },
    text_foot: {
        mode: MD_TYPE.CUSTOM_EDIT,
        html: '',
        regex: /\[\^([^\]]+)\](?=[^:])/gm
    },
    foot_def: {
        mode: MD_TYPE.CUSTOM_EDIT,
        html: '',
        regex: /^ *\[\^([^\]]+)\]:(.*(?=[\n\r]))/gm
    },
    bquote_all: {
        mode: MD_TYPE.ADD_TAG,
        html: 'blockquote',
        regex: /(^ *( ?>)+ .+[\n\r]?[\n\r]?)+/gm
    },
    bquote: {
        mode: MD_TYPE.CUSTOM_EDIT,
        html: '',
        regex: /^ *( ?>)+ .+/gm
    },
    abbr: {
        mode: MD_TYPE.CUSTOM_EDIT,
        html: '',
        regex: /^ *\*\[([^\^\]]+)\]: +(.*)[\n\r]/gm
    },
    a_auto: {
        mode: MD_TYPE.CUSTOM_EDIT,
        html: '',
        regex: /(?<= )https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)(?= )/gm
    },


    lbreakslash: {
        mode: MD_TYPE.REPLACE_ALL,
        html: '<br>',
        regex: /\\(?=[\r\n])/gm
    },
    auto_bline: {
        mode: MD_TYPE.REPLACE_ALL,
        html: '</p><p>',
        regex: /^(\s*[\r\n])+/gm
    },
    auto_return: {
        mode: MD_TYPE.REPLACE_ALL,
        html: '<br>\n',
        regex: /[\n\r]/gm
    },
    auto_returnfix: {
        mode: MD_TYPE.REPLACE_ALL,
        html: ' ',
        regex: /<br>[\n\r\s]*?<br>/gm
    },

}

const INSPECT_AFTER = [MD_REGEX.ulist_wrap, MD_REGEX.olist_wrap, MD_REGEX.bquote_all, MD_REGEX.auto_bline];
const PARAGRAP_AFTER = ['div', 'hr', 'br', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'ul', 'ol', 'pre', 'code', 'table', 'dl', 'section'];


function jConvertMarkdown(doCenterAltHeaders = true) {
    let classElem = document.getElementsByClassName('pjs-markdown');
    for (let i = 0; i < classElem.length; i++) {
        let elem = classElem[i];
        let html = jMarkdownToHtml(elem.innerHTML);
        elem.innerHTML = html;
        elem.innerHTML = elem.innerHTML.replaceAll(/<p>\s*<\/p>/gm, ` `);
        elem.innerHTML = elem.innerHTML.replaceAll(/<p>\s*<br>\s*<\/p>/gm, `<br>`);
    }
}

function jMarkdownToHtml(mdown, doCenterAltHeaders = true) {
    let html = mdown;
    let fnote = {};
    let fnoteLinks = {};
    html = `<p>\n\n${html}\n\n</p>`;

    let length = Object.keys(MD_REGEX).length;
    for (let i = 0; i < length; i++) {
        let elem = Object.keys(MD_REGEX)[i];
        let md = MD_REGEX[elem];
        let match = [...html.matchAll(md.regex)];
        let htmltag = md.html;
        for (let j = 0; j < match.length; j++) {
            switch (md.mode) {
                case MD_TYPE.REPLACE_ALL:
                    html = html.replace(md.regex, `${htmltag}`);
                    break;
                case MD_TYPE.ADD_TAG:
                    let isAltHeader = elem.match(/h[1-2]_alt/gm);
                    let isPAfter = PARAGRAP_AFTER.includes(htmltag);
                    html = html.replace(match[j][0], `${isPAfter ? '</p>' : ''}<${htmltag} ${isAltHeader ? 'style="text-align: center;"': ''}>${match[j][1]}</${htmltag}>${isPAfter ? '<p>' : ''}`);
                    break;
                case MD_TYPE.WRAP_TAG:
                    html = html.replace(match[j][0], `<${htmltag}>\n${match[j][0]}\n</${htmltag}>`);
                    break;
                case MD_TYPE.CUSTOM_EDIT:
                    html = jMarkdownCustomEdit(md, elem, match[j], html, fnote, fnoteLinks);
                    break;
            }
        }
    }
    return html;
}

function jMarkdownCustomEdit(md, name, match, html, fnote, fnoteLinks) {
    if (name.match(/ul[1-3]/gm)) {

    }
    if (name.match(/ol[1-2]/gm)) {

    }
    if (name == 'code_ind') {
        return html = html.replace(match[0], `<pre><code>${match[1]}</code></pre>`);
    }



    if (name == 'a') {
        if (typeof match[4] != 'undefined') {
            return html.replace(match[0], `<a href="${match[2]}" title="${match[4]}"}>${match[1]}</a>`);
        }
        return html.replace(match[0], `<a href="${match[2]}">${match[1]}</a>`);
    }
    if (name == 'a_foot') {

    }
    if (name == 'a_auto') {
        return html.replace(match[0], `<a href="${match[0]}">${match[0]}</a>`);
    }

    if (name == 'img') {
        if (typeof match[4] != 'undefined') {
            return html.replace(match[0], `<img src="${match[2]}" alt="${match[1]}" title="${match[4]}"}></img>`);
        }
        return html.replace(match[0], `<img src="${match[2]}" alt="${match[1]}"}></img>`);
    }
    if (name == 'img_foot_def') {
        fnoteLinks[match[1]] = {
            link: match[2],
            title: match[4]
        }
        return html.replace(match[0], ``);
    }
    if (name == 'img_foot') {
        if (!(match[2] in fnoteLinks)) {
            return html;
        }
        let img = fnoteLinks[match[2]];
        return html.replace(match[0], `<img src="${img.link}" alt="${img.title}" title="${img.title}"}></img>`);
    }

    if (name == 'text_foot') {
        let f = 0;
        if (!(match[1] in fnote)) {
            fnote[match[1]] = Object.keys(fnote).length + 1;
        }
        f = fnote[match[1]];
        return html.replace(match[0], `<sup><a href=#${match[1]}>[${f}]</a></sup>`);
    }
    if (name == 'foot_def') {
        let f = 0;
        if (!(match[1] in fnote)) {
            fnote[match[1]] = Object.keys(fnote).length + 1;
        }
        f = fnote[match[1]];
        return html.replace(match[0], `<p id=${match[1]}>${f}. ${match[2]}</p>`);
    }

    if (name == 'bquote') {}

    return html;
}