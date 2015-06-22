$(document).ready( function() {
  $('.editChar').on('click', function() {
    $('.edit').prop('disabled', false);
    $('.hide').show(); 
  });
  $('.saveCharForm').submit(function(ev){
    console.log('save form');
    var inputStats = $('input[type=\'number\']');
    var charId = $('input[name=\'charId\'').val();
    var stats = {};
    console.log('declare vars');
    inputStats.each( function() {
      stats[this.name] = this.value;
    });
    console.log('before ajax');
    
    $.ajax({
      url: '/pathfinder/character/save',
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

    console.log('after ajax');
    ev.preventDefault();
  });
});