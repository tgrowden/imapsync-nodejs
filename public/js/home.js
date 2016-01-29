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
      console.log("Email = " + JSON.stringify(Email));
      socket.emit('message', Email);
    });
    socket.on('log', function(output) {
      $('#logBody').append($('<span>').text(JSON.stringify(output)));
    });
  });
}());
