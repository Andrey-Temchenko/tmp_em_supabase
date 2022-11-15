import toastr from 'toastr';

export default {
  showMessage,
  showWarning,
  showError
};

toastr.options.positionClass = 'toast-bottom-left';

function showMessage(message: string) {
  toastr.success(message);
}

function showWarning(warning: string) {
  toastr.warning(warning);
}

function showError(error: string) {
  toastr.error(error);
}
