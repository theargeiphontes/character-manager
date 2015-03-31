$(document).ready(function() {
  $('body').on('click', '.editChar', function() {
    console.log('edit onclick');
    $.get('/pathfinder/edit', this.character, function () {
      console.log('edit get');
      console.log('char: ' + this.character);
      
    });
  });
});