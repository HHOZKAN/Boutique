import React from 'react'

export const Paymentsuccess = () => {

    return (
        <div className="bg-gradient-to-b from-[#101212] relative to-[#08201D]">
            <section className="relative lg:min-h-[1000px] pt-24 pb-10 sm:pt-32 sm:pb-16 lg:pb-24">
                <div className="absolute inset-x-0 bottom-0 z-10 hidden lg:flex">
                    <img className="hidden w-full lg:block" src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/5/credit-cards.png" alt="" />
                    <img className="block w-full lg:hidden" src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/5/credit-cards-mobile.png" alt="" />
                </div>
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="max-w-xl mx-auto text-center">
                        <h1 className="text-4xl font-bold sm:text-5xl">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-white">
                                Enchanté d'annoncer que votre paiement a été traité avec succès ! Nous vous remercions sincèrement pour votre transaction  </span>
                        </h1>
                    </div>
                </div>
            </section>
        </div>

    )
}


