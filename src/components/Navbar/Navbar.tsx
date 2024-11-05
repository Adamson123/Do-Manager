import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const currentPath = usePathname();
  const isActivePath = (path: string) => {
    return (
      (path === "Tasks" && currentPath === "/") ||
      currentPath === "/" + path.toLowerCase()
    );
  };

  return (
    <nav className="px-4">
      <div className="border-b border-darkerBg flex gap-3">
        {["Tasks", "Favorites", "Activities"].map((value, index) => {
          return (
            <Link
              className={`text-[15px] px-5 translate-y-[1px] cursor-pointer pb-[6px] ${
                isActivePath(value)
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground"
              }`}
              key={index}
              href={value === "Tasks" ? "/" : "/" + value.toLocaleLowerCase()}
            >
              {value}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
