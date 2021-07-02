function verify_scroll() {
    if (window.scrollY != 0) {
        document.getElementById('scroll').style.display = 'flex';
    } else {
        document.getElementById('scroll').style.display = 'none';
    }
}

function click_scroll() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

window.addEventListener('scroll', verify_scroll);

