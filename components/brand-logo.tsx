export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-semibold tracking-tight ${className}`} aria-label="Brbnb">
      <span className="text-foreground">Br</span>
      <span className="text-primary">bnb</span>
    </span>
  )
}
