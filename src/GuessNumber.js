import React from 'react';
import './GuessNumber.css';

class GuessNumber extends React.Component {
    guessInput = React.createRef();
    guessBtn = React.createRef();
    msg1 = React.createRef();
    msg2 = React.createRef();
    msg3 = React.createRef();

    answer = Math.floor(Math.random() * 30) + 1;
    no_of_guesses = 0;
    guesses_num = [];
    lives = 10;

    componentDidMount() {
        this.guessBtn.current.addEventListener('click', this.play);
        this.guessInput.current.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                this.play();
            }
        });
    }

    play = () => {
        const user_guess = parseInt(this.guessInput.current.value);
        if (user_guess < 1 || user_guess > 30) {
            alert("Пожалуйста, введите число от 1 до 30");
        } else {
            this.guesses_num.push(user_guess);
            this.no_of_guesses += 1;

            if (this.lives === 1) {
                this.msg1.current.textContent = "Игра окончена!!!";
                this.msg2.current.textContent = "Загаданное число: " + this.answer;
                this.msg3.current.textContent = "Ваши предположения: " + this.guesses_num.join(', ');
                document.querySelector("#lives").innerText = "Осталось жизней: 0";
            }

            if (this.lives !== 1) {
                if (user_guess < this.answer) {
                    this.lives -= 1;
                    this.msg1.current.textContent = "Ой, неправильно! Ваше число слишком маленькое.";
                    this.msg2.current.textContent = "Количество попыток: " + this.no_of_guesses;
                    this.msg3.current.textContent = "Ваши предположения: " + this.guesses_num.join(', ');
                    document.querySelector("#lives").innerText = "Осталось жизней: " + this.lives;
                } else if (user_guess > this.answer) {
                    this.lives -= 1;
                    this.msg1.current.textContent = "Ой, неправильно! Ваше число слишком большое.";
                    this.msg2.current.textContent = "Количество попыток: " + this.no_of_guesses;
                    this.msg3.current.textContent = "Ваши предположения: " + this.guesses_num.join(', ');
                    document.querySelector("#lives").innerText = "Осталось жизней: " + this.lives;
                } else if (user_guess === this.answer) {
                    this.msg1.current.textContent = "Ура! Вы угадали!";
                    this.msg2.current.textContent = "Загаданное число: " + this.answer;
                    this.msg3.current.textContent = "Вы угадали за " + this.no_of_guesses + " попыток.";
                }
            }
        }
    };

    render() {
        return (
            <div className='GuessNumber'>
                <section className="box1"></section>
                <section className="box2"></section>

                <div className="container">
                    <h3>Я загадал число от 1 до 30.</h3>
                    <h3>Сможете угадать?</h3>

                    <input type="text" placeholder="Число" id="guess" ref={this.guessInput} /><br />
                    <button id="my_btn" ref={this.guessBtn}>УГАДАТЬ</button>

                    <p id="message1" ref={this.msg1}>Количество попыток: 0</p>
                    <p id="lives">Осталось жизней: 10</p>
                    <p id="message2" ref={this.msg2}>Ваши предположения: нет</p>
                    <p id="message3" ref={this.msg3}></p>
                </div>
            </div>
        );
    }
}

export default GuessNumber;
