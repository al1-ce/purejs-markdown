const MD_TYPE = {
    REPLACE_ALL: 'REPLACE_ALL', // replaces whole match with html
    ADD_TAG: 'ADD_TAG', // wraps group 1 with <html>
    WRAP_TAG: 'WRAP_TAG', // adds <html> before and after match
    // ADD_BEFORE: 'ADD_BEFORE', // adds html before group 1
    // ADD_AFTER: 'ADD_AFTER', // adds html after group 1
    // WRAP: 'WRAP', // adds html before and after match
    CUSTOM_EDIT: 'CUSTOM_EDIT', // custom defined
    IGNORE: 'IGNORE', // ignore
}

const STYLE_REG = '(?<!\\S)\\D([^ S\n\r][^S\n\r]+[\n\r]?[^S\n\r]+[^ S\n\r])\\D(?!\\S)';

const MD_REGEX = {
    // empty white space lines, we don't need them
    wspace: {mode: MD_TYPE.REPLACE_ALL, html: '', regex: /^ +(?=[\n\r])/gm},
    // headers
    h1: {mode: MD_TYPE.ADD_TAG, html: 'h1', regex: /^ *#{1}( .+)/gm},
    h2: {mode: MD_TYPE.ADD_TAG, html: 'h2', regex: /^ *#{2}( .+)/gm},
    h3: {mode: MD_TYPE.ADD_TAG, html: 'h3', regex: /^ *#{3}( .+)/gm},
    h4: {mode: MD_TYPE.ADD_TAG, html: 'h4', regex: /^ *#{4}( .+)/gm},
    h5: {mode: MD_TYPE.ADD_TAG, html: 'h5', regex: /^ *#{5}( .+)/gm},
    h6: {mode: MD_TYPE.ADD_TAG, html: 'h6', regex: /^ *#{6}( .+)/gm},
    // headers alt
    h1_alt: {mode: MD_TYPE.ADD_TAG, html: 'h1', regex: /(\S+.*)\n *\=+[ \n\r](?=[^\S])/gm},
    h2_alt: {mode: MD_TYPE.ADD_TAG, html: 'h2', regex: /(\S+.*)\n *\-+[ \n\r](?=[^\S])/gm},
    // horizontal rulers
    hr1 : {mode: MD_TYPE.REPLACE_ALL, html: '<hr>', regex: /^ *\*{3,} *[\n\r]+?/gm},
    hr2 : {mode: MD_TYPE.REPLACE_ALL, html: '<hr>', regex: /^ *\_{3,} *[\n\r]+?/gm},
    hr3 : {mode: MD_TYPE.REPLACE_ALL, html: '<hr>', regex: /^ *\-{3,} *[\n\r]+?/gm},
    // typographic replacements
    cright1 : {mode: MD_TYPE.REPLACE_ALL, html: '©', regex: /\(c\)/gm}, 
    cright2 : {mode: MD_TYPE.REPLACE_ALL, html: '©', regex: /\(C\)/gm}, 
    rtmark1 : {mode: MD_TYPE.REPLACE_ALL, html: '®', regex: /\(r\)/gm}, 
    rtmark2 : {mode: MD_TYPE.REPLACE_ALL, html: '®', regex: /\(R\)/gm}, 
    tmark1 : {mode: MD_TYPE.REPLACE_ALL, html: '™', regex: /\(tm\)/gm}, 
    tmark2 : {mode: MD_TYPE.REPLACE_ALL, html: '™', regex: /\(TM\)/gm}, 
    paraph1 : {mode: MD_TYPE.REPLACE_ALL, html: '§', regex: /\(p\)/gm}, 
    paraph1 : {mode: MD_TYPE.REPLACE_ALL, html: '§', regex: /\(P\)/gm}, 
    plminus : {mode: MD_TYPE.REPLACE_ALL, html: '±', regex: /\+\-/gm}, 
    dots : {mode: MD_TYPE.REPLACE_ALL, html: '…', regex: /(?<=[a-zA-Z]{1})\.{2,}/gm}, 
    qdots : {mode: MD_TYPE.REPLACE_ALL, html: '?..', regex: /(?<=[a-zA-Z]{1}\?)\.{2,}/gm}, 
    edots : {mode: MD_TYPE.REPLACE_ALL, html: '!..', regex: /(?<=[a-zA-Z]{1}\!)\.{2,}/gm}, 
    trexclm : {mode: MD_TYPE.REPLACE_ALL, html: '!!!', regex: /\!{2,}/gm}, 
    trquest : {mode: MD_TYPE.REPLACE_ALL, html: '???', regex: /\?{2,}/gm}, 
    trquest : {mode: MD_TYPE.REPLACE_ALL, html: ',', regex: /\,{2,}/gm}, 
    dbdash : {mode: MD_TYPE.REPLACE_ALL, html: '–', regex: /(?<= )\-{2}(?=[ \n\r])/gm}, 
    trdash : {mode: MD_TYPE.REPLACE_ALL, html: '—', regex: /(?<= )\-{3}(?=[ \n\r])/gm}, 
    // text style
    // *italic*                   those are long
    i: {mode: MD_TYPE.ADD_TAG, html: 'i', regex: new RegExp(STYLE_REG.replaceAll(/[SD]/g, '*'), 'gm')}, 
    i_alt: {mode: MD_TYPE.ADD_TAG, html: 'i', regex: new RegExp(STYLE_REG.replaceAll(/[SD]/g, '_'), 'gm')},
    // **bold**                     those are still long
    b: {mode: MD_TYPE.ADD_TAG, html: 'b', regex: new RegExp(STYLE_REG.replaceAll('S', '*').replaceAll('D', '*\\*'), 'gm')},
    b_alt: {mode: MD_TYPE.ADD_TAG, html: 'b', regex: new RegExp(STYLE_REG.replaceAll('S', '_').replaceAll('D', '_\\_'), 'gm')},
    // ~~strikethrough~~            why
    s: {mode: MD_TYPE.ADD_TAG, html: 's', regex: new RegExp(STYLE_REG.replaceAll('S', '~').replaceAll('D', '~\\~'), 'gm')},
    // ~sub~/^superscript^
    supsc: {mode: MD_TYPE.ADD_TAG, html: 'sup', regex: new RegExp(STYLE_REG.replaceAll(/[SD]/g, '^'), 'gm')},
    subsc: {mode: MD_TYPE.ADD_TAG, html: 'sub', regex: new RegExp(STYLE_REG.replaceAll(/[SD]/g, '~'), 'gm')},
    // ++underline++ aka inserted text
    u: {mode: MD_TYPE.ADD_TAG, html: 'u', regex: new RegExp(STYLE_REG.replaceAll('S', '+').replaceAll('D', '+\\+'), 'gm')},
    // ==marked text==
    mark: {mode: MD_TYPE.ADD_TAG, html: 'mark', regex: new RegExp(STYLE_REG.replaceAll('S', '=').replaceAll('D', '=\\='), 'gm')},
    // lists // yoinked from marked /^( *(?:[*+-]|\d{1,9}[.)]))( [^\n]+?)?(?:\n|$)/
    // unordered
    ulist_wrap: {mode: MD_TYPE.WRAP_TAG, html: 'ul', regex: /(^ *[-*+]+ ([\w\S]{1}.*) *?[\n\r][\n\r]*)+/gm}, 
    ul: {mode: MD_TYPE.ADD_TAG, html: 'li', regex: /^ *[-*+]+ ([\w\S]{1}.*)/gm}, 
    // ordered
    olist_wrap: {mode: MD_TYPE.WRAP_TAG, html: 'ol', regex: /(^ *[\w\d]+\. ([\w\S]{1}.*) *?[\n\r][\n\r]*)+/gm}, 
    ol: {mode: MD_TYPE.ADD_TAG, html: 'li', regex: /^ *[\w\d]+\. ([\w\S]{1}.*)/gm},
    // TODO triple space indent of lists?
    // TODO better numbered lists
    // TODO defenition lists?
    // code
    code_inl: {mode: MD_TYPE.ADD_TAG, html: 'code', regex: /`([^`\n\r]+)`/gm},
    code_ind: {mode: MD_TYPE.CUSTOM_EDIT, html: 'code', regex: /\`{3}((.*)[\S\s]+?(.*))\`{3}/gm},
    // tables
    tb: {mode: MD_TYPE.CUSTOM_EDIT, html: '', regex: /((\|.+\|)\n? *\|([: ]?-{3,}[: ]?\|)+\n? *((\|.+\|)\n? *)*)/gm},
    // TODO tables no side bars aka `table | table | table`
    // TODO actually make tables, i can't figure it out right now
    // links (target groups are 1 - text, 2 - link, 4 - title)
    a: {mode: MD_TYPE.CUSTOM_EDIT, html: '', regex: /(?<=[^!])\[(.*?)\]\((.*?)( "(.*)")?\)/gm},
    // a_foot: {mode: MD_TYPE.CUSTOM_EDIT, html: '', regex: /[^!]\[(.*?)\]\[(.*?)\]/gm},
    // images same as links
    img: {mode: MD_TYPE.CUSTOM_EDIT, html: '', regex: /!\[(.*?)\]\((.*?)( "(.*)")?\)/gm},
    img_foot_def: {mode: MD_TYPE.CUSTOM_EDIT, html: '', regex: /^ *\[([^\^\]]+)\]: +(\S*) +(?<q>[\"\'])(.*)(\k<q>)/gm},
    img_foot: {mode: MD_TYPE.CUSTOM_EDIT, html: '', regex: /!\[(.*?)\]\[(.*?)\]/gm},
    // footnotes
    // text footnote
    text_foot: {mode: MD_TYPE.CUSTOM_EDIT, html: '', regex: /\[\^([^\]]+)\](?=[^:])/gm},
    // footnote defenition
    foot_def: {mode: MD_TYPE.CUSTOM_EDIT, html: '', regex: /^ *\[\^([^\]]+)\]:(.*(?=[\n\r]))/gm},
    // todo inline footnotes
    // blockquotes
    // bquote: {mode: MD_TYPE.CUSTOM_EDIT, html: '', regex: /(^ *> ?.+?)(\r?\n\r?\n)/gms},
    bquote_all: {mode: MD_TYPE.ADD_TAG, html: 'blockquote', regex: /(^ *( ?>)+ .+[\n\r]?[\n\r]?)+/gm},
    bquote: {mode: MD_TYPE.CUSTOM_EDIT, html: '', regex: /^ *( ?>)+ .+/gm},
    // abbreviations,
    abbr: {mode: MD_TYPE.CUSTOM_EDIT, html: '', regex: /^ *\*\[([^\^\]]+)\]: +(.*)[\n\r]/gm},
    // autolink outside of main links coz we don't want to convert footnote links
    a_auto: {mode: MD_TYPE.CUSTOM_EDIT, html: '', regex: /(?<= )https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)(?= )/gm},
    
    // line breaks [\n\r]
    // ignoring tags are: p, div, hr, br, h1, h2, h3, h4, h5, h6, blockquote, ul, ol, pre, code, table, dl, section
    // regex matching every of those tags except hr br
    // /^ *\<(?<tag>p|div|h[1-6]|blockquote|[uo]l|pre|code|table|dl|section).*?\>([\n\r\S\s]*?)\<\/(\k<tag>)\>/gm
    
    lbreakslash: {mode: MD_TYPE.REPLACE_ALL, html: '<br>', regex: /\\(?=[\r\n])/gm},
    auto_bline: {mode: MD_TYPE.REPLACE_ALL, html: '</p><p>', regex: /^(\s*[\r\n])+/gm},
    auto_return: {mode: MD_TYPE.REPLACE_ALL, html: '<br>\n', regex: /[\n\r]/gm},
    auto_returnfix: {mode: MD_TYPE.REPLACE_ALL, html: ' ', regex: /<br>[\n\r\s]*?<br>/gm},
    
}

const INSPECT_AFTER = [MD_REGEX.ulist_wrap, MD_REGEX.olist_wrap, MD_REGEX.bquote_all, MD_REGEX.auto_bline];
const PARAGRAP_AFTER = ['div', 'hr', 'br', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'ul', 'ol', 'pre', 'code', 'table', 'dl', 'section'];

// TODO ALL INDENTS !!!!!!!!IMPORTANT
// TODO Fix stray p missings
// TODO Fix single <> p wrap
// TODO YOU BROKE THE LIST!!!!!!!!!!!!!!!!!! :<<<<<<<<<<<

function jConvertMarkdown(doCenterAltHeaders = true) {
    let classElem = document.getElementsByClassName('pjs-markdown');
    for (let i = 0; i < classElem.length; i ++) {
        let elem = classElem[i];
        let html = jMarkdownToHtml(elem.innerHTML);
        elem.innerHTML = html;
        // i don't know why but this line omits all stray <p></p>'s and if i put it in jMarkdownToHtml() it doesnt?????
        elem.innerHTML = elem.innerHTML.replaceAll(/<p>\s*<\/p>/gm, ` `);
        elem.innerHTML = elem.innerHTML.replaceAll(/<p>\s*<br>\s*<\/p>/gm, `<br>`);
    }
}

function jMarkdownToHtml(mdown, doCenterAltHeaders = true) {
    let html = mdown;
    let fnote = {};
    let fnoteLinks = {};

    let length = Object.keys(MD_REGEX).length;
    for (let i = 0; i < length; i ++) {
      let elem = Object.keys(MD_REGEX)[i];
      let md = MD_REGEX[elem];
      let match = [...html.matchAll(md.regex)];
      let htmltag = md.html;
    //   console.log(match);
      for (let j = 0; j < match.length; j ++) {
            // console.log(`name: [${elem}], regex: [${md.regex}], mode: [${md.mode}], match: [${match[j][0]}]`);
            switch (md.mode) {
                case MD_TYPE.REPLACE_ALL:
                    html = html.replace(md.regex, `${htmltag}`); // needs to use regex because it's skipping spaces and newlines which in auto_bline is required
                break;
                case MD_TYPE.ADD_TAG:
                    let isAltHeader = elem.match(/h[1-2]_alt/gm);
                    let isPAfter = PARAGRAP_AFTER.includes(htmltag);
                    html = html.replace(match[j][0], `${isPAfter ? '</p>' : ''}<${htmltag} ${isAltHeader ? 'style="text-align: center;"': ''}>${match[j][1]}</${htmltag}>${isPAfter ? '<p>' : ''}`);
                    // html = html.replace(match[j][0], `<${htmltag}>${match[j][1]}</${htmltag}>`);
                break;
                case MD_TYPE.WRAP_TAG:
                    html = html.replace(match[j][0], `<${htmltag}>\n${match[j][0]}\n</${htmltag}>`);
                break;
                // case MD_TYPE.ADD_BEFORE:
                //     html = html.replace(match[j][0], `<${htmltag}${match[j][1]}`);
                // break;
                // case MD_TYPE.ADD_AFTER:
                //     html = html.replace(match[j][0], `<${match[j][1]}${htmltag}`);
                // break;
                case MD_TYPE.CUSTOM_EDIT:
                    html = jMarkdownCustomEdit(md, elem, match[j], html, fnote, fnoteLinks);
                break;
          }
      }
    }
    return `<p>${html}</p>`;
}

function jMarkdownCustomEdit(md, name, match, html, fnote, fnoteLinks) {
    // const h1Match = [...mdown.matchAll(MD_REGEX.h1)];
    // for (let i = 0; i < h1Match.length; i ++)
    // html = html.replaceAll(h1Match[i][0], `<h1>${h1Match[i][1]}</h1>`);
    if (name.match(/ul[1-3]/gm)) {

    }
    if (name.match(/ol[1-2]/gm)) {
        
    }
    // if (name == 'code_inl') {
    //     return html = html.replace(match[0], `<code>${match[1]}</code>`);
    // }
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
        // 1 id, 2 link, 4 alt
        fnoteLinks[match[1]] = {
            link: match[2],
            title: match[4]
        }
        return html.replace(match[0], ``);
    }
    if (name == 'img_foot') { // if no footnote ignore it
        if (!(match[2] in fnoteLinks)) {
            return html;
        }
        let img = fnoteLinks[match[2]];
        return html.replace(match[0], `<img src="${img.link}" alt="${img.title}" title="${img.title}"}></img>`);
        // group 1 alt , 2 id
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

    if (name == 'bquote') {
    }

    return html;
}