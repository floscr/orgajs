import { parse } from '../parse'
import { tokenize } from '../lexer'
import { map, dump } from '../node'
import { map as locate } from '../position'
import { inspect } from 'util'

const debug = (text: string, tree) => {
  const { substring } = locate(text)
  const data = map(node => ({
    raw: substring(node.position),
    data: node.data,
  }))(tree)
  console.log(inspect(data, false, null, true))
  // console.log(dump(text)(tree).join('\n'))
}

describe('Parser', () => {
  it('works', () => {
//     const content = `
// #+TITLE: hello world
// #+TODO: TODO NEXT | DONE
// #+DATE: 2018-01-01

// * TODO [#A] headline one
// DEADLINE: <2018-01-01 Mon>
// :PROPERTIES:
// key: value
// key: value
// :END:

// [[https://github.com/xiaoxinghu/orgajs][Here's]] to the *crazy* ones, the /misfits/, the _rebels_, the ~troublemakers~,
// the round pegs in the +round+ square holes...

// * DONE level1 headline :tag1:tag2:
// some content
// ** level 2 headline
// some other content
// `

    const content = `
* DONE level1 headline :tag1:tag2:

[[https://github.com/xiaoxinghu/orgajs][Here's]] some content
hello world

another paragraph here
** level 2 headline
some other content
`
    // const thing = parse(tokenize(content))
    const lexer = tokenize(content)

    const tree = parse(tokenize(content))
    // debug(content, tree)
  })

  it('can handle nested headlines', () => {
    const content = `
* #HEADLINE# 1
Paragraph
** #HEADLINE# 1.1
*** #HEADLINE# 1.1.1
content

** #HEADLINE# 1.2
* #HEADLINE# 2
** #HEADLINE# 2.2
`
    const tree = parse(tokenize(content))
    // debug(content, tree)
    expect(tree).toMatchSnapshot()

  })

  // list
  it('can handle unordered list', () => {
    const content = `
- apple
  1. green apple
  - red apple
- banana
- orange
`
    const lexer = tokenize(content)
    const tree = parse(lexer)

    debug(content, tree)
    // console.log(inspect(lexer.all(), false, null, true))
  })
})