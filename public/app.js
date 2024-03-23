document.addEventListener('DOMContentLoaded', () => {
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
});
