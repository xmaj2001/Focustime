import { BookOpen, Coffee, Bed, Home, Briefcase, Dumbbell, Users, MoreHorizontal } from 'lucide-react';
import { Task } from '../App';

type CategoryIconProps = {
  category: Task['category'];
  size?: number;
  isActive?: boolean;
};

export function CategoryIcon({ category, size = 24, isActive = false }: CategoryIconProps) {
  const iconProps = {
    size,
    className: isActive ? 'text-white' : 'text-current',
    strokeWidth: 2,
  };

  switch (category) {
    case 'study':
      return <BookOpen {...iconProps} />;
    case 'food':
      return <Coffee {...iconProps} />;
    case 'rest':
      return <Bed {...iconProps} />;
    case 'chores':
      return <Home {...iconProps} />;
    case 'work':
      return <Briefcase {...iconProps} />;
    case 'fitness':
      return <Dumbbell {...iconProps} />;
    case 'social':
      return <Users {...iconProps} />;
    case 'other':
      return <MoreHorizontal {...iconProps} />;
    default:
      return <MoreHorizontal {...iconProps} />;
  }
}
