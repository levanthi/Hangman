import clsx from 'clsx'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import Overlay from '../Overlay'
import Over from '../Over'
import styles from './display.module.scss'

const listWord = ['code','laptop','computer','infomation','pc','tablet']
function randomWord()
{
    return listWord[Math.floor(Math.random()*listWord.length)]
}
function renderInput(index)
{
    return <span key={index} className={clsx(styles[`hangMan${index+1}`])}></span>
}

function isArrChild(a,b)
{
    let result = true
    if(b.length===0) return false
    a.forEach((item)=>{
        if(b.indexOf(item)<0)
        {
            result =  false
        }
    })
    return result
}

function Display()
{
    const [randomString,setRandomString] = useState(randomWord().split(''))
    const [inputWord,setInputWord] = useState([])
    const [wrongWord,setWrongWord] = useState([])
    const [isOver,setIsOver] = useState(false)
    const payload = useRef({title:'',message:''})

    function playAgain()
    {
        setRandomString(randomWord().split(''))
        setInputWord([])
        setWrongWord([])
        setIsOver(false)
    }

    function handleInput(e)
    {
        if(randomString.indexOf(e.target.value.toLowerCase())<0)
        {
            setWrongWord([e.target.value.toLowerCase(),...wrongWord])
        }
        else{
            if(inputWord.indexOf(e.target.value.toLowerCase())>=0){
            }
            else{
                setInputWord([e.target.value.toLowerCase(),...inputWord])
            }
        }
        e.target.value=''
    }

    useLayoutEffect(()=>{
        if(wrongWord.length===6)
        {
            payload.current.title = 'Unfotunately you lost.'
            payload.current.message= `...the word was: ${randomString.join('')}`
            setIsOver(true)
        }
        if(isArrChild(randomString,inputWord))
        {
            payload.current.title = 'Congratulation! You won!.'
            payload.current.message= ''
            setIsOver(true)
        }
    },[wrongWord.length,inputWord.length])

    useEffect(()=>{
        console.log(randomString)
    },[randomString])

    return <>
        {isOver?<><Overlay/><Over payload={payload.current} playAgain={playAgain} /></>:''}
        <input style={{width:0,height:0,padding:0,border:0}} onBlur={(e)=>e.target.focus()} autoFocus onChange={(e)=>handleInput(e)} />
        <div className={clsx(styles.display)}>
            <div className={clsx(styles.hangMan)}>
                <span className={clsx(styles.cylinder1)}></span>
                <span className={clsx(styles.cylinder2)}></span>
                <span className={clsx(styles.cylinder3)}></span>
                <span className={clsx(styles.cylinder4)}></span>

                <span className={clsx(styles.hangManPart)}>
                    {wrongWord.map((value,index)=>{
                        return renderInput(index)
                    })}
                </span>
            </div>

            <div className={clsx(styles.wrong)}>
                <span>Wrong</span>
                <ul className={clsx(styles.wrongList)}>
                    {wrongWord.map((letter,index)=>{
                        return <li key={index}>{letter}</li>
                    })}
                </ul>
            </div>
        </div>

        <div className={clsx(styles.dispayInput)}>
            <ul className={clsx(styles.listInput)}>
                {
                    randomString.map((letter,index)=>{
                        let li
                        if(inputWord.indexOf(letter)>=0)
                        {
                            li = <li key={index}>{letter}</li>
                        }
                        else{
                            li = <li key={index}> </li>
                        }
                        return li
                    })
                }
            </ul>
        </div>
    </>
}

export default Display
