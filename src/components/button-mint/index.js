import clsx from 'clsx'

export default function Button({ children, block, variant, ...props }) {
  switch (variant) {
    case 'danger':
      return (
        <button
          {...props}
          className={clsx(
            block && 'w-full',
            'block rounded-md border border-solid border-[#374C8C] bg-[#374C8C] px-4 py-2 text-center text-white transition-all duration-200 hover:bg-transparent hover:text-gray-700',
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
            'block rounded-md border border-solid border-[#374C8C] bg-[#374C8C] px-4 py-2 text-center text-white transition-all duration-200 hover:bg-transparent hover:text-gray-700',
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
            'block rounded-md border border-solid border-[#374C8C] bg-transparent px-4 py-2 text-center text-gray-400 transition-all duration-200 ',
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
            'block rounded-md border border-solid border-[#374C8C] bg-[#374C8C] px-4 py-2 text-center text-white transition-all duration-200 hover:bg-transparent hover:text-[#374C8C]',
            props.className
          )}
        >
          {children}
        </button>
      )
  }
}
