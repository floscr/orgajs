import { Reader } from '../reader'

interface Props {
  reader: Reader;
}

export default ({ reader }: Props) : Token[] => {
  const { match, eat } = reader

  let m = match(/^\s*#\+begin_([^\s]+)\s*(.*)$/i)
  if (m) {
    eat('line')
    const params = m.captures[2].split(' ').map(p => p.trim()).filter(String)
    return [{
      name: 'block.begin',
      data: { type: m.captures[1], params },
      position: m.position,
    }]
  }

  m = match(/^\s*#\+end_([^\s]+)$/i)
  if (m) {
    eat('line')
    return [{
      name: 'block.end',
      data: { type: m.captures[1] },
      position: m.position,
    }]
  }

  return []
}
