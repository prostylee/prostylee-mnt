import React from 'react';
import PropTypes from 'prop-types';
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import {useTranslation} from 'react-i18next';

const ConfirmDeleteDialog = (props) => {
  const [t] = useTranslation();
  const {visible, message, onOk, onClose} = props;

  const renderFooter = () => {
    return (
      <div>
        <Button label={t('button.cancel')} icon="pi pi-times" onClick={onClose} className="p-button-text" />
        <Button label={t('button.ok')} icon="pi pi-check" onClick={() => onOk(props.data)} autoFocus />
      </div>
    );
  }

  return (
    <Dialog header={props.header || t('button.confirmation')}
            visible={visible}
            onHide={onClose}
            breakpoints={{'960px': '75vw'}}
            style={{width: '30vw'}}
            baseZIndex={9999}
            footer={renderFooter}>
      <div>
        <div dangerouslySetInnerHTML={{__html: message}} />
      </div>
    </Dialog>
  )
};

ConfirmDeleteDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onOk: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  header: PropTypes.string,
  data: PropTypes.any,
};

export default ConfirmDeleteDialog;
