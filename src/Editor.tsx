import { useState } from 'react'
import { FlexColumn, FlexRow } from './FlexList'
import { Logbook, Sheet } from './types'

export function Editor({
  logbook,
  onsheetchange,
}: {
  logbook: Logbook
  onsheetchange: (sheet: Sheet) => void
}) {
  function toText(sheet: Sheet) {
    return sheet.map((row) => row.join(',')).join('\n')
  }

  function fromText(text: string) {
    return text.split('\n').map((text) => text.split(','))
  }

  const [text, setText] = useState(() => toText(logbook.sheet))

  return (
    <FlexColumn>
      <FlexRow>
        <h3 style={{ flex: '1' }}>editor</h3>
      </FlexRow>
      <FlexRow>
        <textarea
          style={{ flex: '1' }}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </FlexRow>
      <FlexRow>
        <button
          onClick={() => onsheetchange(fromText(text))}
          style={{ flex: '1' }}
        >
          save
        </button>
      </FlexRow>
    </FlexColumn>
  )
}
