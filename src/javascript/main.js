$(document).ready( function() {
  $('.editChar').on('click', function() {
    $('.edit').prop('disabled', false); 
  });
  $('.saveCharForm').submit(function(){
    var inputStats = $('input[type=\'number\']');
    var stats = {};
    inputStats.each( function() {
      stats[this.name] = this.value;
    });
    $.ajax({
      url: '/pathfinder/character/save',
      type: 'POST',
      data : stats,
      success: function(){
        console.log('saveCharForm submitted.');
      },
      failure: function(){
        console.log('saveCharForm failed.');
      }
    });
  });
});