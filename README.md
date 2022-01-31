# purejs-markdown
Markdown compiler written in pure JS, no libs, no frameworks, absolutely unbearable code!
Actually it's just a tiny tool for myself and nothing else.

Usage: 
`jConvertMarkdown(doCenterAltHeaders = true)`: automatically convert all DOM elements with class 'pjs-markdown'.
    `args:`
    `doCenterAltHeaders: centers alternative h1, h2 headers (====, -----), default: true`

`jMarkdownToHtml(mdown, doCenterAltHeaders = true)`: convert markdown string supplied to function. Returns HTML.  
    `args:`
    `mdown: markdown string to convert`
    `doCenterAltHeaders: centers alternative h1, h2 headers (====, -----), default: true`
    


| Element                   | Support   | Notes                             |
|:------------------------- |:--------- |:--------------------------------- |
| Headings                  |   Yes     |                                   |
| Paragraphs                |   Yes	    |                                   |
| Line Breaks	            |   No	    | Yes if you going in \`true\` text     |
| Bold	                    |   Yes	    |                                   |
| Italic	                |   Yes	    |                                   |
| Blockquotes	            |   No	    |                                   |
| Ordered Lists	            |   No	    |                                   |
| Unordered Lists	        |   Yes	    |                                   |
| Code	                    |   Yes	    |                                   |
| Horizontal Rules	        |   Yes	    |                                   |
| Links	                    |   Yes	    |                                   |
| Images	                |   Yes	    |                                   |
| Tables	                |   No	    |                                   |
| Fenced Code Blocks	    |   No	    |                                   |
| Syntax Highlighting	    |   No      | No                                  |
| Footnotes	                |   No	    |                                   |
| Heading IDs	            |   No	    |                                   |
| Definition Lists	        |   No	    |                                   |
| Strikethrough	            |   Yes	    |                                   |
| Task Lists	            |   No	    |                                   |
| Emoji (copy and paste)	|   No	    | Nope                                  |
| Emoji (shortcodes)	    |   No	    | And nope                                  |
| Highlight	                |   Yes	    |                                   |
| Subscript	                |   Yes	    |                                   |
| Superscript	            |   Yes	    |                                   |
| Automatic URL Linking	    |   No      |                                   |
| HTML	                    |   No	    | Probably not gonna implement |