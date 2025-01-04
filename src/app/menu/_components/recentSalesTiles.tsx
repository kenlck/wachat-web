export function RecentSalesTiles({
  image,
  name,
  email,
  amount,
}: {
  image: string;
  name: string;
  email: string;
  amount: string;
}) {
  return (
    <div className="flex flex-row items-center justify-between gap-2">
      <div className="flex flex-row gap-2">
        <div className="w-[40px]">
          <picture>
            <img className="size-10 rounded-full" src={image} alt="tile1" />
          </picture>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm">{name}</p>
          <p className="text-sm text-gray-600">{email}</p>
        </div>
      </div>
      <p className="hidden font-semibold sm:block">{amount}</p>
    </div>
  );
}
