export default function Button({ customStyles = null, label, onClick = null }) {
  return (
    <button
      type="button"
      className={
        customStyles
          ? customStyles
          : "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-neutral-800 hover:bg-neutral-900"
      }
      onClick={onClick}
    >
      {label}
    </button>
  );
}
