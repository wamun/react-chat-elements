import React from 'react'
import { format } from 'timeago.js'
import './SystemMessage.css'

import classNames from 'classnames'
import { ISystemMessageProps } from '../type'

const SystemMessage: React.FC<ISystemMessageProps> = props => {
  return (
    <div className={classNames('rce-container-smsg', props.className)}>
      {(props.text === 'closed_this_case' || props.text === 'auto_closed_this_case') &&
        <div className='rce-smsg-red'>
          <div className='rce-smsg-text'>{props.text}</div>
        </div>    
      }
      {(props.text === 'opened_a_case' || props.text === 'reopened_this_case') &&
        <div className='rce-smsg-green'>
          <div className='rce-smsg-text'>{props.text}</div>
        </div>    
      }
      {props.text === 'connected_to_serve_you' &&
        <div className='rce-smsg-yellow'>
          <div className='rce-smsg-text'>{props.text}</div>
        </div>    
      }
      {props.text !== 'closed_this_case' && props.text !== 'auto_closed_this_case' &&
       props.text !== 'opened_a_case' && props.text !== 'reopened_this_case' &&
       props.text !== 'connected_to_serve_you' &&
        <div className='rce-smsg'>
         <div className='rce-smsg-text'>{props.text}</div>
        </div>
       }
       <div className='rce-smsg-time'>
           {format(props.date)}
       </div>
    </div>
  )
}

export default SystemMessage
