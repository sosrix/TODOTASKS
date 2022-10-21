import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import TabBar from "enhanced-fluid-bottom-navigation-bar";

export default function BottomBar({ onTab }) {
  const tasks = useSelector((state) => state.todos);

  const inCompletedItemes = useMemo(() =>
    tasks.filter((task) => task.completed === false, [tasks])
  );

  return (
    <TabBar
      onPress={(tabIndex) => {
        onTab(tabIndex);
      }}
      values={[
        {
          title: `Home [${inCompletedItemes.length}]`,
          icon: "bars",
          iconSet: "AntDesign",
          size: 32,
        },
        {
          title: "New Task",
          icon: "edit",
          iconSet: "AntDesign",
          size: 32,
        },
      ]}
    />
  );
}
