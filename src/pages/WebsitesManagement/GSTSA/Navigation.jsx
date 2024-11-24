import React from "react";
import MainLayout from "../../../layout/AdminLayouts/MainLayout";
import MenuItem from "../../../components/navigation/menu/MenuItem";
import SubMenu from "../../../components/navigation/subMenu/SubMenu";

function Navigation() {
  return (
    <MainLayout>
      <MenuItem />
      <SubMenu />
    </MainLayout>
  );
}

export default Navigation;
