import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Link from "next/link";

function SettingsNav(props) {
  return (
    <Tabs
      value={props.activeKey}
      indicatorColor="primary"
      textColor="primary"
      centered={true}
    >
      <Link href="/settings/general" value="general" passHref={true}>
        <Tab label="General" component="a"></Tab>
      </Link>

      <Link href="/settings/password" value="password" passHref={true}>
        <Tab label="Password" component="a"></Tab>
      </Link>

      <Link href="/settings/billing" value="billing" passHref={true}>
        <Tab label="Billing" component="a"></Tab>
      </Link>
    </Tabs>
  );
}

export default SettingsNav;
