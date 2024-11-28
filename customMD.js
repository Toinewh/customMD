/* * *
 * customMD v 1
 * @author Toinewh https://github.com/Toinewh
 * @license MIT
 *
 * Custom syntax addition for Markdown-formatted text.
 * Written in JavaScript.
 * To be included in HTML document (ie yet rendered by any MD editor).
 * * */

///////////////
// FUNCTIONS //
///////////////

// Change the type of a given element
function changeTagName(el, newTagName) {
    var n = this.document.createElement(newTagName);
    var attr = el.attributes;
    for (var i = 0, len = attr.length; i < len; ++i) {
        n.setAttribute(attr[i].name, attr[i].value);
    }
    n.innerHTML = el.innerHTML;
    el.parentNode.replaceChild(n, el);
};

// TAILPIECE //
function tailpiece() {
    
    // List all H1 elements inside the body, from which can be found the tailpieces
    var x = this.document.body.getElementsByTagName("h1");
    
    // Tailpiece
    for (var j = 0; j < x.length; j++) {
        // Add custom class
        var y = x[j].innerHTML.match(/^[^\p{P}\w\s]{1,3}$/mg);
        if (y!=null) {
            x[j].classList.add("tailpiece");
            changeTagName(x[j], 'div');
            j -= 1;
        }
    }
    
    // List all elements inside the body, as tailpiece class is now added
    x = this.document.body.getElementsByTagName("*");
    
    for (var j = 0; j < x.length; j++) {
        // Multiple dings tailpiece
        if (x[j].className=="tailpiece") {
            var y = x[j].innerHTML.split('');
            if (y.length==3) {
                x[j].innerHTML = y[0] + '<span class="middle-piece">' + y[1] + '</span>' + y[2];
            }
        }
    }
}

// CUSTOM HTML ELEMENTS //
function newElements() {
    
    const x = this.document.body.innerHTML;
    
    // Shortcut for <div>
    this.document.body.innerHTML = x
    .replace(/^<p(.*?)>¨{3}([\w]*)/mg, '<div class="$2"><p$1>')
    .replace(/¨{3}<\/p>/, '</p></div>');
    
    // Shortcut for <big>
    findAndReplaceDOMText(document.body, {
        find: /\^(.+?)\^/gm,
        replace: ' $1', // Space added before $1 to prevent character shift
        wrap: 'big'
    });
    
    // Shortcut for <small>
    findAndReplaceDOMText(document.body, {
        find: /\~(.+?)\~/gm,
        replace: ' $1', // Space added before $1 to prevent character shift
        wrap: 'small'
    });
    
    // Shortcut for <span>
    findAndReplaceDOMText(document.body, {
        find: /\¨(.+?)\¨/gm,
        replace: '​$1', // Zero-width space added before $1 to prevent character shift
        wrap: 'span'
    });
}

// TEXT ALIGNEMENT //
function textAlignement() {
    
    const x = this.document.body.getElementsByTagName("*");
    
    // Center element beginning by .|.
    for (var j = 0; j < x.length; j++) {
        var y = x[j].innerHTML.match(/^\.\|\. /mg);
        if (y!=null) {
            x[j].classList.add("center");
        }
    };
    // Remove .|.
    findAndReplaceDOMText(document.body, {
        find: /^\.\|\. /mg,
        replace: '$1'
    });
    
    // Justify element beginning by |.|
    for (var j = 0; j < x.length; j++) {
        var y = x[j].innerHTML.match(/^\|\.\| /mg);
        if (y!=null) {
            x[j].classList.add("justify");
        }
    };
    // Remove |.|
    findAndReplaceDOMText(document.body, {
        find: /^\|\.\| /mg,
        replace: '$1'
    });
    
    // Right-align element beginning by ..|
    for (var j = 0; j < x.length; j++) {
        var y = x[j].innerHTML.match(/^\.\.\| /mg);
        if (y!=null) {
            x[j].classList.add("right");
        }
    };
    // Remove ..|
    findAndReplaceDOMText(document.body, {
        find: /^\.\.\| /mg,
        replace: '$1'
    });
    
    // Left-align and indent element beginning by .||
    for (var j = 0; j < x.length; j++) {
        var y = x[j].innerHTML.match(/^\.\|\| /mg);
        if (y!=null) {
            x[j].classList.add("right","indent");
        }
    };
    // Remove .||
    findAndReplaceDOMText(document.body, {
        find: /^\.\|\| /mg,
        replace: '$1'
    });
    
    // Left-align element beginning by |..
    for (var j = 0; j < x.length; j++) {
        var y = x[j].innerHTML.match(/^\|\.\. /mg);
        if (y!=null) {
            x[j].classList.add("left");
        }
    };
    // Remove |..
    findAndReplaceDOMText(document.body, {
        find: /^\|\.\. /mg,
        replace: '$1'
    });
    
    // Left-align and indent element beginning by ||.
    for (var j = 0; j < x.length; j++) {
        var y = x[j].innerHTML.match(/^\|\|\. /mg);
        if (y!=null) {
            x[j].classList.add("left","indent");
        }
    };
    // Remove ||.
    findAndReplaceDOMText(document.body, {
        find: /^\|\|\. /mg,
        replace: '$1'
    });
}

// PUNCTUATION //
function smartPunctuation() {
    
    const x = this.document.body;
    
    // Replace space by punctuation space
    findAndReplaceDOMText(x, {
        find: /\s?([?!;:»])/g,
        replace: ' $1'
    });
    findAndReplaceDOMText(x, {
        find: /([«¿¡])\s?/g,
        replace: '$1 '
    });
    
    // Replace standard apostroph ' by typographic apostrophe ’
    findAndReplaceDOMText(x, {
        find: /(?=\S)\'(?<=\S)/g,
        replace: '’'
    });
    
    // Replace three periods ... by ellipsis …
    findAndReplaceDOMText(x, {
        find: /\s?\.{3}/g,
        replace: '…'
    });
};

///////////////
// EXECUTION //
///////////////

// Calling functions one by one
function customMD() {
    tailpiece();
    newElements();
    textAlignement();
    smartPunctuation();
    
};
