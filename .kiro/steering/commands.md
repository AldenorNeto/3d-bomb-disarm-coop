# Steering: Não Execute Comandos Start

## Regra Importante

**NUNCA execute comandos `start` ou similares para abrir arquivos HTML no navegador.**

O usuário prefere abrir os arquivos manualmente. Após fazer modificações nos arquivos HTML, CSS ou JavaScript, apenas informe que as alterações foram concluídas.

## Comandos Proibidos

- `start index.html`
- `start *.html`
- `executePwsh` com comandos de abertura de navegador
- Qualquer comando que tente abrir arquivos no navegador

## Comandos Recomendados

- `node build.js`

## Comportamento Correto

1. Fazer as modificações solicitadas
2. Verificar erros com `getDiagnostics` se necessário
3. Informar que as alterações foram concluídas
4. buildar o projeto com o comando "node build.js"

