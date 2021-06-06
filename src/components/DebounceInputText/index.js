import debounce from 'lodash/debounce';
import React from 'react';
import {InputText} from 'primereact/inputtext';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';

const DebounceInputText = ({changeHandler, ...props}) => {

  const [t] = useTranslation();
  const onChange = debounce((e) => {
    changeHandler(e.target.value);
  }, 1000)

  return <InputText type="search" onInput={e => onChange(e)} placeholder={t('label.searchPlaceHolder')} {...props} />
};

DebounceInputText.propTypes = {
  changeHandler: PropTypes.func.isRequired,
};

export default DebounceInputText;
