//create a <style></style> element
const style = document.createElement("style");
//inject the text between `` in our <style></style> element
style.innerText = `
ytd-comments, #comments{
    display:none !important;
}
`

//inject our <style></style> element in the head of the current page
document.head.appendChild(style);