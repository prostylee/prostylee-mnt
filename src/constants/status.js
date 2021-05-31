export const ORDER_STATUS = Object.freeze({
  pending: Object.freeze({
    code: 'PENDING',
    label: 'Chờ xác nhận',
    styleClass: 'badge badge-warning'
  }),
  approved: Object.freeze({
    code: 'APPROVED',
    label: 'Đã chấp nhận',
    styleClass: 'badge badge-success'
  }),
  rejected: Object.freeze({
    code: 'REJECTED',
    label: 'Từ chối',
    styleClass: 'badge badge-danger'
  })
});
