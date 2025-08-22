import React from 'react'
import {ButtonProps} from '../../Types/ButtonProps'

function Button({text}:ButtonProps) {
  return (
      <button className="h-12 w-3/4 p-4 button-default center-horizontal responsive-text">
        {text}
    </button>
  )
}

export default Button
