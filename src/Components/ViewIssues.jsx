import React from "react";

const ViewIssues = ({ issuesDetails }) => {
  const convertTimestampToTime = (timestamp) => {
    const date = new Date(Number(timestamp) * 1000);
    // Extract hours, minutes, and seconds
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div>
      <div className="px-4 sm:px-0 md:ml-72 mt-4 ml-4">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Issues List
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Issues and remark details for each user
        </p>
      </div>
      {issuesDetails?.map((issueDetail, index) => {
        const [
          id,
          userAddress,
          userName,
          location,
          issue,
          productName,
          productBatchNumber,
          timeStamp,
        ] = issueDetail;

        return (
          <div
            key={id.toString()}
            className="mt-6 border-t border-gray-100 ml-4 md:ml-72"
          >
            <dl className="divide-y divide-gray-100">
              <div className="py-6">
                <dt className="text-xl font-bold leading-6 text-gray-900">
                  {id.toString()}
                </dt>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Date
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {convertTimestampToTime(timeStamp)}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    User Name
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {userName}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Product Name
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {productName}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Product Batch Number
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {productBatchNumber}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Location
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {location}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Issue
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {issue}
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        );
      })}
    </div>
  );
};

export default ViewIssues;
