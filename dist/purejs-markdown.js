const MD_CSS = '.pjs-markdown-parsed a{color:#428bca;text-decoration:none}.pjs-markdown-parsed a:focus,.pjs-markdown-parsed a:hover{color:#2a6496;text-decoration:underline}.pjs-markdown-parsed strong{font-weight:700}.pjs-markdown-parsed em{font-style:italic}.pjs-markdown-parsed s{text-decoration:line-through}.pjs-markdown-parsed blockquote{padding:10px 20px;margin:0 0 20px;border-left:5px solid #eee}.pjs-markdown-parsed code{padding:2px 4px;font-size:90%;color:#0c0c0b;background-color:#f9f2f4;border-radius:4px}.pjs-markdown-parsed pre{display:block;padding:9.5px;margin:0 0 10px;font-size:13px;line-height:1.42857143;color:#333;word-break:break-all;word-wrap:break-word;background-color:#f5f5f5;border:1px solid #ccc;border-radius:4px}.pjs-markdown-parsed pre code{padding:0;font-size:inherit;color:inherit;white-space:pre;background-color:transparent;border-radius:0}.pjs-markdown-parsed mark{padding:.2em;background-color:#fcf8e3}.pjs-markdown-parsed table{max-width:100%;margin-bottom:20px}.pjs-markdown-parsed table{border-spacing:0;border-collapse:collapse;background-color:#f9f9f9}.pjs-markdown-parsed table tr:nth-child(even){background-color:#f5f5f5}.pjs-markdown-parsed table tr th{vertical-align:bottom;border-bottom:2px solid #ddd;font-weight:700;padding:8px;line-height:1.42857143;background-color:#f9f9f9}.pjs-markdown-parsed table tr td{padding:8px;line-height:1.42857143;vertical-align:top;border-top:1px solid #ddd}';

class PJsMdOptions {
    CENTER_ALT_HEADERS = true;
}

let MD_OPTIONS = {
    CENTER_ALT_HEADERS: true,
}

let MD_FOOTNOTES = {
    FOOTNOTE: {},
    FOOTLINK: {},
    ABBREVIATIONS: {},
}

const MD_FBASE = {
    REPLACE: function (html, match, regex, rstr, group) {
        return html.replace(regex, `${rstr}`);
    },
    ADD_TAG: function (html, match, regex, rstr, group) {
        return html.replace(match[0], `<${rstr}>${match[group]}</${rstr}>`);
    },
    ADD_AFTER: function (html, match, regex, rstr, group) {
        return html.replace(match[0], `${match[0]}${rstr}`);
    },
    ADD_BEFORE: function (html, match, regex, rstr, group) {
        return html.replace(match[0], `${rstr}${match[0]}`);
    },
    WRAP: function (html, match, regex, rstr, group) {
        return html.replace(match[0], `<${rstr}>\n${match[0]}\n</${rstr}>`);
    },
    WRAP_P: function (html, match, regex, rstr, group) {
        return html.replace(match[0], `</p><${rstr}>\n${match[0]}\n</${rstr}><p>`);
    },
    KEEP_GROUP: function (html, match, regex, rstr, group) {
        return html.replace(match[0], `${match[group]}`);
    },
    NONE: function(html, match, regex, rstr, group){return html;}
}

const MD_FCUSTOM = {
    HEADER: function(html, match, regex, rstr, group) {
        let h = (match[1].match(/#/g)||[]).length;
        return html.replace(match[0], `<h${h}>${match[2]}</h${h}>`);
    },
    HEADER_ALT: function(html, match, regex, rstr, group) {
                let h = match[2] == '=' ? 1 : 2;
        let c = '';
        if (MD_OPTIONS.CENTER_ALT_HEADERS) c = ` style="text-align: center;"`
        return html.replace(match[0], `<h${h}${c}>${match[1]}</h${h}>`);
    }, 
    LINK: function(html, match, regex, rstr, group) {
                let title = typeof match[4] == 'undefined' ? '' : `title="${match[4]}"`;
        if (match[0].charAt(0) == '!') {
            return html.replace(match[0], `<img src="${match[2]}" alt="${match[1]}" ${title}}></img>`);
        } else {
            return html.replace(match[0], `<a href="${match[2]}" ${title}}>${match[1]}</a>`);
        }
    },
    LINK_TO_FOOTER: function(html, match, regex, rstr, group) {
                if (!(match[2] in MD_FOOTNOTES.FOOTLINK)) { return html; }
        let href = MD_FOOTNOTES.FOOTLINK[match[2]].link;
        let title = typeof MD_FOOTNOTES.FOOTLINK[match[2]].title == 'undefined' ? '' : `title="${MD_FOOTNOTES.FOOTLINK[match[2]].title}"`;
        if (match[0].charAt(0) == '!') {
            return html.replace(match[0], `<img src="${href}" alt="${match[2]}" ${title}></img>`);
        } else {
            return html.replace(match[0], `<a href="${href}" ${title}>${match[1]}</a>`);
        }
    },
    FOOTER_LINK: function(html, match, regex, rstr, group) {
                        MD_FOOTNOTES.FOOTLINK[match[1]] = { link: match[2], title: match[4] };
        return html.replace(match[0], ``);
    },
    CODE: function (html, match, regex, rstr, group) {
        return html.replace(match[0], `</p><pre><code>${match[group]}</code></pre><p>`);
    },
    AUTOLINK: function (html, match, regex, rstr, group) {
        return html.replace(match[0], `<a href="${match[0]}">${match[0]}</a>`);
    },
    FOOTNOTE_DEF: function(html, match, regex, rstr, group) {
                        if (Object.keys(MD_FOOTNOTES.FOOTNOTE).length == 0) html = `${html}<hr id='footer'>`;
        if (!(match[1] in MD_FOOTNOTES.FOOTNOTE)) { 
            MD_FOOTNOTES.FOOTNOTE[match[1]] = {id: Object.keys(MD_FOOTNOTES.FOOTNOTE).length + 1, num: 0};
        }
        let f = MD_FOOTNOTES.FOOTNOTE[match[1]].id;
        return `${html.replace(match[0], ``)}<p id="${match[1]}">${f}. ${match[2]}</p>`;
    },
    FOOTNOTE_LINK: function(html, match, regex, rstr, group) {
                        if (!(match[1] in MD_FOOTNOTES.FOOTNOTE)) { return html; }
        MD_FOOTNOTES.FOOTNOTE[match[1]].num++;
        let f = MD_FOOTNOTES.FOOTNOTE[match[1]].id;
        let i = MD_FOOTNOTES.FOOTNOTE[match[1]].num;
        
        let id = `pjs-foot-ref-${match[1]}-${i}`;
        let reg = new RegExp(`<p id="${match[1]}">(.+?)</p>`, 'gm');
        let footCont = [...html.matchAll(reg)][0][1];
        html = html.replace(footCont, `${footCont}<a href=#${id}>??????</a>`);
        return html.replace(match[0], `<sup><a href=#${match[1]} id="${id}">[${f}${i > 1 ? ':' + (i-1) : ''}]</a></sup>`);
    },
    FOOTNOTE_INLINE: function(html, match, regex, rstr, group) {
                        let id = `inlinefootnote-${Object.keys(MD_FOOTNOTES.FOOTNOTE).length + 1}`;
        if (Object.keys(MD_FOOTNOTES.FOOTNOTE).length == 0) html = `${html}<hr id='footer'>`;
        MD_FOOTNOTES.FOOTNOTE[id] = {id: Object.keys(MD_FOOTNOTES.FOOTNOTE).length + 1, num: 0};
        let f = MD_FOOTNOTES.FOOTNOTE[id].id;
                html = `${html}<p id="${id}">${f}. ${match[1]}</p>`;
                
        let i = MD_FOOTNOTES.FOOTNOTE[id].num;
        let retId = `pjs-foot-ref-${id}-${i}`;
        let reg = new RegExp(`<p id="${id}">(.+?)</p>`, 'gm');
        let footCont = [...html.matchAll(reg)][0][1];
        html = html.replace(footCont, `${footCont}<a href=#${retId}>??????</a>`);
                return html.replace(match[0], `<sup><a href=#${id} id="${retId}">[${f}${i > 1 ? ':' + (i-1) : ''}]</a></sup>`);
    },
    TABLE: function(html, match, regex, rstr, group) {
        let body = match[0];
        let tbl = '<table>';
        let cols = [...body.matchAll(/(?:\|.+\|)/gm)];
        let align = [];
        let al = cols[1][0].split('|');al = al.slice(1, al.length - 1); 
        Array.prototype.forEach.call(al, function(e, i) {
            e = e.replaceAll(' ', '');
            let l = e.charAt(0) == ':';
            let r = e.charAt(e.length - 1) == ':';
            if (l && r) {align[i] = 'center';}
            if (l && !r) {align[i] = 'left';}
            if (!l && r) {align[i] = 'right';}
            if (!l && !r) {align[i] = 'left';}
        });
        let hd = cols[0][0].split('|'); hd = hd.slice(1, hd.length - 1);
        tbl += '<tr>';
        Array.prototype.forEach.call(hd, function(e, i) {tbl += `<th style="text-align:${align[i]};">${e}</th>`});
        tbl += '</tr>';
        for (let i = 2; i < cols.length; i ++) {
            let col = cols[i][0].split('|'); col = col.slice(1, col.length - 1);
            tbl += '<tr>';
            Array.prototype.forEach.call(col, function(e, i) {tbl += `<td style="text-align:${align[i]};">${e}</td>`});
            tbl += '</tr>';
        }
        tbl += '</table>'
        return html.replace(match[0], `</p>${tbl}<p>`);
    },
    ARROWS_FIX: function(html, match, regex, rstr, group) {
        return html.replace(match[0], `&lt;${match[1]}&gt;`);
    },
}

const STYLE_REG = '(?<!\\S)\\D(?![ S])(.+?)(?<![ S])\\D(?!\\S)';

const MD_REGEX = {
                                    wspace: {regex: /(^ +)(?=[\n\r])/gm, rstr: '', group: 1, func: MD_FBASE.REPLACE },
        arrows_fix: {regex: /\\<(.*?)>/gm, rstr: '', group: 1, func: MD_FCUSTOM.ARROWS_FIX},
        header: {regex: /^ *(#{1,6})( .+)/gm, rstr: '', group: 2, func: MD_FCUSTOM.HEADER },
        header_alt: {regex: /(\S+.*)\n *(?<s>[=-])(\k<s>)+ *$/gm, rstr: '', group: 2, func: MD_FCUSTOM.HEADER_ALT},
        hr : {regex: /^ *((?<s>[-*_])(\k<s>){2,}) *$/gm, rstr: '<hr>', group: 1, func: MD_FBASE.REPLACE},
        cright : {regex: /\([cC]\)/gm, rstr: '??', group: 1, func: MD_FBASE.REPLACE}, 
    rtmark : {regex: /\([rR]\)/gm, rstr: '??', group: 1, func: MD_FBASE.REPLACE}, 
    tmark : {regex: /\([tT][mM]\)/gm, rstr: '???', group: 1, func: MD_FBASE.REPLACE}, 
    paraph : {regex: /\([pP]\)/gm, rstr: '??', group: 1, func: MD_FBASE.REPLACE}, 
    plminus : {regex: /(\+\-)/gm, rstr: '??', group: 1, func: MD_FBASE.REPLACE}, 
    dots : {regex: /((?<=[a-zA-Z]{1})\.{2,})/gm, rstr: '???', group: 1, func: MD_FBASE.REPLACE}, 
    qdots : {regex: /((?<=[a-zA-Z]{1}\?)\.{2,})/gm, rstr: '?..', group: 1, func: MD_FBASE.REPLACE}, 
    edots : {regex: /((?<=[a-zA-Z]{1}\!)\.{2,})/gm, rstr: '!..', group: 1, func: MD_FBASE.REPLACE}, 
    trexclm : {regex: /(\!{2,})/gm, rstr: '!!!', group: 1, func: MD_FBASE.REPLACE}, 
    trquest : {regex: /(\?{2,})/gm, rstr: '???', group: 1, func: MD_FBASE.REPLACE}, 
    trquest : {regex: /(\,{2,})/gm, rstr: ',', group: 1, func: MD_FBASE.REPLACE}, 
    dbdash : {regex: /((?<= )\-{2}(?= |$))/gm, rstr: '???', group: 1, func: MD_FBASE.REPLACE}, 
    trdash : {regex: /((?<= )\-{3}(?= |$))/gm, rstr: '???', group: 1, func: MD_FBASE.REPLACE}, 
            i: {regex: new RegExp(STYLE_REG.replaceAll(/[SD]/g, '*'), 'gm'), rstr: 'em', group: 1, func: MD_FBASE.ADD_TAG}, 
    i_alt: {regex: new RegExp(STYLE_REG.replaceAll(/[SD]/g, '_'), 'gm'), rstr: 'em', group: 1, func: MD_FBASE.ADD_TAG},
        b: {regex: new RegExp(STYLE_REG.replaceAll('S', '*').replaceAll('D', '*\\*'), 'gm'), rstr: 'strong', group: 1, func: MD_FBASE.ADD_TAG},
    b_alt: {regex: new RegExp(STYLE_REG.replaceAll('S', '_').replaceAll('D', '_\\_'), 'gm'), rstr: 'strong', group: 1, func: MD_FBASE.ADD_TAG},
        s: {regex: new RegExp(STYLE_REG.replaceAll('S', '~').replaceAll('D', '~\\~'), 'gm'), rstr: 's', group: 1, func: MD_FBASE.ADD_TAG},
        supsc: {regex: new RegExp(STYLE_REG.replaceAll(/[SD]/g, '^'), 'gm'), rstr: 'sup', group: 1, func: MD_FBASE.ADD_TAG},
    subsc: {regex: new RegExp(STYLE_REG.replaceAll(/[SD]/g, '~'), 'gm'), rstr: 'sub', group: 1, func: MD_FBASE.ADD_TAG},
        u: {regex: new RegExp(STYLE_REG.replaceAll('S', '+').replaceAll('D', '+\\+'), 'gm'), rstr: 'ins', group: 1, func: MD_FBASE.ADD_TAG},
        mark: {regex: new RegExp(STYLE_REG.replaceAll('S', '=').replaceAll('D', '=\\='), 'gm'), rstr: 'mark', group: 1, func: MD_FBASE.ADD_TAG},
            ulist_wrap: {regex: /((?:^ *[-*+]+ (?:[\w\S]{1}.*) *?[\n\r]?[\n\r]?)+)/gm, rstr: 'ul', group: 1, func: MD_FBASE.WRAP_P}, 
    ul: {regex: /^ *[-*+]+ ([\w\S]{1}.*)/gm, rstr: 'li', group: 1, func: MD_FBASE.ADD_TAG}, 
        olist_wrap: {regex: /((^ *[\w\d]+\. ([\w\S]{1}.*) *?[\n\r]?[\n\r]?)+)/gm, rstr: 'ol', group: 1, func: MD_FBASE.WRAP_P}, 
    ol: {regex: /^ *[\w\d]+\. ([\w\S]{1}.*)/gm, rstr: 'li', group: 1, func: MD_FBASE.ADD_TAG},
        code_inl: {regex: /\`([^\`\n\r]+)\`/gm, rstr: 'code', group: 1, func: MD_FBASE.ADD_TAG},
    code_ind: {regex: /\`{3}.*[\n\r]([\S\s]+?(.*))\`{3}$/gm, rstr: 'code', group: 1, func: MD_FCUSTOM.CODE}, 
        tb: {regex: /((?:\|.+\|)\n? *\|(?: *?:? *?-{3,} *?:? *?\|)+\n? *(?:(?:\|.+\|)\n? *)*)/gm, rstr: 'table', group: 1, func: MD_FCUSTOM.TABLE},         link: {regex: /!?\[(.*?)\]\((.*?)( "(.*)")?\)/gm, rstr: '', group: 1, func: MD_FCUSTOM.LINK},
            bquote_all: {regex: /((?:^ * ?(?:&gt;)+ .+[\n\r]?)+)/gm, rstr: 'blockquote', group: 1, func: MD_FBASE.WRAP_P},
    bquote_br: {regex: /(?:^ * ?(?:&gt;)+ .+[\n\r]?)/gm, rstr: '<br>', group: 1, func: MD_FBASE.ADD_BEFORE},
            abbr: {regex: /^ *\*\[([^\^\]]+)\]: +(.*)$/gm, rstr: '', group: 1, func: MD_FBASE.NONE}, 
        a_auto: {regex: /((?<= )https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)(?= ))/gm, rstr: '', group: 1, func: MD_FCUSTOM.AUTOLINK},
                    
                }

const MD_REGEX_EARLY = {
        link_foot_def: {regex: /^ *\[([^\^\]]+)\]: +(\S*)( +"(.*)")?/gm, rstr: '', group: 1, func: MD_FCUSTOM.FOOTER_LINK},
    link_foot: {regex: /!?\[(.*?)\]\[(.*?)\]/gm, rstr: '', group: 1, func: MD_FCUSTOM.LINK_TO_FOOTER},
        foot_def: {regex: /^ *\[\^([^\]]+)\]: ?(.*$)/gm, rstr: '', group: 1, func: MD_FCUSTOM.FOOTNOTE_DEF}, 
        footnote_link: {regex: /\[\^([^\]]+)\](?=[^:])/gm, rstr: '', group: 1, func: MD_FCUSTOM.FOOTNOTE_LINK},
        footnote_inline: {regex: /\^\[(.*?)\]/gm, rstr: '', group: 1, func: MD_FCUSTOM.FOOTNOTE_INLINE},
}

const MD_REGEX_LATE = {
    clean_up_empty_p: {regex: /<p>\s*<\/p>/gm, rstr: '', group: 1, func: MD_FBASE.REPLACE},
    clean_up_br_in_p: {regex: /<p>\s*<br>\s*<\/p>/gm, rstr: '<br>', group: 1, func: MD_FBASE.REPLACE},
    clean_up_double_br: {regex: /(<br> *[\n\r]?<br>)+/gm, rstr: '<br>', group: 1, func: MD_FBASE.REPLACE},
    double_br_second_sweep: {regex: /(<br> *[\n\r]?<br>)+/gm, rstr: '<br>', group: 1, func: MD_FBASE.REPLACE},
    rm_br_before_closetag: {regex: /<br>\s*?[\r\n]?\S?(<\/.*?>)/gm, rstr: '', group: 1, func: MD_FBASE.KEEP_GROUP},
    rm_br_after_opening: {regex: /(<[^<\/]*?>) *?[\n\r]?<br>/gm, rstr: '', group: 1, func: MD_FBASE.KEEP_GROUP},
    rm_br_after_closing: {regex: /(<\/[^<]*?>) *?[\n\r]?<br>/gm, rstr: '', group: 1, func: MD_FBASE.KEEP_GROUP},
            lbreakslash: {regex: /\\ *?$/gm, rstr: '<br>', group: 1, func: MD_FBASE.REPLACE},  
    lbreakslashbr: {regex: /\\ *?<br> *?$/gm, rstr: '<br>', group: 1, func: MD_FBASE.REPLACE}, 
}

function jConvertMarkdown(options = null) {
    let classElem = [...document.getElementsByClassName('pjs-markdown')];
    for (let i = 0; i < classElem.length; i ++) {
        let elem = classElem[i];
                let html = jMarkdownToHtml(elem.innerHTML, options);
        elem.innerHTML = html;
        
        elem.classList.replace('pjs-markdown', 'pjs-markdown-parsed');
        if (!document.getElementById('pjs-md-style')) {
            let style = document.createElement("style");
            document.head.appendChild(style);
            style.innerHTML = MD_CSS;
        }
    }
}

function jInsertMarkdownToId(id, mdown, options = null) {
    let elem = document.getElementById(id);
    let html = jMarkdownToHtml(elem.innerHTML, doCenterAltHeaders);
    elem.innerHTML = html;
    elem.classList.add('pjs-markdown-parsed');
    if (!document.getElementById('pjs-md-style')) {
        let style = document.createElement("style");
        document.head.appendChild(style);
        style.innerHTML = MD_CSS;
    }
}

function jMarkdownToHtml(mdown, options = null) {
    if (options instanceof PJsMdOptions) {
        MD_OPTIONS.CENTER_ALT_HEADERS = options.CENTER_ALT_HEADERS;
    }

    MD_FOOTNOTES.FOOTNOTE = {};
    MD_FOOTNOTES.FOOTLINK = {};

        let html = mdown;
    html = jProcessMarkDown(html, MD_REGEX_EARLY);
    
        html = html.split(/\n(?: *\n)+/gm);
    
    let length = html.length;
    for (let i = 0; i < length; i ++) {
                html[i] = jProcessMarkDown(html[i], MD_REGEX);
        html[i] = `<p>${html[i]}</p>`
    }
            html = `${html.join('')}`;

    let tempNode = document.createElement("div");
    document.body.appendChild(tempNode);
    tempNode.innerHTML = html;
    html = tempNode.innerHTML;
    document.body.removeChild(tempNode);
        html = jProcessMarkDown(html, MD_REGEX_LATE);

    return html;
    }

function jProcessMarkDown(mdown, regex) {
    let html = mdown;
    let length = Object.keys(regex).length;
    for (let i = 0; i < length; i ++) {
        let elem = Object.keys(regex)[i];
        let md = regex[elem];
        let match = [...html.matchAll(md.regex)];
        for (let j = 0; j < match.length; j ++) {
            html = md.func(html, match[j], md.regex, md.rstr, md.group);
        }
    }
    return html;
}