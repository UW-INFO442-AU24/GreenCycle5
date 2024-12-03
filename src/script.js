document.querySelectorAll('.flashcard').forEach(card => {
    card.addEventListener('click', () => {
        const cardInner = card.querySelector('.flashcard-inner');
        cardInner.classList.toggle('flipped');
    });
});