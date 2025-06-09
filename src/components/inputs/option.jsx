'use client'

import {useEffect, useState} from 'react'
import {Label, Listbox, ListboxButton, ListboxOption, ListboxOptions} from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/16/solid'
import {CheckIcon} from '@heroicons/react/20/solid'



export default function optionsChangeCurrency({rates, value, onChange, toman,}) {

    const [selected, setSelected] = useState(value ?? toman)

    const handleChange = (val) => {
        setSelected(val)
        onChange?.(val)
    }

    useEffect(() => {
        setSelected(value ?? toman)
    }, [value, toman])


    return (
        <Listbox value={selected} onChange={handleChange}>
            <div className="optionsChangeCurrency relative">
                <ListboxButton
                    className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 focus:outline-hidden sm:text-sm/6">
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <img alt="" src={"https://flagcdn.com/w40/" + selected.symbol.toLowerCase().slice(0, 2) + ".png"}
                 className="size-5 shrink-0 rounded-full"/>
            <span className="block truncate">{selected.name}</span>
          </span>
                    <ChevronDownIcon
                        aria-hidden="true"
                        className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                </ListboxButton>

                <ListboxOptions
                    transition
                    className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                >
                    <ListboxOption
                        key="irr"
                        value={toman}
                        className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white"
                    >
                        <div className="flex items-center">
                            <img alt="" src="https://flagcdn.com/w40/ir.png" className="size-5 shrink-0 rounded-full"/>
                            <span
                                className="ml-3 block truncate font-normal group-data-selected:font-semibold">تومان</span>
                        </div>
                        <span
                            className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
      <CheckIcon aria-hidden="true" className="size-5"/>
    </span>
                    </ListboxOption>
                    {rates.map((rate) => (
                        <ListboxOption
                            key={rate.symbol}
                            value={rate}
                            className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                        >
                            <div className="flex items-center">
                                <img alt=""
                                     src={"https://flagcdn.com/w40/" + rate.symbol.toLowerCase().slice(0, 2) + ".png"}
                                     className="size-5 shrink-0 rounded-full"/>
                                <span
                                    className="ml-3 block truncate font-normal group-data-selected:font-semibold">{rate.name}</span>
                            </div>

                            <span
                                className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">

                <CheckIcon aria-hidden="true" className="size-5"/>
              </span>
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </div>
        </Listbox>
    )
}