const demoMenu = [
  {label: 'Dashboard', icon: 'pi pi-fw pi-home', path: '/demo-dashboard'},
  {
    label: 'UI Kit', icon: 'pi pi-fw pi-sitemap',
    items: [
      {label: 'Form Layout', icon: 'pi pi-fw pi-id-card', path: '/formlayout'},
      {label: 'Input', icon: 'pi pi-fw pi-check-square', path: '/input'},
      {label: 'Float Label', icon: 'pi pi-fw pi-bookmark', path: '/floatlabel'},
      {label: "Invalid State", icon: "pi pi-fw pi-exclamation-circle", path: "/invalidstate"},
      {label: 'Button', icon: 'pi pi-fw pi-mobile', path: '/button'},
      {label: 'Table', icon: 'pi pi-fw pi-table', path: '/table'},
      {label: 'List', icon: 'pi pi-fw pi-list', path: '/list'},
      {label: 'Tree', icon: 'pi pi-fw pi-share-alt', path: '/tree'},
      {label: 'Panel', icon: 'pi pi-fw pi-tablet', path: '/panel'},
      {label: 'Overlay', icon: 'pi pi-fw pi-clone', path: '/overlay'},
      {label: 'Menu', icon: 'pi pi-fw pi-bars', path: '/menu'},
      {label: 'Message', icon: 'pi pi-fw pi-comment', path: '/messages'},
      {label: 'File', icon: 'pi pi-fw pi-file', path: '/file'},
      {label: 'Chart', icon: 'pi pi-fw pi-chart-bar', path: '/chart'},
      {label: 'Misc', icon: 'pi pi-fw pi-circle-off', path: '/misc'},
    ]
  },
  {
    label: 'Utilities', icon: 'pi pi-fw pi-globe',
    items: [
      {label: 'Display', icon: 'pi pi-fw pi-desktop', path: '/display'},
      {label: 'Elevation', icon: 'pi pi-fw pi-external-link', path: '/elevation'},
      {label: 'Flexbox', icon: 'pi pi-fw pi-directions', path: '/flexbox'},
      {label: 'Icons', icon: 'pi pi-fw pi-search', path: '/icons'},
      {label: 'Grid System', icon: 'pi pi-fw pi-th-large', path: '/grid'},
      {label: 'Spacing', icon: 'pi pi-fw pi-arrow-right', path: '/spacing'},
      {label: 'Typography', icon: 'pi pi-fw pi-align-center', path: '/typography'},
      {label: 'Text', icon: 'pi pi-fw pi-pencil', path: '/text'},
    ]
  },
  {
    label: 'Pages', icon: 'pi pi-fw pi-clone',
    items: [
      {label: 'Crud', icon: 'pi pi-fw pi-user-edit', path: '/crud'},
      {label: 'Calendar', icon: 'pi pi-fw pi-calendar-plus', path: '/calendar'},
      {label: 'Timeline', icon: 'pi pi-fw pi-calendar', path: '/timeline'},
      {label: 'Empty Page', icon: 'pi pi-fw pi-circle-off', path: '/empty'}
    ]
  },
  {
    label: 'Menu Hierarchy', icon: 'pi pi-fw pi-search',
    items: [
      {
        label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
        items: [
          {
            label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
            items: [
              {label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark'},
              {label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark'},
              {label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark'},
            ]
          },
          {
            label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
            items: [
              {label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark'},
              {label: 'Submenu 1.2.2', icon: 'pi pi-fw pi-bookmark'}
            ]
          },
        ]
      },
      {
        label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
        items: [
          {
            label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
            items: [
              {label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark'},
              {label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark'},
              {label: 'Submenu 2.1.3', icon: 'pi pi-fw pi-bookmark'},
            ]
          },
          {
            label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
            items: [
              {label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark'},
              {label: 'Submenu 2.2.2', icon: 'pi pi-fw pi-bookmark'}
            ]
          }
        ]
      }
    ]
  },
  {
    label: 'Documentation', icon: 'pi pi-fw pi-question', command: () => {
      window.location = "#/documentation"
    }
  },
  {
    label: 'View Source', icon: 'pi pi-fw pi-search', command: () => {
      window.location = "https://github.com/primefaces/sigma-react"
    }
  }
];

export default demoMenu;
