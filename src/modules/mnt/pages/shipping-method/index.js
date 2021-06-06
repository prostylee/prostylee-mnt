import React, {useEffect, useRef, useState} from 'react';
import {Formik} from 'formik';
import {Toolbar} from 'primereact/toolbar';
import {Button} from 'primereact/button';
import {Column} from 'primereact/column';
import {useTranslation} from 'react-i18next';
import PsTable from '../../../../components/PsTable';
import {Sidebar} from 'primereact/sidebar';
import {connect} from 'react-redux';
import {actions as sharedActions} from '../../../../redux/reducers/shared';
import {actions as shippingMethodActions, initialShippingMethod} from '../../redux/reducers/shipping-method';
import AppLogger from '../../../../helpers/app-logger';
import {InputText} from 'primereact/inputtext';
import {Divider} from 'primereact/divider';
import {InputTextarea} from 'primereact/inputtextarea';
import {getI18nMessage} from '../../../../helpers/i18n';
import * as Yup from 'yup';
import {ConfirmDeleteDialog, DateTimeLabel, FieldError, PsTableHeader} from '../../../../components';
import * as ActionMode from '../../../../constants/actionMode';
import {SUCCESS} from '../../../../constants/severity';

const ShippingMethod = (props) => {

  const {loading, filter, pagination, shippingMethods, shippingMethod, actionMode, showSidebar} = props; // State model
  const {
    setShippingMethod, toggleSidebar,
    findAll, deleteById, create, update,
    setActionMode, showGlobalMessage, toggleGlobalLoading
  } = props; // Saga methods

  const [t] = useTranslation();
  const dt = useRef(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [confirmDeleteMessage, setConfirmDeleteMessage] = useState('');

  useEffect(() => {
    executeFindAll(filter, pagination);
  }, []);

  const executeFindAll = (filter, pagination) => {
    findAll({
      filter,
      pagination,
      onSuccess: () => {
        AppLogger.debug('Get success');
        toggleGlobalLoading(false);
      },
      onFail: (e) => {
        AppLogger.error(e);
        toggleGlobalLoading(false);
      }
    });
  };

  const getShippingMethods = (pagination, keyword) => {
    const updatedFilter = {
      ...filter,
      keyword
    }

    executeFindAll(updatedFilter, pagination);
  };

  const searchHandler = (val) => {
    getShippingMethods(pagination, val);
  };

  const pageHandler = (pg) => {
    getShippingMethods(pg);
  };

  const sortHandler = (pg) => {
    getShippingMethods(pg);
  };

  const add = () => {
    setActionMode(ActionMode.ADD);
    setShippingMethod({
      ...initialShippingMethod
    });
    toggleSidebar(true);
  }

  const edit = (shippingMethod) => {
    setActionMode(ActionMode.EDIT);
    setShippingMethod(shippingMethod);
    toggleSidebar(true);
  }

  const confirmDelete = (shippingMethod) => {
    setShippingMethod(shippingMethod);
    setShowConfirmDelete(true);
    setConfirmDeleteMessage(t('label.confirmDelete', {data: '#' + shippingMethod.id}));
  };

  const performDelete = () => {
    AppLogger.debug('performDelete #' + shippingMethod.id);
    deleteById({
      id: shippingMethod.id,
      onSuccess: () => {
        showGlobalMessage({
          severity: SUCCESS,
          summary: getI18nMessage('globalMessage.success'),
          detail: getI18nMessage('label.deletedSuccess'),
        });
        toggleSidebar(false);
        executeFindAll(filter, pagination);
      },
      onFail: () => {
        showGlobalMessage({
          summary: getI18nMessage('globalMessage.error'),
          detail: getI18nMessage('errorCode.DeleteFailed'),
        });
      },
    });
    setShowConfirmDelete(false);
  }

  const onSubmitData = async (values, { resetForm }) => {
    toggleGlobalLoading(true);

    function onSuccess(res) {
      toggleSidebar(false);
      showGlobalMessage({
        severity: SUCCESS,
        summary: getI18nMessage('globalMessage.success'),
        detail: getI18nMessage('label.savedSuccess'),
      });
      resetForm();
      executeFindAll(filter, pagination);
    }

    function onFail(error) {
      showGlobalMessage({
        summary: getI18nMessage('globalMessage.error'),
        detail: getI18nMessage('errorCode.SaveFailed'),
      });
      toggleGlobalLoading(false);
    }

    const requestBody = {
      name: values.name,
      description: values.description
    };

    if (actionMode === ActionMode.ADD) {
      create({
        body: requestBody,
        onSuccess: onSuccess,
        onFail: onFail,
      });
    } else if (actionMode === ActionMode.EDIT) {
      update({
        id: shippingMethod.id,
        body: requestBody,
        onSuccess: onSuccess,
        onFail: onFail,
      });
    }
  };

  const validationSchema = Yup.object({
    name: Yup
      .string(getI18nMessage('validation.hint', {field: getI18nMessage('label.name')}))
      .required(getI18nMessage('validation.required', {field: getI18nMessage('label.name')})),
  });

  const leftToolbarTemplate = () => {
    return (
      <Button label={t('button.add')} icon="pi pi-plus" className="p-button-success p-mr-2" onClick={add}/>
    )
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-info p-mr-2" title={t('button.edit')} onClick={() => edit(rowData)}/>
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" title={t('button.delete')} onClick={() => confirmDelete(rowData)}/>
      </div>
    );
  };

  return (
    <div className="p-grid ps-table-wrapper">
      <div className="p-col-12">
        <div className="card">
          <Toolbar className="p-mb-4" left={leftToolbarTemplate}/>

          <PsTable pagination={pagination} ref={dt}
                   value={shippingMethods}
                   globalFilter={filter?.keyword}
                   header={<PsTableHeader searchHandler={searchHandler} tableHeader={t('feature.shippingMethod')}/>}
                   pageHandler={pageHandler}
                   sortHandler={sortHandler}
                   loading={loading}
          >
            <Column field="id" header={t('label.id')} sortable className="w-col-id"/>
            <Column field="name" header={t('label.name')} sortable className="w-30" />
            <Column field="description" header={t('label.desc')} sortable/>
            <Column field="createdAt" header={t('label.createdAt')} sortable className="w-col-date"
                    body={rowData => <DateTimeLabel date={rowData['createdAt']}/>}/>
            <Column header={t('button.action')} body={actionBodyTemplate} className="w-col-action" />
          </PsTable>

          <Formik initialValues={shippingMethod} enableReinitialize validationSchema={validationSchema} onSubmit={onSubmitData}>
            {(formikProps) => {
              const {values, handleChange, handleSubmit, handleBlur, isSubmitting} = formikProps;
              return (
                <Sidebar visible={showSidebar}
                         onHide={() => toggleSidebar(false)}
                         closeOnEscape={false}
                         dismissable={false}
                         showCloseIcon={false}
                         baseZIndex={1000}
                         position="right"
                         style={{width: '40em'}}>
                  <div className="p-col-12">
                    <div className="card">
                      <div className="actions p-d-flex p-jc-between" style={{alignItems: 'baseline'}}>
                        <div className="p-text-left">
                          <div className="title-sidebar p-text-bold" style={{fontSize: '1.25em'}}>
                            { actionMode === ActionMode.EDIT ? t('button.edit') : t('button.add')}
                          </div>
                        </div>
                        <div className="p-text-right">
                          <Button type="button" onClick={() => toggleSidebar(false)}
                                  label={t('button.cancel')}
                                  icon="pi pi-arrow-left"
                                  className="p-button-outlined p-button-secondary p-ml-2" />
                          {
                            actionMode === ActionMode.EDIT &&
                            <Button type="button"
                                    onClick={() => confirmDelete(shippingMethod)}
                                    label={t('button.delete')}
                                    icon="pi pi-trash"
                                    className="p-button-outlined p-button-danger p-ml-2" />
                          }
                          <Button type="button"
                                  onClick={handleSubmit}
                                  disabled={isSubmitting}
                                  label={t('button.save')}
                                  icon="pi pi-check"
                                  className="p-ml-2" />
                        </div>
                      </div>

                      <Divider/>

                      <div className="p-fluid p-pt-4">
                        <div className="p-field">
                          <label htmlFor="name">{t('label.name')}</label>
                          <InputText id="name" name="name" type="text"
                                     autoFocus={true}
                                     maxLength={256}
                                     value={values.name}
                                     onChange={handleChange}
                                     onBlur={handleBlur}
                          />
                          <FieldError formik={formikProps} name="name"/>
                        </div>
                        <div className="p-field">
                          <label htmlFor="desc">{t('label.desc')}</label>
                          <InputTextarea id="description" name="description" maxLength={512}
                                         rows={5} cols={30} autoResize
                                         value={values.description}
                                         onChange={handleChange}
                                         onBlur={handleBlur}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Sidebar>
              );
            }}
          </Formik>

          <ConfirmDeleteDialog onClose={() => setShowConfirmDelete(false)}
                               onOk={performDelete}
                               visible={showConfirmDelete}
                               message={confirmDeleteMessage}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const {shippingMethods, shippingMethod, pagination, filter, loading} = state.shippingMethod;
  const {globalError, showSidebar, actionMode} = state.shared;
  return {shippingMethods, shippingMethod, pagination, filter, loading, globalError, showSidebar, actionMode};
};

const mapDispatchToProps = (dispatch) => {
  return {
    // CRUD
    findAll: (data) => {
      dispatch(shippingMethodActions.getAll(data));
    },
    getById: (data) => {
      dispatch(shippingMethodActions.getById(data));
    },
    create: (data) => {
      dispatch(shippingMethodActions.create(data));
    },
    update: (data) => {
      dispatch(shippingMethodActions.update(data));
    },
    deleteById: (data) => {
      dispatch(shippingMethodActions.deleteById(data));
    },
    // Support
    toggleLoading: (isLoading) => {
      dispatch(shippingMethodActions.toggleLoading(isLoading));
    },
    setShippingMethod: (data) => {
      dispatch(shippingMethodActions.setShippingMethod(data));
    },
    // Common
    setActionMode: (data) => {
      dispatch(sharedActions.setActionMode(data));
    },
    toggleSidebar: (showSidebar) => {
      dispatch(sharedActions.toggleSidebar(showSidebar));
    },
    showGlobalMessage: (data) => {
      dispatch(sharedActions.globalMessage(data));
    },
    toggleGlobalLoading: (isLoading) => {
      dispatch(sharedActions.toggleGlobalLoading(isLoading));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingMethod);
