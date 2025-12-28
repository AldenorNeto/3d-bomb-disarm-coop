# Steering: Não Execute Comandos Start

## Regra Importante

**NUNCA execute comandos `start` ou similares para abrir arquivos HTML no navegador.**

O usuário prefere abrir os arquivos manualmente. Após fazer modificações nos arquivos HTML, CSS ou JavaScript, apenas informe que as alterações foram concluídas.

## Comandos Proibidos

- `start index.html`
- `start *.html`
- `executePwsh` com comandos de abertura de navegador
- Qualquer comando que tente abrir arquivos no navegador

## Comportamento Correto

2. Analisar o que deve ser feito
2. Explicar o que pretende fazer
2. Fazer as modificações solicitadas
3. Verificar erros com `getDiagnostics` se necessário
4. Informar que as alterações foram concluídas

