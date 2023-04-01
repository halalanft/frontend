import { FaDiscord, FaMedium, FaTwitter } from 'react-icons/fa'

export default function MintingFooter() {
  return (
    <section id="footer" className="bg-[#fad02c] py-14">
      <div className="flex flex-col justify-center gap-5 text-center md:flex-row ">
        <a className="self-center" href="https://discord.com/invite/be5fnEqrZQ">
          <button className=" mb-4 flex items-center justify-center gap-2 self-center rounded-md bg-[#374C8C] px-4 py-2 text-white hover:bg-[#283765] max-sm:w-40">
            <FaDiscord />
            <strong>DISCORD</strong>
          </button>
        </a>

        <a className="self-center" href="https://twitter.com/halalanft">
          <button className="mb-4 flex items-center justify-center gap-2 self-center rounded-md bg-[#374C8C] px-4 py-2 text-white hover:bg-[#283765] max-sm:w-40">
            <FaTwitter />
            <strong>TWITTER</strong>
          </button>
        </a>
        <a className="self-center" href="#">
          <button className="mb-4 flex items-center justify-center gap-2 self-center rounded-md bg-[#374C8C] px-4 py-2 text-white hover:bg-[#283765] max-sm:w-40">
            <FaMedium />
            <strong>MEDIUM</strong>
          </button>
        </a>
      </div>
      <div className="pt-6 text-center">
        <p className="font-semibold text-[#171717] opacity-[0.68]">
          Copyright © 2022 - All right reserved
        </p>
      </div>
    </section>
  )
}
