import Image from "next/image";

export function WaterMark() {
  return (
    <div className="bg-[#4BB5B8] text-white">
      <div className="max-lg:w-[90%] mx-auto border-t border-cloudDancer">
        <div className="flex lg:px-32 py-4 justify-between max-lg:flex-col max-lg:items-center max-lg:gap-4">
          <p>
            Desenvolvido por <span className="font-bold">Adapti Soluções Web</span>
          </p>

          <div className="flex gap-4">
            <a href="">
              <Image
                src="/facebook.svg"
                alt="facebook-icon"
                width={24}
                height={24}
              />
            </a>

            <a href="">
              <Image
                src="/linkedin.svg"
                alt="linkedin-icon"
                width={24}
                height={24}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}