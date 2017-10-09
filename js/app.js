// wait for the DOM to finish loading
$(document).ready(function() {
  // all code to manipulate the DOM
  // goes inside this function
  console.log('JS WORKING!');

  // Click action need to be received
  // Need to determine box that is being click
  // Determine the two player sequence
  // Every click will add and display a element to the to the boxes
  // State the winning condition (8 winning conditions all together)
  // State the tie game condition
  // How will the condition be met and recongized

  /**Player data store in below arrays**/
  var playerOne = [];
  var playerTwo = [];

  /**Squence**/
  var sequence = [2, 1];
  $('.box').on('click', function() {
    var currentSlot = [];
    currentSlot.push($(this).attr('id'));
    // TODO: This is a very clever way to check! Nice!
    if (
      currentSlot.every(elem => playerOne.indexOf(elem) > -1) ||
      currentSlot.every(elem => playerTwo.indexOf(elem) > -1)
    ) {
      alert("Spot Already Taken Don't Cheat!");
    } else {
      for (var i = 0; i < sequence.length; i++) {
        sequence.shift();
        if (sequence[i] % 2 !== 0) {
          $(this).append('<img class="center-block" src="./img/x.png">');
          playerOne.push($(this).attr('id'));
          sequence.push(2);
          break;
        } else {
          $(this).append('<img class="center-block" src="./img/O.png">');
          $(this).addClass('taken');
          playerTwo.push($(this).attr('id'));
          sequence.push(1);
          break;
        }
      }
    }
    checkWin();
  });

  /**reset**/
  function reset() {
    $('.box').text(null);
    currentSlot = [];
    playerOne = [];
    playerTwo = [];
    sequence = [2, 1];
  }
  $('#reset').on('click', function() {
    reset();
  });

  //**Winning conidtion**//
  var winning = [
    ['box1', 'box2', 'box3'],
    ['box4', 'box5', 'box6'],
    ['box7', 'box8', 'box9'],
    ['box1', 'box4', 'box7'],
    ['box2', 'box5', 'box8'],
    ['box3', 'box6', 'box9'],
    ['box1', 'box5', 'box9'],
    ['box3', 'box5', 'box7']
  ];

  // TODO: Great work creating a small and effective winning logic! I'm impressed!
  function checkWin() {
    if (playerOne.length >= 3) {
      for (var x = 0; x < winning.length; x++) {
        if (winning[x].every(elem => playerOne.indexOf(elem) > -1)) {
          confirm('Player One Wins!');
          reset();
          break;
        } else if (winning[x].every(elem => playerTwo.indexOf(elem) > -1)) {
          confirm('Player Two Wins!');
          reset();
          break;
        } else if (playerTwo.length >= 4) {
          confirm('AWW Close Game No One Wins!');
          reset();
          break;
        }
      }
    }
  }
});
