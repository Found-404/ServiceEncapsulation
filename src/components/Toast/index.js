import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"

import './index.scss'

const Modal = (props) => {  // 第一次渲染dom 走生命周期  还会在渲染拿值
    // console.log(props, 1114)
    const [target, setTarget] = useState(null)
    // console.log(target, 1111, target)
    useEffect(() => {
        // console.log(1, document.getElementById("modal-root"))
        setTarget(document.querySelector('body'))
    }, [])


    useEffect(() => {
        // console.log("show change", props.show)
    }, [props.show])

    if (!props.show) return null  // false 就返回null

    const close = () => {
        console.log("modal close")
        props.onClose()
    }
    const modal = (
        <div className="modal">
            <div className="mark"></div>
            <div className="modal-wrap">
                Modal
                <button onClick={close}>关闭</button>
            </div>
        </div>
    )
    // console.log("Modal", children, target)
    // target 一拿到dom 就会添加一个dom 到 target
    return target ? ReactDOM.createPortal(modal, target) : <div>无父元素</div>
}


const C = () => {
    const [show, setShow] = useState(false)
    const onClose = () => {
        console.log("C onClose")
        setShow(false)
    }
    return (
        <div>
            <Modal show={show} onClose={onClose} />
            <button onClick={() => setShow((i) => !i)}>打开/关闭Modal</button>
        </div>
    )
}


const Toast = () => {
    return (
        <div>
            <C />
        </div>
    )
}

export default Toast
