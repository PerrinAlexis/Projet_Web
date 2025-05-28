const correctAnswers = {
    q1: 'b',
    q2: 'c',
    q3: 'a',
    q4: 'd',
    q5: 'a',
    q6: 'c',
    q7: 'b',
    q8: 'd',
    q9: 'c',
    q10: 'a',
    q11: 'b',
    q12: 'c',
    q13: 'a',
    q14: 'd',
    q15: 'b',
    q16: ['a', 'c', 'd'],
    q17: ['a', 'b'],
    q18: ['a', 'd'],
    q19: ['b', 'c'],
    q20: ['b', 'c', 'd']
};

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    arr1.sort();
    arr2.sort();
    return arr1.every((val, index) => val === arr2[index]);
}

function submitQuiz() {
    let score = 0;

    for (let key in correctAnswers) {
        let expected = correctAnswers[key];
        if (Array.isArray(expected)) {
            let selected = Array.from(document.querySelectorAll(`input[name="${key}[]"]:checked`)).map(input => input.value);
            if (arraysEqual(expected, selected)) {
                score++;
            }
        } else {
            let selected = document.querySelector(`input[name="${key}"]:checked`);
            if (selected && selected.value === expected) {
                score++;
            }
        }
    }

    showPopup(score);
}

function showPopup(score) {
    const popup = document.createElement('div');
    popup.className = 'popup';

    const message = score >= 10
        ? "Bravo ! Vous pouvez vous occuper d’un jardin "
        : "Vous devez réessayer pour mieux connaître les plantes ";

    popup.innerHTML = `
        <div class="popup-content">
            <span class="close" onclick="closePopup()">&times;</span>
            <h2>Votre score : ${score} / 20</h2>
            <p>${message}</p>
            <button onclick="restartQuiz()">Recommencer</button>
        </div>
    `;

    document.body.appendChild(popup);
}

function closePopup() {
    const popup = document.querySelector('.popup');
    if (popup) popup.remove();
}

function restartQuiz() {
    document.getElementById('quizForm').reset();
    closePopup();
    window.scrollTo(0, 0);
}

