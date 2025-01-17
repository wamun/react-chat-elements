import React, { Key, useState } from 'react'
import './ChatItem.css'

import Avatar from '../Avatar/Avatar'

import { format } from 'timeago.js'

import classNames from 'classnames'

import { MdVideoCall, MdVolumeOff, MdVolumeUp } from 'react-icons/md'
import { IChatItemProps } from '../type'

const ChatItem: React.FC<IChatItemProps> = ({
  avatarFlexible = false,
  date = new Date(),
  unread = 0,
  statusColorType = 'badge',
  lazyLoadingImage = undefined,
  onAvatarError = () => void 0,
  ...props
}) => {
  const [onHoverTool, setOnHoverTool] = useState(false)
  const [onDrag, setOnDrag] = useState(false)

  const handleOnMouseEnter = () => {
    setOnHoverTool(true)
  }

  const handleOnMouseLeave = () => {
    setOnHoverTool(false)
  }

  const handleOnClick = (e: React.MouseEvent) => {
    e.preventDefault()

    if (onHoverTool === true) return

    props.onClick?.(e)
  }

  const onDragOver = (e: React.MouseEvent) => {
    e.preventDefault()
    if (props.onDragOver instanceof Function) props.onDragOver(e, props.id)
  }

  const onDragEnter = (e: React.MouseEvent) => {
    e.preventDefault()
    if (props.onDragEnter instanceof Function) props.onDragEnter(e, props.id)
    if (!onDrag) setOnDrag(true)
  }

  const onDragLeave = (e: React.MouseEvent) => {
    e.preventDefault()
    if (props.onDragLeave instanceof Function) props.onDragLeave(e, props.id)
    if (onDrag) setOnDrag(false)
  }

  const onDrop = (e: React.MouseEvent) => {
    e.preventDefault()
    if (props.onDrop instanceof Function) props.onDrop(e, props.id)
    if (onDrag) setOnDrag(false)
  }

  return (
    <div
      key={props.id as Key}
      className={props.selected ? 'rce-container-citem-active':'rce-container-citem'}
      onClick={handleOnClick}
      onContextMenu={props.onContextMenu}
    >
      <div className={'rce-citem-cs-number'}>
          Case: {props.case_number} · {props.isMember === '1' && <span>{'Member · '}{props.memberCateg}{' · '}{props.country}</span>}
      </div>
      <div className={props.selected ? 'rce-citem-active':'rce-citem'} onDragOver={onDragOver} onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDrop={onDrop}>
        {!!props.onDragComponent && onDrag && props.onDragComponent(props.id)}
        {((onDrag && !props.onDragComponent) || !onDrag) && [
          <div
            key={'avatar'}
            className={classNames('rce-citem-avatar', { 'rce-citem-status-encircle': statusColorType === 'encircle' })}
          >
            <Avatar
              src={props.avatar}
              alt={props.alt}
              className={statusColorType === 'encircle' ? 'rce-citem-avatar-encircle-status' : ''}
              size='large'
              letterItem={props.letterItem}
              sideElement={
                props.statusColor ? (
                  <span
                    className='rce-citem-status'
                    style={
                      statusColorType === 'encircle'
                        ? {
                            border: `solid 2px ${props.statusColor}`,
                          }
                        : {
                            backgroundColor: props.statusColor,
                          }
                    }
                  >
                    {props.statusText}
                  </span>
                ) : (
                  <></>
                )
              }
              onError={onAvatarError}
              lazyLoadingImage={lazyLoadingImage}
              type={classNames('circle', { 'flexible': avatarFlexible })}
            />
          </div>,
          <div key={'rce-citem-body'} className='rce-citem-body'>
            <div className='rce-citem-body--top'>
              <div className='rce-citem-body--top-title'>{props.title}</div>
              <div className='rce-citem-body--top-time'>{date && (props.dateString || format(date))}</div>
            </div>

            <div className='rce-citem-body--bottom'>
              <div className='rce-citem-body--bottom-title'>{props.subtitle}</div>
              <div className='rce-citem-body--bottom-tools' onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
                {props.showMute && (
                  <div className='rce-citem-body--bottom-tools-item' onClick={props.onClickMute}>
                    {props.muted === true && <MdVolumeOff />}
                    {props.muted === false && <MdVolumeUp />}
                  </div>
                )}
                {props.showVideoCall && (
                  <div className='rce-citem-body--bottom-tools-item' onClick={props.onClickVideoCall}>
                    <MdVideoCall />
                  </div>
                )}
              </div>
              <div className='rce-citem-body--bottom-tools-item-hidden-hover'>
                {props.showMute && props.muted && (
                  <div className='rce-citem-body--bottom-tools-item'>
                    <MdVolumeOff />
                  </div>
                )}
              </div>
              <div className='rce-citem-body--bottom-status'>{unread && unread > 0 ? <span>{unread}</span> : null}</div>
              {props.customStatusComponents !== undefined ? props.customStatusComponents.map(Item => <Item />) : null}
            </div>
          </div>,
        ]}
      </div>
      <div className={props.selected ? 'rce-citem-low-active':'rce-citem-low'}>
          <div className={`rce-citem-low-col rce-citem-low-col-type-default`}>{props.case_type}</div>
          <div className={`rce-citem-low-col rce-citem-low-col-categ-default`}>{props.category}</div>
          {props.severity === 'Low' && <div className={`rce-citem-low-col rce-citem-low-col-low`}>{props.severity}</div>}
          {props.severity === 'Mid' && <div className={`rce-citem-low-col rce-citem-low-col-mid`}>{props.severity}</div>}
          {props.severity === 'Hi' && <div className={`rce-citem-low-col rce-citem-low-col-hi`}>{props.severity}</div>}
          {(props.status === 'Debyoo' || props.status === 'debyoo_action_waited') && <div className={`rce-citem-low-col rce-citem-low-col-action-debyoo`}>{props.status}</div>}
          {(props.status === 'User' || props.status === 'user_action_waited') && <div className={`rce-citem-low-col rce-citem-low-col-action-user`}>{props.status}</div>}
          
          {props.incharge === true && <div className={`rce-citem-low-col rce-citem-low-col-tac`}>{'TAC'}</div>}
          {props.inchargelocked === true && <div className={`rce-citem-low-col rce-citem-low-col-lck`}>{'LCK'}</div>}
      </div>
    </div>
  )
}

export default ChatItem
