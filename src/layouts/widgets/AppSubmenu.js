import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import classNames from 'classnames';
import {CSSTransition} from 'react-transition-group';

export const AppSubmenu = (props) => {

  const [activeIndex, setActiveIndex] = useState(null)

  const onMenuItemClick = (event, item, index) => {
    //avoid processing disabled items
    if (item.disabled) {
      event.preventDefault();
      return true;
    }

    //execute command
    if (item.command) {
      item.command({ originalEvent: event, item: item });
    }

    if (index === activeIndex)
      setActiveIndex(null);
    else
      setActiveIndex(index);

    if (props.onMenuItemClick) {
      props.onMenuItemClick({
        originalEvent: event,
        item: item
      });
    }
  }

  const renderLinkContent = (item) => {
    let submenuIcon = item.items && <i className="pi pi-fw pi-angle-down menuitem-toggle-icon" />;
    let badge = item.badge && <span className={`menuitem-badge badge badge-${item.badge.variant}`}>{item.badge.text}</span>;

    return (
      <React.Fragment>
        <i className={item.icon} />
        <span>{item.label}</span>
        {submenuIcon}
        {badge}
      </React.Fragment>
    );
  }

  const renderLink = (item, i) => {
    let content = renderLinkContent(item);

    if (item.path) {
      return (
        <NavLink activeClassName="active-route" to={item.path} onClick={(e) => onMenuItemClick(e, item, i)} exact target={item.target}>
          {content}
        </NavLink>
      )
    }
    else {
      return (
        <a href={item.url} onClick={(e) => onMenuItemClick(e, item, i)} target={item.target}>
          {content}
        </a>
      );
    }
  }

  let items = props.items && props.items.length && props.items.map((item, i) => {
    let active = activeIndex === i;
    let styleClass = classNames(item.badgeStyleClass, { 'active-menuitem': active && !item.path });

    return (
      <li className={styleClass} key={i}>
        {item.items && props.root === true && <div className='arrow' />}
        {renderLink(item, i)}
        <CSSTransition classNames="p-toggleable-content" timeout={{ enter: 1000, exit: 450 }} in={active} unmountOnExit>
          <AppSubmenu items={item.items} onMenuItemClick={props.onMenuItemClick} />
        </CSSTransition>
      </li>
    );
  });

  return items ? <ul className={props.className}>{items}</ul> : null;
};