# Delete Refund Dialog Design

## Goal

Adicionar uma modal de confirmação para exclusão de refund na tela de detalhes, usando Radix Alert Dialog e visual fiel ao mock fornecido.

## Scope

- Abrir a modal apenas em `src/pages/page-refund-details.tsx`.
- Confirmar exclusão do refund atual.
- Redirecionar para `/` após exclusão com sucesso.
- Manter a modal aberta em caso de erro.

## Architecture

- Criar `src/components/ui/alert-dialog-delete-refund.tsx` como componente controlado.
- Controlar o estado `open` na página de detalhes.
- Adicionar a ação `deleteRefund` ao hook `src/features/page-home/hooks/use-refund.ts`.
- Invalidar queries com prefixo `refund` após exclusão.

## UI

- Overlay escuro cobrindo a viewport.
- Card branco centralizado com cantos arredondados.
- Título `Excluir solicitação`.
- Descrição `Tem certeza que deseja excluir essa solicitação? Essa ação é irreversível.`
- Botões alinhados à direita: `Cancelar` em estilo textual verde e `Confirmar` em botão verde sólido.

## Error Handling

- Se a exclusão falhar, a modal não fecha.
- O botão de confirmar fica desabilitado durante a requisição.

## Verification

- `pnpm build`
- `pnpm check`
- Fluxo manual: abrir detalhes, abrir modal, cancelar, confirmar exclusão e voltar para `/`.
