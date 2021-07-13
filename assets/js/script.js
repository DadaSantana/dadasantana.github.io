function tag(element, numValue) {
    document.querySelectorAll(".curso-title").forEach(clearClass);
    document.querySelectorAll(".curso").forEach(clearDisplay);

    function clearClass(thiss) {
        thiss.classList.remove("active-nav")
    }

    function clearDisplay(thiss) {
        thiss.style.display = 'none';
    }
    
    element.classList.add("active-nav");

    switch (numValue) {
        case 1:
            document.querySelector(".curso.html").style.display = 'grid';
            break;

        case 2:
            document.querySelector(".curso.js").style.display = 'grid';
    
        default:
            break;
    }
}