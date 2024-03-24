document.addEventListener('DOMContentLoaded', () => {
    // Set default values
    document.getElementById('lichessUsername').value = 'Jrjrjr4'; 
    document.getElementById('lichessStudyUrl').value = 'https://lichess.org/study/bve0Qw48'; 

    const form = document.getElementById('repertoireForm');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the form from submitting in the traditional way

        const lichessUsername = document.getElementById('lichessUsername').value;
        const lichessStudyUrl = document.getElementById('lichessStudyUrl').value;

        console.log('Lichess Username:', lichessUsername);
        console.log('Lichess Study URL:', lichessStudyUrl);

        // Here, you would typically make an API request to your backend to analyze the repertoire
        // For now, just log the values
    });

     // Initialize the chessboard
     const boardConfig = {
        draggable: true,
        dropOffBoard: 'snapback', // snap pieces back to their original position if they are dropped off the board
        position: 'start' // start the board in the initial position
    };
    const board = Chessboard('myBoard', boardConfig);

    // If you want to interact with the chessboard after submitting the form, you can do so here
    // For example, to reset the board to the start position after form submission:
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the form from submitting in the traditional way
        // Your existing form handling code...

        // Reset the board to the start position or handle as necessary
        board.position('start');
    });
});
