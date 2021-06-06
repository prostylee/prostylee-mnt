import React, {Suspense, useEffect, useRef, useState} from 'react';
import classNames from 'classnames';
import {useHistory} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';

import {AppTopbar} from '../widgets/AppTopbar';
import {AppFooter} from '../widgets/AppFooter';
import {AppMenu} from '../widgets/AppMenu';
import {AppProfile} from '../widgets/AppProfile';
import {AppConfig} from '../widgets/AppConfig';

import PrimeReact from 'primereact/api';

import '../../assets/scss/flags/flags.css';
import '../../assets/scss/layout.scss';
import './Dashboard.scss';
import {listenAuth} from '../../helpers/auth-listener';
import demoMenu from '../../modules/demo/routes/demo-menu-items';
import {appRoutes, filterAuthenticatedRoutes} from '../../routes';
import AppLogger from '../../helpers/app-logger';
import GlobalError from '../../components/GlobalMessage';
import Loading from '../../components/GlobalLoading';
import {ScrollTop} from 'primereact/scrolltop';

const loading = () => <div/>;

const useMenu = () => {
  const [menu, setMenu] = useState([]);
  const [menuReady, setMenuReady] = useState(false);

  const buildMenu = async () => {
    const filteredRoutes = await filterAuthenticatedRoutes(appRoutes);
    setMenu([...filteredRoutes, ...demoMenu]); // TODO remove demo
    setMenuReady(true);
  }

  useEffect(() => {
    document.body.classList.add('dashboard-layout');
    return () => document.body.classList.remove('dashboard-layout');
  }, []);

  useEffect(() => {
    AppLogger.debug('Build menu');
    buildMenu();
  }, [appRoutes, demoMenu]);

  return [menu, menuReady];
}

const DashboardLayout = (props) => {

  const [layoutMode, setLayoutMode] = useState('static');
  const [layoutColorMode, setLayoutColorMode] = useState('dark')
  const [staticMenuInactive, setStaticMenuInactive] = useState(false);
  const [overlayMenuActive, setOverlayMenuActive] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [inputStyle, setInputStyle] = useState('outlined');
  const [ripple, setRipple] = useState(false);
  const sidebar = useRef();

  const history = useHistory();

  useEffect(() => {
    console.log('Register an Auth Listener');
    listenAuth();
  }, []);

  let menuClick = false;

  useEffect(() => {
    if (mobileMenuActive) {
      addClass(document.body, 'body-overflow-hidden');
    } else {
      removeClass(document.body, 'body-overflow-hidden');
    }
  }, [mobileMenuActive]);

  const onInputStyleChange = (inputStyle) => {
    setInputStyle(inputStyle);
  }

  const onRipple = (e) => {
    PrimeReact.ripple = e.value;
    setRipple(e.value)
  }

  const onLayoutModeChange = (mode) => {
    setLayoutMode(mode)
  }

  const onColorModeChange = (mode) => {
    setLayoutColorMode(mode)
  }

  const onWrapperClick = (event) => {
    if (!menuClick) {
      setOverlayMenuActive(false);
      setMobileMenuActive(false);
    }
    menuClick = false;
  }

  const onToggleMenu = (event) => {
    menuClick = true;

    if (isDesktop()) {
      if (layoutMode === 'overlay') {
        setOverlayMenuActive(prevState => !prevState);
      } else if (layoutMode === 'static') {
        setStaticMenuInactive(prevState => !prevState);
      }
    } else {
      setMobileMenuActive(prevState => !prevState);
    }
    event.preventDefault();
  }

  const onSidebarClick = () => {
    menuClick = true;
  }

  const onMenuItemClick = (event) => {
    if (!event.item.items) {
      setOverlayMenuActive(false);
      setMobileMenuActive(false);
    }
  }

  const addClass = (element, className) => {
    if (element.classList)
      element.classList.add(className);
    else
      element.className += ' ' + className;
  }

  const removeClass = (element, className) => {
    if (element.classList)
      element.classList.remove(className);
    else
      element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }

  const isDesktop = () => {
    return window.innerWidth > 1024;
  }

  const isSidebarVisible = () => {
    if (isDesktop()) {
      if (layoutMode === 'static')
        return !staticMenuInactive;
      else if (layoutMode === 'overlay')
        return overlayMenuActive;
      else
        return true;
    }

    return true;
  }

  const logo = layoutColorMode === 'dark' ? '/images/logo-white.png' : '/images/logo-black-full.png';

  const wrapperClass = classNames('layout-wrapper', {
    'layout-overlay': layoutMode === 'overlay',
    'layout-static': layoutMode === 'static',
    'layout-static-sidebar-inactive': staticMenuInactive && layoutMode === 'static',
    'layout-overlay-sidebar-active': overlayMenuActive && layoutMode === 'overlay',
    'layout-mobile-sidebar-active': mobileMenuActive,
    'p-input-filled': inputStyle === 'filled',
    'p-ripple-disabled': ripple === false
  });

  const sidebarClassName = classNames('layout-sidebar', {
    'layout-sidebar-dark': layoutColorMode === 'dark',
    'layout-sidebar-light': layoutColorMode === 'light'
  });

  const [menu, menuReady] = useMenu();

  return (
    <div className={wrapperClass} onClick={onWrapperClick}>
      <AppTopbar onToggleMenu={onToggleMenu}/>

      <CSSTransition classNames="layout-sidebar" timeout={{enter: 200, exit: 200}} in={isSidebarVisible()} unmountOnExit>
        <div ref={sidebar} className={sidebarClassName} onClick={onSidebarClick}>
          <div className="layout-logo" style={{cursor: 'pointer'}} onClick={() => history.push('/')}>
            <img alt="Logo" src={logo} style={{height: '36px'}}/>
          </div>
          <AppProfile/>
          {menuReady && (<AppMenu model={menu} onMenuItemClick={onMenuItemClick}/>)}
        </div>
      </CSSTransition>

      <AppConfig rippleEffect={ripple}
                 onRippleEffect={onRipple}
                 inputStyle={inputStyle}
                 onInputStyleChange={onInputStyleChange}
                 layoutMode={layoutMode}
                 onLayoutModeChange={onLayoutModeChange}
                 layoutColorMode={layoutColorMode}
                 onColorModeChange={onColorModeChange}/>

      <div className="layout-main">
        <Suspense fallback={loading()}>{props.children}</Suspense>
        <ScrollTop/>
        <GlobalError/>
        <Loading/>
      </div>

      <AppFooter/>

    </div>
  );

}

export default DashboardLayout;
