import Profile0 from '@/assets/svg/profile.svg?react';
import Profile1 from '@/assets/svg/profile1.svg?react';
import Profile2 from '@/assets/svg/profile2.svg?react';
import Profile3 from '@/assets/svg/profile3.svg?react';
import Profile4 from '@/assets/svg/profile4.svg?react';
import Profile5 from '@/assets/svg/profile5.svg?react';

const PROFILES = [Profile0, Profile1, Profile2, Profile3, Profile4, Profile5];

interface ChatProfileProps {
  memberId: number;
  size?: 'sm' | 'md';
}

export default function ChatProfile({memberId, size = 'md'}: ChatProfileProps) {
  const sizeClass = size === 'sm' ? 'w-7 h-7' : 'w-10 h-10';
  const ProfileImage = PROFILES[memberId % 6];
  return <ProfileImage className={`${sizeClass} rounded-full shrink-0`} />;
}
