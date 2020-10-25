const header = document.querySelector('header');
const main = document.querySelector('main');
const frontDesk = document.querySelector('.front-desk');
const headerMenu = document.querySelector('.header-menu');
const wrapper = document.querySelector('.wrapper');
const wrapperMenu = document.querySelector('.wrapper-menu');
const logo = document.querySelector('.logo');
const hr = document.querySelectorAll('.hr-menu')
const entries = document.querySelectorAll('.entry')
const entriesContent = document.querySelectorAll('.entry-content')
let lastEntry = entries[0];
let cache = 0;

window.onload = () => {
    if (window.innerWidth < 1024)
    for (let n = 0; n < entries.length; n++) {
        if (n > 0)
            entries[n].classList.add('hidden');
    } else
        cache = 1;
}
window.addEventListener('resize', function(event){
    let newWidth = window.innerWidth;
    let newHeight = window.innerHeight; 
    if (newWidth > 1024 && cache === 0) {
        cache = 1
        for (let n = 0; n < entries.length; n++) {
            if (entries[n].classList.contains('hidden'))
            entries[n].classList.remove('hidden');
            if (wrapperMenu.classList.contains('open')) {
                hr[n].classList.add('hidden');
            }
        }
    } else if (newWidth < 1024 && cache === 1) {
        cache = 0;
        if (wrapperMenu.classList.contains('open'))
            wrapperMenu.classList.remove('open')
        for (let n = 0; n < entries.length; n++) {
            if(!hr[n].classList.contains('hidden') ) {
                entries[n].classList.add('hidden');
            }
            if (entries[n].innerHTML !== lastEntry.innerHTML)
                entries[n].classList.add('hidden');
        }
    }
    console.log(cache)
});

wrapper.addEventListener('click', () => {
    header.classList.add('main-header');
    logo.classList.add('main-logo');
    frontDesk.classList.add('hidden');
    headerMenu.classList.remove('hidden');
    main.classList.remove('hidden');
});



//  putting 'click' listener on all entries in the nav
for (let n = 0; n < entries.length; n++) {  
    const entry = entries[n];
    const entryContent = entriesContent[n];

    entry.addEventListener("click", function(e) {
        console.log(lastEntry.innerHTML)
        lastEntry.classList.remove('selected');
        e.target.classList.add('selected');
        lastEntry = e.target;
        for (let n2 = 0; n2 < entriesContent.length; n2++) {
            //  checking if an entry content is already opened
            if (entryContent != entriesContent[n2] && !entriesContent[n2].classList.contains('hidden')) {
                entriesContent[n2].classList.add('hidden');
                entriesContent[n].classList.remove('hidden');
            }
        }

        // for responsive menu
        if (wrapperMenu.classList.contains('open') && e.target.innerHTML === entry.innerHTML) {
            wrapMenu(entries, e.target);
        }
    });

}

wrapperMenu.addEventListener('click', () => {
    wrapMenu(entries);
});

function wrapMenu(entries, entryTarget) {
    entryTarget = (typeof entryTarget === 'undefined') ? '' : entryTarget;
    if (entryTarget !== '')
        lastEntry = entryTarget;
    // console.log(entryTarget)
    if (wrapperMenu.classList.contains('open')) { 
        for (let n = 0; n < entries.length; n++) {
            hr[n].classList.toggle('hidden');
            if (entries[n].innerHTML !== entryTarget.innerHTML && entries[n].innerHTML !== lastEntry.innerHTML)
                entries[n].classList.toggle('hidden');
        }
    } else {

        for (let n = 0; n < entries.length; n++) {
            hr[n].classList.toggle('hidden');
            if (entries[n].classList.contains('hidden'))
                entries[n].classList.toggle('hidden');
            }
    }
    wrapperMenu.classList.toggle('open');
}