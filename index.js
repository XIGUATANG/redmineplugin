(async () => {
  const src = chrome.extension.getURL("src/main.js");
  const contentScript = await import(src);
  contentScript.main(/* chrome: no need to pass it */);

  console.log("111", typeofJsonc);

  window.typeofJsonc = typeofJsonc;

  setTimeout(start, 2000);
})();

// var a = chrome.extension.getURL("src/highlight.css");
// $('<link rel="stylesheet" type="text/css" href="' + a + '" >').appendTo("head");


let link = document.createElement("link");
link.href = '//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/styles/default.min.css'
link.rel = 'stylesheet'
// link.setAttribute("rel", "stylesheet");
// link.setAttribute("type", "text/css");
// link.setAttribute("href", '//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/styles/default.min.css');
document.querySelector('head').appendChild(link);

function start() {
  let str = [...document.querySelectorAll(".ace_content")].map(
    (item) => item.innerText
  );

  const toTS = (str, name) =>
    typeofJsonc.default(str, name, {
      prefix: "",
      rootFlags: 1,
      disallowComments: false,
      addExport: false,
      singleLineJsDocComments: true,
    });

  console.log(
    typeofJsonc.default(str[1], "request", {
      prefix: "",
      rootFlags: 1,
      disallowComments: false,
      addExport: true,
      singleLineJsDocComments: true,
    })
  );

  function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

  function insertTSCode(type) {
    let TSStr = "",
      name = "",
      mode;
    if (type === "header") {
      TSStr = toTS(str[0] || "", "request");
      node = document.querySelector(".colHeader");
    } else {
      TSStr = toTS(str[1] || "", "response");
      node = document.querySelector(".colBody");
    }
    let pre = document.createElement("pre");
    let code = document.createElement("code");
    code.className = "language-typescript";
    code.innerText = TSStr;
    pre.appendChild(code);
    insertAfter(node, pre);
  }
  insertTSCode("header");
  insertTSCode("after");
}
