function DeleteResumeModal({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) {

  if (!isOpen) return null;

  return (

    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
    >

      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl w-[92%] max-w-md p-8 animate-scaleIn"
      >

        <div className="text-center">

          <div className="text-6xl mb-4">
            🗑
          </div>

          <h2 className="text-3xl font-bold text-red-600">

            Delete Resume

          </h2>

          <p className="text-gray-500 mt-4 leading-7">

            Are you sure you want to delete this resume?

            <br />

            This action cannot be undone.

          </p>

        </div>

        <div className="flex justify-center gap-4 mt-10">

          <button
            onClick={onClose}
            className="px-8 py-3 rounded-xl bg-gray-300 hover:bg-gray-400"
          >

            Cancel

          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-8 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white"
          >

            {loading ? "Deleting..." : "Delete"}

          </button>

        </div>

      </div>

    </div>

  );

}

export default DeleteResumeModal;