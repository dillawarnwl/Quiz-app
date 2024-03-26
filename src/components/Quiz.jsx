import React, { useState, useRef, useEffect } from 'react'
import './Quiz.css'
import { data } from '../assets/data'

export const Quiz = () => {
    const [index, setIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [result, setResult] = useState(false)
    const [lock, setLock] = useState(false)
    const [question, setQuestion] = useState(data[index])
    const optionsRef = useRef([])

    useEffect(() => {
        setQuestion(data[index])
        clearClasses()
    }, [index])

    const checkAnswer = (e) => {
        if (!lock) {
            setLock(true)
            if (e.target.innerText === question.answer) {
                setScore(score + 1)
                e.target.classList.add('correct')
            } else {
                e.target.classList.add('wrong')
                optionsRef.current.find(option => option.innerText === question.answer)?.classList.add('correct');
            }
        }
    }

    const clearClasses = () => {
        optionsRef.current.forEach(option => {
            option.classList.remove('correct')
            option.classList.remove('wrong')
        })
    }

    const questionHandler = () => {
        if (index === data.length - 1) {
            setResult(true)
        }
        if (lock) {
            if (index < data.length - 1) {
                setIndex(index + 1)
                setLock(false)
            }
        }
    }

    const resetHandler = () => {
        setIndex(0);
        setLock(false);
        setQuestion(data[0]);
        setResult(false);
        setScore(0)
    }

    return (
        <div className='container'>
            {result ? <>
                <h1>Result</h1>
                <hr />
                <h2>Your Scored {score} out of {data.length}</h2>
                <button onClick={resetHandler}>Reset</button>
            </> :
                <>
                    <h1>Quiz</h1>
                    <hr />
                    <h2>{index + 1}. {question.question}</h2>
                    <ul>
                        {question.options.map((option, i) => (
                            <li key={i} ref={el => optionsRef.current[i] = el} onClick={checkAnswer}>{option}</li>
                        ))}
                    </ul>
                    <button onClick={questionHandler}>Next</button>
                    <div className="index">{index + 1} of {data.length} questions</div>
                </>}

        </div>
    )
}
