import Link from 'next/link'

export default function UserDashboardSider() {
  const SIDER_MENU = [
    {
      title: 'Home',
      url: '/',
    },
    {
      title: 'My NFTs',
      url: '/dashboard',
    },
    {
      title: 'Buy NFTs',
      url: '/minting',
    },
  ]

  return (
    <ul className="flex flex-col gap-4">
      {SIDER_MENU.map(({ title, url }) => (
        <Link key={title} href={url} target="_self">
          <li className="rounded-md border-b-2 border-solid p-2 text-[#363755] transition-all duration-200 hover:bg-blue-200 active:text-[#5BD3C7]">
            {title}
          </li>
        </Link>
      ))}
    </ul>
  )
}
