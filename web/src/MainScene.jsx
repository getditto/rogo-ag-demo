import React, { useState } from "react";
import { usePendingCursorOperation } from "@dittolive/react-ditto";
import { XIcon, CheckIcon } from "@heroicons/react/solid";
import classNames from "classnames";

export default function MainScene() {
  const [bodyEntry, setBodyEntry] = useState("");

  const { documents, collection } = usePendingCursorOperation({
    collection: "tasks",
  });

  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:max-w-lg">
        <div className="mb-4">
          <h1 className="text-2xl">Tasks List</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (bodyEntry) {
                collection.insert({ body: bodyEntry, isDone: false });
              }
              setBodyEntry("");
            }}
            className="flex mt-4"
          >
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
              value={bodyEntry}
              onChange={(e) => setBodyEntry(e.currentTarget.value)}
              placeholder="Add Todo"
            />
            <button
              type="submit"
              className="flex-no-shrink p-2 border-2 rounded"
            >
              Add
            </button>
          </form>
        </div>
        {documents.map((document) => (
          <div key={document._id} className="flex mb-4 items-center">
            <p
              className={classNames("w-full", {
                "line-through": document.isDone,
              })}
            >
              {document.body}
            </p>
            <button
              onClick={() => {
                collection.findByID(document._id).update((mutableDoc) => {
                  mutableDoc.isDone = !document.isDone;
                });
              }}
              className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white hover:bg-green-500"
            >
              <CheckIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => {
                collection.findByID(document._id).remove();
              }}
              className="flex-no-shrink p-2 ml-2 border-2 rounded hover:text-white hover:bg-red-500"
            >
              <XIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
        <div></div>
      </div>
    </div>
  );
}
