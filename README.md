# purejs-markdown
[![Downloads](https://img.shields.io/github/downloads/al1-ce/purejs-markdown/total.svg)](https://github.com/al1-ce/purejs-markdown/releases)
[![GitHub Stars](https://img.shields.io/github/stars/al1-ce/purejs-markdown.svg)](https://github.com/al1-ce/purejs-markdown/stargazers)
[![Codecov](https://codecov.io/gh/al1-ce/purejs-markdown/branch/master/graph/badge.svg)](https://codecov.io/gh/al1-ce/purejs-markdown)
[![BCH compliance](https://bettercodehub.com/edge/badge/al1-ce/purejs-markdown?branch=master)](https://bettercodehub.com/)


Markdown compiler written in pure JS, no libs, no frameworks, absolutely unbearable code!
Actually it's just a tiny tool for myself and nothing else.

Usage: \
`jConvertMarkdown(options = null)`: automatically convert all DOM elements with class 'pjs-markdown'. \
    `args`: \
    `PJsMdOptions`: markdown converter options. Leave null or new to get default settings, default null

`jMarkdownToHtml(mdown, options = null)`: convert markdown string supplied to function. Returns HTML.  \
    `args`: \
    `mdown`: markdown string to convert \
    `PJsMdOptions`: markdown converter options. Leave null or new to get default settings, default null \
    `returns`: parsed html code

`jInsertMarkdownToId(id, mdown, options = null)`: convert markdown string supplied to function. Returns HTML.  \
    `args`: \
    `id`: id of element in which to insert parsed markdown \
    `mdown`: markdown string to convert \
    `PJsMdOptions`: markdown converter options. Leave null or new to get default settings, default null
    


| Element                   | Support   | Notes                             |
|:------------------------- |:--------- |:--------------------------------- |
| Headings                  |   Yes     |                                   |
| Paragraphs                |   Yes	    |                                   |
| Line Breaks	            |   Yes	    |       |
| Automatic Line Breaks	    |   Yes	    |       |
| Bold	                    |   Yes	    |                                   |
| Italic	                |   Yes	    |                                   |
| Blockquotes	            |   Partially	    |                                   |
| Ordered Lists	            |   Partially	    |                                    |
| Unordered Lists	        |   Partially	    |                                   |
| Code	                    |   Yes	    |                                   |
| Horizontal Rules	        |   Yes	    |                                   |
| Links	                    |   Yes	    |                                   |
| Images	                |   Yes	    |                                   |
| Tables	                |   Partially	    |                                   |
| Fenced Code Blocks	    |   No	    |                                   |
| Footnotes	                |   Yes	    |                                   |
| Definition Lists	        |   No	    |                                   |
| Strikethrough	            |   Yes	    |                                   |
| Task Lists	            |   No	    |                                   |
| Highlight	                |   Yes	    |                                   |
| Subscript	                |   Yes	    |                                   |
| Superscript	            |   Yes	    |                                   |
| Automatic URL Linking	    |   Yes      |                                   |
| HTML	                    |   Yes	    | You already can, it's not gonna omit itself |
