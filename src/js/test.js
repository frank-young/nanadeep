'use strict'
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

$(function () {
  $('[data-toggle="popover"]').popover()
})

function copyText() {
    var clipboard = new Clipboard('.btn-copy');
    clipboard.on('success', function(e) {
        console.info('Action:', e.action);
        e.clearSelection();
    });
}

