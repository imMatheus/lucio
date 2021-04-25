import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
    const containerRef = useRef(null)
    var titles = containerRef?.current?.innerText

    let currentIndex = 0

    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!"#€$%&/|()=?+-*0123456789'

    function randomLetter() {
        var lettersArray = possible.split('')
        var letter = lettersArray[Math.floor(Math.random() * lettersArray.length)]
        return letter
    }

    function changeIndex() {
        if (currentIndex === titles.length - 1) {
            currentIndex = 0
        } else {
            currentIndex++
        }
    }

    function randomString(len) {
        var string = ''
        for (var i = 0; i < len; i++) {
            string += randomLetter()
        }
        return string
    }

    function getTitle(len) {
        var string = ''
        for (var i = 0; i < len; i++) {
            string += titles[i]
        }
        return string
    }

    function adjustLetters(title) {
        var currentPosition = 0
        changeIndex()
        var title = titles
        for (var i = 0, len = title.length; i <= len; i++) {
            constructTitle(title, i)
        }
    }

    function constructTitle(title, index) {
        setTimeout(function () {
            var rand = randomString(title.length - index)
            var merged = getTitle(index) + rand
            containerRef.current.innerHTML = merged
        }, index * 120)
    }

    useEffect(() => {
        adjustLetters()
    }, [adjustLetters, containerRef])
    return (
        <div className='homepage'>
            <div className='herobanner'>
                <h1 ref={containerRef}>LucioCode</h1>
                <div className='buttons'>
                    <Link to='/problems'>
                        <div className='outline-btn'>Algos</div>
                    </Link>
                    <Link to='/css/problems'>
                        <div className='outline-btn'>Css Arena</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HomePage
