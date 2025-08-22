import {InputProps} from '../../Types/InputProps'
import { forwardRef, InputHTMLAttributes } from 'react'

function Input({ type = 'text', placeholder = '', icon: Icon, optional = false, marginb = 0, width = "", iconPassword: IconPassword, togglePassword,...props}: InputProps & InputHTMLAttributes<HTMLInputElement>,
    ref: React.ForwardedRef<HTMLInputElement>
) {

    return (
        <div className={`relative ${width != "" ? `${width}` : `w-3/4`} `}>
            
            <div className={`w-full relative ${marginb > 0 && `mb-${marginb}`}`}>
                 { Icon && <Icon className="absolute left-3 top-5 -translate-y-1/2 text-gray-400" /> }

                 { IconPassword && <IconPassword className="absolute right-3 top-5 -translate-y-1/2 text-gray-400 cursor-pointer" onClick={togglePassword}/> }

                 <input ref={ref} type={type} placeholder={placeholder} className="input-default responsive-text" {...props}/>

                {optional && <span className='text-gray-400 text-sm absolute top-12 left-2'>Optional</span>}
            </div>

        </div>
  )
}

export default forwardRef(Input)
