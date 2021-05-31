import React, { Component } from 'react';
import classNames from 'classnames';

/**
 * Renders the preloader
 */
class PreLoaderWidget extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={classNames('preloader', { 'full-page': this.props.fullPage })}>
        <div className="status">
          <div className="spinner-border avatar-sm text-primary m-2" role="status"></div>
        </div>
      </div>
    );
  }
}

export default PreLoaderWidget;
