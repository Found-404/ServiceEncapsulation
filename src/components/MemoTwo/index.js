import { Button } from 'antd'
import React, { memo, useState, useMemo, useCallback } from 'react'


const Children = memo((props) => {
    console.log('子组件', parseInt(Math.random() * 10));
    return <div>children---{props.num}</div>
})




const MemoTwo = () => {
    const [num, setnum] = useState(0)
    const [name, setName] = useState('count')


    const memoCount3 = useMemo(() => {
        return parseInt(Math.random() * 10) * num;
    }, [name]);


    const toChild = useCallback(() => {
        console.log('去子组件')
    }, [name])



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
            }}>重新Render1</Button>
        </div>
    )
}

export default MemoTwo
