import { DireactionHover } from "./NFThovercard";

const BrowseCategories = () => {
  return (
    <div
      className={`relative  w-full flex flex-col items-center justify-start py-[5rem] px-[1.25rem] box-border gap-[3.75rem] max-w-full z-[5] text-left text-[2.375rem] text-croc-primary-white font-segoe-ui lg:gap-[1.875rem] `}
    >
      <div className="w-[65.625rem] flex flex-row items-start justify-start max-w-full">
        <h1 className="m-0 flex-1 relative text-inherit leading-[2.875rem] capitalize font-semibold font-inherit inline-block max-w-full mq450:text-[1.438rem] mq450:leading-[1.688rem] mq1050:text-[1.875rem] mq1050:leading-[2.25rem]">
          Browse Categories
        </h1>
      </div>
      <DireactionHover />
    </div>
  );
};

export default BrowseCategories;
