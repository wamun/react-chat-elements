import React from 'react'
import { format } from 'timeago.js'
import './SystemMessage.css'

import classNames from 'classnames'
import { ISystemMessageProps } from '../type'

const SystemMessage: React.FC<ISystemMessageProps> = props => {
  return (
    <div className={classNames('rce-container-smsg', props.className)}>
      {(props.text.indexOf('closed') > -1 || props.text.indexOf('clôturé') > -1) &&
        <div className='rce-smsg-red'>
          <div className='rce-smsg-text'>{props.text}</div>
          <div className='rce-smsg-time'>
           {format(props.date)}
         </div>
        </div>    
      }
      {(props.text.indexOf('opened') > -1 || props.text.indexOf('ouvert') > -1) &&
        <div className='rce-smsg-green'>
          <div className='rce-smsg-text'>{props.text}</div>
          <div className='rce-smsg-time'>
           {format(props.date)}
         </div>
        </div>    
      }
      {props.text.indexOf('connect') > -1 &&
        <div className='rce-smsg-yellow'>
          <div className='rce-smsg-text'>{props.text}</div>
          <div className='rce-smsg-time'>
           {format(props.date)}
         </div>
        </div>    
      }
      {props.text.indexOf('closed') < 0 && props.text.indexOf('clôturé') < 0 &&
       props.text.indexOf('opened') < 0 && props.text.indexOf('ouvert') < 0 &&
       props.text.indexOf('connect') < 0 &&
        <div className='rce-smsg'>
         <div className='rce-smsg-text'>{props.text}</div>
         <div className='rce-smsg-time'>
           {format(props.date)}
         </div>
        </div>
       }
       
    </div>
  )
}

export default SystemMessage
