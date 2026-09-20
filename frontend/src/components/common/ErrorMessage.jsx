
const ErrorMessage = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-5">
      <p className="text-sm font-medium text-red-600">
        {message}
      </p>
    </div>
  );
};

export default ErrorMessage;