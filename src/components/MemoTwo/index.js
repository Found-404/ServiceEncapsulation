import { Button } from 'antd'
import React, { memo, useState, useMemo, useCallback } from 'react'


const Children = memo((props) => {
    const { toChild, num } = props
    console.log('子组件num', num);

    return <div onClick={() => toChild(num)}>children---{num}</div>
})




const MemoTwo = () => {
    const [num, setnum] = useState(0)
    const [name, setName] = useState('count')


    const memoCount3 = useMemo(() => {
        // return parseInt(Math.random() * 10) * num;
        return num
    }, [name]);


    const toChild = useCallback((num) => {
        console.log('去子组件', num)
    }, [])
    // const toChild = (num) => {
    //     console.log('去子组件', num)
    // }



    return (
        <div>
            <h4>{num}</h4>
            <p>father---{parseInt(Math.random() * 10)}</p>
            <Children num={memoCount3} toChild={toChild} />
            <Button onClick={() => {
                setnum(num + 1)
                if (num > 5) {
                    setName('countTwo')
                }
            }}>重新Render{num}</Button>
        </div>
    )
}

export default MemoTwo
