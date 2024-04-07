import * as tm from 'vscode-textmate'
import { AnnotatedLine } from './model'
import { parseSnap, renderSnap } from './parsing'

export { parseSnap, renderSnap, AnnotatedLine }

export async function getVSCodeTokens(registry: tm.Registry, scope: string, source: string): Promise<AnnotatedLine[]> {
  return registry.loadGrammar(scope).then((grammar: tm.IGrammar | null) => {
    if (!grammar) {
      throw new Error(`Could not load scope ${scope}`)
    }

    let ruleStack: tm.IState | undefined

    return source.split(/\r\n|\n/).map((line: string, n: number) => {
      var { tokens, ruleStack: ruleStack1 } = grammar.tokenizeLine(line, ruleStack)
      ruleStack = ruleStack1

      return <AnnotatedLine>{
        src: line,
        tokens: tokens
      }
    })
  })
}
