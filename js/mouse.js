var smallCursor = document.querySelector(".smallCursor");
var bigCursor = document.querySelector(".bigCursor");
document.onmousemove = function (e) {
    smallCursor.style.left = (e.pageX - 5) + "px";
    smallCursor.style.top = (e.pageY - 5) + "px";
    smallCursor.style.display = 'block';
    bigCursor.style.left = (e.pageX - 22) + "px";
    bigCursor.style.top = (e.pageY - 22) + "px";
    bigCursor.style.display = 'block';
}

