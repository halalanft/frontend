import clsx from 'clsx'
const ButtonHome = ({ name }) => {
  return (
    <div className="dropdown-bottom dropdown">
      <label tabIndex={0} className="btn m-1 bg-[#374C8C] text-white">
        {name}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box w-52 bg-white p-2 shadow"
      >
        <li className="text-[#171717] opacity-[0.68]">
          <a href="https://drive.google.com/file/d/1IFQS6WDDJk0--Smi2SOknkprZ9IkR5bZ/view?usp=sharing">
            Whitepaper in english
          </a>
        </li>
        <li className="text-[#171717] opacity-[0.68]">
          <a href="https://drive.google.com/file/d/177PwCBsXzZsDv2M2Rr1o4KMH4EByveY5/view?usp=sharing">
            Whitepaper in indonesian
          </a>
        </li>
      </ul>
    </div>
  )
}
const Button = ({ name }) => {
  return (
    <div className="dropdown-bottom dropdown">
      <label tabIndex={0} className="btn m-1 bg-[#374C8C] text-white">
        {name}
      </label>
    </div>
  )
}

const ButtonMint = ({ children, block, variant, ...props }) => {
  switch (variant) {
    case 'danger':
      return (
        <button
          {...props}
          className={clsx(
            block && 'w-full',
            'block rounded-md border border-solid border-[#3EC6FF] bg-[#3EC6FF] px-4 py-2 text-center text-white transition-all duration-200 hover:bg-transparent hover:text-gray-700',
            props.className
          )}
        >
          {children}
        </button>
      )
    case 'enabled':
      return (
        <button
          {...props}
          className={clsx(
            block && 'w-full',
            'block rounded-md border border-solid border-[#3EC6FF] bg-[#3EC6FF] px-4 py-2 text-center text-white transition-all duration-200 hover:bg-transparent hover:text-gray-700',
            props.className
          )}
        >
          {children}
        </button>
      )
    case 'disabled':
      return (
        <button
          {...props}
          className={clsx(
            block && 'w-full',
            'block rounded-md border border-solid border-[#3EC6FF] bg-transparent px-4 py-2 text-center text-gray-400 transition-all duration-200 ',
            props.className
          )}
        >
          {children}
        </button>
      )
    default:
      return (
        <button
          {...props}
          className={clsx(
            block && 'w-full',
            'block rounded-md border border-solid border-[#3EC6FF] bg-[#3EC6FF] px-4 py-2 text-center text-white transition-all duration-200 hover:bg-transparent hover:text-gray-700',
            props.className
          )}
        >
          {children}
        </button>
      )
  }
}

export { ButtonHome, Button, ButtonMint }
