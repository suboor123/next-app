import React from 'react'

const TodoCss = () => {
  return (
    <>
    <style global jsx>{`
    .float-right {
        float: right;
    }

    .head-wrp {
        display: block;
        height: 50px
    }

    .panel-body {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        padding: 0
    }

    .panel-body span {
        border-left: 0.1px solid rgba(128, 128, 128, 0.305);
        padding: 10px 20px;
    }

    .panel-body span:first-child {
        border: none;
    }
    
    `}</style>
    </>
  )
}

export default TodoCss