function showError(title, message) {
    showMessage(title, message, 'error');
}
function showMessage(title, message, type) {
    $.toast({
        text: message,
        heading: title, 
        class: type,
        showHideTransition: 'fade',
        allowToastClose: true,
        hideAfter: 5000,
        stack: 20,
        position: 'top-right',
        loader: false
    });
}

export default { showError };