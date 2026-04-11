# Delete Refund Dialog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Radix-based confirmation dialog for deleting a refund from the details page and redirect to the list after success.

**Architecture:** Add a focused UI component for the dialog, keep dialog state in the details page, and extend the refund hook with a delete mutation. Reuse the existing button and text primitives where possible and validate with the project's build and check commands.

**Tech Stack:** React 19, TypeScript, React Router v7, TanStack Query, Radix Alert Dialog, Tailwind CSS v4, tailwind-variants

---

### Task 1: Add Delete Dialog UI

**Files:**
- Create: `src/components/ui/alert-dialog-delete-refund.tsx`
- Modify: `package.json`

- [ ] Install `@radix-ui/react-alert-dialog`.
- [ ] Create a controlled `AlertDialogDeleteRefund` component with overlay, content, title, description, cancel action, and confirm button.
- [ ] Match the provided mock using existing tokens and primitives.

### Task 2: Add Delete Action to Refund Hook

**Files:**
- Modify: `src/features/page-home/hooks/use-refund.ts`

- [ ] Add a delete mutation that calls `DELETE /refunds/:id`.
- [ ] Expose `deleteRefund` and `isDeletingRefund` from the hook.
- [ ] Invalidate `refund` queries after success.

### Task 3: Wire Dialog Into Details Page

**Files:**
- Modify: `src/pages/page-refund-details.tsx`

- [ ] Replace the current submit-based delete button flow with dialog state.
- [ ] Open the modal from `Excluir Solicitação`.
- [ ] On confirm, call `deleteRefund`, close the dialog, and navigate to `/` after success.

### Task 4: Verify

**Files:**
- Modify: none

- [ ] Run `pnpm build`.
- [ ] Run `pnpm check`.
- [ ] Manually verify dialog open, cancel, and successful delete redirect flow.
