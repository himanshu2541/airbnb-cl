"use client";

import { Container } from "@/app/components/container/Container";
import { Logo } from "@/app/components/navbar/Logo";
import Search from "@/app/components/navbar/Search";
import UserMenu from "./UserMenu";
import { User } from "@/app/libs/models";
import Categories from "./Categories";

interface NavbarProps{
  currentUser?: typeof User.prototype | null;
}
export const Navbar: React.FC<NavbarProps> = ({currentUser}) => {
  // console.log(currentUser);
  return (
    <div className={"fixed w-full bg-white z-10 shadow-sm"}>
      <div className={"py-4 border-b-[1px]"}>
        <Container>
          <div
            className={
              "flex flex-row items-center justify-between gap-3 md:gap-0"
            }
          >
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser}/>
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};
