import { Sparkles } from '@phosphor-icons/react'

const LogoGenie = ({ size = 'md', showText = true, className = '' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  }

  return (
    <div className={`logo-container flex items-center gap-3 cursor-pointer ${className}`}>
      {/* Genie Icon with magical sparkle effect */}
      <div className="relative">
        <div className={`genie-logo ${sizeClasses[size]} bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white shadow-lg`}>
          <Sparkles weight="fill" className="w-1/2 h-1/2" />
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
      </div>
      
      {/* App Name */}
      {showText && (
        <span className={`logo-text font-bold ${textSizeClasses[size]} text-primary transition-all duration-300`}>
          Travel Genie
        </span>
      )}
    </div>
  )
}

export default LogoGenie