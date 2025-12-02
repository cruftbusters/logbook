import { FlexColumn, FlexRow } from './FlexList'
import { Logbook } from './types'

export function Visualizer({ logbook }: { logbook: Logbook }) {
  return (
    <FlexColumn>
      <FlexRow>
        <h3 style={{ flex: '1' }}>visualizer</h3>
      </FlexRow>
      <FlexRow>
        <div
          style={{
            display: 'grid',
            gap: 'inherit',
            gridTemplateColumns: `repeat(${logbook.sheet[0].length}, auto)`,
            flex: '1',
          }}
        >
          {logbook.sheet.map((row, i) => (
            <div
              key={i}
              style={{
                gridColumn: '1/-1',
                display: 'grid',
                gap: 'inherit',
                gridTemplateColumns: 'subgrid',
              }}
            >
              {row.map((text, j) => (
                <div key={j}>{text}</div>
              ))}
            </div>
          ))}
        </div>
      </FlexRow>
    </FlexColumn>
  )
}
