export default function ConfirmDelete({
  open,
  text = "¿Eliminar este registro?",
  onConfirm,
  onCancel,
}: {
  open: boolean; // controla si el modal se muestra o no
  text?: string; // mensaje a mostrar en el diálogo
  onConfirm: () => void; // acción al confirmar (ej: eliminar)
  onCancel: () => void; // acción al cancelar
}) {
  // Si no está abierto, no renderiza nada
  if (!open) return null;

  return (
    // Fondo semitransparente que cubre toda la pantalla
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      {/* Caja central del diálogo */}
      <div className="bg-white p-6 rounded w-[360px] space-y-4">
        <p>{text}</p>

        {/* Botones de acción */}
        <div className="flex gap-2 justify-end">
          <button
            className="px-4 py-2 border rounded text-white"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded"
            onClick={onConfirm}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
