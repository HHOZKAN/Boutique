import React from 'react'

export const Paymentcancel = () => {

    return (
        <div className="bg-gradient-to-b from-[#101212] relative to-[#08201D]">
            <section className="relative lg:min-h-[1000px] pt-24 pb-10 sm:pt-32 sm:pb-16 lg:pb-24">
                <div className="absolute inset-x-0 bottom-0 z-10 hidden lg:flex">
                    <img className="hidden w-full lg:block" src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/5/credit-cards.png" alt="" />
                    <img className="block w-full lg:hidden" src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/5/credit-cards-mobile.png" alt="" />
                </div>
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="max-w-xl mx-auto text-center">
                        <h1 className="text-4xl font-bold sm:text-4xl">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-white">

                                Nous sommes désolés d'apprendre qu'il y a eu une erreur lors du traitement de votre paiement.
                                Veuillez vérifier les détails de votre transaction et assurez-vous que toutes les informations fournies sont correctes.
                            </span>
                        </h1>
                    </div>
                </div>
            </section>
        </div>

    )
}


