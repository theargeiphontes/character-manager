$(document).ready( function() {
  $('.editChar').on('click', function() {
    $('.edit').prop('disabled', false);
    $('.hide').show(); 
  });
  $('.saveCharForm').submit(function(){
    var inputStats = $('input[type=\'number\']');
    var charId = $('input[name=\'charId\'');
    var stats = {};
    inputStats.each( function() {
      stats[this.name] = this.value;
    });
    $.ajax({
      url: '/pathfinder/character/save',
      type: 'POST',
      data : { stats: stats, charId: charId },
      success: function(){
        console.log('saveCharForm submitted.');
      },
      failure: function(){
        console.log('saveCharForm failed.');
      }
    });
  });
});