

function Hero() {
    return (
        <div className="p-4 h-full w-full">
            <div className="flex justify-center items-center w-full h-full relative">
                <img src="./au.png" alt="augate" className="rounded-2xl max-h-full max-w-full object-contain" />
                <p className="text-5xl absolute top-[10%] left-[50%] -translate-x-[50%] -translate-y-[50%] font-bold">Find Your Way Back</p>
                <p className="text-xl absolute top-[20%] left-[50%] -translate-x-[50%] -translate-y-[50%] font-semibold w-[50%] text-center">Report lost or found items on campus and help reunite belongings with their owners.</p>
                <div className="absolute bottom-[5%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex justify-center items-center gap-30">
                    <button className="bg-blue-700 p-3 rounded-xl text-white hover:cursor-pointer hover:bg-blue-800">Report Found</button>
                    <button className="bg-blue-700 p-3 rounded-xl text-white hover:cursor-pointer hover:bg-blue-800">Report Lost</button>
                </div>
            </div>
        </div>
    )
}

export default Hero
