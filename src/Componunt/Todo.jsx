import React, { useState, useEffect } from 'react'
import('./todo.css')

const getLocalItems = () => {
    let localList = localStorage.getItem('list');
    // console.log(localList)
    if (localList) {
        return JSON.parse(localStorage.getItem('list'));
    } else {
        return []
    }
}
const Todo = () => {

    // const arr = []
    const [text, setText] = useState('')
    const [btn, setBtn] = useState(getLocalItems())
    const [toggle, setToggle] = useState(true)
    const [editItems, setEditItems] = useState(null)

    const Inputevent = (e) => {
        setText(e.target.value);
    }
    const btnClick = () => {
        if (!text) {
            alert('please fill the data');
        } else if (text && !toggle) {
            setBtn(
                btn.map((ele) => {
                    if (ele.id === editItems) {
                        return { ...ele, name: text }
                    }
                    return ele
                })
            )
            setText('')
            setToggle(true)
            setEditItems(null);

        } else {
            const allInputData = { id: new Date().getTime().toString(), name: text }
            setBtn([...btn, allInputData]);
            setText('')
        }
    }

    const del = (id) => {
        // console.log('del',i)
        const updatedItems = btn.filter((item) => {
            return item.id !== id;
        })
        setBtn(updatedItems);
    }

    const edit = (id) => {
        const updatedItems = btn.filter((item) => {
            return id === item.id;
        })
        console.log(updatedItems[0].name)
        setText(updatedItems[0].name)
        setToggle(false)
        setEditItems(id);
    }

    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(btn))
    }, [btn])
    return (
        <div className="container">
            <div className="todo shadow p-2 rounded-2">
                <h1 className='py-3'>To Do List</h1>
                <div className="input">
                    <input value={text} onChange={Inputevent} type="text" placeholder='Enter list here...' />
                    <div className="buttons">
                        {
                            toggle ? <button onClick={btnClick} className="btn btn-primary">+</button>
                                : <button onClick={btnClick} className="btn btn-primary">&#9998;</button>
                        }
                    </div>
                </div>
                <div className="showList">
                    {
                        btn.map((items) => {
                            return <ul className='my-3'>
                                <li>{items.name}</li>
                                <div className="buttonIcon">
                                    <button onClick={() => { edit(items.id) }} className="btn btn-primary">&#9998;</button>
                                    <button onClick={() => { del(items.id) }} className="btn btn-primary mx-2">&#9747;</button>
                                </div>
                            </ul>
                        })
                    }

                </div>
            </div>
        </div>
    )
}

export default Todo