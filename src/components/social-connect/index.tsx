import { Profile } from '@/types/types';
import React from 'react'
import { BsGithub, BsLinkedin, BsInstagram } from 'react-icons/bs';
import styles from './style.module.css';

type Props = {
  size?: number;
  profile: Profile
}

const SocialConnect = ({
   size = 15,
   profile
}: Props) => {
  const navigateTo = (url: string) => {
    window.location.href = url;
  }
  return (
    <div className={styles.wrpr}>
        <BsGithub className={styles.ico} onClick={() => navigateTo(profile.social.githubUrl!)} style={{fontSize: `${size}px`}} />
        <BsLinkedin className={styles.ico} onClick={() => navigateTo(profile.social.linkedInUrl!)} style={{fontSize: `${size}px`}} />
        <BsInstagram className={styles.ico} onClick={() => navigateTo(profile.social.instagramUrl!)} style={{fontSize: `${size}px`}} />
    </div>
  )
}

export default SocialConnect