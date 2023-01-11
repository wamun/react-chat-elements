import React from 'react'
import { format } from 'timeago.js'
import './SystemMessage.css'

import classNames from 'classnames'
import { ISystemMessageProps } from '../type'

const SystemMessage: React.FC<ISystemMessageProps> = props => {
  let name, title, fbanswer, rating;
  if (props.text.indexOf('case_closure_notes') > -1)
  {
      let s = JSON.parse(props.text);
      name = s.name;
      title = `${name} sent Closure Notes`;
      fbanswer = s.fbanswer;
      rating = s.rating;
  }
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
      {props.text.indexOf('case_closure_notes') > -1 &&
        <div className='rce-smsg'>
            <div className='rce-smsg-text'>{title}</div>
            
            <div className='rce-smsg-text mrgtop-10'>{`Please let us know if we helped resolve your issue:`}</div>
                  
           {fbanswer === 'Yes' && <div className='rce-smsg-text-green mrgtop-5'>{`YES`}</div>}
           {fbanswer === 'No' && <div className='rce-smsg-text-red mrgtop-5'>{`NO`}</div>}
           {fbanswer !== 'No' && fbanswer !== 'Yes' && <div className='rce-smsg-text mrgtop-5'>{`-`}</div>}
                  
            <div className='rce-smsg-text mrgtop-10'>{`Rate this correspondence from 1 to 5 stars:`}</div>
                  
            {rating < 1 && <div className='rce-smsg-text mrgtop-5'>{`-`}</div>}
            {rating > 0 && <div className='rce-smsg-text mrgtop-5'>{rating}</div>}
        </div>    
      }
      {props.text.indexOf('closed') < 0 && props.text.indexOf('clôturé') < 0 &&
       props.text.indexOf('opened') < 0 && props.text.indexOf('ouvert') < 0 &&
       props.text.indexOf('connect') < 0 && props.text.indexOf('case_closure_notes') < 0 &&
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
