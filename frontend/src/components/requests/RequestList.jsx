import RequestCard from "./RequestCard";

const RequestList = ({ requests = [] }) => {
  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <RequestCard
          key={request._id || request.id}
          request={request}
        />
      ))}
    </div>
  );
};

export default RequestList;