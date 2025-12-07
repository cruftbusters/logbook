import { PropsWithChildren, CSSProperties } from 'react'

export function FlexColumn({
  children,
  style,
}: PropsWithChildren & { style?: CSSProperties }) {
  return (
    <div
      style={{
        gap: 'inherit',
        ...style,
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>
  )
}
export function FlexRow({
  style,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  const display = props.hidden ? undefined : 'flex'
  return (
    <div
      style={{
        display,
        gap: 'inherit',
        justifyContent: 'center',
        ...style,
      }}
      {...props}
    />
  )
}

export function List({ children }: PropsWithChildren) {
  return (
    <ul
      style={{
        margin: '0',
        padding: '0',
        flex: '1',
        display: 'block',
        gap: 'inherit',
      }}
    >
      {children}
    </ul>
  )
}

export function ListItem({ children }: PropsWithChildren) {
  return (
    <li style={{ flex: '1', display: 'block', gap: 'inherit' }}>{children}</li>
  )
}
