import { Skeleton } from "@mui/material";

export default function ProductDetailsSkeleton() {
  return (
    <div className="bg-white lg:px-20">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {/* Breadcrumb skeleton */}
            <Skeleton variant="text" width={100} height={20} />
            <Skeleton variant="text" width={100} height={20} />
            <Skeleton variant="text" width={100} height={20} />
          </ol>
        </nav>

        <section className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 px-4 pt-10">
          {/* Image gallery skeleton */}
          <div className="flex flex-col items-center">
            <Skeleton variant="rounded" width={380} height={500} />
            <div className="flex flex-wrap space-x-5 justify-center my-5">
              <Skeleton variant="rounded" width={50} height={50} />
              <Skeleton variant="rounded" width={50} height={50} />
              <Skeleton variant="rounded" width={50} height={50} />
              <Skeleton variant="rounded" width={50} height={50} />
            </div>
          </div>
          {/* Product info skeleton */}
          <div className="lg: col-span-1 maxt-auto max-w-2xl px-4 pb-60 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24  ">
            <Skeleton variant="text" width={200} height={40} />
            <Skeleton variant="text" width={300} height={40} />
            <Skeleton variant="text" width={300} height={40} />
            <Skeleton variant="text" width={300} height={40} />
            <div className="mt-4 lg:row-span-3 lg:mt-5">
              <div className="flex flex-row gap-3 ">
                {/* Sizes skeleton */}
                <Skeleton variant="rectangular" width={300} height={80} />
                <Skeleton variant="rectangular" width={300} height={80} />
                <Skeleton variant="rectangular" width={300} height={80} />
              </div>
              <Skeleton
                className="mt-5"
                variant="rectangular"
                width={300}
                height={80}
              />

              {/* Description and details skeleton */}
              <Skeleton variant="text" width={300} height={40} />
              <Skeleton variant="text" width={200} height={40} />
              <Skeleton variant="text" width={300} height={40} />
              <Skeleton variant="text" width={200} height={40} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
