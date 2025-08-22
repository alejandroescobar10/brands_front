export default function ConfirmDelete({
  open, text = "¿Eliminar este registro?", onConfirm, onCancel
}: { open: boolean; text?: string; onConfirm: () => void; onCancel: () => void; }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-[360px] space-y-4">
        <p>{text}</p>
        <div className="flex gap-2 justify-end">
          <button className="px-4 py-2 border rounded" onClick={onCancel}>Cancelar</button>
          <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={onConfirm}>Eliminar</button>
        </div>
      </div>
    </div>
  );
}
