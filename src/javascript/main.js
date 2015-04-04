$(document).ready( function() {
  $('.editChar').on('click', function() {
    $('.edit').prop('disabled', false); 
  });
  $('.saveCharButton').on('click', function () {  
    var inputStats = $('input[type=\'number\']');
    var stats = {};
    inputStats.each( function() {
      stats[this.name] = this.value;
    });
    $('.saveCharForm').submit(function(){
      $.ajaxForm({
        url: 'http://localhost:3000/pathfinder/character/save',
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
  console.log('halp');
});