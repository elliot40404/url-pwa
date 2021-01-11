function copy() {
    const text = document.querySelector('#text');
    const textc = document.querySelector('#text').value;
    try {
        navigator.clipboard.writeText(textc);
    } catch (e) {
        console.log(e);
        text.select();
        text.setSelectionRange(0, 99999);
        document.execCommand("copy");
    }
}
function valid() {
    const val = document.getElementById('link').value;
    if (val.length >= 9) {
        document.getElementById('btnn').removeAttribute('disabled');
    }
}

document.getElementById('text').addEventListener('click', copy);