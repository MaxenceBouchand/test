import {
  Home,
  ShoppingCart,
  Car,
  HeartPulse,
  Zap,
  PartyPopper,
  Tv,
  ShoppingBag,
  PiggyBank,
  CreditCard,
  Briefcase,
  Gift,
  Plane,
  Dumbbell,
  GraduationCap,
  Baby,
  Dog,
  Coffee,
  Smartphone,
  Wallet,
  Tag,
  type LucideIcon,
} from 'lucide-react'

export const ICON_REGISTRY: Record<string, LucideIcon> = {
  Home,
  ShoppingCart,
  Car,
  HeartPulse,
  Zap,
  PartyPopper,
  Tv,
  ShoppingBag,
  PiggyBank,
  CreditCard,
  Briefcase,
  Gift,
  Plane,
  Dumbbell,
  GraduationCap,
  Baby,
  Dog,
  Coffee,
  Smartphone,
  Wallet,
}

export const ICON_OPTIONS = Object.keys(ICON_REGISTRY)

export function iconFor(name: string): LucideIcon {
  return ICON_REGISTRY[name] ?? Tag
}
