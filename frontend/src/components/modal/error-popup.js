import { Dialog, Transition } from '@headlessui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { Fragment } from 'react'

export default function ErrorPopup({ children, title, isOpen, onClose }) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        onClose={onClose}
        className="relative z-50 overflow-y-auto transition-all duration-500"
      >
        {/* Content */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 overflow-y-auto">
            <Dialog.Panel className="md:max-w-5/6 max-w-rounded relative w-full max-w-5xl bg-white shadow-md md:w-4/5">
              <div className="m-1 flex items-center justify-center rounded-md border border-red-700 bg-red-700 py-1 px-2 font-medium ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-alert-octagon mx-2 h-6 w-6"
                >
                  <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                {title && (
                  <Dialog.Title className="text-md p-2 font-medium text-white">
                    {title}
                  </Dialog.Title>
                )}
                <div className="max-w-full flex-initial text-sm font-normal">
                  <p>{children && children}</p>
                </div>
                <div className="flex flex-auto flex-row-reverse">
                  <CloseIcon onClick={onClose} />
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}
