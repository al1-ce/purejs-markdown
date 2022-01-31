const MD_TYPE = {
    REPLACE_ALL: 'REPLACE_ALL',
    REPLACE_TAG: 'REPLACE_TAG',
    CUSTOM_EDIT: 'CUSTOM_EDIT'
}

const MD_REGEX = {
    // headers
    h1: {mode: MD_TYPE.REPLACE_TAG, html: 'h1', regex: /^ *#{1}( .+)/gm},
    h2: {mode: MD_TYPE.REPLACE_TAG, html: 'h2', regex: /^ *#{2}( .+)/gm},
    h3: {mode: MD_TYPE.REPLACE_TAG, html: 'h3', regex: /^ *#{3}( .+)/gm},
    h4: {mode: MD_TYPE.REPLACE_TAG, html: 'h4', regex: /^ *#{4}( .+)/gm},
    h5: {mode: MD_TYPE.REPLACE_TAG, html: 'h5', regex: /^ *#{5}( .+)/gm},
    h6: {mode: MD_TYPE.REPLACE_TAG, html: 'h6', regex: /^ *#{6}( .+)/gm},
    // headers alt
    h1_alt: {mode: MD_TYPE.REPLACE_TAG, html: 'h1', regex: /(\S+.*)\n *\=+[ \n\r][^\S]/gm},
    h2_alt: {mode: MD_TYPE.REPLACE_TAG, html: 'h2', regex: /(\S+.*)\n *\-+[ \n\r][^\S]/gm},
    // horizontal rulers
    hr1 : {mode: MD_TYPE.REPLACE_ALL, html: 'hr', regex: /^ *\*{3,}[ \n\r]*?/gm},
    hr2 : {mode: MD_TYPE.REPLACE_ALL, html: 'hr', regex: /^ *\_{3,}[ \n\r]*?/gm},
    hr3 : {mode: MD_TYPE.REPLACE_ALL, html: 'hr', regex: /^ *\-{3,}[ \n\r]*?/gm},
    // italic                   those are long
    i: {mode: MD_TYPE.REPLACE_TAG, html: 'i', regex: /(?![^\*\S])\*([^\*\n\r]+[\n\r]?[^\*\n\r]+)\*(?=[^\*\S])/gm}, 
    i_alt: {mode: MD_TYPE.REPLACE_TAG, html: 'i', regex: /(?![^_\S])_([^_\n\r]+[\n\r]?[^_\n\r]+)_(?=[^_\S])/gm},
    // bold                     those are still long
    b: {mode: MD_TYPE.REPLACE_TAG, html: 'b', regex: /(?![^\*\S])\*\*([^\*\n\r]+[\n\r]?[^\*\n\r]+)\*\*(?=[^\*\S])/gm}, 
    b_alt: {mode: MD_TYPE.REPLACE_TAG, html: 'b', regex: /(?![^_\S])__([^_\n\r]+[\n\r]?[^_\n\r]+)__(?=[^_\S])/gm},
    // strikethrough            why
    s: {mode: MD_TYPE.REPLACE_TAG, html: 's', regex: /[^~\S]~~([^~\n\r]+[\n\r]?[^~\n\r]+)~~[^~\S]/gm},
    // lists
    // unordered
    ul1: {mode: MD_TYPE.REPLACE_TAG, html: 'li', regex: /\++ (.*)/gm}, 
    ul2: {mode: MD_TYPE.REPLACE_TAG, html: 'li', regex: /\-+ (.*)/gm},
    ul3: {mode: MD_TYPE.REPLACE_TAG, html: 'li', regex: /\*+ (.*)/gm},
    // ordered
    ol1: {mode: MD_TYPE.REPLACE_TAG, html: 'li', regex: /[0-9]+\. (.*)/gm},
    ol2: {mode: MD_TYPE.REPLACE_TAG, html: 'li', regex: /^ *[a-zA-z]\. (.*)/gm},
    // TODO triple space indent of lists
    // code
    code_inl: {mode: MD_TYPE.REPLACE_TAG, html: 'code', regex: /`([^`\n\r]+)`/gm},
    code_ind: {mode: MD_TYPE.REPLACE_TAG, html: 'code', regex: /\`{3}((.*)[\S\s]+?(.*))\`{3}/gm},
    // tables
    // tb: {mode: MD_TYPE.CUSTOM_EDIT, html: '', regex: /((\|.+\|)\n? *\|([: ]?-{3,}[: ]?\|)+\n? *((\|.+\|)\n? *)*)/gm},
    // TODO tables no side bars aka `table | table | table`
    // TODO actually make tables, i can't figure it out right now
    // links (target groups are 1 - text, 2 - link, 4 - title)
    a: {mode: MD_TYPE.CUSTOM_EDIT, html: '', regex: /(?<=[^!])\[(.*?)\]\((.*?)( "(.*)")?\)/gm},
    // a_foot: {mode: MD_TYPE.CUSTOM_EDIT, html: '', regex: /[^!]\[(.*?)\]\[(.*?)\]/gm},
    // images same as links
    img: {mode: MD_TYPE.CUSTOM_EDIT, html: '', regex: /!\[(.*?)\]\((.*?)( "(.*)")?\)/gm},
    //img_foot: {mode: MD_TYPE.CUSTOM_EDIT, html: '', regex: /!\[(.*?)\]\[(.*?)\]/gm},
    // sub/superscript
    subsc: {mode: MD_TYPE.REPLACE_TAG, html: 'sub', regex: /\^(.*)\^/gm},
    supsc: {mode: MD_TYPE.REPLACE_TAG, html: 'sup', regex: /\~(.*)\~/gm},
    // underline aka inserted text
    u: {mode: MD_TYPE.REPLACE_TAG, html: 'u', regex: /[^\+\S]\+\+([^\+\n\r]+[\n\r]?[^\+\n\r]+)\+\+[^\+\S]/gm},
    // marked text
    mark: {mode: MD_TYPE.REPLACE_TAG, html: 'mark', regex: /[^=\S]==([^=\n\r]+[\n\r]?[^=\n\r]+)==[^=\S]/gm},
    // footnotes
    // text footnote
    //text_foot: {mode: MD_TYPE.CUSTOM_EDIT, html: '', regex: /\[\^([^\]]+)\](?=[^:])/gm},
    // footnote defenition
    //foot_def: {mode: MD_TYPE.CUSTOM_EDIT, html: '', regex: /\[\^([^\]]+)\]:(.*[\n\r])/gm},

    // bquote: {mode: MD_TYPE.CUSTOM_EDIT, html: '', regex: /(^ *> ?.+?)(\r?\n\r?\n)/gms},
    // abbreviations,
    // abbr: {mode: MD_TYPE.CUSTOM_EDIT, html: '', regex: / /gm},
}



function jConvertMarkdown(doCenterAltHeaders = true) {
    let classElem = document.getElementsByClassName('pjs-markdown');
    for (let i = 0; i < classElem.length; i ++) {
        let elem = classElem[i];
        let html = jMarkdownToHtml(elem.innerHTML);
        elem.innerHTML = html;
    }
}

function jMarkdownToHtml(mdown, doCenterAltHeaders = true) {
    let html = mdown;
    let fnote = {};

    let length = Object.keys(MD_REGEX).length;
    for (let i = 0; i < length; i ++) {
      let elem = Object.keys(MD_REGEX)[i];
      let md = MD_REGEX[elem];
      let match = [...mdown.matchAll(md.regex)];
      let htmltag = md.html;
      console.log(match);
      for (let j = 0; j < match.length; j ++) {
            console.log(`regex: [${md.regex}], mode: [${md.mode}], match: [${match[j][0]}]`);
            switch (md.mode) {
                case MD_TYPE.REPLACE_ALL:
                    html = html.replaceAll(match[j][0], `<${htmltag}>`);
                break;
                case MD_TYPE.REPLACE_TAG:
                    let isAltHeader = elem.match(/h[1-2]_alt/gm);
                    html = html.replaceAll(match[j][0], `<${htmltag} ${isAltHeader ? 'style="text-align: center;"': ''}>${match[j][1]}</${htmltag}>`);
                break;
                case MD_TYPE.CUSTOM_EDIT:
                    html = jMarkdownCustomEdit(md, elem, match[j], html, fnote);
                break;
          }
      }
    }

    return html;
}

function jMarkdownCustomEdit(md, name, match, html, fnote) {
    // const h1Match = [...mdown.matchAll(MD_REGEX.h1)];
    // for (let i = 0; i < h1Match.length; i ++)
    // html = html.replaceAll(h1Match[i][0], `<h1>${h1Match[i][1]}</h1>`);
    if (name.match(/ul[1-3]/gm)) {

    }
    if (name.match(/ol[1-2]/gm)) {
        
    }
    if (name == 'a') {
        return html.replaceAll(match[0], `<a href=#${match[2]} ${match.length == 4 ? 'title="' + match[4] + '"' : ''}>${match[1]}</a>`);
    }
    if (name == 'a_foot') {

    }
    if (name == 'img') {
        return html.replaceAll(match[0], `<img src="${match[2]}" alt=${match[1]} ${match.length == 4 ? 'title="' + match[4] + '"' : ''}></img>`);
    }
    if (name == 'img_foot') {

    }
    if (name == 'text_foot') {
        let f = 0;
        if (match[1] in fnote) {
            f = fnote[match[1]];
        } else {
            fnote[match[1]] = fnote.length + 1;
        }
        return html.replaceAll(match[0], `<sup><a href=#${match[1]}>[${f}]</a></sup>`);
    }
    if (name == 'foot_def') {
        let f = 0;
        if (match[1] in fnote) {
            f = fnote[match[1]];
        } else {
            fnote[match[1]] = fnote.length + 1;
        }
        return html.replaceAll(match[0], `<p id=${match[1]}>${f}. ${match[2]}</p>`);
    }
    if (name == 'bquote') {
        // return html.replaceAll(match[j][0], `<${htmltag}>${match[j][1]}</${htmltag}>`);
    }
    return html;
}