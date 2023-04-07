import React from 'react'
import styles from './Tag.module.css';

type Props = {
    children: React.ReactNode;
}

const Badge = (props: Props) => {
  return (
    <span className={styles.tag}>{props.children}</span>
  )
}

export default Badge