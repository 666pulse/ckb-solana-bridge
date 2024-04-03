import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const Footer = () => {
  return (
    <>
      <span className="text-muted-foreground font-black text-2xl flex items-center justify-center mb-6">
        Made by
      </span>
      <div className="flex items-center justify-center gap-32">
        <div className="flex flex-col items-center justify-center gap-1">
          <Avatar className="h-14 w-14">
            <AvatarImage src="/logic.jpg" alt="Logic" />
            <AvatarFallback>Lo</AvatarFallback>
          </Avatar>
          <span className="text-muted-foreground font-bold">Logic</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <Avatar className="h-14 w-14">
            <AvatarImage src="/wuyi.jpg" alt="Logic" />
            <AvatarFallback>WY</AvatarFallback>
          </Avatar>
          <span className="text-muted-foreground font-bold">毋意</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <Avatar className="h-14 w-14">
            <AvatarImage src="/shooter.jpg" alt="Logic" />
            <AvatarFallback>SH</AvatarFallback>
          </Avatar>
          <span className="text-muted-foreground font-bold">Shooter</span>
        </div>
      </div>
    </>
  )
}
