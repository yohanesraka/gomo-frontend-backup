import { reactive } from 'vue';
import Sidebar from './SideBar.vue';
import SidebarItem from './SidebarItem.vue';

const SidebarStore = reactive({
  showSidebar: false,
  sidebarLinks: [],
  isMinimized: false,
  breakpoint: 1200,
  hovered: false,
  displaySidebar(value) {
    if (window.innerWidth > this.breakpoint) {
      return;
    }
    this.isMinimized = !value;
    this.showSidebar = value;
    const docClasses = document.body.classList;
    if (value) {
      docClasses.add('g-sidenav-pinned');
      docClasses.add('g-sidenav-show');
      docClasses.remove('g-sidenav-hidden');
    } else {
      docClasses.add('g-sidenav-hidden');
      docClasses.remove('g-sidenav-pinned');
      docClasses.remove('g-sidenav-show');
    }
  },
  toggleMinimize() {
    this.isMinimized = !this.isMinimized;
    const docClasses = document.body.classList;
    if (this.isMinimized) {
      docClasses.add('g-sidenav-hidden');
      docClasses.remove('g-sidenav-pinned');
      docClasses.remove('g-sidenav-show');
    } else {
      docClasses.add('g-sidenav-pinned');
      docClasses.add('g-sidenav-show');
      docClasses.remove('g-sidenav-hidden');
    }
    if (this.hovered) {
      docClasses.add('g-sidenav-show');
    }
  },
  onMouseEnter() {
    this.hovered = true;
    if (this.isMinimized) {
      document.body.classList.add('g-sidenav-show');
      document.body.classList.remove('g-sidenav-hidden');
    }
  },
  onMouseLeave() {
    this.hovered = false;
    if (this.isMinimized) {
      const docClasses = document.body.classList;
      docClasses.remove('g-sidenav-show');
      docClasses.add('g-sidenav-hide');
      setTimeout(() => {
        docClasses.remove('g-sidenav-hide');
        docClasses.add('g-sidenav-hidden');
      }, 300);
    }
  },
});

const SidebarPlugin = {
  install(app, options) {
    const ctx = app;
    if (options && options.sidebarLinks) {
      SidebarStore.sidebarLinks = options.sidebarLinks;
    }
    ctx.config.globalProperties.$sidebar = SidebarStore;
    ctx.component('SideBar', Sidebar);
    ctx.component('SidebarItem', SidebarItem);
  },
};

export default SidebarPlugin;
