const MessageSkeleton = () => {
  return (
    <div className="p-2 lg:p-4 flex flex-col gap-3 w-full">
      <div className="flex flex-col gap-5 justify-start">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-gray-300 animate-pulse" />

          <div className="flex flex-col gap-5">
            <div className="w-40  h-4 bg-gray-300 animate-pulse rounded-3xl" />
            <div className="w-40 h-4 bg-gray-300 animate-pulse rounded-3xl" />
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-gray-300 animate-pulse" />

          <div className="flex flex-col gap-5">
            <div className="w-40  h-4 bg-gray-300 animate-pulse rounded-3xl" />
            <div className="w-40 h-4 bg-gray-300 animate-pulse rounded-3xl" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 justify-end">
        <div className="flex items-center gap-5 justify-end">
          <div className="flex flex-col gap-5">
            <div className="w-40 h-4 bg-gray-300 animate-pulse rounded-3xl" />
            <div className="w-40 h-4 bg-gray-300 animate-pulse rounded-3xl" />
          </div>

          <div className="w-20 h-20 rounded-full bg-gray-300 animate-pulse" />
        </div>

        <div className="flex items-center gap-5 justify-end">
          <div className="flex flex-col gap-5">
            <div className="w-40 h-4 bg-gray-300 animate-pulse rounded-3xl" />
            <div className="w-40 h-4 bg-gray-300 animate-pulse rounded-3xl" />
          </div>

          <div className="w-20 h-20 rounded-full bg-gray-300 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default MessageSkeleton;
