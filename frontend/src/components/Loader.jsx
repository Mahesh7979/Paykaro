
export default function Loader() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-offblck">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent text-blu">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

