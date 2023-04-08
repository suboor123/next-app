

export const toggleSidebar = () => {
    const hideMenu = document.querySelector('#hide-menu');
    const headerAffix = document.querySelector('#header-affix');
    hideMenu?.classList.toggle('active');
    headerAffix?.classList.toggle('active');
}