import { RotatingLines } from "react-loader-spinner"

const Loader = ({ text }) => {
    return (
        <div  className="flex justify-center items-center w-full h-[450]">
            <div className="flex flex-col items-center gap-1">
          <RotatingLines
                                    visible={true}
                                    height="70"
                                    width="50"
                                    color="green"
                                    strokeWidth="5"
                                    animationDuration="0.50"
                                    ariaLabel="rotating-lines-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    />
                                    <p className="text-slate-800">
                                        {text ? text : "Please wait...."}
                                    </p>
            </div>                            

        </div>
    )
}

export default Loader;