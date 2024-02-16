import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div>
      <div>
        <div className="min-h-[50vh] flex flex-grow items-center justify-center bg-gray-50">
          <div className="rounded-lg bg-white p-8 text-center shadow-xl">
            <h1 className="mb-4 text-4xl font-bold">403</h1>
            <p className="text-gray-600">
              Opps! you are not authorized to access admin dashboard
            </p>
            <Link
              to="/"
              className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
            >
              {" "}
              Go back to Home{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
