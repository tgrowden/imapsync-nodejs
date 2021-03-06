// IIFE
(function() {
  // shorthand for $(document).ready
  $(function() {
    var socket = io();

    $('#details').on("submit", function(e){
      e.preventDefault();
      var otherArgs = $('#otherArgs').val();
      if (otherArgs.length > 0) {
        otherArgs = otherArgs.split(" ");
      } else {
        otherArgs = false;
      }
      $('#modal').modal('show');
      $('#error-status').hide();

      var Email = {
        from: {
          host: $('#fromHost').val(),
          user: $('#fromEmail').val(),
          password: $('#fromPassword').val(),
          usessl: $('#fromSSL').is(':checked')
        },
        to: {
          host: $('#toHost').val(),
          user: $('#toEmail').val(),
          password: $('#toPassword').val(),
          usessl: $('#toSSL').is(':checked')
        },
        other: {
          dryrun: $('#dryrun').is(':checked'),
          args: otherArgs
        }
      };
      socket.emit('message', Email);
    });
    socket.on('log', function(output) {
//TODO work on formatting
      //var Error = error.split(/\n/);
      $('#logBody').append($('<div style="padding-top: 10px;">').text(output));
      $('#logBody').scrollTop($('#logBody')[0].scrollHeight);
    });
    socket.on('log-error', function(error) {
      $('#logBody').append($('<div style="padding-top: 10px; color: red;">').text(error));
      $('#logBody').scrollTop($('#logBody')[0].scrollHeight);
    });
    socket.on('status', function(status){
      if (status == 'working'){
        $('#status').removeClass('label-success');
        $('#status').addClass('label-primary');
        $('#status').text('Working...');
      } else if (status == "finished") {
        $('#status').removeClass('label-primary');
        $('#status').addClass('label-success');
        $('#status').text('Finished!');
      }
      if (status == 'error') {
        $('#error-status').show();
      }
    });
    $('#modal').on('hidden.bs.modal', function () {
      $('form').trigger('reset');
      $('#logBody').text("");
    });
  });
}());
