import { AlertTriangle, Flame, Leaf } from "lucide-react";

const Logo = ({ className }: { className: string }) => {
    return (
        <div className={`flex items-center  gap-1 ${className}`}>
            <div
                className="flex flex-wrap items-center justify-center 
            rounded w-[33.5px] h-[33.5px] px-[1px] py-[5px]
            box-border"
            >
                <Flame
                    className="min-h-[15px]  max-h-[15px]
                fill-highPriority text-highPriority
                inline w-[28px]"
                />
                <AlertTriangle
                    className="h-[14px] w-[14px] inline 
                    fill-mediumPriority stroke-mediumPriority"
                />

                <Leaf
                    className="h-[14px] w-[14px] inline fill-lowPriority
                    text-lowPriority"
                />
            </div>
            <h1 className="text-[15px] font-logoFont gradient-text">
                <span className="italic tex-highPriority">
                    do
                    <span className="tex-mediumPriority">-</span>
                </span>
                <b className="tex-lowPriority">manager</b>
            </h1>
        </div>
    );
};

export default Logo;
