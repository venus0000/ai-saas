import { UserButton } from "@clerk/nextjs";
// import { getApiLimitCount } from "@/lib/api-limit";
import MobileSidebar from "@/components/mobile-sidebar";
// import { checkSubscription } from "@/lib/subscription";

const Navbar = async () => {
//   const apiLimitCount = await getApiLimitCount();
//   const isPro = await checkSubscription();
  return (
    <div className="flex items-center p-4">
      <MobileSidebar/>
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
