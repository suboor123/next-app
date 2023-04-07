import React from 'react'
import styles from './Heading.module.css'

type Props = {
    children: React.ReactNode;
}

const Heading = ({ children, ...props }: Props) => {
  return (
    <h2 className={styles.heading} {...props}>{children}</h2>
  )
}

export default Heading