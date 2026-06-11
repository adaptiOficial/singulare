import Image from "next/image"

export function WaterMark() {
  return (
    <div className="bg-[#4BB5B8] text-white">
      <div className="max-lg:w-[90%] mx-auto border-t border-cloudDancer">
        <div className="flex lg:px-32 py-4 justify-between max-lg:flex-col  max-lg:gap-4">
          <p className="max-sm:text-[12px]">
            Desenvolvido por <span className="font-bold">Adapti Soluções Web</span>
          </p>
        </div>
      </div>
    </div>
  );
}