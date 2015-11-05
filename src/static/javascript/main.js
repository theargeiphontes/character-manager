$(document).ready( function() {
  $('.editChar').on('click', function() {
    $('.edit').prop('disabled', false);
    $('.hide').show(); 
  });
  $('.saveCharForm').submit(function(ev){
    var inputStats = $('input[type=\'number\']');
    var charId = $('input[name=\'charId\'').val();
    var stats = {};
    inputStats.each( function() {
      stats[this.name] = this.value;
    });
    
    $.ajax({
      url: '/pathfinder/characters/' + charId,
      method: 'POST',
      contentType: 'application/json',
      data : JSON.stringify({ stats: stats, charId: charId }),
      success: function(){
        console.log('saveCharForm submitted.');
      },
      error: function(){
        console.log('saveCharForm failed.');
      }
    });
    ev.preventDefault();
  });
});