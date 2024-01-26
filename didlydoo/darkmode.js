let circleDarkMode = document.querySelector('.dark_mode_circle_header');
let linkSideBar = document.querySelectorAll('.main_section_nav_bar_item_link');
let icons = document.querySelectorAll('i');
let body = document.querySelector('body');
let isValid = false;

function darkMode() {
    circleDarkMode.addEventListener('click', () => {

        if (!isValid) {
            document.body.classList.add('dark_mode_active');
            linkSideBar.forEach(item => {
                item.classList.add('dark_mode_active');
            })
            icons.forEach(item => {
                item.classList.add('dark_mode_active');
            })
            isValid = true;
        } else {
            document.body.classList.remove('dark_mode_active');
            linkSideBar.forEach(item => {
                item.classList.remove('dark_mode_active');
            })
            icons.forEach(item => {
                item.classList.remove('dark_mode_active');
            })
            isValid = false;
        }
    })
}

darkMode();