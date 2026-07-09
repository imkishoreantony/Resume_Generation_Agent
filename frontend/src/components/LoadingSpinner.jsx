function LoadingSpinner({
  text = "Loading...",
  size = "w-14 h-14",
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20">

      <div
        className={`${size} border-4 border-blue-600 border-t-transparent rounded-full animate-spin`}
      ></div>

      <p className="mt-6 text-lg text-gray-600 font-medium">
        {text}
      </p>

    </div>
  );
}

export default LoadingSpinner;