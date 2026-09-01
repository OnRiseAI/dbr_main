// Third-party Imports
import {
  BoxIcon,
  UserIcon,
  LayoutListIcon,
  DollarSignIcon,
  BusIcon,
  UsersIcon,
  AwardIcon,
  PhoneIcon,
  type LucideIcon
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  box: BoxIcon,
  user: UserIcon,
  notebook: LayoutListIcon,
  dollar: DollarSignIcon,
  truck: BusIcon,
  users: UsersIcon,
  award: AwardIcon,
  phone: PhoneIcon
}

export const getIcon = (iconName: string): LucideIcon => {
  return iconMap[iconName] || BoxIcon
}
